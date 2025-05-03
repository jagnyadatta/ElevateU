import ChatBox from "@/check/ChatBox";
import React, { useState } from "react";

const CounsellorDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const userData = {
    name: "John Doe",
    college: "MIT - Massachusetts Institute of Technology",
    age: 25,
    gender: "Male",
    phone: "+1 234 567 890",
    email: "john.doe@example.com",
    location: "Cambridge, MA, USA",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  const students = Array.from({ length: 40 }, (_, i) => ({
    name: `Student ${i + 1}`,
    image: `https://randomuser.me/api/portraits/women/${(i % 10) + 1}.jpg`,
  }));

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="flex">
      {/* Fixed Left Navbar */}
      <div className="w-[250px] bg-[#3b66ff] text-white p-6 h-screen fixed top-0 left-0 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-6">NavBar</h2>
        <ul className="space-y-6">
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
              activePage === "dashboard" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
              activePage === "message" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("message")}
          >
            Message
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
              activePage === "students" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("students")}
          >
            Student List
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
              activePage === "settings" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </li>
          <li className="cursor-pointer p-2 rounded-md hover:bg-[#4f85f7]">
            Signout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex ml-[250px] w-full h-[100vh]">
        {activePage === "dashboard" && (
          <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white p-10 flex justify-center items-center">
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex gap-10 items-center max-w-5xl w-full">
              {/* Profile Info */}
              <div className="flex-grow space-y-4">
                <h2 className="text-3xl font-bold text-blue-600 mb-4 border-b pb-2 border-blue-300">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <span className="font-semibold">Name:</span> {userData.name}
                  </div>
                  <div>
                    <span className="font-semibold">College:</span>{" "}
                    {userData.college}
                  </div>
                  <div>
                    <span className="font-semibold">Age:</span> {userData.age}
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span>{" "}
                    {userData.gender}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {userData.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {userData.email}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {userData.location}
                  </div>
                </div>
              </div>
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={userData.image}
                  alt="User"
                  className="w-60 h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
                />
              </div>
            </div>
          </div>
        )}

        {activePage === "message" && (
          <div className="flex w-full h-screen bg-white overflow-hidden">
            {/* Left: Fixed Width Student List */}
            <div className="w-[400px] bg-white border-r overflow-y-auto">
              <h3 className="text-2xl font-bold py-4 px-4 text-[#3b66ff] sticky top-0 bg-white z-10 border-b">
                Messages
              </h3>
              {students.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 hover:bg-[#f0f4ff] p-3 cursor-pointer transition rounded-md"
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-medium">{student.name}</span>
                </div>
              ))}
            </div>

            {/* Right: Full Width ChatBox */}
            <div className="flex-1">
              <ChatBox />
            </div>
          </div>
        )}

        {activePage === "students" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Student List</h3>
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              {students.map((student, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{student.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "settings" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Settings</h3>
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                value={userData.name}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Email</label>
              <input
                type="email"
                value={userData.email}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Phone</label>
              <input
                type="text"
                value={userData.phone}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Location</label>
              <input
                type="text"
                value={userData.location}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorDashboard;
