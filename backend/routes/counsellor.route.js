import express from 'express';
import { resendOtpCounsellor, sendForgotOtpCounsellor, sendOtpCounsellor, updatePasswordCounsellor, verifyForgotOtpCounsellor, verifyOtpCounsellor } from '../controllers/otp.controller.js';
import { fetchAllData, getProfile, insertData, login, register } from '../controllers/counsellor.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

//new user otp
router.route("/send-otp").post(sendOtpCounsellor);
router.route("/verify-otp").post(verifyOtpCounsellor);
router.route("/resend-otp").post(resendOtpCounsellor);

//forget user otp
router.route("/forgot/send-otp").post(sendForgotOtpCounsellor);
router.route("/forgot/verify-otp").post(verifyForgotOtpCounsellor);
router.route("/forgot/Update-password").post(updatePasswordCounsellor);

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