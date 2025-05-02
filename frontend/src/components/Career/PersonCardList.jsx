import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { COUNSELLOR_API_END_POINT } from "@/utils/constant";
import Loader from "../ui/Loader";

// const persons = [
//   {
//     name: "Mr. Chandra Shekhara Prasad",
//     image:
//       "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
//     college: "IGIT",
//   },
//   {
//     name: "Mr. Aditya Kumar Nayak",
//     image:
//       "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
//     college: "NIT Rourkela",
//   },
//   {
//     name: "Mr. Malay Ranjan Soy",
//     image:
//       "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
//     college: "IGIT",
//   },
//   {
//     name: "Mr. Sailendra Sign",
//     image:
//       "https://media.istockphoto.com/id/997461858/photo/attractive-young-man-in-blue-t-shirt-pointing-up-with-his-finger-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=70pkYuhz65EqNOB9qI5JSDXNbQUwGLxKTCgsSWoy4kM=",
//     college: "KIIT",
//   },
//   {
//     name: "Mr. Nilakanta Sahoo",
//     image:
//       "https://img.freepik.com/free-photo/young-pretty-woman-with-melancholy-face-expression-orange-blouse-isolated-sad-emotion_285396-939.jpg?semt=ais_hybrid&w=740",
//     college: "SOA",
//   },
//   {
//     name: "Mr. Sailendra Sign",
//     image:
//       "https://media.istockphoto.com/id/997461858/photo/attractive-young-man-in-blue-t-shirt-pointing-up-with-his-finger-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=70pkYuhz65EqNOB9qI5JSDXNbQUwGLxKTCgsSWoy4kM=",
//     college: "KIIT",
//   },
//   {
//     name: "Mr. Nilakanta Sahoo",
//     image:
//       "https://img.freepik.com/free-photo/young-pretty-woman-with-melancholy-face-expression-orange-blouse-isolated-sad-emotion_285396-939.jpg?semt=ais_hybrid&w=740",
//     college: "SOA",
//   },
// ];

const PersonCard = ({ name, image,college }) => {
  return (
    <Card className="w-64 m-4 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:opacity-70">

      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <CardContent className="p-4 text-center">
        <h2 className="text-md font-semibold">{name}</h2>
        <h2 className="text-md font-semibold">{college}</h2>
        <Link to="/profilecouncil">
          <Button className="bg-[#3b66ff]" > Go With </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const PersonCardList = ({persons}) => {
  return (
    <div className="flex flex-wrap justify-center relative z-10 ">
      {persons.map((person, index) => (
        <PersonCard key={index} name={person.name} image={person.profileImage} college={person.collegeName}  />
      ))}
    </div>
  );
};

export default PersonCardList;