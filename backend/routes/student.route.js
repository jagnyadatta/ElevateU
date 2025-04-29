import express from "express";
import { login, logout, register } from "../controllers/student.controller.js";
import { resendOtp, sendOtp, verifyOtp } from '../controllers/otp.controller.js';
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);

router.route("/register").post(upload.fields([
    { name: "profileImage", maxCount: 1 },
]),register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;