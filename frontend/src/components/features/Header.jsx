import React from "react";

const Header = () => {
  return (
    <div className="w-full min-h-screen px-6 py-10 flex flex-col items-center text-whitesmoke justify-center">
      {/* Header */}
      <div className="w-[60vw] flex justify-center h-[60vh] mt-[5vw]">
        <div className="w-[50%] text-center">
          <h1 className="text-[4vw] font-bold leading-none mb-8 text-white">
            Unlock Powerful Features with AI
          </h1>
          <p className="text-md w-[80%] mx-auto text-white/70">
            From intelligent automation to seamless integrations, explore how
            Geni AI helps achieve more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
