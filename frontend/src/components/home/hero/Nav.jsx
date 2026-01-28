import React from "react";
import {Link, useNavigate} from "react-router-dom"

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className="absolute z-999 text-white top-0 w-full h-14 flex justify-between px-8 bg-transparent ">
      <div className="bg-black/80 z-12 w-[40vw] h-full flex items-center justify-around hero-clip">
        <ul className="flex list-none gap-7 justify-center items-center">
        <img className="w-20 h-20 bg-white border-b mb-1 border-black/80" src="/img/logo.png" alt="" />
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/contact">contact</Link>
        </ul>
      </div>
      <div>
        <button onClick={() => navigate('/login')} className="px-10 py-3 mt-3 text-lg cursor-pointer bg-black/80 outline-none border-none rounded-full">Log in</button>
      </div>
    </div>
  );
};

export default Nav;
