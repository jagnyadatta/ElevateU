import React, { useEffect } from "react";
import BackgroundImage from "../shared/BackgroundImage";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Service = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  return (
    <>
      {/* Wrapper with relative for positioning context */}
      <div id="services" className="relative h-[100vh] w-full">
        {/* Main content above the background */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center ">
          <div className="w-full sm:h-[20%]">
            <h2 className="text-5xl ml-[25%] sm:ml-[12%] pb-[20px] sm:mt-[7%] text-[#3b66ff] font-bold">
              <a className="" href="">
                Services
              </a>
            </h2>
          </div>

          <div className="h-full w-full flex flex-col justify-center items-center gap-5">
            {/* Card Row 1 */}
            <div className="justify-center items-center h-[70%] sm:h-auto sm:justify-start md:justify-start lg:justify-start flex gap-2 ">
              <div
                className="w-[80%] sm:w-[45vw] h-full sm:h-[30vh] bg-[#3b66ff] flex flex-col justify-center items-center rounded-[2vw]"
                data-aos="fade-right"
              >
                <div className="w-[90%] h-[80%] flex flex-col gap-2">
                  <h2 className="text-white text-4xl">Career counsellor</h2>
                  <p className="text-white">
                    Career Counsellors guide you with expert advice tailored to
                    your goals. Get clarity on academics, careers, and future
                    opportunities. Book a session and plan your path with
                    confidence.
                  </p>
                  <Link to="/counsellor/all">
                    <Button className="rounded-3xl bg-white text-[#3b66ff] sm:w-[20%] hover:drop-shadow-[1px_1px_20px_white] transition-all duration-300 cursor-pointer">
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>

              <div
                className="w-[35vw] h-[30vh] bg-[#3b66ff] hidden sm:flex  justify-center rounded-[2vw]"
                data-aos="fade-down"
              >
                <img
                  src="/image/women.png"
                  alt="element1"
                  className="drop-shadow-[1px_1px_50px_white]"
                />
              </div>
            </div>

            {/* Card Row 2 */}
            <div className="justify-center sm:justify-start md:justify-start lg:justify-start flex gap-2  h-[70%] sm:h-auto px-4 overflow-hidden ">
              <div
                className="w-[35vw] h-[30vh] bg-[#3b66ff] hidden sm:flex  justify-center rounded-[2vw]  "
                data-aos="fade-up"
              >
                <img
                  src="/image/hand_shake_img.png"
                  alt="element1"
                  className="drop-shadow-[1px_1px_50px_white]"
                />
              </div>

              <div
                className="w-[80%] sm:w-[45vw] h-full sm:h-[30vh] bg-[#3b66ff] flex flex-col justify-center items-center rounded-[2vw]"
                data-aos="fade-left"
              >
                <div className="w-[90%] h-[80%] flex flex-col gap-2">
                  <h2 className="text-white text-4xl">Admission counselor</h2>
                  <p className="text-white">
                    Admission Counsellors help you choose the right course and
                    college. Get expert support for applications, eligibility,
                    and deadlines. Make informed decisions for a successful
                    academic journey.
                  </p>
                  <Link to="">
                    <Button className="rounded-3xl bg-white text-[#3b66ff] sm:w-[20%] hover:drop-shadow-[1px_1px_20px_white] transition-all duration-300 cursor-not-allowed">
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
