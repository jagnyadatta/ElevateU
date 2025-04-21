import React from "react";
import BackgroundImage from "../shared/BackgroundImage";
import { Button } from "../ui/button";

const Service = () => {
  return (
    <>
      {/* Wrapper with relative for positioning context */}
      <div id="services" className="relative h-[100vh] w-full">

        {/* Background Image placed underneath */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <BackgroundImage />
        </div>

        {/* Main content above the background */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="w-full h-[20%]">
            <h2 className="text-5xl ml-[12%] mt-[7%] text-[#3b66ff] font-bold">
              Services
            </h2>
          </div>

          <div className="h-[80%] w-full flex flex-col justify-center items-center gap-5">
            
            {/* Card Row 1 */}
            <div className="flex gap-2">
              <div className="w-[45vw] h-[30vh] bg-[#3b66ff] flex flex-col justify-center items-center rounded-[2vw]">
                <div className="w-[90%] h-[80%] flex flex-col gap-2">
                  <h2 className="text-white text-4xl">Career counsellor</h2>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis nisi officia est, obcaecati neque exercitationem
                    nostrum labore eos amet rerum nihil id quasi illo minus? Earum
                    placeat aut beatae! Blanditiis.
                  </p>
                  <Button className="rounded-3xl bg-white text-[#3b66ff] w-[20%] hover:drop-shadow-[1px_1px_20px_white] transition-all duration-300 cursor-pointer">
                    Continue
                  </Button>
                </div>
              </div>

              <div className="w-[35vw] h-[30vh] bg-[#3b66ff] flex justify-center rounded-[2vw]">
                <img
                  src="/image/women.png"
                  alt="element1"
                  className="drop-shadow-[1px_1px_50px_white]"
                />
              </div>
            </div>

            {/* Card Row 2 */}
            <div className="flex gap-2">
              <div className="w-[35vw] h-[30vh] bg-[#3b66ff] flex justify-center rounded-[2vw]">
                <img
                  src="/image/hand_shake_img.png"
                  alt="element1"
                  className="drop-shadow-[1px_1px_50px_white]"
                />
              </div>

              <div className="w-[45vw] h-[30vh] bg-[#3b66ff] flex flex-col justify-center items-center rounded-[2vw]">
                <div className="w-[90%] h-[80%] flex flex-col gap-2">
                  <h2 className="text-white text-4xl">Admission counselor</h2>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis nisi officia est, obcaecati neque exercitationem
                    nostrum labore eos amet rerum nihil id quasi illo minus? Earum
                    placeat aut beatae! Blanditiis.
                  </p>
                  <Button className="rounded-3xl bg-white text-[#3b66ff] w-[20%] hover:drop-shadow-[1px_1px_20px_white] transition-all duration-300 cursor-pointer">
                    Continue
                  </Button>
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