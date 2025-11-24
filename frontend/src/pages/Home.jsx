import React from "react";
import Nav from "../components/home/hero/Nav";
import BottomRight from "../components/home/hero/BottomRight";
import BottomLeft from "../components/home/hero/BottomLeft";
import BottomCenter from "../components/home/hero/BottomCenter";
import Footer from "../components/home/footer/Footer";
import Skill from "../components/home/skill/Skill";
import Feature from "../components/home/feature/Feature";
import Faq from "../components/home/FAQ/Faq";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="relative w-screen h-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="w-full h-full bg-cover"
            src="/img/group-study.jpg"
            alt=""
          />
        </div>
        <Nav />
        <div className="w-screen h-[60vh] rounded-b-4xl bg-transparent overflow-hidden"></div>
        <BottomLeft />
        <BottomCenter />
        <BottomRight />
      </div>
      <div>
        <Skill />
      </div>
      <div>
        <Feature />
      </div>
      <div>
        <Faq />
      </div>
      <div className="w-screen overflow-x-hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
