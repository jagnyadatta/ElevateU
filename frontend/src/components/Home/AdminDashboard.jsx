import React, { useState } from "react";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const recentCounsellors = [
    { name: "Counsellor A", email: "a@example.com" },
    { name: "Counsellor B", email: "b@example.com" },
    { name: "Counsellor C", email: "c@example.com" },
  ];

  const recentUsers = [
    { name: "User X", email: "x@example.com" },
    { name: "User Y", email: "y@example.com" },
    { name: "User Z", email: "z@example.com" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#3b66ff] text-white flex flex-col p-6 space-y-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <button onClick={() => setActivePage("dashboard")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Dashboard</button>
        <button onClick={() => setActivePage("users")} className="hover:bg-blue-700 p-3 rounded-lg text-left">User Manage</button>
        <button onClick={() => setActivePage("counsellors")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Counsellor Manage</button>
        <button onClick={() => setActivePage("admins")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Admin Manage</button>
        <button onClick={() => setActivePage("settings")} className="hover:bg-blue-700 p-3 rounded-lg text-left">Settings</button>
        <button className="hover:bg-red-500 p-3 rounded-lg text-left mt-auto">Signout</button>
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
                <h2 className="text-gray-500 text-sm">Number of Users</h2>
                <p className="text-2xl font-bold mt-2">1,200</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-gray-500 text-sm">Number of Counsellors</h2>
                <p className="text-2xl font-bold mt-2">150</p>
              </div>
            </div>

            {/* Recent Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Counsellors */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">Recent Counsellors</h3>
                <ul className="space-y-4">
                  {recentCounsellors.map((c, index) => (
                    <li key={index} className="flex justify-between text-gray-700">
                      <span>{c.name}</span>
                      <span className="text-sm text-gray-400">{c.email}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Users */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#3b66ff] mb-4">Recent Users</h3>
                <ul className="space-y-4">
                  {recentUsers.map((u, index) => (
                    <li key={index} className="flex justify-between text-gray-700">
                      <span>{u.name}</span>
                      <span className="text-sm text-gray-400">{u.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Placeholder for other pages */}
        {activePage === "users" && (
          <h2 className="text-3xl font-bold text-[#3b66ff]">Manage Users Page</h2>
        )}
        {activePage === "counsellors" && (
          <h2 className="text-3xl font-bold text-[#3b66ff]">Manage Counsellors Page</h2>
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
