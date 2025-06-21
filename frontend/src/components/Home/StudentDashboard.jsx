import ChatBox from "@/check/ChatBox";
import { FIND_USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AleartLogin from "../ui/AleartLogin";
import { setUser } from "@/redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/components/shared/ThemeContext.jsx";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [selectedCounsellorIndex, setSelectedCounsellorIndex] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const [reloadDashboard, setReloadDashboard] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [receiverId, setReceiverId] = useState("");
  const senderId = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [previewImage, setPreviewImage] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const counsellors = Array.isArray(user?.counsellorList)
    ? user.counsellorList.map(Object)
    : [];

  const handleChat = (index, id) => {
    setSelectedCounsellorIndex(index);
    setReceiverId(id);
  };

  const handleLogout = async () => {
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
  };

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

  if (!user) return <AleartLogin />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Sidebar */}
      {/* Navbar - mobile top bar & desktop sidebar */}
      <div>
        {/* Mobile Navbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-[#3b66ff] text-white p-4">
        <h2 className="text-xl font-bold">STUDENT</h2>
        <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#3b66ff] text-white px-4 py-2 space-y-2 fixed top-16 left-0 right-0 z-40 shadow-lg">
          <div
            onClick={() => {
              setActivePage("dashboard");
              setShowMobileMenu(false);
            }}
            className="cursor-pointer hover:bg-[#4f85f7] p-2 rounded"
          >
            Dashboard
          </div>
          <div
            onClick={() => {
              setActivePage("message");
              setShowMobileMenu(false);
            }}
            className="cursor-pointer hover:bg-[#4f85f7] p-2 rounded"
          >
            Message
          </div>
          <div
            onClick={() => {
              setActivePage("counsellor");
              setShowMobileMenu(false);
            }}
            className="cursor-pointer hover:bg-[#4f85f7] p-2 rounded"
          >
            Counsellor List
          </div>
          <div
            onClick={() => {
              setActivePage("settings");
              setShowMobileMenu(false);
            }}
            className="cursor-pointer hover:bg-[#4f85f7] p-2 rounded"
          >
            Settings
          </div>
         
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:bg-red-600 p-2 rounded"
          >
            Signout
          </div>
        </div>
      )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-[250px] bg-[#3b66ff] text-white p-6 h-screen fixed top-0 left-0 flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">STUDENT</h2>
          <ul className="space-y-6">
            <li
              onClick={() => setActivePage("dashboard")}
              className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
                activePage === "dashboard" ? "bg-[#4f85f7]" : ""
              }`}
            >
              Dashboard
            </li>
            <li
              onClick={() => setActivePage("message")}
              className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
                activePage === "message" ? "bg-[#4f85f7]" : ""
              }`}
            >
              Message
            </li>
            <li
              onClick={() => setActivePage("counsellor")}
              className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
                activePage === "counsellor" ? "bg-[#4f85f7]" : ""
              }`}
            >
              Counsellor List
            </li>
            <li className="cursor-pointer p-2 rounded-md hover:bg-[#4f85f7]">

             <button onClick={toggleTheme} className="">
            <span className="">{theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}</span>
          </button>
            </li>
            <li
              onClick={() => setActivePage("settings")}
              className={`cursor-pointer p-2 rounded-md hover:bg-[#4f85f7] ${
                activePage === "settings" ? "bg-[#4f85f7]" : ""
              }`}
            >
              Settings
            </li>
            <li
              onClick={handleLogout}
              className="cursor-pointer p-2 rounded-md hover:bg-red-600"
            >
              Signout
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-15 md:pt-0 md:ml-[250px]">
        {activePage === "dashboard" && (
          <div className="w-full min-h-screen bg-gradient-to-br p-4 md:p-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl w-full font-bold text-blue-600 mb-4 border-b pb-2">
              My Profile
            </h2>
            <div className="dark:bg-black rounded-3xl shadow-2xl dark:shadow-[0_4px_12px_rgba(255,255,255,0.4)] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center w-full max-w-5xl">
              <div className="flex-shrink-0">
                <img
                  src={user?.profileImage}
                  alt="User"
                  className="w-40 h-40 md:w-60 md:h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
                />
              </div>
              <div className="flex-grow space-y-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600 border-b pb-2 border-blue-300">
                  {user?.name}
                </h2>
                <div className="grid grid-cols-1 gap-2 text-gray-700 dark:text-white">
                  <div>{user?.about}</div>
                  <div>
                    <span className="font-semibold ">Gender:</span>{" "}
                    {user?.gender}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {user?.phoneNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "message" && (
          <div className="w-full h-screen dark:bg-black overflow-hidden flex flex-col md:flex-row">
            {/* 📱 Mobile: Chat List (Visible when no chat selected) */}
            {!receiverId && (
              <div className="block md:hidden w-full h-full overflow-y-auto">
                <h3 className="text-2xl font-bold py-4 px-4 text-[#3b66ff] border-b sticky top-0 bg-white z-10">
                  Messages
                </h3>
                {counsellors.map((counsellor, index) => (
                  <div
                    key={index}
                    onClick={() => handleChat(index, counsellor.counsellorId)}
                    className={`flex items-center space-x-4 p-3  cursor-pointer transition rounded-md  bg-blue-50 hover:bg-blue-100 shadow-sm  ${
                      selectedCounsellorIndex === index
                        ? "bg-[#dbe4ff]"
                        : "hover:bg-[#f0f4ff]"
                    }`}
                  >
                    <img
                      src={counsellor.profileImage}
                      alt={counsellor.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-500 shadow"
                    />
                    <span className="text-sm font-medium">
                      {counsellor.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 💬 Mobile: Chat Box (Visible when chat selected) */}
            {receiverId && (
              <div className=" md:hidden w-full h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
                  <button
                    className="text-[#3b66ff] font-semibold"
                    onClick={() => {
                      setReceiverId(null);
                      setSelectedCounsellorIndex(null);
                    }}
                  >
                    ← Back to Messages
                  </button>
                  <span className="font-semibold text-lg">
                    {counsellors[selectedCounsellorIndex]?.name}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto ">
                  <ChatBox senderId={senderId} receiverId={receiverId} />
                </div>
              </div>
            )}

            {/* 💻 Desktop View: Full Layout */}
            <div className="hidden md:flex flex-row w-full h-full">
              {/* Left Panel - Counsellor List */}
              <div className="w-[400px] dark:bg-black border-r overflow-y-auto">
                <h3 className="text-2xl font-bold py-4 px-4 text-[#3b66ff] border-b sticky top-0 z-10">
                  Messages
                </h3>
                {counsellors.map((counsellor, index) => (
                  <div
                    key={index}
                    onClick={() => handleChat(index, counsellor.counsellorId)}
                    className={`flex items-center space-x-4 p-3 cursor-pointer transition rounded-md  ${
                      selectedCounsellorIndex === index
                        ? "bg-[#dbe4ff]"
                        : "hover:bg-[#f0f4ff] hover:text-black"
                    }`}
                  >
                    <img
                      src={counsellor.profileImage}
                      alt={counsellor.name}
                      className="w-10 h-10 rounded-full  "
                    />
                    <span className="text-sm font-medium">
                      {counsellor.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Panel - Chat Box */}
              <div className="flex-1 flex items-center justify-center">
                {receiverId ? (
                  <ChatBox senderId={senderId} receiverId={receiverId} />
                ) : (
                  <p className="text-red-500 font-bold text-xl">
                    No Chat is selected!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activePage === "counsellor" && (
          <div className="w-full p-4 md:p-10 bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
              Counsellor List
            </h3>
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-4xl mx-auto">
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {counsellors.map((counsellor, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-50 hover:bg-blue-100 transition p-4 rounded-xl shadow-sm space-x-4"
                  >
                    <img
                      src={counsellor.profileImage}
                      alt={counsellor.name}
                      className="w-14 h-14 rounded-full border-2 border-blue-500 shadow"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {counsellor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {counsellor.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePage === "settings" && (
          <div className="w-full p-4 md:p-10 bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
              Edit Profile
            </h3>
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Profile Image */}
              <div className="flex flex-col items-center w-full md:w-1/3 space-y-4">
                <img
                  src={previewImage || user?.profileImage}
                  alt="Profile"
                  className="w-40 h-40 md:w-60 md:h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
                />
                <div>
                  <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="profileImageInput"
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </label>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="w-full md:w-2/3 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user?.name}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={user?.phoneNumber}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    About
                  </label>
                  <textarea
                    value={user?.about}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
