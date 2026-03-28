import React from "react";
import { Zap, Mail } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelectors";

const HeroSection = () => {
  const user = useSelector(selectUser);
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <img
          src="https://i.pravatar.cc/300?u=premium_user"
          className="relative w-32 h-32 md:w-44 md:h-44 rounded-[48px] border-4 border-black object-cover shadow-2xl"
          alt="Profile"
        />
        <div className="absolute -bottom-2 -right-2 p-3 bg-white text-black rounded-2xl shadow-xl">
          <Zap size={20} />
        </div>
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">
          {user ? user.fullname.firstname + " " + user.fullname.lastname : "Loading..."}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
 <span className="text-zinc-600 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <Mail size={14} /> {user ? user.email : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
