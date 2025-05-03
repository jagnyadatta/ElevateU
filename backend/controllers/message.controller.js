import { Message } from "../models/message.model.js";

export const messageChat = async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
      const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      }).sort({ createdAt: 1 });
  
      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch messages" });
    }
}

export const createMessage = async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
  
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content,
      });
  
      await message.save();
  
      res.status(201).json({ success: true, message });
    } catch (error) {
      console.error("Message save error:", error);
      res.status(500).json({ success: false, error: "Failed to save message" });
    }
  };