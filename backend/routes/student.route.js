import express from "express";
import { addCounsellorToStudent, login, logout, register } from "../controllers/student.controller.js";
import { resendOtp, sendForgotOtpStudent, sendOtp, updatePasswordStudent, verifyForgotOtpStudent, verifyOtp } from '../controllers/otp.controller.js';
import upload from "../middleware/multer.js";

const router = express.Router();
//new user otp
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);

//forget user otp
router.route("/forgot/send-otp").post(sendForgotOtpStudent);
router.route("/forgot/verify-otp").post(verifyForgotOtpStudent);
router.route("/forgot/Update-password").post(updatePasswordStudent);

router.route("/register").post(upload.fields([
    { name: "profileImage", maxCount: 1 },
]),register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/add-counsellor/:studentId/:counsellorId").put(addCounsellorToStudent);

export default router;