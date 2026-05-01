import React from "react";
import { useSelector } from "react-redux";
import SingleFeatureCard from "./SingleFeatureCard"

const FeaturesCards = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`flex flex-col items-center justify-center px-6 lg:px-20 py-12 transition-colors ${
      theme === 'light' ? 'text-black bg-white' : 'text-white bg-transparent'
    }`}>
      <div className="w-full lg:w-1/2 text-center mt-10 lg:mt-0">
        <h1 className={`text-4xl lg:text-6xl font-bold leading-tight mb-6 ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          Empowering Creativity
        </h1>
        <p className={`text-md lg:text-xl mb-8 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          Our mission is to simplify the way people work and create by
          harnessing the power of advanced AI technology.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <SingleFeatureCard />
        <SingleFeatureCard />
      </div>
    </div>
  );
};

export default FeaturesCards;
