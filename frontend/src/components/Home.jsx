import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import TypingEffect from "./TypingEffect";

function Home() {
  return (
    <div className="w-full flex flex-col relative items-center justify-center p-0">
      {/* Background Image (Covers Entire Page) */}
      <div className="inset-0 absolute w-full h-full flex items-center justify-center img-card sm:opacity-20 opacity-30 z-1">
        <img
          src="/image/ElevateU.png"
          alt="homepage image"
          className="w-[50vw] md:w-[45vw]"
        />
      </div>
      {/* <div class="absolute bottom-0 left-0 w-full z-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="blue"
            fill-opacity="1"
            d="M0,320L120,288C240,256,480,192,720,144C960,96,1200,64,1320,48L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div> */}
      {/* Content */}
      <div className="w-full h-[70vh] sm:h-[100vh] grid grid-cols-2 z-3">
        <div className="flex flex-col items-center justify-center border-2 sm:gap-4 border-red-400 col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
          <div className="w-full sm:h-full border-2 border-blue-500 flex flex-col justify-center items-center sm:items-end">
            <div className="w-[96%] h-auto flex flex-col border-2 border-red-400 gap-5 sm:gap-3 items-center sm:items-start">
              <h1 className="text-black text-[34px] sm:text-6xl">
                Welcome to{" "}
                <span className="font-bold text-[#3b66ff]">ElevateU</span>
              </h1>
              <p className="text-[1rem] italic font-semibold text-[#002ccc] text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, quae sunt. Dicta atque repellendus molestias.
              </p>
              {/* <p className="text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p> */}
              <div class="w-[300px] sm:w-auto text-[18px] gap-1  sm:text-4xl font-medium text-gray-900 flex flex-row justify-start items-start">
                <span class="font-normal">We offers</span>
                <TypingEffect />
              </div>
              <Button className="rounded-3xl bg-[#3b66ff]">Go With..</Button>
            </div>
          </div>
          <div className="w-full h-[20%] m border-2 border-black flex items-center justify-center gap-3 z-3">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-[#3b66ff] text-3xl"
            />
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-[#25D366] text-3xl"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[#E1306C] text-3xl"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-[#3b66ff] text-3xl"
            />
          </div>
        </div>
        <div className="w-full relative hidden sm:flex flex-col overflow-hidden">
          <div className="w-full border-2 absolute border-red-400 flex gap-5 items-end justify-start">
            <div className="flex flex-col mt-25 ml-20 gap-3">
              <img
                src="/image/think30.png"
                alt="element1"
                className="w-50 border-2"
              />
              <img
                src="/image/think20.png"
                alt="element1"
                className="w-15 border-2"
              />
            </div>
            <div className="flex flex-col gap-5">
              <img
                src="/image/think40.png"
                alt="element1"
                className="w-20 border-2"
              />
              <img
                src="/image/think10.png"
                alt="element1"
                className="w-20 border-2"
              />
            </div>
          </div>
          <div className="w-full h-full flex items-end justify-center border-2">
            <img
              src="/image/person-laptop.png"
              alt="person-with-table"
              className="w-[90%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
