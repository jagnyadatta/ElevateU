import React, { useEffect, useState } from "react";
import { CarouselSize } from "./CarouselSize";
import SearchBox from "./SearchBox";

import PersonCardList from "./PersonCardList";
import Footer from "../shared/Footer";
import BackgroundImage from "../shared/BackgroundImage";
import axios from "axios";
import Loader from "../ui/Loader";
import { COUNSELLOR_API_END_POINT } from "@/utils/constant";

const CareerCounsellor = () => {
  const [persons, setPersons] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchCounsellor = async ()=>{
    try {
      setLoader(true);
      const res = await axios.get(`${COUNSELLOR_API_END_POINT}/fetch-all-data`, {
        withCredentials: true,
      });
      if(res.data.success){
        setPersons(res.data.allUser);
      }
    } catch (error){
      console.log(error);
    } finally{
      setLoader(false);
    }
  }
  //DATA fetch.
  useEffect(()=>{
    fetchCounsellor();
  },[]);

  if(loader){
    return(
      <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
          <Loader/>
      </div>
    )
  }

  return (
    <div className="h-[100vh] relative z-2">
      <BackgroundImage />
      {/* <div className="h-[30%] flex justify-center items-end">
        <SearchBox />
      </div>
      <div className=" h-[70%] flex flex-col items-center  gap-6 ">
        <h3 className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-2">
          <strong>Best Cousellors</strong>
        </h3>
        <CarouselSize />
      </div> */}
      <div className=" flex flex-col justify-center items-center">
        <div className=" w-full flex justify-center">
          <p className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-5">
            All Categories
          </p>
        </div>
        <div className="mt-10">
          <PersonCardList persons={persons} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CareerCounsellor;
