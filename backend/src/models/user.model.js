import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      lowercase: true,
      min: [8, "Must be atleast 8 digit"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
