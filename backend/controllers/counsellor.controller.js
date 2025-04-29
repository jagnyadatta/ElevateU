import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { counsellorPerson } from "../models/counsellor.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, gender, phoneNumber, password, collegeName, branch, examName, rank, passoutYear, about, registrationNumber } = req.body;
    if (!name || !email || !gender || !phoneNumber || !password || !collegeName || !branch || !examName || !rank || !passoutYear || !about || !registrationNumber ) {
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

    const files = req.files;
    const profileImageUrl = files.profileImage[0].path;
    const collegeIdCardImageUrl = files.collegeIdCard[0].path;
    const rankCardImageUrl = files.rankCard[0].path;

    const slug = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);
    await counsellorPerson.create({
      name,
      email,
      gender,
      phoneNumber,
      password: hashedPassword,
      collegeName,
      branch,
      examName,
      rank,
      passoutYear,
      about,
      registrationNumber,
      profileImage: profileImageUrl,
      collegeIdCard: collegeIdCardImageUrl,
      rankCard: rankCardImageUrl,
      slug,
    });

    return res.status(201).json({
      message: "Account is created Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
