import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COUNSELLOR_API_END_POINT } from "../../utils/constant.js"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import Loader from "../ui/Loader";
import CounsellorVerificationPending from "../Career/CounsellorVerificationPending";

const CounsellorLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const {user} = useSelector((store)=> store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(`${COUNSELLOR_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json  ",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        if(res.data.user.verification === "pending"){
          setIsVerified(true);
          toast.success("Your account is under verification!")
        }else{
          setIsVerified(false);
          dispatch(setUser(res.data.user));
          navigate("/");  
          toast.success(res.data.message);
        }
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally{
      setLoader(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  if(isVerified){
    return(
      <CounsellorVerificationPending/>
    )
  }
  return (
    <>
      <div className="mt-40">
        <div className="flex items-center justify-center max-w-7xl mx-auto ">
          <form
            onSubmit={submitHandler}
            className="w-[90%] sm:w-[70%] border border-gray-200 rounded-md p-4 my-10 container-shadow"
          >
            <h1 className="font-bold text-2xl text-center mb-5 text-[#3b66ff]">Counsellor Login</h1>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="demo123@gmail.com"
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
              className="w-full my-4 bg-[#3b66ff] hover:bg-[#6072b4] active:bg-black cursor-pointer outline:none"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      {loader && 
        <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
          <Loader/>
        </div>
      }
    </>
  );
};

export default CounsellorLogin;