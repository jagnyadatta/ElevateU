import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { counsellorPerson } from "../models/counsellor.model.js";
import { Student } from "../models/student.model.js";
import { sendRegistrationSuccessEmailCounsellor } from "../utils/sendMail.js";

//REGISTER FUNCTION
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

    // Check if phone number already exists
    const existingPhone1 = await counsellorPerson.findOne({ phoneNumber });
    if (existingPhone1) {
      return res.status(400).json({
        message: "Phone number already registered with another user!",
        success: false,
      });
    }

    const existingPhone2 = await Student.findOne({ phoneNumber });
    if (existingPhone2) {
      return res.status(400).json({
        message: "Phone number already registered by STUDENT!",
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

    await sendRegistrationSuccessEmailCounsellor(email, name);

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

//LOGIN FUNCTION
export const login = async (req, res) => {
    try {
      const { email, password} = req.body;
      if (!email || !password ) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      let user = await counsellorPerson.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }

      //token data
      const tokenData = {
        userId: user._id,
      };
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      // user = {
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   role: user.role,
      //   profileImage: user.profileImage,
      //   studentList: user.studentList
      // };

      const firstName = user.name.split(' ')[0];
  
      return res.status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
        })
        .json({
            message: `Welcome back ${firstName}`,
            user,
            success: true,
          });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

  export const getProfile = async (req, res)=>{
    try {
      const { slug} = req.body;
      if (!slug ) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      let user = await counsellorPerson.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Cannot find User!",
          success: false,
        });
      }
      return res.status(200)
        .json({
          message: `User found and this is ${firstName}`,
          user,
          success: true,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }

  export const insertData = async (req, res) => {
    try {
      const { data } = req.body;
  
      if (!Array.isArray(data)) {
        return res.status(400).json({ message: "Invalid data format. Must be array." });
      }
  
      const inserted = await counsellorPerson.insertMany(data, { ordered: false });
      res.status(201).json({ message: "Inserted successfully", count: inserted.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Insert failed", error: err });
    }
  }

  export const fetchAllData = async (req,res)=>{
    try {
      const allUser = await counsellorPerson.find({});
      // console.log(allUser);
      res.status(200).json({ message: "fetch successfully",allUser, success: true });
    } catch (error){
      console.error(error);
      res.status(500).json({ message: "Internal server problem!", success: false });
    }
  }