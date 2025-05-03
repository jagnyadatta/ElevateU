import {Message} from "../models/message.model.js";

const users = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      users.set(userId, socket.id);
    });

    socket.on("send-message", async ({ senderId, receiverId, content }) => {
      try {
        const message = new Message({
          sender: senderId,
          receiver: receiverId,
          content,
        });
        await message.save();

        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-message", message);
        }
      } catch (error) {
        console.error("Message save error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const [userId, socketId] of users) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });
};
