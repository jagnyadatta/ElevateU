import React from 'react'
import { Button } from '../ui/button';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import { STUDENT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
  

const Navbar = () => {
  const {user} = useSelector((store)=> store.auth);
  const firstLetter = user ? user.fullname.split(" ")[0][0] : "X";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${STUDENT_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }; 
  return (
      <nav className="navbar w-[90vw] sm:w-[600px] md:w-[707px] lg:w-[907px] p-2 pl-6 font-primary overflow-hidden navbar-expand-lg navbar-light bg-white flex flex-row justify-between items-center border-0 rounded-full shadow-lg m-[-10px]">
        <Link to="/">
          <div id="nav-logo" className="w-[40px]">
            <img src="/image/ElevateU.png" />
          </div>
        </Link>
        <div className="sm:flex hidden">
          <ul className="flex flex-row justify-between gap-5 font-semibold">
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
              <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                About Us
              </li>
            </HashLink>
            {/* <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              <a href="#contactus">Contact Us</a>
            </li> */}
            <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              <Link to="/aisuggest">
                AI Suggestion
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row">
          {
            !user ?(
              <div className="hidden sm:flex flex-row">
                <Link to="/choicesignup">
                  <Button
                    variant="secondary"
                    className="w-[90px] flex flex-col items-start border-gray-600 hover:bg-[#a6b8fa] hover:text-white active:bg-black border-r-0 rounded-l-full rounded-r-full cursor-pointer mr-[-20px]"
                  >
                    SignUp
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="secondary"
                    className="bg-[#3b66ff] hover:bg-[#9fb4ff] active:bg-black rounded-l-full rounded-r-full text-white cursor-pointer ml-[-5px]"
                  >
                    Login
                  </Button> 
                </Link>
              </div>
            ) :(
              <div className='hidden sm:flex md:flex lg:flex'>
                <Popover>
                  <PopoverTrigger>
                    <div className='w-[35px] h-[33px] flex items-center justify-center border-2 border-blue-500 rounded-full text-2xl font-bold'>
                        {firstLetter}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button onClick={logoutHandler}>Logout</Button>
                  </PopoverContent>
                </Popover>
              </div>
            )
          }
          
          <div className="flex sm:hidden md:hidden lg:hidden">
            <Popover>
              <PopoverTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 sm:hidden cursor-pointer text-[#3b66ff]"
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
              <PopoverContent>
                <div className="">
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
                      <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                        About Us
                      </li>
                    </HashLink>
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      <Link to="/aisuggest">
                        AI Suggetion
                      </Link>
                    </li>
                  </ul>
                  {
                    !user ? (
                      <div className='flex flex-row gap-1'>
                        <Link to="/signup">
                          <Button
                            variant="secondary"
                            className="w-[90px] flex flex-col border-gray-600 hover:bg-[#a6b8fa] hover:text-white border-r-0 rounded-l-full rounded-r-full cursor-pointer mt-2"
                          >
                            SignUp
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button
                            variant="secondary"
                            className="w-[90px] bg-[#3b66ff] hover:bg-[#9fb4ff] rounded-l-full rounded-r-full text-white cursor-pointer mt-2"
                          >
                            Login
                          </Button>
                        </Link>
                      </div>
                    ):(
                      <Button onClick={logoutHandler} className="mt-3 w-[60px] h-[30px] text-[13px]">Logout</Button>
                    )
                  }
                  
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
  );
}

export default Navbar