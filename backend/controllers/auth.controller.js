import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { generateToken } from "../../config/generateToken.js";
import User from "../models/user.model.js";

export const SignUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User Already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = await generateToken(user._id);

    session.commitTransaction();

    return res.status(200).json({
      success: true,
      token,
      message: "User signed sucessfully",
      data: user,
    });
  } catch (error) {
    session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
    }

    await generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Logged successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const SignOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged Out sucessfully" });
};
