import React from "react";

const Nav = () => {
  return (
    <div className="absolute top-0 w-full h-18 flex justify-between px-8 bg-transparent ">
      <div className="bg-white z-12 w-[40vw] h-12 flex items-center justify-center hero-clip">
        <ul className="flex list-none gap-10 justify-center items-center">
          <li>home</li>
          <li>about</li>
          <li>contact</li>
        </ul>
      </div>
      <div>
        <button className="px-10 py-3 mt-3 text-lg bg-white text-black outline-none border-none rounded-full">Log in</button>
      </div>
    </div>
  );
};

export default Nav;
