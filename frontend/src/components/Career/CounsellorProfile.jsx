import React from 'react';
import { MapPin, Briefcase, GraduationCap, MessageCircle } from 'lucide-react'; // Import Lucide icons
const CounsellorProfile = () => {
  const concernsList = [
    "Career Guidance",
    "Internship Tips",
    "Resume Review",
    "Interview Preparation",
    "Higher Studies Advice",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
    "Personal Development",
  ];

  return (
    <div className="flex min-h-screen p-6 pl-[400px] mt-[50px]">
      {/* Left Fixed Profile Section */}
      <div className="w-[350px] fixed top-[70px] left-6 bg-white p-6 rounded-2xl shadow-lg h-[80vh]">
      <div className="flex flex-col items-center">
        <img
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">John Doe</h2>

        {/* Icons with text */}
        <div className="mt-4 space-y-2 text-gray-600 text-center">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span className="text-start">Software Engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <span className="text-start">New York, USA</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            <span className="text-start">MIT - Massachusetts Institute of Technology</span>
          </div>
        </div>

        {/* Buttons */}
        <button className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
          Continue With John
        </button>
        <button className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Send Message
        </button>
      </div>
    </div>

      {/* Right Scrollable Content Section */}
      <div className="flex-1 pl-8">
        {/* About Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-gray-700">
            John is a passionate software engineer with 5+ years of experience in full-stack development.
            He loves mentoring students and helping them shape their career paths.
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Working Experience</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Senior Developer at Google</li>
            <li>Software Engineer at Facebook</li>
            <li>Intern at Amazon</li>
          </ul>
        </div>

        {/* College Reviews Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">College From</h3>
          <p className="text-gray-700">Graduated from MIT (Massachusetts Institute of Technology)</p>

          <h4 className="text-lg font-semibold mt-4">Reviews:</h4>
          <p className="text-gray-600">
            "MIT provided me with a strong foundation in both theoretical and practical aspects of software development."
          </p>
        </div>

        {/* Student Concern Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Make Student Concern With John</h3>
          <ul className="list-disc list-inside text-gray-700">
            {concernsList.map((concern, index) => (
              <li key={index}>{concern}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CounsellorProfile;
