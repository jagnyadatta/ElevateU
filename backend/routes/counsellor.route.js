import express from 'express';
import { resendOtpCounsellor, sendOtpCounsellor, verifyOtpCounsellor } from '../controllers/otp.controller.js';

const router = express.Router();

// Route to send OTP
router.route("/send-otp").post(sendOtpCounsellor);

// Route to verify OTP
router.route("/verify-otp").post(verifyOtpCounsellor);

// Route to resend OTP
router.route("/resend-otp").post(resendOtpCounsellor);

export default router;