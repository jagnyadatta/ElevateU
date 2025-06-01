import ChatBox from "@/check/ChatBox";
import { FIND_USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AleartLogin from "../ui/AleartLogin";
import { setUser } from "@/redux/authSlice";
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

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // for preview
        // Optionally, upload logic or set to form state here
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
  // console.log(counsellors);

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

  if (!user) {
    return <AleartLogin />;
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
          <li
            className="cursor-pointer p-2 rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
            Signout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex ml-[250px] w-full h-[100vh]">
        {activePage === "dashboard" && (
          <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white p-10 flex flex-col justify-center items-center">
            <h2 className="text-3xl w-[82%] font-bold text-blue-600 mb-4  pb-2 left-0">
              My Profile
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex gap-10 items-center max-w-5xl w-full">
              {/* Profile Info */}

              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={user?.profileImage}
                  alt="User"
                  className="w-60 h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
                />
              </div>
              <div className="flex-grow space-y-4">
                <h2 className="text-3xl font-bold text-blue-600 mb-4 border-b pb-2 border-blue-300">
                  <span className="font-semibold uppercase"> {user?.name}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-700">
                  <div>
                    <span className="font-semibold"></span> {user?.about} 
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
                    <span className="font-semibold">Email:</span> {user?.email}
                  </div>
                </div>
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
                  onClick={() => handleChat(index, counsellor.counsellorId)}
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
            {receiverId ? (
              <div className="flex-1">
                <ChatBox senderId={senderId} receiverId={receiverId} />
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <p className="text-red-500 font-bold text-xl">
                  No Chat is selected!.
                </p>
              </div>
            )}
          </div>
        )}

        {activePage === "counsellor" && (
  <div className="w-full p-10 bg-gradient-to-br from-blue-50 to-white">
    <h3 className="text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
      Counsellor List
    </h3>

    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
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
              <p className="text-sm text-gray-500">{counsellor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


        {activePage === "settings" && (
          <div className="w-full p-10 bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
              Edit Profile
            </h3>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
              {/* Left Side – Profile Image */}
              <div className="flex flex-col items-center w-full md:w-1/3 space-y-4">
                <img
                  src={previewImage || user?.profileImage}
                  alt="Profile"
                  className="w-60 h-60 rounded-2xl object-cover border-4 border-blue-500 shadow-md"
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

              {/* Right Side – Editable Fields */}
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
