import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, password, role } = req.body;
      if (!fullname || !email || !phoneNumber || !password || !role) {
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
  
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User is already exist with this email!",
          success: false,
        });
      }

      // Check if phone number already exists
      const existingUserByPhone = await User.findOne({ phoneNumber });
      if (existingUserByPhone) {
        return res.status(400).json({
          message: "Phone number already registered!",
          success: false,
        });
      }
      
      const hashedPassoword = await bcrypt.hash(password, 10);
      await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassoword,
        role,
      });
  
      return res.status(201).json({
        message: "Account is created Successfully.",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //For Login
  export const login = async (req, res) => {
    try {
      const { email, password, role} = req.body;
      if (!email || !password || !role) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }

      // Check if role matches
      if (user.role !== role) {
        return res.status(400).json({
          message: `Incorrect role selected. Please login as a ${user.role}.`,
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
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
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