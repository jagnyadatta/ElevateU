import React from "react";
import ProfileCard from "../ui/ProfileCard";

const PersonCardList = ({persons}) => {
  return (
    <div className="flex flex-wrap justify-center relative z-10 gap-10">
      {persons.map((person, index) => (
        <ProfileCard key={index} name={person.name} image={person.profileImage} college={person.collegeName} id={person.slug} />
      ))}
    </div>
  );
};

export default PersonCardList;