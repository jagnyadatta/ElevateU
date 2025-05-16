import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "@/redux/adminSlice";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentCounsellors, setRecentCounsellors] = useState([]);
  const [pendingCounsellors, setPendingCounsellors] = useState([]);
  const { admin } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/students`, {
        withCredentials: true,
      });
      const check = res.data;
      if (check.success) {
        setStudents(check.allStudnts);
        const recent = [...check.allStudnts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setRecentStudents(recent);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const fetchCounsellors = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/counsellors`, {
        withCredentials: true,
      });
      const check = res.data;
      if (check.success) {
        const all = check.AllCounsellors;
        const approvedCounsellors = all.filter(
          (c) => c.verification === "approved"
        );
        setCounsellors(approvedCounsellors);
        const recent = [...approvedCounsellors]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setRecentCounsellors(recent);

        const pending = all.filter((c) => c.verification === "pending");
        setPendingCounsellors(pending);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const handleSignout = () => {
    dispatch(logoutAdmin());
    toast.success("Signed out successfully");
    navigate("/elevateu/admin/login");
  };

  useEffect(() => {
    fetchStudents();
    fetchCounsellors();
  }, []);

  useEffect(() => {
    if (!admin) {
      toast.error("You are not logged in to view admin dashboard");
      navigate("/elevateu/admin/login");
    }
  }, [admin, navigate]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [admins, setAdmins] = useState([ { name: 'adminelevateu', email: 'admin@elevateu.com', password: 'admin123' },
  { name: 'Bob Smith', email: 'bob@example.com', password: 'admin456' },
  { name: 'Charlie Lee', email: 'charlie@example.com', password: 'admin789' },]);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    setAdmins([...admins, newAdmin]);
    setNewAdmin({ name: "", email: "", password: "" });
  };

  const handleRemoveAdmin = (index) => {
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };
const userRole = "admin"; // from auth context or props

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#3b66ff] text-white flex flex-col p-6 space-y-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <button
          onClick={() => setActivePage("dashboard")}
          className="hover:bg-blue-700 p-3 rounded-lg text-left"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActivePage("students")}
          className="hover:bg-blue-700 p-3 rounded-lg text-left"
        >
          Student Manage
        </button>
        <button
          onClick={() => setActivePage("counsellors")}
          className="hover:bg-blue-700 p-3 rounded-lg text-left"
        >
          Counsellor Manage
        </button>
        <button
          onClick={() => setActivePage("admins")}
          className="hover:bg-blue-700 p-3 rounded-lg text-left"
        >
          Admin Manage
        </button>
        <button
          onClick={() => setActivePage("settings")}
          className="hover:bg-blue-700 p-3 rounded-lg text-left"
        >
          Settings
        </button>
        <button
          onClick={handleSignout}
          className="hover:bg-red-500 p-3 rounded-lg text-left mt-auto cursor-pointer"
        >
          Signout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        {activePage === "dashboard" && (
          <>
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-gray-500 text-sm">Total Revenue</h2>
                <p className="text-2xl font-bold mt-2">$25,000</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-gray-500 text-sm">Number of students</h2>
                <p className="text-2xl font-bold mt-2">{students.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-gray-500 text-sm">Number of Counsellors</h2>
                <p className="text-2xl font-bold mt-2">{counsellors.length}</p>
              </div>
            </div>

            {/* Recent Lists */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Recent Counsellors */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">
                  Recent Counsellors
                </h3>
                <ul className="space-y-4">
                  {recentCounsellors.map((c, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-700"
                    >
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-sm text-gray-400">{c.email}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Users */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">
                  Recent Students
                </h3>
                <ul className="space-y-4">
                  {recentStudents.map((u, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-700"
                    >
                      <span className="font-semibold">{u.name}</span>
                      <span className="text-sm text-gray-400">{u.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Placeholder for other pages */}
        {activePage === "students" && (
          <div>
            <h2 className="text-3xl font-bold text-[#3b66ff]">
              Manage Student Page
            </h2>
            <div className="border-b-4 border-[#b5c4fc] mt-1"></div>
            <div className="mt-2">
              <ul className="space-y-2">
                {students.map((student) => (
                  <li
                    key={student._id}
                    className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          student.profileImage ||
                          "https://via.placeholder.com/40"
                        }
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {student.name}
                      </span>
                    </div>
                    <button
                      disabled
                      className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activePage === "counsellors" && (
          <div>
            <h2 className="text-3xl font-bold text-[#3b66ff]">
              Manage Counsellors Page
            </h2>
            <div className="border-b-4 border-[#b5c4fc] mt-1"></div>
            <div className="mt-2">
              <h3 className="mt-2 mb-2 text-2xl font-semibold text-red-500">
                Pending Counsellors
              </h3>
              {pendingCounsellors.length === 0 ? (
                <p className="mt-2 text-gray-900 text-center font-semibold">
                  No Pending Counsellor.
                </p>
              ) : (
                <ul className="space-y-2">
                  {pendingCounsellors.map((counsellor) => (
                    <li
                      key={counsellor._id}
                      className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            counsellor.profileImage ||
                            "https://via.placeholder.com/40"
                          }
                          alt={counsellor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800">
                          {counsellor.name}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          navigate(
                            `/elevateu/admin/counsellor/${counsellor._id}`
                          )
                        }
                        className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-2">
              <h3 className="mt-2 mb-2 text-2xl font-semibold text-[#30aa00]">
                Approved Counsellors
              </h3>
              <ul className="space-y-2">
                {counsellors.map((counsellor) => (
                  <li
                    key={counsellor._id}
                    className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          counsellor.profileImage ||
                          "https://via.placeholder.com/40"
                        }
                        alt={counsellor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {counsellor.name}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/elevateu/admin/counsellor/${counsellor._id}`)
                      }
                      className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activePage === "admins" && (
          <div className="p-4">
            <h2 className="text-3xl font-bold text-[#3b66ff] mb-4">
              Add Admin
            </h2>

            {/* Add Admin Form */}
            <form
              onSubmit={handleAddAdmin}
              className="space-y-4 bg-white shadow-md rounded p-6 max-w-md"
            >
              <input
                type="text"
                placeholder="Name"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-[#3b66ff] text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Admin
              </button>
            </form>

            {/* Admin List */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">All Admins</h3>
              <ul className="space-y-2">
                {admins.map((admin, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded"
                  >
                    <span>
                      {admin.name} ({admin.email})
                    </span>
                    <button
                      onClick={() => handleRemoveAdmin(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activePage === "settings" && userRole === "admin" && (
  <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
    <h2 className="text-3xl font-bold text-[#3b66ff] mb-6">Settings Page</h2>
    
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter new password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#3b66ff] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </form>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
