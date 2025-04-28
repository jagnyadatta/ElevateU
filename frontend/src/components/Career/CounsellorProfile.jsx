import React from "react";
import { MessageCircle } from "lucide-react"; // For Message icon
import Footer from "../shared/Footer";

const CounsellorProfile = () => {
  const concernsList = [
    "Career Guidance",
    "Internship Tips",
    "Resume Review",
    "Interview Preparation",
    "Higher Studies Advice",
    "Personal Development",
  ];

  const starImage =
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png";

  return (
    <div>
      <div className="flex min-h-screen p-6 pl-[400px] mt-[50px]">
        {/* Left Fixed Profile Section */}
        <div className="w-[350px] fixed top-[70px] left-6 bg-white p-6 rounded-2xl shadow-lg h-[90vh] flex flex-col items-center justify-start">
          {/* Profile Image */}
          <img
            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover mb-4"
          />

          {/* Name below image */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">John Doe</h2>

          {/* Rank, College, Branch, Passout */}
          <div className="flex flex-col space-y-4 text-gray-700 w-full mb-6">
            <div>
              <p className="text-sm text-gray-500">Rank Number</p>
              <h2 className="text-xl font-bold">#1234</h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">College Name</p>
              <h2 className="text-lg font-semibold">
                MIT - Massachusetts Institute of Technology
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Branch Name</p>
              <h2 className="text-lg font-semibold">
                Computer Science Engineering
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Passout Year</p>
              <h2 className="text-lg font-semibold">2021</h2>
            </div>
          </div>

          {/* Two Buttons Side by Side */}
          <div className="flex w-full gap-4">
            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
              Continue
            </button>
            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 flex items-center justify-center gap-1">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Scrollable Content Section */}
        <div className="flex-1 pl-8 space-y-6">
          {/* About Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">About</h3>
            <p className="text-gray-700">
              John is a passionate software engineer with 5+ years of experience
              in full-stack development. He loves mentoring students and helping
              them shape their career paths.
            </p>
          </div>

          {/* Rating Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">Rating</h3>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={starImage}
                  alt="Star"
                  className="w-6 h-6 object-contain"
                />
              ))}
              <span className="text-gray-600 ml-2">(5.0)</span>
            </div>
          </div>

          {/* Student Concern Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">
              Make Student Concern With John
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {concernsList.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
            
          </div>
          <div className="bg-blue-500 p-6 mt-6 rounded-2xl shadow-lg">
  <Footer />
</div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorProfile;
