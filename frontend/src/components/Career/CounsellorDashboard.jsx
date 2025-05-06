import ChatBox from "@/check/ChatBox";
import { FIND_USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CounsellorDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const { user } = useSelector((store) => store.auth);
  const [receiverId, setReceiverId] = useState("");
  const senderId = user.id;
  const fetchUser = async () => {
    try {
      if (!user) return;
      const res = await axios.post(`${FIND_USER_API_END_POINT}/find`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const check = res.data;
      if (check.success) {
        if (check.user1) {
          setCurrUser(check.user1);
        }
        if (check.user2) {
          setCurrUser(check.user1);
        }
      }
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };
  // console.log(currUser);

  const handleChat = (index, id) =>{
    setSelectedStudentIndex(index);
    setReceiverId(id);
  }

  const students = user?.studentList.map(Object);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div className="flex">
      {/* Fixed Left Navbar */}
      <div className="w-[250px] bg-[#3b66ff] text-white p-6 h-screen fixed top-0 left-0 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-6">COUNSELLOR</h2>
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
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex gap-10 items-center justify-between max-w-5xl w-full">
              {/* Profile Info */}
              <div className="flex flex-col space-y-4 w-full">
                <h2 className="text-3xl font-bold text-blue-600 mb-4 border-b pb-2 border-blue-300">
                  Profile Information
                </h2>
                <div className="flex flex-col gap-4 text-gray-700">
                  <div>
                    <span className="font-semibold">Name:</span>{" "}
                    <strong className="text-xl">{currUser.name}</strong>
                  </div>
                  <div>
                    <span className="font-semibold">College:</span>{" "}
                    {currUser.collegeName}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Rank:</span> {currUser.rank}
                  </div>
                  {/* <div>
                    <span className="font-semibold">Age:</span> {currUser.age}
                  </div> */}
                  <div>
                    <span className="font-semibold">Gender:</span>{" "}
                    {currUser.gender}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {currUser.phoneNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {currUser.email}
                  </div>
                </div>
              </div>
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={currUser.profileImage}
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
                  onClick={()=>handleChat(index, student.studentId)}
                  className={`flex items-center space-x-4 p-3 cursor-pointer transition rounded-md ${
                    selectedStudentIndex === index
                      ? "bg-[#dbe4ff]"
                      : "hover:bg-[#f0f4ff]"
                  }`}

                >
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-medium">{student.name}</span>
                </div>
              ))}
            </div>

            {/* Right: Full Width ChatBox */}
            <div className="flex-1">
              <ChatBox senderId={senderId} receiverId={receiverId} />
            </div>
          </div>
        )}

        {activePage === "students" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Student List</h3>
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              {students.map((student, index) => (
                <div key={index} className="flex items-center space-x-4" >
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
                value={currUser.name}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              {/* <label className="block">Email</label>
              <input
                type="email"
                value={currUser.email}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              /> */}

              <label className="block">Phone</label>
              <input
                type="text"
                value={currUser.phone}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Location</label>
              <input
                type="text"
                value={currUser.location}
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
