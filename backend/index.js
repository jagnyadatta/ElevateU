import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpGenRoute from "./routes/auth.route.js";

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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/otp", otpGenRoute);

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "I am from backend",
        success: true
    });
});

app.listen(PORT, () => {
    connectDB();
  console.log(`App listening on port ${PORT}`);
});