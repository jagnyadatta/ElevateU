import React, { useEffect, useState } from "react";
import { CarouselSize } from "./CarouselSize";
import SearchBox from "./SearchBox";
import PersonCardList from "./PersonCardList";
import Footer from "../shared/Footer";
import BackgroundImage from "../shared/BackgroundImage";
import axios from "axios";
import Loader from "../ui/Loader";
import { COUNSELLOR_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";

const CareerCounsellor = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(false);

  // Fetch counsellor data from backend
  const fetchCounsellor = async () => {
    try {
      setLoader(true);
      const res = await axios.get(`${COUNSELLOR_API_END_POINT}/fetch-all-data`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const all = res.data.allUser;
        const approvedCounsellors = all.filter(c => c.verification === "approved");
        setPersons(approvedCounsellors);
        setFilteredPersons(approvedCounsellors); // Initially show all counsellors
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCounsellor();
  }, []);

  // Handle the search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query === "") {
      setFilteredPersons(persons); // If search query is empty, show all
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = persons.filter(
        (person) =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          person.collegeName.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredPersons(filteredResults);
    }
  };

  if (loader) {
    return (
      <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full relative z-2">
      <div className="fixed w-full top-5 flex justify-center z-50">
        <Navbar />
      </div>
      <BackgroundImage />
      <div className="h-[30%] pt-25 flex justify-center items-end">
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
      </div>
      
      {/* Conditional rendering of the Best Counsellors and Carousel */}
      {searchQuery === "" && (
        <div className="h-[30%] flex justify-center items-center">
          <h3 className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-2">
            <strong>Best Counsellors</strong>
          </h3>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-6">
        {/* Conditionally render the Carousel and handle height adjustment */}
        {searchQuery === "" ? (
          <>
            <div className="h-[30%]">
              <CarouselSize persons={filteredPersons} />
            </div>
            <div className="w-full flex justify-center">
              <p className="text-[#3b66ff] text-4xl text-left w-[70%] border-b-2 pb-5">
                All Categories
              </p>
            </div>
          </>
        ) : null}

        {/* Display "Counselor not found" message if no results match */}
        {searchQuery !== "" && filteredPersons.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 mt-5">
            Counselor not found
          </div>
        ) : (
          <div className="mt-10">
            <PersonCardList persons={filteredPersons} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CareerCounsellor;
