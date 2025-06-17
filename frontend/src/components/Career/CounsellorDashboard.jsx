import ChatBox from "@/check/ChatBox";
import {
  COUNSELLOR_API_END_POINT,
  FIND_USER_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AleartLogin from "../ui/AleartLogin";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import EditButton from "../ui/EditButton";
import UpdateButton from "../ui/UpdateButton";

const CounsellorDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const { user } = useSelector((store) => store.auth);
  const [receiverId, setReceiverId] = useState("");
  const senderId = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotList, setSlotList] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isEditOn, setIsEditOn] = useState(false);

  const editOn = (e) => {
    setIsEditOn(true);
  };

  const handleEdit = (e) =>{
    setIsEditOn(false);
  }

  const handleSlotSubmit = (e) => {
    e.preventDefault();
    const newSlot = { date: slotDate, startTime, endTime };
    setSlotList([...slotList, newSlot]);
    // TODO: Post to backend
    setSlotDate("");
    setStartTime("");
    setEndTime("");
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

  const handleChat = (index, id) => {
    setSelectedStudentIndex(index);
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
      toast.error(error.response.data.message);
    }
  };

  const students = Array.isArray(user?.studentList)
    ? user.studentList
    : Object.values(user?.studentList || {});

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  if (!user) {
    return <AleartLogin />;
  }

  useEffect(() => {
    if (activePage === "slots") {
      // Replace with your actual endpoint
      axios
        .get(`${COUNSELLOR_API_END_POINT}/fetch-booked-slots`, {
          withCredentials: true,
        })

        .then((res) => {
          if (res.data.success) {
            setBookedSlots(res.data.slots); // adjust key as per your response
          }
        })
        .catch((err) => console.log(err));
    }
  }, [activePage]);

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
              activePage === "slots" ? "bg-[#4f85f7]" : ""
            }`}
            onClick={() => setActivePage("slots")}
          >
            Slot Booking
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
                    <strong className="text-xl">{user?.name}</strong>
                  </div>
                  <div>
                    <span className="font-semibold">College:</span>{" "}
                    {user?.collegeName}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Rank:</span> {user?.rank}
                  </div>
                  {/* <div>
                    <span className="font-semibold">Age:</span> {currUser.age}
                  </div> */}
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
            {/* Left: Fixed Width Student List */}
            <div className="w-[400px] bg-white border-r overflow-y-auto">
              <h3 className="text-2xl font-bold py-4 px-4 text-[#3b66ff] sticky top-0 bg-white z-10 border-b">
                Messages
              </h3>
              {students.map((student, index) => (
                <div
                  key={index}
                  onClick={() => handleChat(index, student.studentId)}
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

        {activePage === "students" && (
          <div className="ml-5">
            <h3 className="text-2xl font-bold mb-4">Student List</h3>
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              {students.map((student, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{student.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "slots" && (
          <div className="w-full p-10">
            <h2 className="text-2xl font-bold mb-6">Manage Time Slots</h2>
            <form
              onSubmit={handleSlotSubmit}
              className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-xl"
            >
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#3b66ff] text-white px-4 py-2 rounded"
              >
                Add Slot
              </button>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
              <ul className="space-y-2">
                {slotList.map((slot, index) => (
                  <li
                    key={index}
                    className="p-3 bg-blue-50 border border-blue-200 rounded"
                  >
                    {slot.date} - {slot.startTime} to {slot.endTime}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">
                Booked Slots by Students
              </h3>
              {bookedSlots.length > 0 ? (
                <ul className="space-y-2">
                  {bookedSlots.map((slot, index) => (
                    <li
                      key={index}
                      className="p-3 bg-red-50 border border-red-200 rounded"
                    >
                      {slot.date} - {slot.startTime} to {slot.endTime} <br />
                      <span className="text-sm text-gray-600">
                        Booked by: {slot.studentName}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No slots have been booked yet.</p>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
              <ul className="space-y-2">
                {slotList.map((slot, index) => (
                  <li
                    key={index}
                    className="p-3 bg-blue-50 border border-blue-200 rounded"
                  >
                    {slot.date} - {slot.startTime} to {slot.endTime}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activePage === "settings" && (
          <div className="ml-5">
            <h3 className="text-2xl font-bold mb-4">Settings</h3>
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                value={user?.name}
                className="w-72 p-3 mb-4 border border-gray-300 rounded-lg"
                disabled={!isEditOn}
              />

              <label className="block">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                disabled
              />

              <label className="block">Phone</label>
              <input
                type="text"
                value={user?.phoneNumber}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                disabled={!isEditOn}
              />

              {/* <label className="block">Location</label>
              <input
                type="text"
                value={currUser.location}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              /> */}
            </div>
            {/* <div> */}
              {isEditOn ? <UpdateButton handleEdit={handleEdit} /> : <EditButton editOn={editOn} />}
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorDashboard;
