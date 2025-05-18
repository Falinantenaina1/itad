import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { generateToken } from "../config/generateToken.js";
import User from "../models/user.model.js";

const handleError = async (res, error, session = null) => {
  if (session) await session.abortTransaction();
  console.error(error);
  res
    .status(500)
    .json({ success: false, error: error.message || "Internal Server Error" });
};

export const SignUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      return res
        .status(409)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    const createdUser = user[0];

    const token = await generateToken(createdUser._id, createdUser.role, res);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      token,
      message: "User signed up successfully",
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    await handleError(res, error, session);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    await generateToken(user._id, user.role, res);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    await handleError(res, error);
  }
};

export const SignOut = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
