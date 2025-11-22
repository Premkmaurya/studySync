import React from "react";

const Nav = () => {
  return (
    <div className="absolute text-white top-0 w-full h-14 flex justify-between px-8 bg-transparent ">
      <div className="bg-black/80 z-12 w-[40vw] h-full flex items-center justify-around hero-clip">
        <ul className="flex list-none gap-7 justify-center items-center">
        <img className="w-20 h-20 bg-white border-b mb-1 border-black/80" src="/img/logo.png" alt="" />
          <li>home</li>
          <li>about</li>
          <li>contact</li>
        </ul>
      </div>
      <div>
        <button className="px-10 py-3 mt-3 text-lg bg-black/80 outline-none border-none rounded-full">Log in</button>
      </div>
    </div>
  );
};

export default Nav;
