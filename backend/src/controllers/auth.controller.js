const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadImage = require("../services/image.service");

async function registerUser(req, res) {
  const { firstname, lastname, email, password, publicKey } = req.body;

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
    publicKey: publicKey || "",
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  const ONE_YEAR = 31536000;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: ONE_YEAR,
  });

  return res.status(201).json({
    message: "user registered successfully",
    user,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

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

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "365d",
    },
  );

  const ONE_YEAR = 31536000;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: ONE_YEAR,
  });

  return res.status(200).json({
    message: "user logged in successfully",
    user,
  });
}

async function getMe(req, res) {
  const user = req.user;
  const userFind = await userModel.findById(user.id).select("-password");
  return res.status(200).json({
    message: "data fetched successfully.",
    user: userFind,
  });
}


async function updatePublicKey(req, res) {
  const user = req.user;
  const { publicKey } = req.body;

  if (!publicKey) {
    return res.status(400).json({ message: "publicKey is required" });
  }

  const updated = await userModel.findByIdAndUpdate(user.id, { publicKey }, { new: true }).select("fullname email publicKey");
  return res.status(200).json({ message: "public key updated", user: updated });
}

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await userModel.findById(id).select("-password");
  return res.status(200).json({
    user,
  });
}

async function updateProfilePicture(req, res) {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }

  try {
    const uploadResponse = await uploadImage(file.buffer);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { profilePicture: uploadResponse.url },
      { new: true }
    );

    return res.status(200).json({
      message: "profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      message: "Failed to upload image",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUserById,
  updateProfilePicture,
  updatePublicKey,
};
