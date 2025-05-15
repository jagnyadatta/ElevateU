import { counsellorPerson } from "../models/counsellor.model.js";
import { Student } from "../models/student.model.js";

export const findUser = async (req, res) => {
    try {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }

        const user1 = await counsellorPerson.findOne({ _id });
        if (user1) {
          return res.status(200).json({
            message: "Found user is COUNSELLOR!",
            user1,
            success: true,
          });
        }

        const user2 = await Student.findOne({ _id });
        if (user2) {
          return res.status(200).json({
            message: "Found user is STUDENT!",
            user2,
            success: true,
          });
        }
  
      return res.status(404).json({
        message: "Account Not Found!",
        success: false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

export const findIndivisual = async (req, res) => {
    try {
      const { id } = req.params;
        const user = await counsellorPerson.findOne({ _id: id });
        // console.log(user);
        if (user) {
          return res.status(200).json({
            message: "Found user is COUNSELLOR!",
            user,
            success: true,
          });
        }
  
        return res.status(404).json({
          message: "Account Not Found!",
          success: false,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
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