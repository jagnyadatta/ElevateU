import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


function SearchBox() {
  return (
    <div className="h-[30%] flex justify-center w-full ">
      <form action="" className=" flex justify-center items-end pb-9 gap-4 w-[70%]">
        <Input type="email" name="email" placeholder="Search By College name/ Counsellername" className="w-[60%] bg-white p-5" />
        <Button className ="bg-[#3b66ff] p-5">Search</Button> 
      </form>
    </div>
  );
}

export default SearchBox;
