// AddCounsellors.jsx
import React, { useState } from "react";
import axios from "axios";
import { COUNSELLOR_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const AddCounsellors = () => {
  const [inputText, setInputText] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const counsellorArray = JSON.parse(inputText);
      const res = await axios.post(`${COUNSELLOR_API_END_POINT}/bulk-insert`, {
        data: counsellorArray,
      });
      console.log(res.data.count);
      toast(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(toast.data.message);
    } finally{
      setLoader(false);
    }
  };

  return (
    <>
      <div className="p-4">
        <textarea
          rows={10}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your JSON array here"
          className="w-full p-2 border"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Insert Counsellors
        </button>
      </div>
      {loader && 
        <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
          <Loader/>
        </div>
      }
    </> 
  );
};

export default AddCounsellors;
