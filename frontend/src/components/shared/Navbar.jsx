import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { FIND_USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import ProfileButton from "../ui/ProfileButton";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const { user } = useSelector((store) => store.auth);
  const name = user?.name;
  const email = user?.email;
  const [imageLink, setImageLink] = useState(null);
  const [checkUser, setCheckUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);
  const fetchUser = async () => {
    try {
      if (!user) return;
      const res = await axios.post(`${FIND_USER_API_END_POINT}/find`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const check = res.data;
      if (check.success) {
        if (check.user1) {
          setImageLink(check.user1.profileImage);
          setCheckUser("counsellor");
        }
        if (check.user2) {
          setImageLink(check.user2.profileImage);
          setCheckUser("student");
        }
      }
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${FIND_USER_API_END_POINT}/v1/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    if (user?.profileImage) {
      setImageLink(user.profileImage);
    }
  }, [user]);
 const logoSrc =
    theme === "dark" ?"/image/ElevateUNightMode.png":"/image/ElevateU.png";
  return (
    <nav className="navbar dark:bg-[#3b66ff] w-[90vw] sm:w-[600px] md:w-[707px] lg:w-[907px] p-2 pl-6 font-primary overflow-hidden navbar-expand-lg navbar-light bg-white flex flex-row justify-between items-center border-0 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.4)] m-[-10px]">
      <Link to="/">
        <div id="nav-logo" className="w-[40px] ">
           <img src={logoSrc} alt="Logo" />
        </div>
      </Link>
      <div className="sm:flex hidden">
        <ul className="flex flex-row justify-between gap-5 font-semibold ">
          <HashLink smooth to="/#home">
            <li className="hover:bg-[#ced9ff] dark:hover:bg-black/50 p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              Home
            </li>
          </HashLink>
          <HashLink smooth to="/#services">
            <li className="hover:bg-[#ced9ff] dark:hover:bg-black/50 p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              Services
            </li>
          </HashLink>
          <HashLink smooth to="/#aboutus">
            <li className="hover:bg-[#ced9ff] dark:hover:bg-black/50 p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              About Us
            </li>
          </HashLink>
          {/* <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              <a href="#contactus">Contact Us</a>
            </li> */}
          <li className="hover:bg-[#ced9ff] dark:hover:bg-black/50 p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
            <Link to="/aisuggest">AI Suggestion</Link>
          </li>
          <button
            onClick={toggleTheme}
            className=""
          >
           <span className="text-2xl">
    {theme === "dark" ? "☀️" : "🌙"}
  </span>
          </button>
          {/* <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              <Link to="/elevateu/admin/login">
                Admin
              </Link>
            </li> */}
        </ul>
      </div>
      <div className="flex flex-row">
        {!user ? (
          <div className="hidden sm:flex flex-row">
            <Link to="/choicesignup">
              <Button
                variant="secondary"
                className="w-[90px] flex flex-col items-start border-gray-600 hover:bg-[#a6b8fa] hover:text-white active:bg-black border-r-0 rounded-l-full rounded-r-full cursor-pointer mr-[-20px]"
              >
                SignUp
              </Button>
            </Link>
            <Link to="/choicelogin">
              <Button
                variant="secondary"
                className="bg-[#3b66ff] hover:bg-[#9fb4ff] active:bg-black rounded-l-full rounded-r-full text-white cursor-pointer ml-[-5px]"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex md:flex lg:flex ">
            <Popover >
              <PopoverTrigger>
                <div className="w-[45px] h-[43px]  flex  items-center justify-center border-2 border-blue-500 dark:border-white  rounded-full text-2xl font-bold hover:cursor-pointer">
                  <img
                    src={user?.profileImage}
                    alt="profileImage"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] bg-white dark:bg-[#3b66ff] border-0 dark:shadow-[0_4px_12px_rgba(255,255,255,0.4)]">
                <div className="w-full h-[100px] flex items-center justify-between overflow-hidden">
                  <img
                    src={imageLink}
                    alt="profileImage"
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                  <Link
                    to={
                      user?.role === "counsellor"
                        ? "/counsellor/dashboardcounsellor"
                        : "/student/dashboard"
                    }
                  >
                    <ProfileButton />
                  </Link>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="font-bold text-[#3b66ff] text-[16px] dark:text-white">
                    Name:{" "}
                    <span className="text-gray-900 text-[14px]">{name}</span>
                  </p>
                  <p className="font-bold text-[#3b66ff] text-[16px] dark:text-white">
                    Email:{" "}
                    <span className="text-gray-900 text-[14px]">{email}</span>
                  </p>
                </div>
                <Button
                  onClick={logoutHandler}
                  variant="destructive"
                  className="mt-3 cursor-pointer bg-red-600"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="flex sm:hidden md:hidden lg:hidden">
          <Popover>
            <PopoverTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:hidden cursor-pointer text-[#3b66ff] dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </PopoverTrigger>
            <PopoverContent className="bg-white dark:bg-[#3b66ff]">
              <div>
                <ul className="flex flex-col justify-between gap-3 font-semibold">
                  <HashLink smooth to="/#home">
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      Home
                    </li>
                  </HashLink>
                  <HashLink smooth to="/#services">
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      Services
                    </li>
                  </HashLink>
                  <HashLink smooth to="/#aboutus">
                    <li className="hover:bg-[#ced9ff]  p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      About Us
                    </li>
                  </HashLink>
                  <li className="hover:bg-[#ced9ff]  p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                    <Link to="/aisuggest">AI Suggetion</Link>
                  </li>
                  <button
                    onClick={toggleTheme}
                    className="bg-gray-300 dark:bg-gray-600 rounded-3xl p-2 text-start "
                  >
                    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                {!user ? (
                  <div className="flex flex-row gap-1">
                    <Link to="/choicesignup">
                      <Button
                        variant="secondary"
                        className="w-[90px] flex flex-col border-gray-600 hover:bg-[#a6b8fa] hover:text-white border-r-0 rounded-l-full rounded-r-full cursor-pointer mt-2"
                        >
                        SignUp
                      </Button>
                    </Link>
                    <Link to="/choicelogin">
                      <Button
                        variant="secondary"
                        className="w-[90px] bg-[#3b66ff] hover:bg-[#9fb4ff] rounded-l-full rounded-r-full text-white cursor-pointer mt-2"
                        >
                        Login
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="sm:flex md:flex lg:flex flex flex-col ">
                    <Popover>
                      <PopoverTrigger>
                        <Link
                          to={
                            user?.role === "counsellor"
                            ? "/counsellor/dashboardcounsellor"
                              : "/student/dashboard"
                            }
                            >
                          <ProfileButton />
                        </Link>
                      </PopoverTrigger>
                    </Popover>
                    <Button
                      onClick={logoutHandler}
                      variant="destructive"
                      className="mt-3 cursor-pointer bg-red-600 text-white"
                      >
                      Logout
                    </Button>
                  </div>
                )}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
