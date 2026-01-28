import React from "react";
import Nav from "../components/home/hero/Nav";
import Orb from "../components/react-bits-components/Orb";
import Header from "../components/features/Header";
import FeaturesCards from "../components/features/FeaturesCards";
import MagicBento from "../components/react-bits-components/MagicBento";
import Footer from "../components/home/footer/Footer";

const Features = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <div className="w-full h-[90vh] absolute top-0 left-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <Header />
      <FeaturesCards />
      <div className="w-screen flex flex-col justify-center gap-12 mt-15">
        <div className="text-center w-full flex flex-col  items-center justify-center gap-5">
          <h1 className="capitalize font-semibold text-[3.5rem] text-center leading-none">
            Unmatched and Adaptive AI <br /> Intelligence
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
      <Footer />
    </div>
  );
};

export default Features;
