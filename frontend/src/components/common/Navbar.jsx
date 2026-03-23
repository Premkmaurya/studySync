import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { label: "Features", path: "/features" },
    { label: "Groups", path: "/find-groups" },
    { label: "About", path: "/about" },
    { label: "Support", path: "/contact" },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
      <div className="flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black italic">
            S
          </div>
          <span className="text-sm font-black tracking-tighter uppercase text-white">
            StudySync
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;