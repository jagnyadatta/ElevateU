import React from "react";
import { CarouselSize } from "./CarouselSize";
import SearchBox from "./SearchBox";

function CareerCounsellor() {
  return (
    <div className="h-[100vh]">
      <div className="h-[30%] flex justify-center items-end">
        <SearchBox />
      </div>
      <div className=" h-[70%] flex flex-col items-center justify-center bg-amber-100 ">
        <h3 className="text-[#3b66ff] text-4xl text-left w-[70%]"> <strong>Best Cousellors</strong>  </h3>
        <CarouselSize />
      </div>
      <div className="bg-amber-500 h-[100vh]">
      </div>
    </div>
  );
}

export default CareerCounsellor;
