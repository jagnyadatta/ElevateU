import { Message } from "../models/message.model.js";

const users = new Map(); // userId -> Set of socketIds

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user
    socket.on("register", (userId) => {
      if (!users.has(userId)) {
        users.set(userId, new Set());
      }
      users.get(userId).add(socket.id);
      socket.userId = userId; // Store userId on socket for disconnect cleanup
    });

    // Send a message
    socket.on("send-message", async ({ senderId, receiverId, content }) => {
      try {
        const message = new Message({
          sender: senderId,
          receiver: receiverId,
          content,
        });

        await message.save();

        const receiverSocketIds = users.get(receiverId);
        if (receiverSocketIds) {
          receiverSocketIds.forEach((socketId) => {
            io.to(socketId).emit("receive-message", message);
          });
        }
      } catch (error) {
        console.error("Message save error:", error);
      }
    });

    // Disconnect user
    socket.on("disconnect", () => {
      const { userId } = socket;
      if (userId && users.has(userId)) {
        const socketIds = users.get(userId);
        socketIds.delete(socket.id);
        if (socketIds.size === 0) {
          users.delete(userId);
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};
