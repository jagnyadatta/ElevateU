import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./sockets/socket.js";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import studentRoute from "./routes/student.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpGenRoute from "./routes/auth.route.js";
import counsellorRoute from "./routes/counsellor.route.js";
import findUserRoute from "./routes/findUser.route.js";
import messageRoute from "./routes/message.route.js";
import adminRoute from "./routes/admin.route.js";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// }; 

// // // socket connection
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

const corsOptions = {
  origin: "https://elevateu-frontend.onrender.com",
  credentials: true,
}; 

const io = new Server(server, {
  cors: {
    origin: "https://elevateu-frontend.onrender.com",
    credentials: true,
  },
});

socketHandler(io);

app.use(cors(corsOptions));

//API's here
app.use("/elevateu/v1/otp", otpGenRoute);
app.use("/elevateu/v1/user", findUserRoute);
app.use("/elevateu/v1/student", studentRoute);
app.use("/elevateu/v1/counsellor",counsellorRoute);
app.use("/elevateu/v1/chat", messageRoute);
app.use("/elevateu/admin", adminRoute);

app.get("/", (req, res)=>{
  return res.status(200).json({
    message: "I am from backend",
    success: true
  });
});

setInterval(() => {
  fetch("https://elevateu-backend.onrender.com")
    .then(() => console.log("⏰ Backend self-ping to prevent sleep"))
    .catch((err) => console.error("❌ Self-ping failed:", err));
}, 13 * 60 * 1000); // every 14 minutes

server.listen(PORT, () => {
  connectDB();
  console.log(`App listening on port ${PORT}`);
});