import mongoose from "mongoose";
import { counsellorPerson } from "../models/counsellor.model.js";
import { Student } from "../models/student.model.js";
import { sendVerificationSuccessEmail } from "../utils/sendMail.js";

export const findAllStudents = async (req, res)=>{
    try {
        const allStudnts = await Student.find({});
        // console.log(allStudnts);
        if (allStudnts) {
            return res.status(200).json({
              message: "Fetched all students data.",
              allStudnts,
              success: true,
            });
        }
        return res.status(404).json({
            message: "No Accounts is Found!",
            success: false,
        });
    } catch (error) {
        console.log(error);
    }
}

export const findAllCounsellors = async (req, res)=>{
    try {
        const AllCounsellors = await counsellorPerson.find({});
        // console.log(allStudnts);
        if (AllCounsellors) {
            return res.status(200).json({
              message: "Fetched all counsellors data.",
              AllCounsellors,
              success: true,
            });
        }
        return res.status(404).json({
            message: "No Accounts is Found!",
            success: false,
        });
    } catch (error) {
        console.log(error);
    }
}

// ✅ GET a single counsellor by ID
export const getCounsellorById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format",
        success: false,
      });
    }

    const counsellor = await counsellorPerson.findById(id);
    if (!counsellor) {
      return res.status(404).json({
        message: "Counsellor not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Counsellor fetched successfully",
      counsellor,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching counsellor by ID:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ✅ Approve a pending counsellor
export const approveCounsellor = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await counsellorPerson.findByIdAndUpdate(
      id,
      { verification: "approved" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Counsellor not found",
        success: false,
      });
    }

    // ✉️ Send email
    await sendVerificationSuccessEmail(updated.email, updated.name);

    res.status(200).json({
      message: "Counsellor approved successfully",
      success: true,
      counsellor: updated,
    });
  } catch (error) {
    console.error("Error approving counsellor:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};