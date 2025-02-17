import React from 'react'
import { Button } from '../ui/button';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
  

const Navbar = () => {
  return (
      <nav className="navbar w-[90vw] sm:w-[600px] md:w-[707px] lg:w-[907px] p-2 pl-6 font-primary overflow-hidden navbar-expand-lg navbar-light bg-white flex flex-row justify-between items-center border-0 rounded-full shadow-lg m-[-10px]">
        <div id="nav-logo" className="w-[40px]">
          <img src="/image/ElevateU.png" />
        </div>
        <div className="sm:flex hidden">
          <ul className="flex flex-row justify-between gap-5 font-semibold">
            <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              Home
            </li>
            <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              Services
            </li>
            <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              Contact Us
            </li>
            <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
              About Us
            </li>
          </ul>
        </div>
        <div className="flex flex-row">
          <div className="hidden sm:flex flex-row">
            <Button
              variant="secondary"
              className="w-[90px] flex flex-col items-start border-gray-600 hover:bg-[#a6b8fa] hover:text-white border-r-0 rounded-l-full rounded-r-full cursor-pointer mr-[-20px]"
            >
              SignUp
            </Button>
            <Button
              variant="secondary"
              className="bg-[#3b66ff] hover:bg-[#9fb4ff] rounded-l-full rounded-r-full text-white cursor-pointer ml-[-5px]"
            >
              Login
            </Button>
          </div>
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
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      Home
                    </li>
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      Services
                    </li>
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      Contact Us
                    </li>
                    <li className="hover:bg-[#ced9ff] p-2 rounded-3xl transition ease-in duration-250 cursor-pointer">
                      About Us
                    </li>
                  </ul>
                  <div className='flex flex-row gap-1'>
                    <Button
                      variant="secondary"
                      className="w-[90px] flex flex-col border-gray-600 hover:bg-[#a6b8fa] hover:text-white border-r-0 rounded-l-full rounded-r-full cursor-pointer mt-2"
                    >
                      SignUp
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-[90px] bg-[#3b66ff] hover:bg-[#9fb4ff] rounded-l-full rounded-r-full text-white cursor-pointer mt-2"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
  );
}

export default Navbar