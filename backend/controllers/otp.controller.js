import { Student } from "../models/student.model.js";
import {counsellorPerson} from "../models/counsellor.model.js";
import { generateOtp, sendOtpEmail } from "../utils/otpGenerate.js";
import bcrypt from "bcryptjs";
import { sendPasswordUpdateEmail } from "../utils/sendMail.js";

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user1 = await Student.findOne({ email });
    if (user1) {
      return res.status(400).json({
        message: "User is already exist with this email!",
        success: false,
      });
    }
    const user2 = await counsellorPerson.findOne({ email });
    if (user2) {
      return res.status(400).json({
        message: "User is already exist as COUNSELLOR with this email!",
        success: false,
      });
    }

    const user = new Student({ email, otp: null, otpExpiry: null });

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const emailResponse = await sendOtpEmail(email, otp);

    if (emailResponse.success) {
      return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } else {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Already OTP is Verified!" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;

    //after verification temporary user deleted
    await user.deleteOne({ email });

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Resend OTP
export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      await Student.deleteOne({ email }); // Delete the temporary user
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    const newUser = new Student({ email, otp, otpExpiry });
    await newUser.save();

    const emailResponse = await sendOtpEmail(email, otp);
    if (emailResponse.success) {
      return res.status(200).json({ success: true, message: "OTP resent successfully" });
    } else {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};



//COUNSELLOR OTP SEND
export const sendOtpCounsellor = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user1 = await counsellorPerson.findOne({ email });
    if (user1) {
      return res.status(400).json({
        message: "User is already exist with this email!",
        success: false,
      });
    }

    const user2 = await Student.findOne({ email });
    if (user2) {
      return res.status(400).json({
        message: "User is already exist as STUDENT with this email!",
        success: false,
      });
    }

    const user = new counsellorPerson({ email, otp: null, otpExpiry: null });

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const emailResponse = await sendOtpEmail(email, otp);

    if (emailResponse.success) {
      return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } else {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


//VERIFY OTP FOR COUNSELLOR
export const verifyOtpCounsellor = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await counsellorPerson.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Already OTP is Verified!" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;

    //after verification temporary user deleted
    await user.deleteOne({ email });

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//RESEND OTP FOR COUNSELLOR
export const resendOtpCounsellor = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await counsellorPerson.findOne({ email });
    if (existingUser) {
      await counsellorPerson.deleteOne({ email }); // Delete the temporary user
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    const newUser = new counsellorPerson({ email, otp, otpExpiry });
    await newUser.save();

    const emailResponse = await sendOtpEmail(email, otp);
    if (emailResponse.success) {
      return res.status(200).json({ success: true, message: "OTP resent successfully" });
    } else {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// FORGOT PASSWORD - COUNSELLOR OTP SEND
export const sendForgotOtpCounsellor = async (req, res) => {
  const { email } = req.body;

  try {
    // ✅ Check if the counsellor exists
    const user = await counsellorPerson.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // ✅ Generate OTP
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // ✅ Send email
    const emailResponse = await sendOtpEmail(email, otp);

    if (emailResponse.success) {
      return res.status(200).json({ success: true, message: "OTP sent to your email" });
    } else {
      return res.status(500).json({ success: false, message: emailResponse.message });
    }

  } catch (error) {
    console.error("Error in sending OTP for forgot password:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};

// FORGOT PASSWORD - VERIFY OTP FOR COUNSELLOR
export const verifyForgotOtpCounsellor = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await counsellorPerson.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // ✅ OTP verified, clear it
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updatePasswordCounsellor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // if (newPassword !== confirmPassword) {
    //   return res.status(400).json({ success: false, message: "Passwords do not match" });
    // }

    const user = await counsellorPerson.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    // Send confirmation email
    await sendPasswordUpdateEmail(email, user?.name);

    return res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.error("Update Password Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

