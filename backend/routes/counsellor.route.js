import express from 'express';
import { resendOtpCounsellor, sendOtpCounsellor, verifyOtpCounsellor } from '../controllers/otp.controller.js';
import { fetchAllData, getProfile, insertData, login, register } from '../controllers/counsellor.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Route to send OTP
router.route("/send-otp").post(sendOtpCounsellor);

// Route to verify OTP
router.route("/verify-otp").post(verifyOtpCounsellor);

// Route to resend OTP
router.route("/resend-otp").post(resendOtpCounsellor);

router.route("/register").post(upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "collegeIdCard", maxCount: 1 },
  { name: "rankCard", maxCount: 1 },
]),register);
router.route("/login").post(login);
router.route("/profile").post(getProfile);
router.route("/bulk-insert").post(insertData);
router.route("/fetch-all-data").get(fetchAllData);

export default router;