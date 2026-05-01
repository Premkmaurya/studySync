import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`w-full min-h-screen px-6 py-10 flex flex-col items-center justify-center transition-colors ${
      theme === 'light' ? 'text-black bg-white' : 'text-whitesmoke bg-transparent'
    }`}>
      {/* Header */}
      <div className="w-[60vw] flex justify-center h-[60vh] mt-[5vw]">
        <div className="w-[50%] text-center">
          <h1 className={`text-[4vw] font-bold leading-none mb-8 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            Unlock Powerful Features with AI
          </h1>
          <p className={`text-md w-[80%] mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-white/70'
          }`}>
            From intelligent automation to seamless integrations, explore how
            Geni AI helps achieve more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
