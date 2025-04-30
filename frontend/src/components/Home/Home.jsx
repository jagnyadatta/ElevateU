import CounsellorSignup from "../auth/CounsellorSignup";
import CareerCounsellor from "../Career/CareerCounsellor";
import CounsellorProfile from "../Career/CounsellorProfile";
import MusicianProfileCard from "../Career/CounsellorProfile";
import BackgroundImage from "../shared/BackgroundImage";
import Footer from "../shared/Footer";
import AboutUs from "./AboutUs";
import AdminDashboard from "./AdminDashboard";
import Dashboard from "./Dashboard";
import FrontPagelayout from "./FrontPagelayout";

import Service from "./Service";


function Home() {
  return (
    <>
      <FrontPagelayout/>
      <Service/>
      <AboutUs/>
      <Footer/>
      <BackgroundImage />
      {/* <CounsellorSignup /> */}
      {/* <CareerCounsellor /> */}
      {/* <CounsellorProfile /> */}
      {/* <Dashboard/> */}
<<<<<<< HEAD
      {/* <AdminDashboard/> */}
=======
>>>>>>> b7db57e17e96fc7cda195dde79ff692af633d64c
    </>
  );
}

export default Home;
