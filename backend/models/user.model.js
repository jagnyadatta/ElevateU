import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    otp: {
      type: String,  // Stores the OTP sent to the user
      required: false, // OTP is not always needed
    },
    otpExpiry: {
      type: Date, // Stores the expiry time of the OTP
      required: false, // OTP expiry is not always set
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
