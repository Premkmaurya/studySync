import React from "react";

const Header = () => {
  return (
    <div className="w-full min-h-screen px-6 py-20 flex flex-col justify-center">
      {/* Header */}
      <div className="w-full flex justify-center h-[60vh] mt-[12vw]">
        <div className="w-[50%] text-center">
          <h1 className="text-[4.5vw] font-bold leading-none mb-8 text-gray-900">
            Unlock Powerful Features with AI
          </h1>
          <p className="text-md w-[80%] mx-auto text-gray-500">
            From intelligent automation to seamless integrations, explore how
            Geni AI helps achieve more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
