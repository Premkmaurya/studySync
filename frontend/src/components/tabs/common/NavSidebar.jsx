import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ WebkitTransform: 'translate3d(0,0,0)' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-5xl w-[95%]"
    >
      <div className="px-8 py-4 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
        
        {/* Left: Logo/Brand */}
        <NavLink to="/home" className="flex items-center gap-2 group">
          <div className="p-2.5 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-all">
            <Sparkles size={20} className="text-indigo-400" />
          </div>
          <span className="text-sm font-black tracking-tighter text-white hidden sm:block group-hover:text-indigo-400 transition-colors">
            studySync
          </span>
        </NavLink>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                isActive
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white hover:border-white/20"
              }`
            }
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/find-groups"
            className={({ isActive }) =>
              `px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                isActive
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white hover:border-white/20"
              }`
            }
          >
            <Compass size={16} />
            <span className="hidden sm:inline">Explore</span>
          </NavLink>

          <NavLink
            to="/saved-notes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                isActive
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white hover:border-white/20"
              }`
            }
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Notes</span>
          </NavLink>
        </div>

        {/* Right: Action Button + Profile */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/create-group"
            className="px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-white text-black hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Hub</span>
          </NavLink>

          <NavLink
            to="/profile"
            className="relative group"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-all">
              <img src="https://i.pravatar.cc/100?u=current_user" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full animate-pulse" />
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
