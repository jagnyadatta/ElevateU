import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    gender:{
      type: String,
      required: false
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    about:{
      type: String,
      required: false
    },
    otp: {
      type: String,  
      required: false, 
    },
    otpExpiry: {
      type: Date, 
      required: false, 
    },
    profileImage:{
      type: String,
      required: false
    },
    slug:{
      type: String,
      required: false
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
