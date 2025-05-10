import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CounsellorVerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4ff] px-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#ff3b3b] mb-4">
          Your Account is Under Verification
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for registering as a counsellor. Our team is currently reviewing your details to ensure quality and trust within our platform.
        </p>
        <ul className="list-disc list-inside text-left text-gray-600 space-y-2 mb-6">
          <li>Verification may take up to <span className="font-semibold text-[#3b66ff]">24 hours</span>.</li>
          <li>You will be notified via email once your account is approved.</li>
          <li>In the meantime, you can explore our platform as a student or review your submitted details.</li>
        </ul>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-[#3b66ff] hover:bg-[#5d7fff] text-white px-6 py-2 rounded-full cursor-pointer"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default CounsellorVerificationPending;
