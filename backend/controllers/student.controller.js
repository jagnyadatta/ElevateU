import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { Student } from "../models/student.model.js";

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
  
      const user = await Student.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User is already exist with this email!",
          success: false,
        });
      }

      // Check if phone number already exists
      const existingUserByPhone = await Student.findOne({ phoneNumber });
      if (existingUserByPhone) {
        return res.status(400).json({
          message: "Phone number already registered!",
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
        role: user.role,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      user = {
        name: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
  
      return res.status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
        })
        .json({
            message: `Welcome back ${user.fullname}`,
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