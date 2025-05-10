import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../shared/Footer";
import Loader from "../ui/Loader";
import { FIND_USER_API_END_POINT, STUDENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AleartLogin from "../ui/AleartLogin";
import { setUser } from "@/redux/authSlice";

const CounsellorProfile = () => {
  const concernsList = [
    "Career Guidance",
    "Internship Tips",
    "Resume Review",
    "Interview Preparation",
    "Higher Studies Advice",
    "Personal Development",
  ];

  const {user} = useSelector((store)=> store.auth);
  const [currUser, setCurrUser] = useState({});
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentId = user?._id;
  const counsellorId = id;


  const handleOperation = async (studentId, counsellorId) =>{
    // console.log(user?.role);
    // console.log(currUser.role);
    if(user?.role === currUser.role){
      toast.error("You cannot chat with a counsellor!. You are a counsellor too!");
    }else{
      try {
        const res = await axios.put(
          `${STUDENT_API_END_POINT}/add-counsellor/${studentId}/${counsellorId}`,
          {},
          { withCredentials: true }
        );

        if (res.data.success) {
          
          // ✅ Fetch updated student data and update Redux
          const updatedUserRes = await axios.post(
            `${FIND_USER_API_END_POINT}/find`,
            user,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          
          if (updatedUserRes.data.success) {
            const updatedUser = updatedUserRes.data.user1 || updatedUserRes.data.user2;
            dispatch(setUser(updatedUser));
          }
          
          toast.success("Counsellor added successfully!");
          navigate("/student/dashboard");
        }
      } catch (err) {
        const backendMessage = err?.response?.data?.message || "Something went wrong.";
        toast.error(backendMessage);
        navigate("/student/dashboard");
      }
    }
  }

  const fetchUser = async () =>{
    try {
      setLoader(true);
      const res = await axios.get(`${FIND_USER_API_END_POINT}/${id}`, {
        withCredentials: true,
      });
      if(res.data.success){
        setCurrUser(res.data.user);
      }
    } catch (error){
      console.log(error);
    } finally{
      setLoader(false);
    }
  }

  //DATA fetch.
  useEffect (()=>{
    fetchUser();
  },[id]);

  if(loader){
    return(
      <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
        <Loader/>
      </div>
    )
  }

  if (!user) {
    return (
      <AleartLogin/>
    ) 
  }

  const starImage =
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png";

  return (
    <div>
      <div className="flex min-h-screen p-6 pl-[400px] mt-[50px]">
        <div className="w-[350px] fixed top-[70px] left-6 bg-white p-6 rounded-2xl shadow-lg h-[90vh] flex flex-col items-center justify-start">
          <img
            src={currUser.profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-6">{currUser.name}</h2>
          <div className="flex flex-col space-y-4 text-gray-700 w-full mb-6">
            <div>
              <p className="text-sm text-gray-500">Rank Number</p>
              <h2 className="text-xl font-bold">#{currUser.rank}</h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">College Name</p>
              <h2 className="text-lg font-semibold">
                {currUser.collegeName}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Branch Name</p>
              <h2 className="text-lg font-semibold">
                {currUser.branch}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Passout Year</p>
              <h2 className="text-lg font-semibold">{currUser.passoutYear}</h2>
            </div>
          </div>

          {/* Two Buttons Side by Side */}
          <div className="flex w-full gap-4 ">
            <button 
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 hover:cursor-pointer"
              onClick={()=>handleOperation(studentId, counsellorId)}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Right Scrollable Content Section */}
        <div className="flex-1 pl-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">About</h3>
            <p className="text-gray-700">
              {currUser.about}
            </p>
          </div>

          {/* Rating Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">Rating</h3>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={starImage}
                  alt="Star"
                  className="w-6 h-6 object-contain"
                />
              ))}
              <span className="text-gray-600 ml-2">(5.0)</span>
            </div>
          </div>

          {/* Student Concern Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">
              Make Student Concern With John
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {concernsList.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
            
          </div>
          <div className="bg-blue-500 p-6 mt-6 rounded-2xl shadow-lg">
  <Footer />
</div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorProfile;
