import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BackgroundImage from "../shared/BackgroundImage";

const LoginChoice = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!role) {
      toast.error("Please Select a option.");
    } else {
      if(role === "student"){
        navigate("/student/login");
      }else{
        navigate("/counsellor/login");
      }
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen  relative z-10">
      <div className="w-[80%] h-[60%] sm:w-[50%] sm:h-[50%] bg-white dark:bg-white/20 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-[20px] sm:text-3xl text-[#3b66ff] font-bold mb-6">Want to Login for...</h1>
        <div className="flex justify-evenly text-[18px] sm:text-2xl items-center mb-6">
          <label className="mt-2 font-semibold">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2 w-4 h-4 sm:w-5 sm:h-5 hover:cursor-pointer"
            />
            Student
          </label>

          <label className="mt-2 font-semibold">
            <input
              type="radio"
              name="role"
              value="counsellor"
              checked={role === "counsellor"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2 w-4 h-4 sm:w-5 sm:h-5 hover:cursor-pointer"
            />
            Counsellor
          </label>
        </div>

        <button
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full mt-8 hover:cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
    <BackgroundImage/>
    </>
  );
};

export default LoginChoice;
