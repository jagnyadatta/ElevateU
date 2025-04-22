import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
function SearchBox() {
  return (
    <div className="h-[30%] flex justify-center w-full   ">
      <form action="" className=" flex justify-center items-end pb-9 gap-4 w-[70%]">
        <Input type="email" name="email" placeholder="Search By College name/ Counsellername" className="w-[50%]" />
        <Button className ="bg-[#3b66ff]">Search</Button> 
      </form>
    </div>
  );
}

export default SearchBox;
