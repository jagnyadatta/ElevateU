import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COUNSELLOR_API_END_POINT } from "../../utils/constant.js";
import axios from "axios";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const CounsellorSignup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    otp: "",
    collegeName: "",
    branch: "",
    examName: "",
    rank: "",
    passoutYear: "",
    about: "",
    registrationNumber: "",
    profileImage: null,
    collegeIdCard: null,
    rankCard: null,
  });
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setInput({ ...input, [name]: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // Function to send OTP to email
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    if (!input.email.endsWith("@gmail.com")) {
      toast.error("Only @gmail.com email addresses are allowed.");
      return; // Stop if email is not Gmail
    }
    console.log(COUNSELLOR_API_END_POINT);

    try {
      setLoader(true);
      const otpRes = await axios.post(`${COUNSELLOR_API_END_POINT}/send-otp`, {
        email: input.email,
      });

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
    } finally {
      setLoader(false);
    }
  };

  //function for resend OTP
  const resendOTPHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const resendRes = await axios.post(
        `${COUNSELLOR_API_END_POINT}/resend-otp`,
        { email: input.email }
      );
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
        `${COUNSELLOR_API_END_POINT}/verify-otp`,
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
    } finally {
      setLoader(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });

    try {
      setLoader(true);
      const res = await axios.post(
        `${COUNSELLOR_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
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
      <div>
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-[90%] sm:w-[70%] border border-gray-200 rounded-md p-4 my-10 container-shadow"
          >
            <h1 className="text-center font-bold text-2xl mb-5 text-[#3b66ff]">
              Counsellor Signup Form
            </h1>

            <div className="my-2">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter your name"
                className="mt-2"
                required
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

            {!isOTPVerified && resendCooldown && isOTPRequested && (
              <p className="text-gray-600 text-sm mt-1 ">
                You can request a new OTP in{" "}
                <span className="text-red-600 font-semibold">{countdown}</span>{" "}
                seconds.
              </p>
            )}

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
              <Label>Gender</Label>
              <select
                name="gender"
                value={input.gender}
                onChange={changeEventHandler}
                className="w-full p-2 border border-[#3b66ff] mt-2 rounded-md focus:outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

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

            <div className="my-2">
              <Label>Current College Name</Label>
              <Input
                type="text"
                name="collegeName"
                value={input.collegeName}
                onChange={changeEventHandler}
                placeholder="Enter your college name"
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>Branch</Label>
              <Input
                type="text"
                name="branch"
                value={input.branch}
                onChange={changeEventHandler}
                placeholder="Enter your branch"
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>Select Exam</Label>
              <select
                name="examName"
                value={input.examName}
                onChange={changeEventHandler}
                className="w-full p-2 border border-[#3b66ff] mt-2 rounded-md focus:outline-none"
                required
              >
                <option value="">Select Exam</option>

                {/* Undergraduate Exams */}
                <option value="JEE">JEE (Engineering UG)</option>
                <option value="OJEE">OJEE (State UG Entrance)</option>
                <option value="NEET">NEET (Medical UG)</option>
                <option value="BITSAT">BITSAT (Engineering UG)</option>
                <option value="VITEEE">VITEEE (Engineering UG)</option>
                <option value="SRMJEEE">SRMJEEE (Engineering UG)</option>
                <option value="CUET UG">CUET UG (Central Universities)</option>
                <option value="CLAT">CLAT (Law UG)</option>
                <option value="AILET">AILET (Law UG)</option>
                <option value="NDA">NDA (Defense UG)</option>
                <option value="IPU CET">IPU CET (Various UG Courses)</option>
                <option value="NIFT">NIFT (Fashion Design UG)</option>
                <option value="NID">NID (Design UG)</option>
                <option value="ICAR UG">ICAR AIEEA UG</option>

                {/* Postgraduate Exams */}
                <option value="GATE">GATE (Engineering PG)</option>
                <option value="CAT">CAT (MBA PG)</option>
                <option value="MAT">MAT (MBA PG)</option>
                <option value="XAT">XAT (MBA PG)</option>
                <option value="CMAT">CMAT (MBA PG)</option>
                <option value="GRE">GRE (International PG)</option>
                <option value="GMAT">GMAT (MBA International)</option>
                <option value="NET">UGC NET (PG/PhD)</option>
                <option value="IIT JAM">IIT JAM (MSc PG)</option>
                <option value="TANCET">TANCET (State PG)</option>
                <option value="AP PGCET">AP PGCET (State PG)</option>
                <option value="TS PGCET">TS PGCET (State PG)</option>
                <option value="CUET PG">CUET PG (Central Universities)</option>
                <option value="ICAR PG">ICAR AIEEA PG</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div className="my-2">
              <Label>Rank</Label>
              <Input
                type="number"
                name="rank"
                value={input.rank}
                onChange={changeEventHandler}
                placeholder="Enter your rank"
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>Passout Year</Label>
              <Input
                type="number"
                name="passoutYear"
                value={input.passoutYear}
                onChange={changeEventHandler}
                placeholder="Enter your passout year"
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>About Yourself</Label>
              <textarea
                name="about"
                value={input.about}
                onChange={changeEventHandler}
                placeholder="Tell us about yourself"
                className="w-full border border-[#3b66ff] mt-2 p-2 rounded-md focus:outline-none"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="my-2">
              <Label>College ID / Registration Number</Label>
              <Input
                type="text"
                name="registrationNumber"
                value={input.registrationNumber}
                onChange={changeEventHandler}
                placeholder="Enter your registration number"
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>Upload your profile photo</Label>
              <Input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={changeEventHandler}
                className="mt-2"
                required
              />
            </div>
            <div className="my-2">
              <Label>Upload College ID Card</Label>
              <Input
                type="file"
                name="collegeIdCard"
                accept="image/*"
                onChange={changeEventHandler}
                className="mt-2"
                required
              />
            </div>

            <div className="my-2">
              <Label>Upload Rank Card</Label>
              <Input
                type="file"
                name="rankCard"
                accept="image/*"
                onChange={changeEventHandler}
                className="mt-2"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#6072b4] active:bg-black cursor-pointer outline:none"
              disabled={!isOTPVerified}
            >
              Submit Form
            </Button>

            {!isOTPVerified && (
              <p className="text-red-600 font-semibold text-sm mt-1 ">
                You can submit this form after OTP is verified.
              </p>
            )}
          </form>
        </div>
      </div>

      {loader && (
        <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
          <Loader />
        </div>
      )}
    </>
  );
};

export default CounsellorSignup;
