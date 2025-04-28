import CounsellorSignup from "../auth/CounsellorSignup";
import CareerCounsellor from "../Career/CareerCounsellor";
import CounsellorProfile from "../Career/CounsellorProfile";
import MusicianProfileCard from "../Career/CounsellorProfile";
import BackgroundImage from "../shared/BackgroundImage";
import Footer from "../shared/Footer";
import AboutUs from "./AboutUs";
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
    </>
  );
}

export default Home;
