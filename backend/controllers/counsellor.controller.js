import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { counsellorPerson } from "../models/counsellor.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role, collegeName, branch, examName, rank, passoutYear, about, registrationNumber, profileImage, collegeIdCard, rankCard } = req.body;
    if (!name || !email || !phoneNumber || !password || !role || !collegeName || !branch || !examName || !rank || !passoutYear || !about || !registrationNumber || !profileImage || !collegeIdCard || !rankCard) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Gmail validation
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({
        message: "Only @gmail.com email addresses are allowed.",
        success: false,
      });
    }

    const user = await counsellorPerson.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User is already exist with this email!",
        success: false,
      });
    }

    // Check if phone number already exists
    const existingUserByPhone = await counsellorPerson.findOne({ phoneNumber });
    if (existingUserByPhone) {
      return res.status(400).json({
        message: "Phone number already registered!",
        success: false,
      });
    }

    const hashedPassoword = await bcrypt.hash(password, 10);
    await counsellorPerson.create({
      name,
      email,
      phoneNumber,
      password: hashedPassoword,
      role,
      collegeName,
      branch,
      examName,
      rank,
      passoutYear,
      about,
      registrationNumber,
      profileImage,
      collegeIdCard,
      rankCard
    });

    return res.status(201).json({
      message: "Account is created Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
