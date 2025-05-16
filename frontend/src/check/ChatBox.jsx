import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { BACKEND_API_END_POINT, CHAT_API_END_POINT, FIND_USER_API_END_POINT } from "@/utils/constant";
import Loader from "@/components/ui/Loader";

// const socket = io("http://localhost:8080"); // Adjust your backend port

const ChatBox = ({senderId, receiverId}) => {
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [currUser, setCurrUser] = useState({});
  const socketRef = useRef();
  const messagesEndRef = useRef(null); 

  // console.log(senderId, receiverId);

  useEffect(() => {
    // Establish socket connection
    socketRef.current = io(BACKEND_API_END_POINT); // update if needed
    const socket = socketRef.current;
    socket.emit("register", senderId);

    socket.emit("join", { senderId, receiverId });

    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const user = await axios.post(`${FIND_USER_API_END_POINT}/find`, {_id: receiverId}, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const check = user.data;
        if (check.success) {
          if (check.user1) {
            setCurrUser(check.user1);
          }
          if (check.user2) {
            setCurrUser(check.user2);
          }
        }
        const res = await axios.get(`${CHAT_API_END_POINT}/${senderId}/${receiverId}`);
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };

    fetchMessages();

    // Receive message
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const messageData = {
      senderId,
      receiverId,
      content: newMsg,
      createdAt: new Date().toISOString(),
    };

    // Emit to socket
    socketRef.current.emit("send-message", messageData);

    // Update local state
    setMessages((prev) => [...prev, messageData]);
    setNewMsg("");
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    // Scroll to the last message
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    console.log("Updated currUser:", currUser);
  }, [currUser]);

  if(loader){
    return(
      <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-xl shadow-lg w-full h-full">
      <div className="flex items-center gap-4 mb-4 border-b pb-3">
        <img
          src={currUser.profileImage||"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"}
          alt="profile_img"
          className="w-12 h-12 border-2 border-blue-700 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold text-[#152972]">{currUser.name || "counsellor"}</h2>
        <p className="text-right text-red-500">({currUser.role})</p>
      </div>

      <div className="h-[80%] overflow-y-auto border p-3 mb-4">
        {messages.map((msg, i) => (
          <div
          key={i}
          className={`mb-2 flex ${(msg.sender === senderId || msg.senderId === senderId) ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm whitespace-pre-wrap ${
              (msg.sender === senderId || msg.senderId === senderId)
                ? "bg-blue-500 text-white"
                : "bg-green-400 text-white"
            }`}
          >
            {msg.content}
            <div className="text-[10px] text-right opacity-70 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        
        ))}
        {/* Div to trigger scrolling to the bottom */}
        <div ref={messagesEndRef} />
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
