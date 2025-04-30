import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import studentRoute from "./routes/student.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpGenRoute from "./routes/auth.route.js";
import counsellorRoute from "./routes/counsellor.route.js";
import findUserRoute from "./routes/findUser.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}; 
app.use(cors(corsOptions));

//API's here
app.use("/elevateu/v1/otp", otpGenRoute);
app.use("/elevateu/v1/user", findUserRoute);
app.use("/elevateu/v1/student", studentRoute);
app.use("/elevateu/v1/counsellor",counsellorRoute);

app.get("/error", (req, res)=>{
    return res.status(200).json({
        message: "I am from backend",
        success: true
    });
});

app.listen(PORT, () => {
    connectDB();
  console.log(`App listening on port ${PORT}`);
});