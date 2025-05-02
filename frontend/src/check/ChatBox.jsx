import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userType = "student"; // For demo, this can be dynamic (e.g. from login)

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: userType,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Mocked counselor auto-reply after 1 second (for demo)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: "Thank you for your message. How can I assist you?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "counselor",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 shadow-lg rounded-2xl border p-4 flex flex-col h-[500px] bg-white">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "student" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[75%] text-sm shadow-md break-words whitespace-pre-wrap ${
                msg.sender === "student"
                ? "bg-blue-500 text-white"
                : "bg-green-400 text-white"
              }`}
            >

              <div>{msg.text}</div>
              <div className="text-[10px] text-right mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
