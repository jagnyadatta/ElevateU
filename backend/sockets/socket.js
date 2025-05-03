import {Message} from "../models/message.model.js";
const users = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      if (!users.has(userId)) {
        users.set(userId, new Set());
      }
      users.get(userId).add(socket.id);
      socket.userId = userId; // store for cleanup
    });

    socket.on("send-message", async ({ senderId, receiverId, content }) => {
      try {
        const message = new Message({ sender: senderId, receiver: receiverId, content });
        await message.save();

        const receiverSockets = users.get(receiverId);
        if (receiverSockets) {
          receiverSockets.forEach((socketId) => {
            io.to(socketId).emit("receive-message", message);
          });
        }
      } catch (error) {
        console.error("Message save error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const userId = socket.userId;
      if (userId && users.has(userId)) {
        users.get(userId).delete(socket.id);
        if (users.get(userId).size === 0) {
          users.delete(userId);
        }
      }
    });
  });
};
