import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Menu, X, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Features", path: "/features" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 bg-black/80 backdrop-blur-2xl border-b ${
        scrolled || isOpen
          ? "border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-10 max-w-7xl mx-auto">
        {/* 1. LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2 group relative z-[110]">
          <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
            <Bot className="text-indigo-400" size={22} />
          </div>
          <span className="text-xl font-black text-white tracking-tight uppercase">
            StudySync
          </span>
        </Link>

        {/* 2. DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/home"
              className="flex items-center px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Explore
            </Link>
          )}
        </div>

        {/* 3. MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[110] p-2 text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 4. MOBILE DRAWER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-0 left-0 w-full min-h-screen bg-[#050505] flex flex-col pt-32 px-8 z-[105] overflow-hidden"
            >
              {/* Background Glows for Mobile Menu */}
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex flex-col gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="text-4xl font-black text-white tracking-tighter uppercase flex items-center justify-between group"
                    >
                      {item.label}
                      <ArrowRight
                        size={24}
                        className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12"
                >
                  {!user ? (
                    <Link
                      to="/login"
                      className="flex items-center justify-center w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-2xl hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
                    >
                      Login
                    </Link>
                  ) : (
                    <Link
                      to="/home"
                      className="flex items-center justify-center w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-2xl hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
                    >
                      Explore
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
