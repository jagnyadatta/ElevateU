import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant.js"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const {user} = useSelector((store)=> store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json  ",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        const name = res.data.user.fullname.split(" ")[0];
        navigate("/");  
        toast.success(`Login Successfully! ${name}`);
      }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="mt-40">
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-[90%] sm:w-[70%] border border-gray-200 rounded-md p-4 my-10 container-shadow"
        >
          <h1 className="font-bold text-xl mb-5 text-[#3b66ff]">Login</h1>
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

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;