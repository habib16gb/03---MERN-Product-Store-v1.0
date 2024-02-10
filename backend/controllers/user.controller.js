import expressAsyncHandler from "express-async-handler";
import User from "../models/users.model.js";
import { generateAT } from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateAT(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register a new user
// route    POST /api/users/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(409);
    throw new Error("Email already Exist try again");
  }

  const newUser = await User.create({
    email,
    password,
    name,
  });

  if (newUser) {
    generateAT(res, newUser._id);
    res.status(200).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});

// @desc    Get user profile
// route    Get /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({ _id, name, email });
});

// @desc    Get user profile
// route    Get /api/users/profile
// @access  Private

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  const user = await User.findById(_id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    req.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
