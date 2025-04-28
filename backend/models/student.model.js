import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
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
      type: String,  
      required: false, 
    },
    otpExpiry: {
      type: Date, 
      required: false, 
    },
    slug:{
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
