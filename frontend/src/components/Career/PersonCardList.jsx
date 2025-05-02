import React from "react";
import ProfileCard from "../ui/ProfileCard";
import ChatBox from "@/check/ChatBox";

const PersonCardList = ({persons}) => {
  return (
    <div className="flex flex-wrap justify-center relative z-10 gap-10">
      {persons.map((person, index) => (
        <ProfileCard key={index} name={person.name} image={person.profileImage} college={person.collegeName} id={person.slug} />
      ))}

      <ChatBox/>
    </div>
  );
};

export default PersonCardList;