import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { Student } from "../models/student.model.js";
import { counsellorPerson } from "../models/counsellor.model.js";

export const register = async (req, res) => {
    try {
      const { name, email, gender, phoneNumber, password, about } = req.body;
      if (!name || !email || !gender || !phoneNumber || !password || !about) {
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
      const existingPhone1 = await Student.findOne({ phoneNumber });
      if (existingPhone1) {
        return res.status(400).json({
          message: "Phone number already registered with another user!",
          success: false,
        });
      }

    const existingPhone2 = await counsellorPerson.findOne({ phoneNumber });
    if (existingPhone2) {
      return res.status(400).json({
        message: "Phone number already registered by COUNSELLOR!",
        success: false,
      });
    }
      
      const files = req.files;
      const profileImageUrl = files.profileImage[0].path;
      const slug = uuidv4();

      const hashedPassword = await bcrypt.hash(password, 10);
      await Student.create({
        name,
        email,
        gender,
        phoneNumber,
        password: hashedPassword,
        about,
        profileImage: profileImageUrl,
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
  
  //For Login
  export const login = async (req, res) => {
    try {
      const { email, password} = req.body;
      if (!email || !password ) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      let user = await Student.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }

      const isPasswordMatch = bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }

      //token data
      const tokenData = {
        userId: user._id,
        role: user.role,
      };
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        counsellorList: user.counsellorList,
      };

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
  
  //For Logout
  export const logout = async (req, res) => {
    try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logged out Successfully.",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };


  export const addCounsellorToStudent = async (req, res) => {
    try {
      const { studentId, counsellorId } = req.params;
  
      if (!studentId || !counsellorId) {
        return res.status(400).json({
          message: "Student ID and Counsellor ID are required",
          success: false,
        });
      }
  
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({
          message: "Student not found",
          success: false,
        });
      }
  
      const counsellor = await counsellorPerson.findById(counsellorId);
      if (!counsellor) {
        return res.status(404).json({
          message: "Counsellor not found",
          success: false,
        });
      }
  
      // ✅ Check if counsellor already exists
      const counsellorAlreadyExists = student.counsellorList.some(
        (item) => item.counsellorId.toString() === counsellorId
      );
      if (counsellorAlreadyExists) {
        return res.status(400).json({
          message: "Counsellor already added.",
          success: false,
        });
      }
  
      // ✅ Push counsellor to student
      student.counsellorList.push({
        counsellorId: counsellor._id,
        name: counsellor.name,
        profileImage: counsellor.profileImage,
      });
  
      // ✅ Check if student already exists
      const studentAlreadyExists = counsellor.studentList.some(
        (item) => item.studentId.toString() === studentId
      );
      if (studentAlreadyExists) {
        return res.status(400).json({
          message: "Student already added.",
          success: false,
        });
      }
  
      // ✅ Push student to counsellor
      counsellor.studentList.push({
        studentId: student._id,
        name: student.name,
        profileImage: student.profileImage,
      });
  
      await student.save();
      await counsellor.save();
  
      return res.status(200).json({
        message: "Counsellor added successfully to student",
        success: true,
        counsellorList: student.counsellorList,
      });
    } catch (error) {
      console.log("Error in addCounsellorToStudent:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };
  
  