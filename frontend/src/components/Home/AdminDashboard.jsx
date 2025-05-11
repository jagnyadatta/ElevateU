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

  const fetchStudents = async () =>{
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/students`,{
        withCredentials: true,
      });
      const check = res.data;
      if(check.success){
        setStudents(check.allStudnts);
        const recent = [...check.allStudnts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setRecentStudents(recent);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    }
  }

  const fetchCounsellors = async () =>{
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/counsellors`,{
        withCredentials: true,
      });
      const check = res.data;
      if(check.success){
        const all = check.AllCounsellors;
        const approvedCounsellors = all.filter(c => c.verification === "approved");
        setCounsellors(approvedCounsellors);
        const recent = [...approvedCounsellors]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setRecentCounsellors(recent);

        const pending = all.filter(c => c.verification === "pending");
        setPendingCounsellors(pending);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    }
  }

  const handleSignout = () => {
    dispatch(logoutAdmin());
    toast.success("Signed out successfully");
    navigate("/elevateu/admin/login");
  };


  useEffect(()=>{
    fetchStudents();
    fetchCounsellors();
  },[])

  useEffect(() => {
    if (!admin) {
      toast.error("You are not logged in to view admin dashboard");
      navigate("/elevateu/admin/login");
    }
  }, [admin, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#3b66ff] text-white flex flex-col p-6 space-y-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <button onClick={() => setActivePage("dashboard")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Dashboard</button>
        <button onClick={() => setActivePage("students")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Student Manage</button>
        <button onClick={() => setActivePage("counsellors")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Counsellor Manage</button>
        {/* <button onClick={() => setActivePage("admins")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Admin Manage</button> */}
        {/* <button onClick={() => setActivePage("settings")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Settings</button> */}
        <button onClick={handleSignout} className="hover:bg-red-500 p-3 rounded-lg text-left mt-auto cursor-pointer">Signout</button>
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
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">Recent Counsellors</h3>
                <ul className="space-y-4">
                  {recentCounsellors.map((c, index) => (
                    <li key={index} className="flex justify-between text-gray-700">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-sm text-gray-400">{c.email}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Users */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">Recent Students</h3>
                <ul className="space-y-4">
                  {recentStudents.map((u, index) => (
                    <li key={index} className="flex justify-between text-gray-700">
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
            <h2 className="text-3xl font-bold text-[#3b66ff]">Manage Student Page</h2>
            <div className="border-b-4 border-[#b5c4fc] mt-1"></div>
            <div className="mt-2">
              <ul className="space-y-2">
                {
                  students.map((student) => (
                    <li 
                      key={student._id} 
                      className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={student.profileImage || "https://via.placeholder.com/40"} 
                          alt={student.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800">{student.name}</span>
                      </div>
                      <button disabled className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer">
                        View
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        )}
        {activePage === "counsellors" && (
          <div>
            <h2 className="text-3xl font-bold text-[#3b66ff]">Manage Counsellors Page</h2>
            <div className="border-b-4 border-[#b5c4fc] mt-1"></div>
            <div className="mt-2">
              <h3 className="mt-2 mb-2 text-2xl font-semibold text-red-500">Pending Counsellors</h3>
              {
                pendingCounsellors.length === 0 ? (
                  <p className="mt-2 text-gray-900 text-center font-semibold">No Pending Counsellor.</p>
                ) : (
                  <ul className="space-y-2">
                    {
                      pendingCounsellors.map((counsellor) => (
                        <li 
                          key={counsellor._id} 
                          className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <img 
                              src={counsellor.profileImage || "https://via.placeholder.com/40"} 
                              alt={counsellor.name} 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-gray-800">{counsellor.name}</span>
                          </div>
                          <button 
                            onClick={() => navigate(`/elevateu/admin/counsellor/${counsellor._id}`)}
                            className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
                          >
                            View
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </div>
            <div className="mt-2">
              <h3 className="mt-2 mb-2 text-2xl font-semibold text-[#30aa00]">Approved Counsellors</h3>
              <ul className="space-y-2">
                {
                  counsellors.map((counsellor) => (
                    <li 
                      key={counsellor._id} 
                      className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={counsellor.profileImage || "https://via.placeholder.com/40"} 
                          alt={counsellor.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800">{counsellor.name}</span>
                      </div>
                      <button 
                        onClick={() => navigate(`/elevateu/admin/counsellor/${counsellor._id}`)}
                        className="px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
                      >
                        View
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        )}
        {activePage === "admins" && (
          <h2 className="text-3xl font-bold text-[#3b66ff]">Manage Admins Page</h2>
        )}
        {activePage === "settings" && (
          <h2 className="text-3xl font-bold text-[#3b66ff]">Settings Page</h2>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
