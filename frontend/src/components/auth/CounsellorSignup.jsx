import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant.js";
import axios from "axios";
import { toast } from "sonner";
import Footer from "../shared/Footer";
import Loader from "../ui/Loader";

const CounsellorSignup = () => {
  const [input, setInput] = useState({
    name: "",
    collegeName: "",
    branch: "",
    examName: "",
    rank: "",
    passoutYear: "",
    about: "",
    registrationNumber: "",
    collegeIdCard: null,
    rankCard: null,
  });
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });

    try {
      setLoader(true);
      const res = await axios.post(`${USER_API_END_POINT}/student-form`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Form Submitted Successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="mt-20">
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-[90%] sm:w-[70%] border border-gray-200 rounded-md p-4 my-10 container-shadow"
          >
            <h1 className="font-bold text-xl mb-5 text-[#3b66ff]">Student Form</h1>

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
                <option value="JEE">JEE</option>
                <option value="OJEE">OJEE</option>
                <option value="NIT">NIT</option>
                <option value="MBA">MBA</option>
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
            >
              Submit Form
            </Button>
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

export default CounsellorSignup;
