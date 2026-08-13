import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * StudySync Navbar
 * Floating pill-style top navigation bar inspired by modern editorial tech landing pages.
 * Features a left brand mark, a grouped right navigation cluster with a high-contrast primary CTA,
 * light translucent surface, and responsive mobile menu.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/find-groups" },
    { label: "Features", path: "/features" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none"
      aria-label="Main navigation header"
    >
      {/* Floating Outer Container */}
      <div 
        className={`pointer-events-auto mx-auto w-[94%] sm:w-[95%] max-w-[1280px] h-14 sm:h-[58px] px-4 sm:px-6 rounded-[14px] sm:rounded-[16px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* BRAND MARK (Left) */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de] rounded-md"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#097fe8] transition-all duration-200">
            <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-[17px] sm:text-[18px] tracking-[-0.4px] text-[#000000]">
            study<span className="text-[#0075de]">Sync</span>
          </span>
        </Link>

        {/* DESKTOP GROUPED NAVIGATION CLUSTER (Right) */}
        <div className="hidden md:flex items-center gap-2 bg-black/[0.03] p-1 rounded-[12px] border border-black/[0.04]">
          {/* Nav Links */}
          <nav className="flex items-center gap-1 px-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.02em] rounded-[8px] transition-all duration-150 ${
                    isActive
                      ? "bg-white text-[#000000] shadow-sm"
                      : "text-[#615d59] hover:text-[#000000] hover:bg-white/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* High-Contrast Primary CTA Button */}
          <div className="pl-1">
            {!user ? (
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#05080d] hover:bg-[#151c28] active:bg-[#000000] text-white text-[13px] font-semibold rounded-[10px] transition-all duration-200 shadow-sm hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
              >
                <span>Get started</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />
              </Link>
            ) : (
              <Link
                to="/home"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[13px] font-semibold rounded-[10px] transition-all duration-200 shadow-sm hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/90" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS & HAMBURGER */}
        <div className="flex md:hidden items-center gap-2">
          {!user ? (
            <Link
              to="/register"
              className="px-3.5 py-1.5 bg-[#05080d] text-white text-[12px] font-semibold rounded-[8px] shadow-sm"
            >
              Get started
            </Link>
          ) : (
            <Link
              to="/home"
              className="px-3.5 py-1.5 bg-[#0075de] text-white text-[12px] font-semibold rounded-[8px] shadow-sm"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-[8px] text-[#111111] hover:bg-black/5 active:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="pointer-events-auto md:hidden mx-auto w-[94%] max-w-[1280px] mt-2 bg-white/95 backdrop-blur-md rounded-[16px] border border-black/10 p-5 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2.5 rounded-[10px] text-[15px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#0075de]/10 text-[#0075de] font-semibold"
                      : "text-[#111111] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-black/[0.08] flex flex-col gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="w-full py-2.5 text-center text-[14px] font-semibold text-[#111111] rounded-[10px] border border-black/15 hover:bg-black/5 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="w-full py-2.5 text-center text-[14px] font-semibold text-white bg-[#05080d] rounded-[10px] shadow-sm hover:bg-[#151c28] transition-colors"
                >
                  Get started
                </Link>
              </>
            ) : (
              <Link
                to="/home"
                className="w-full py-2.5 text-center text-[14px] font-semibold text-white bg-[#0075de] rounded-[10px] shadow-sm hover:bg-[#097fe8] transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
