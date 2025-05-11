import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minLenght: 6,
    },
    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
