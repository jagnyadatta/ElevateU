import React from "react";
import { CarouselSize } from "./CarouselSize";
import SearchBox from "./SearchBox";

import PersonCardList from "./PersonCardList";
import Footer from "../shared/Footer";

function CareerCounsellor() {
  return (
    <div className="h-[100vh] relative z-4">
      <div className="h-[30%] flex justify-center items-end">
        <SearchBox />
      </div>
      <div className=" h-[70%] flex flex-col items-center  gap-6 ">
        <h3 className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-2">
          <strong>Best Cousellors</strong>
        </h3>
        <CarouselSize />
      </div>
      <div className=" flex flex-col justify-center items-center">
        <div className=" w-full flex justify-center">
          <p className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-5">All Categories</p>
        </div>
        <div className="">
          <PersonCardList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CareerCounsellor;
