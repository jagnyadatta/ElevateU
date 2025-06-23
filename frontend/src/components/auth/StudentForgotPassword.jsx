import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { STUDENT_API_END_POINT } from "@/utils/constant";
import Loader from "../ui/Loader";

const StudentForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'reset'
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email");

    try {
        setLoader(true);
      const res = await axios.post(
        `${STUDENT_API_END_POINT}/forgot/send-otp`,
        { email }
      );
      if (res.data.success) {
        toast.success("OTP sent to your email");
        setStep("otp");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "User not found!");
    } finally{
        setLoader(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP");

    try {
        setLoader(true);
      const res = await axios.post(
        `${STUDENT_API_END_POINT}/forgot/verify-otp`,
        { email, otp }
      );
      if (res.data.success) {
        toast.success("OTP verified!");
        setStep("reset");
      }
    } catch (error) {
      toast.error("Invalid or expired OTP");
    } finally{
        setLoader(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill both password fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
        setLoader(true);
      const res = await axios.post(
        `${STUDENT_API_END_POINT}/forgot/Update-password`,
        {
          email,
          password: newPassword,
        }
      );
      if (res.data.success) {
        toast.success("Password updated. Check your email.");
        setStep("done");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
        setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Forgot Password
        </h2>

        {step === "email" && (
          <>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 mt-2"
            />
            <Button
              onClick={handleSendOtp}
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#6072b4] active:bg-black cursor-pointer outline:none"
            >
              Send OTP
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <Label>Enter OTP</Label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 mt-2"
            />
            <Button
              onClick={handleVerifyOtp}
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#6072b4] active:bg-black cursor-pointer outline:none"
            >
              Verify OTP
            </Button>
          </>
        )}

        {step === "reset" && (
          <>
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-3 mt-2"
            />
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4 mt-2"
            />
            <Button
              onClick={handleUpdatePassword}
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#6072b4] active:bg-black cursor-pointer outline:none"
            >
              Update Password
            </Button>
          </>
        )}

        {step === "done" && (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">
              ✅ Password updated successfully.
            </p>
            <Link to="/choicelogin" className="text-blue-600 underline">
              Go to Login
            </Link>
          </div>
        )}
        {loader && (
          <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentForgotPassword;
