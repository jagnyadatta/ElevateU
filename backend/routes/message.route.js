import express from "express";
import { createMessage, messageChat } from "../controllers/message.controller.js";

const router = express.Router();

// GET chat between two users
router.route("/:senderId/:receiverId").get(messageChat);
// POST a new message
router.route("/").post(createMessage);

export default router;
