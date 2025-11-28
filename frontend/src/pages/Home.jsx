import React from "react";
import Nav from "../components/home/hero/Nav";
import BottomRight from "../components/home/hero/BottomRight";
import BottomLeft from "../components/home/hero/BottomLeft";
import BottomCenter from "../components/home/hero/BottomCenter";
import MagicBento from "../components/react-bits-components/MagicBento";
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
      <div className="w-screen flex flex-col justify-center gap-12">
        <div className="text-center w-full flex flex-col  items-center justify-center gap-5">
          <h1 className="capitalize font-semibold text-[3.5rem] text-center leading-none">
            Unmatched and Adaptive AI <br/> Intelligence
          </h1>
          <p className="text-md text-gray-700">
            From scheduling meetings with Google Calendar to automating
            communication in Slack.
          </p>
        </div>
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="61, 142, 235"
        />
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
