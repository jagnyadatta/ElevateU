import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { STUDENT_API_END_POINT, OTP_API_END_POINT } from "../../utils/constant.js"
import Footer from "../shared/Footer";
import Loader from "../ui/Loader";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: "",
    role:"",
  });
  const [isOTPRequested, setIsOTPRequested] = useState(false); // State to track OTP request
  const [isOTPVerified, setIsOTPVerified] = useState(false); // State to track OTP verification
  const [resendCooldown, setResendCooldown] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Function to send OTP to email
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    if (!input.email.endsWith("@gmail.com")) {
      toast.error("Only @gmail.com email addresses are allowed.");
      return; // Stop if email is not Gmail
    }
    console.log(OTP_API_END_POINT);
    
    try {
      setLoader(true);
      const otpRes = await axios.post(
        `${OTP_API_END_POINT}/send-otp`, 
        { email: input.email }
      );
      
      if (otpRes.data.success) {
        setIsOTPRequested(true); // Mark OTP as requested
        setResendCooldown(true);
        setCountdown(60);
        toast.success("OTP sent to your email. Please check your inbox.");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally{
      setLoader(false);
    }
  };

  // Submit form after OTP verification
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(`${STUDENT_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  //function for resend OTP
  const resendOTPHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoader(true);
      const resendRes = await axios.post(`${OTP_API_END_POINT}/resend-otp`, { email: input.email });
      if (resendRes.data.success) {
        setIsOTPRequested(true);
        setIsOTPVerified(false);
        setResendCooldown(true);
        setCountdown(60);
        toast.success("New OTP sent successfully.");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoader(false);
    }
  };

  // Function to verify OTP
  const verifyOTPHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const verifyRes = await axios.post(
        `${OTP_API_END_POINT}/verify-otp`,
        { email: input.email, otp: input.otp }
      );

      if (verifyRes.data.success) {
        setIsOTPVerified(true); // Mark OTP as verified
        toast.success("OTP verified successfully. You can now fill the form.");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally{
      setLoader(false);
    }
  };


  //useEffect for resend otp timer
  useEffect(() => {
    let timer;
    if (resendCooldown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <>
      <div className="mt-25">
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-[90%] sm:w-[70%] border border-gray-200 rounded-md p-4 my-10 container-shadow"
          >
            <h1 className="font-bold text-xl mb-5 text-[#3b66ff]">Sign Up</h1>

            <div className="my-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Jagnyadatta Dalai"
                className="mt-2"
              />
            </div>

            <div className="my-2">
              <Label>Email</Label>
              <div className="flex items-center">
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="demo123@gmail.com"
                  className="flex-1 mt-2"
                />
                {isOTPRequested ? (
                  <div className="my-2 flex flex-col items-center">
                    <Button
                      type="button"
                      onClick={resendOTPHandler}
                      disabled={resendCooldown || isOTPVerified}
                      className={`ml-2 mt-2 text-white bg-red-500 hover:bg-red-800 outline-none ${
                        isOTPVerified && "hidden"
                      }`}
                    >
                      {!isOTPVerified && "Resend"}
                    </Button>

                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={sendOTPHandler}
                    className="ml-2 mt-2 bg-blue-600 hover:bg-[#9fb4ff] active:bg-black text-white cursor-pointer"
                    disabled={isOTPRequested}
                  >
                    Send OTP
                  </Button>
                )}
              </div>
            </div>

            {!isOTPVerified && (resendCooldown && (isOTPRequested && (
              <p className="text-gray-600 text-sm mt-1 ">
                You can request a new OTP in <span className="text-red-600 font-semibold">{countdown}</span> seconds.
              </p>
            )))}

            {isOTPRequested && (
              <div className="my-2">
                <Label>Enter OTP</Label>
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={input.otp}
                    name="otp"
                    onChange={changeEventHandler}
                    placeholder="Enter OTP"
                    className="flex-1 my-2"
                  />
                  <Button
                    type="button"
                    onClick={verifyOTPHandler}
                    className={`ml-2 my-2 bg-green-600 text-white ${
                      isOTPVerified ? "cursor-not-allowed" : "bg-green-700"
                    } `}
                    disabled={isOTPVerified}
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            <div className="my-2">
              <Label>Phone No</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="7070707709"
                className="mt-2"
              />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="**********"
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#9fb4ff] outline-none cursor-pointer"
              disabled={!isOTPVerified}
            >
              Signup
            </Button>

            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
      {loader && 
        <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
          <Loader/>
        </div>
      }
      <Footer/>
    </>
  );
};

export default Signup;
