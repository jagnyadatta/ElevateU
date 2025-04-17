import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="h-[100vh] relative  z-2">
        <div className="w-full h-[20%]">
          <h2 className="text-5xl ml-[12%] pt-20   text-[#3b66ff] font-bold">
            About Us
          </h2>
        </div>
        <div className="h-[80] flex justify-center items-center ">
          <div className="flex justify-center w-[75%] items-center gap-6">
            <div className=" flex flex-col gap-10">
              <p className="">
              Our platform connects students with experienced counselors, helping them make informed career choices and find the right path toward their future jobs with expert guidance and support tailored to their goals.
              </p>
              <div className="flex justify-center items-center w-full ">
              <img
                  src="/image/location_png2.png"
                  alt="element1"
                  className="w-[90%]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="w-[100%] flex justify-center items-center">
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