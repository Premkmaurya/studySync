const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadImage = require("../services/image.service");
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
  const ONE_YEAR = 31536000;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: ONE_YEAR,
  });

  return res.status(201).json({
    message: "user registered successfully",
    email: user.email,
    fullname: user.fullname,
  });
});

const loginUser = asyncHandler(async (req, res) => {
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
    config.JWT_SECRET_KEY,
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
    email: user.email,
    fullname: user.fullname,
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
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUserById,
  updateProfilePicture,
};
