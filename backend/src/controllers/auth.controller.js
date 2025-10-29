const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const {
    firstname, 
    lastname ,
    email,
    password,
  } = req.body;

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
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("token", token,{
    httpOnly:true,
    secure:true,
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

  const token = await jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token",token,{
    httpOnly:true,
    secure:true
  });

  return res.status(200).json({
    message: "user logged in successfully",
    user,
  });
}

async function getMe(req, res) {
  const user = req.user;
  console.log(user)
  const userFind = await userModel.findById(user.id).select("-password");
  return res.status(200).json({
    message:"data fetched successfully.",
    userFind,
  });
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
