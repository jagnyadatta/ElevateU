import ChatBox from "@/check/ChatBox";
import { FIND_USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AleartLogin from "../ui/AleartLogin";
import { setUser } from '@/redux/authSlice';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedCounsellorIndex, setSelectedCounsellorIndex] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const [reloadDashboard, setReloadDashboard] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [receiverId, setReceiverId] = useState("");
  const senderId = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
          dispatch(setUser(check.user1));
        }
        if (check.user2) {
          setCurrUser(check.user2);
          dispatch(setUser(check.user2));
        }
      }
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };

  const counsellors = Array.isArray(user?.counsellorList) ? user.counsellorList.map(Object) : [];
  // console.log(counsellors);

  const handleChat = (index, id) =>{
    setSelectedCounsellorIndex(index);
    setReceiverId(id);
  }

  const handleLogout = async () =>{
    try {
      const res = await axios.get(`${FIND_USER_API_END_POINT}/v1/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logout failed.");
    }
  }

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [reloadDashboard]);

  useEffect(() => {
    if (location.state?.reload) {
      setReloadDashboard(true);
    }
  }, [location]);

  if (!user) {
    return (
      <AleartLogin/>
    ) 
  }

  return (
    <div className="flex">
      {/* Fixed Left Navbar */}
      <div className="w-[250px] bg-[#3b66ff] text-white p-6 h-screen fixed top-0 left-0 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-6">STUDENT</h2>
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
              activePage === "counsellor" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("counsellor")}
          >
            Counsellor List
          </li>
          <li
            className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
              activePage === "settings" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </li>
          <li className="cursor-pointer p-2 rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
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
                    <span className="font-semibold">Name:</span> {user?.name}
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span>{" "}
                    {user?.gender}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {user?.phoneNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {user?.email}
                  </div>
                </div>
              </div>
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={user?.profileImage}
                  alt="User"
                  className="w-60 h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
                />
              </div>
            </div>
          </div>
        )}

        {activePage === "message" && (
          <div className="flex w-full h-screen bg-white overflow-hidden">
            {/* Left: Fixed Width Counsellor List */}
            <div className="w-[400px] bg-white border-r overflow-y-auto">
              <h3 className="text-2xl font-bold py-4 px-4 text-[#3b66ff] sticky top-0 bg-white z-10 border-b">
                Messages
              </h3>
              {counsellors.map((counsellor, index) => (
                <div
                  key={index}
                  onClick={()=>handleChat(index, counsellor.counsellorId)}
                  className={`flex items-center space-x-4 p-3 cursor-pointer transition rounded-md ${
                    selectedCounsellorIndex === index
                      ? "bg-[#dbe4ff]"
                      : "hover:bg-[#f0f4ff]"
                  }`}
                >
                  <img
                    src={counsellor.profileImage}
                    alt={counsellor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-medium">{counsellor.name}</span>
                </div>
              ))}
            </div>

            {/* Right: Full Width ChatBox */}
            {
              receiverId ? (
                <div className="flex-1">
                  <ChatBox senderId={senderId} receiverId={receiverId} />
                </div>
              ): (
                <div className="w-full flex items-center justify-center">
                  <p className="text-red-500 font-bold text-xl">No Chat is selected!.</p>
                </div>
              )
            }
            
          </div>
        )}

        {activePage === "counsellor" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Counsellor List</h3>
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              {counsellors.map((counsellor, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={counsellor.profileImage}
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
              <input
                type="text"
                value={user?.name}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Email</label>
              <input
                type="email"
                value={user?.email}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">Phone</label>
              <input
                type="text"
                value={user?.phoneNumber}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />

              <label className="block">College</label>
              <input
                type="text"
                value={user?.college}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
