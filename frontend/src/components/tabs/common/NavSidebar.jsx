import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  FileText,
  Plus,
  Sparkles,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Explore", path: "/find-groups", icon: Compass },
    { label: "Notes", path: "/saved-notes", icon: FileText },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ WebkitTransform: 'translate3d(0,0,0)' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-5xl w-[95%]"
    >
      <motion.div
        layout
        className="px-6 py-4 md:px-8 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden"
      >
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo/Brand */}
          <NavLink to="/home" className="flex items-center gap-2 group relative z-[110]">
            <div className="p-2.5 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-all">
              <Sparkles size={20} className="text-indigo-400" />
            </div>
            <span className="text-sm font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
              studySync
            </span>
          </NavLink>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white hover:border-white/20"
                  }`
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right: Action Button + Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-3 relative z-[110]">
            <NavLink
              to="/create-group"
              className="px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-white text-black hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
            >
              <Plus size={16} />
              <span>New Hub</span>
            </NavLink>

            <NavLink
              to="/profile"
              className="relative group block"
            >
              <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-all">
                <img src="https://i.pravatar.cc/100?u=current_user" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full animate-pulse" />
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[110] p-2 text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-4 md:hidden relative z-[105]"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2 ${
                          isActive
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white hover:border-white/20"
                        }`
                      }
                    >
                      <item.icon size={18} />
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight size={16} />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-col gap-3 pt-4 border-t border-white/10"
              >
                <NavLink
                  to="/create-group"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <Plus size={16} className="mr-2" />
                  Create New Hub
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-transparent border-2 border-zinc-700 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all active:scale-95"
                >
                  My Profile
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;
