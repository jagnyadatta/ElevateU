import { counsellorPerson } from "../models/counsellor.model.js";
import { Student } from "../models/student.model.js";

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