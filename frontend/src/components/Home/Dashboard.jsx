import React, { useState } from "react";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const userData = {
    name: "John Doe",
    college: "MIT - Massachusetts Institute of Technology",
    age: 25,
    gender: "Male",
    phone: "+1 234 567 890",
    email: "john.doe@example.com",
    location: "Cambridge, MA, USA",
    image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
  };

  const counsellors = [
    { name: "Counsellor 1", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Counsellor 2", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Counsellor 3", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Counsellor 4", image: "https://randomuser.me/api/portraits/men/4.jpg" },
  ];

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Reset message
  };

  return (
    <div className="flex">
      {/* Left Navbar */}
      <div className="w-[250px] bg-[#3b66ff] text-white p-6 h-screen flex flex-col justify-between sticky top-0">
        <h2 className="text-2xl font-bold mb-6">NavBar</h2>
        <ul className="space-y-6">
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${activePage === "dashboard" ? "bg-[#4f85f7]" : ""}`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${activePage === "message" ? "bg-[#4f85f7]" : ""}`}
            onClick={() => setActivePage("message")}
          >
            Message
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${activePage === "counsellor" ? "bg-[#4f85f7]" : ""}`}
            onClick={() => setActivePage("counsellor")}
          >
            Counsellor List
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${activePage === "settings" ? "bg-[#4f85f7]" : ""}`}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </li>
          <li
            className="cursor-pointer p-2 rounded-md hover:bg-[#4f85f7]"
          >
            Signout
          </li>
        </ul>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 p-6">
        {activePage === "dashboard" && (
          <div className="flex space-x-6  h-full justify-evenly items-center">
            <div className="flex flex-col space-y-4 ">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p><strong>College:</strong> {userData.college}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Location:</strong> {userData.location}</p>
            </div>
            <div className="w-[450px] h-full flex justify-center items-center">
              <img
                src={userData.image}
                alt="User"
                className="w-60 h-60  object-cover rounded-2xl "
              />
            </div>
          </div>
        )}

        {activePage === "message" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Messages</h3>
            <div className="space-y-4">
              {counsellors.map((counsellor, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={counsellor.image}
                    alt={counsellor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{counsellor.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {activePage === "counsellor" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Counsellor List</h3>
            <div className="space-y-4 overflow-y-auto max-h-[400px]">
              {counsellors.map((counsellor, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={counsellor.image}
                    alt={counsellor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{counsellor.name}</span>
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
              <input type="text" value={userData.name} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

              <label className="block">Email</label>
              <input type="email" value={userData.email} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

              <label className="block">Phone</label>
              <input type="text" value={userData.phone} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

              <label className="block">Location</label>
              <input type="text" value={userData.location} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
