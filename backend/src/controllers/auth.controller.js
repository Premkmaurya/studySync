const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadImage, deleteImage } = require("../services/image.service");
const config = require("../config/config");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({
      message: "user already exist.",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(201).json({
    message: "user registered successfully",
    email: user.email,
    fullname: user.fullname,
    user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "user doesn't exist.",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPersistent = Boolean(rememberMe);
  const tokenExpiresIn = isPersistent ? "7d" : "1d";

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: tokenExpiresIn,
    },
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  if (isPersistent) {
    // 7 days in milliseconds
    cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
  }

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    message: "user logged in successfully",
    email: user.email,
    fullname: user.fullname,
    user,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({
    message: "user logged out successfully",
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFind = await userModel.findById(user.id).select("-password");
  return res.status(200).json({
    message: "data fetched successfully.",
    user: userFind,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id).select("-password");
  return res.status(200).json({
    user,
  });
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }

  // 1. Retrieve existing user to identify current ImageKit asset
  const existingUser = await userModel.findById(id);
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  let oldFileId = null;
  if (existingUser.profilePicture) {
    if (typeof existingUser.profilePicture === "object" && existingUser.profilePicture.fileId) {
      oldFileId = existingUser.profilePicture.fileId;
    }
  }

  // 2. Upload NEW image to ImageKit
  let uploadResponse;
  try {
    uploadResponse = await uploadImage(file.buffer);
  } catch (uploadError) {
    console.error("ImageKit upload error:", uploadError);
    return res.status(500).json({
      message: "Failed to upload image to storage. Existing profile picture preserved.",
    });
  }

  if (!uploadResponse || !uploadResponse.url) {
    return res.status(500).json({
      message: "Invalid storage upload response",
    });
  }

  const newProfilePicture = {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId || null,
  };

  // 3. Save NEW image URL and fileId to MongoDB
  let updatedUser;
  try {
    updatedUser = await userModel
      .findByIdAndUpdate(
        id,
        { profilePicture: newProfilePicture },
        { new: true }
      )
      .select("-password");
  } catch (dbError) {
    console.error("Database update error after ImageKit upload:", dbError);
    // Cleanup newly uploaded file to prevent orphan accumulation
    if (uploadResponse.fileId) {
      try {
        await deleteImage(uploadResponse.fileId);
      } catch (cleanupErr) {
        console.error("Failed to cleanup orphan ImageKit file:", cleanupErr);
      }
    }
    return res.status(500).json({
      message: "Failed to update user profile picture in database",
    });
  }

  // 4. Delete OLD ImageKit asset after successful DB update
  if (oldFileId && oldFileId !== uploadResponse.fileId) {
    try {
      await deleteImage(oldFileId);
    } catch (oldDeleteErr) {
      console.error("Failed to delete old profile picture from ImageKit:", oldDeleteErr);
    }
  }

  return res.status(200).json({
    message: "profile picture updated successfully",
    user: updatedUser,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { firstname, lastname } = req.body;

  if (!firstname && !lastname) {
    return res.status(400).json({
      message: "Please provide firstname or lastname to update",
    });
  }

  const existingUser = await userModel.findById(userId);
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const updateData = {
    fullname: {
      firstname: firstname ? firstname.trim() : existingUser.fullname?.firstname,
      lastname: lastname ? lastname.trim() : existingUser.fullname?.lastname,
    },
  };

  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true })
    .select("-password");

  return res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getUserById,
  updateProfilePicture,
  updateUserProfile,
};
