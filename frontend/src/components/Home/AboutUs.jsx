import React from "react";

const AboutUs = () => {
  return (
    <>
      <div id="aboutus" className="h-full  sm:h-[100vh]  relative  z-2">
        <div className="w-full h-[20%] ">
          <h2 className="text-5xl ml-[12%] pb-10 sm:pt-20 pt-10 sm:pb-0  text-[#3b66ff] font-bold">
            About Us
          </h2>
        </div>
        <div className="h-[80vh] flex justify-center items-center ">
          <div className="flex justify-center w-[75%] items-center gap-6 flex-col sm:flex-row">
            <div className=" flex flex-col gap-10">
              <p className="">
              Our platform connects students with experienced counselors, helping them make informed career choices and find the right path toward their future jobs with expert guidance and support tailored to their goals.
              </p>
              <div className="justify-center items-center w-full hidden sm:flex"  data-aos="fade-right">
              <img
                  src="/image/location_png2.png"
                  alt="element1"
                  className="w-[90%]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="w-[100%] sm:flex justify-center items-center hidden" data-aos="fade-left">
              <img
                  src="/image/peoples.png"
                  alt="element1"
                  className="w-[90%]"
                />
              </div>
              <p>
              Our platform connects students with experienced counselors, helping them make informed career choices and find the right path toward their future jobs with expert guidance and support tailored to their goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;