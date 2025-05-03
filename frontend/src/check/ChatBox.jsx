import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { CHAT_API_END_POINT } from "@/utils/constant";

const socket = io("http://localhost:8080"); // Adjust your backend port

const ChatBox = () => {
  const { senderId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    // Join room or initialize socket connection
    socket.emit("join", { senderId, receiverId });
  
    // Fetch previous messages from backend
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${CHAT_API_END_POINT}/${senderId}/${receiverId}`);
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
  
    fetchMessages(); // 👈 Call the fetch function
  
    // Receive message from backend
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    // Cleanup on unmount
    return () => {
      socket.off("receive-message");
    };
  }, [senderId, receiverId]);
  

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const messageData = {
      senderId,
      receiverId,
      content: newMsg,
    };

    // Emit to Socket
    socket.emit("send-message", messageData);

    // // Optional: Save message to DB
    // await axios.post(CHAT_API_END_POINT, messageData);

    // Update local state
    setMessages((prev) => [...prev, messageData]);
    setNewMsg("");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg w-[80%] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Chat with Counselor</h2>

      <div className="h-64 overflow-y-auto border p-3 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.senderId === senderId ? "text-right" : "text-left"}`}>
            <span className="inline-block bg-blue-100 px-3 py-1 rounded">
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
