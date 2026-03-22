import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  FileText,
  Plus,
} from "lucide-react";

const NavItem = ({
  to,
  icon: Icon,
  label,
  color = "indigo",
  isAction = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive }) => `
        relative group flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300
        ${isActive && !isAction ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-500 hover:text-white"}
        ${isAction ? "bg-white text-black hover:bg-fuchsia-500 hover:text-white shadow-lg shadow-white/5" : ""}
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Pill */}
          {isActive && !isAction && (
            <motion.div
              layoutId="active-pill"
              className="absolute -left-4 w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"
            />
          )}

          <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />

          {/* Spatial Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 20, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl pointer-events-none z-[100] whitespace-nowrap"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  {label}
                </span>
                {/* Tooltip Arrow */}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-white/10 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <motion.aside
      drag
      dragMomentum={false}
      style={{ WebkitTransform: 'translate3d(0,0,0)' }}
      className="fixed right-6 top-[55%] -translate-y-1/2 h-[85vh] w-20 z-[100] flex flex-col items-center py-8 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
    >
      {/* 2. Primary Navigation */}
      <div className="flex-1 flex flex-col items-center gap-6">
        <NavItem to="/home" icon={Home} label="Home" />
        <NavItem to="/find-groups" icon={Compass} label="Explore" />
        <NavItem to="/saved-notes" icon={FileText} label="Workspace" />

        <div className="w-8 h-[1px] bg-white/5 my-2" />

        {/* The Action Button */}
        <NavItem to="/create-group" icon={Plus} label="New Hub" isAction />
      </div>

      {/* 3. System Actions */}
      <div className="flex flex-col items-center gap-6 mt-auto">
        <NavLink to="/profile" className="relative group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-indigo-500/50 transition-all shadow-lg">
            <img src="https://i.pravatar.cc/100?u=current_user" alt="User" />
          </div>
          {/* Online Status */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full shadow-lg" />
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
