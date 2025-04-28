const mongoose = require('mongoose');

const counsellorPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  collegeName:{
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true
  },
  examName: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
  passoutYear:{
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  registrationNumber:{
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  collegeIdCard: {
    type: String,
    required: false
  },
  rankCard: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  otp: {
    type: String,  // Stores the OTP sent to the user
    required: false, // OTP is not always needed
  },
  otpExpiry: {
    type: Date, // Stores the expiry time of the OTP
    required: false, // OTP expiry is not always set
  },
  slug:{
    type: String,
    required: true
  },
},
{ timestamps: true }
);

export const counsellorPerson = mongoose.model('counsellorPerson', counsellorPersonSchema);
