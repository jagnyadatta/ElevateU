import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BackgroundImage from "../shared/BackgroundImage";

const SignupChoice = () => {
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!role) {
      toast.error("Please Select a option.");
    } else {
      if(role === "student"){
        navigate("/");
      }else{
        navigate("/counsellor/signup");
      }
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen  relative z-4">
      <div className="w-[40vw] h-[40vh] bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Want to signup for...</h1>

        <div className="flex justify-evenly text-2xl items-center mb-6">
          <label className="mb-2 font-semibold">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2 w-5 h-5"
            />
            Student
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="counsellor"
              checked={role === "counsellor"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2 w-5 h-5"
            />
            Counsellor
          </label>
        </div>

        <button
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full mt-10"
        >
          Continue
        </button>
      </div>
    </div>
    <BackgroundImage/>
    </>
  );
};

export default SignupChoice;
