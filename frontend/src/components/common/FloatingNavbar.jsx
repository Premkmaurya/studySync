import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, Sparkles, ArrowRight, Plus } from "lucide-react";
import Avatar from "../design-system/Avatar";

/**
 * FloatingNavbar Component
 * A centered, compact floating pill navigation control inspired by modern minimalist products.
 * Positioned fixed top-5 left-1/2 -translate-x-1/2 with backdrop blur, rounded container,
 * restrained blue active states, subtle floating shadow, and custom cursor protection.
 * Supports both "public" and "authenticated" variants.
 */
const FloatingNavbar = ({ variant = "public" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);

  // Throttled scroll state handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine navigation items & routes based on variant / user state
  const isAuthView = variant === "authenticated" || (user && location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/features" && location.pathname !== "/contact");

  const publicNavItems = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/find-groups" },
    { label: "Features", path: "/features" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const authNavItems = [
    { label: "Home", path: "/home" },
    { label: "Explore", path: "/find-groups" },
    { label: "Notes", path: "/saved-notes" },
  ];

  const navItems = isAuthView ? authNavItems : publicNavItems;
  const displayName = user?.fullname?.firstname || user?.username || "Account";

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[calc(100vw-24px)] pointer-events-none transition-all duration-300">
      
      {/* Centered Floating Pill Shell */}
      <div
        className={`pointer-events-auto bg-white/92 backdrop-blur-md border rounded-[16px] px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-4 sm:gap-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-white/96 border-black/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.09)]"
            : "bg-white/90 border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        }`}
      >
        
        {/* BRAND LOGO MARK */}
        <Link
          to={user ? "/home" : "/"}
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de] rounded-md shrink-0"
        >
          <div className="w-24 h-24 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center shadow-2xs group-hover:bg-[#097fe8] transition-colors">
            <Sparkles className="w-16 h-16 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-[16px] sm:text-[17px] tracking-[-0.4px] text-[#000000] select-none">
            study<span className="text-[#0075de]">Sync</span>
          </span>
        </Link>

        {/* DESKTOP CENTERED NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`px-3 py-1.5 text-[13px] font-semibold rounded-[8px] transition-all duration-150 ${
                  isActive
                    ? "bg-[#eaf4ff] text-[#0075de] shadow-2xs"
                    : "text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04]"
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT ACTION CLUSTER */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {!isAuthView ? (
            !user ? (
              <Link
                to="/register"
                data-cursor-ignore="true"
                className="group inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
              >
                <span>Get started</span>
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link
                to="/home"
                data-cursor-ignore="true"
                className="group inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            )
          ) : (
            <>
              <Link to="/create-group" data-cursor-ignore="true">
                <button className="px-3.5 py-1.5 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[12px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5 flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create</span>
                </button>
              </Link>

              <Link
                to="/profile"
                data-cursor-ignore="true"
                className={`flex items-center gap-2 px-2.5 py-1 rounded-[8px] border transition-all duration-150 ${
                  location.pathname === "/profile"
                    ? "bg-white border-[#0075de]/40 text-[#0075de] shadow-2xs"
                    : "bg-white/60 border-black/[0.08] hover:bg-white text-[#111111]"
                }`}
              >
                <Avatar
                  name={displayName}
                  size="sm"
                  borderColor={location.pathname === "/profile" ? "#0075de" : "transparent"}
                />
                <span className="text-[12px] font-bold tracking-tight">
                  {displayName}
                </span>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE CONTROLS & HAMBURGER */}
        <div className="flex md:hidden items-center gap-2">
          {!isAuthView && !user && (
            <Link
              to="/register"
              data-cursor-ignore="true"
              className="px-3 py-1 bg-[#0075de] text-white text-[12px] font-semibold rounded-[6px]"
            >
              Get started
            </Link>
          )}

          {isAuthView && (
            <Link to="/create-group" data-cursor-ignore="true">
              <button className="px-2.5 py-1 bg-[#0075de] text-white text-[12px] font-semibold rounded-[6px] flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Create</span>
              </button>
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="p-1 rounded-[6px] text-[#111111] hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDABLE MENU (Attached to Floating Pill) */}
      {isOpen && (
        <div className="pointer-events-auto md:hidden w-full mt-2 bg-white/96 backdrop-blur-md rounded-[16px] border border-black/[0.1] p-4 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-[8px] text-[14px] font-semibold transition-colors ${
                    isActive
                      ? "bg-[#eaf4ff] text-[#0075de]"
                      : "text-[#111111] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2.5 border-t border-black/[0.08] flex flex-col gap-2">
            {!user ? (
              <Link
                to="/register"
                data-cursor-ignore="true"
                className="w-full py-2 text-center text-[13px] font-semibold text-white bg-[#0075de] rounded-[8px] shadow-2xs"
              >
                Get started →
              </Link>
            ) : (
              <Link
                to="/profile"
                data-cursor-ignore="true"
                className="flex items-center justify-between px-3 py-2 rounded-[8px] bg-[#f6f5f4] border border-black/[0.08] text-[13px] font-semibold text-[#111111]"
              >
                <div className="flex items-center gap-2">
                  <Avatar name={displayName} size="sm" />
                  <span>{displayName} (Profile)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#757575]" />
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default FloatingNavbar;
