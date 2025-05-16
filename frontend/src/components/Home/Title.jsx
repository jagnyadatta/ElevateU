import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "../ui/button";
import TypingEffect from "./TypingEffect";
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <>
      <div
        id="home"
        className="h-[100vh] w-full flex flex-col items-center justify-center sm:gap-4  col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1"
      >
        <div className="w-full  h-[70%] sm:h[full] flex flex-col justify-center items-center sm:items-end">
          <div className="w-[96%] h-[50%] sm:h-auto flex flex-col gap-5 sm:gap-3 items-center sm:items-start">
            <h1 className="text-black text-[34px] sm:text-6xl">
              Welcome to{" "}
              <span className="font-bold text-[#3b66ff]">ElevateU</span>
            </h1>
            <p className="text-[1rem] italic font-semibold text-[#002ccc] text-justify">
              your personalized student guidance platform. Connect with
              experienced mentors and book one-on-one counselling sessions in
              real time. Explore opportunities, clarify doubts, and shape your
              future with expert support.
            </p>
            {/* <p className="text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p> */}
            <div class="w-[300px] sm:w-auto text-[18px] gap-1  sm:text-4xl font-medium text-gray-900 flex flex-row justify-start items-start pb-10 sm:pb-0">
              <span class="font-normal">We offers</span>
              <TypingEffect />
            </div>
            <Link to="/choicelogin">
              <Button className="rounded-3xl bg-[#3b66ff]">Go With..</Button>
            </Link>
          </div>
        </div>
        <div className="w-full h-[20%] flex sm:items-center justify-center gap-3 z-3">
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
    </>
  );
}
