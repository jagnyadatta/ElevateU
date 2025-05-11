import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SearchBox({ value, onChange }) {
  return (
    <div className="h-[30%] flex justify-center w-full relative z-10">
      <form action="" className="flex justify-center items-end pb-9 gap-4 w-[70%]">
        <Input
          type="text"
          placeholder="Search By College name / Counsellor name"
          className="w-[60%] bg-white p-5"
          value={value}
          onChange={onChange}
        />
        <Button className="bg-[#3b66ff] p-5">Search</Button>
      </form>
    </div>
  );
}

export default SearchBox;
