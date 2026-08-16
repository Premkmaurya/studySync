import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles, ArrowRight, Plus } from "lucide-react";
import Avatar from "../design-system/Avatar";
import StaggeredMenu from "../ui/StaggeredMenu";

/**
 * FloatingNavbar Component
 * Renders desktop floating pill navigation for desktop mode (md+)
 * and integrates React Bits <StaggeredMenu /> for mobile mode (<md).
 */
const FloatingNavbar = ({ variant = "public" }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  // Throttled scroll state handler for desktop navbar
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

  // Determine navigation items & routes based on variant / user state
  const isAuthView = variant === "authenticated" || (user && location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/features" && location.pathname !== "/contact");

  const publicNavItems = [
    { label: "Home", path: "/" },
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

  // Prepare staggered menu items for mobile navigation
  const staggeredItems = navItems.map((item) => ({
    label: item.label,
    link: item.path,
    ariaLabel: `Go to ${item.label}`,
    onClick: (e) => {
      e.preventDefault();
      navigate(item.path);
    },
  }));

  if (isAuthView) {
    staggeredItems.push({
      label: "Profile",
      link: "/profile",
      ariaLabel: "View profile",
      onClick: (e) => {
        e.preventDefault();
        navigate("/profile");
      },
    });
    staggeredItems.push({
      label: "Create Group",
      link: "/create-group",
      ariaLabel: "Create a new group",
      onClick: (e) => {
        e.preventDefault();
        navigate("/create-group");
      },
    });
  } else if (!user) {
    staggeredItems.push({
      label: "Get Started",
      link: "/register",
      ariaLabel: "Get started with StudySync",
      onClick: (e) => {
        e.preventDefault();
        navigate("/register");
      },
    });
  }

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "Twitter", link: "https://twitter.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <>
      {/* MOBILE STAGGERED NAVIGATION MENU (React Bits - Mobile Only) */}
      <div className="block md:hidden bg-white/60 backdrop-blur-[10px]">
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={staggeredItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#0075de"
          openMenuButtonColor="#0075de"
          accentColor="#0075de"
          colors={["#eaf4ff", "#0075de"]}
          logoUrl={
            <Link to={user ? "/home" : "/"} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center shadow-2xs">
                <Sparkles className="w-16 h-16 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[16px] tracking-[-0.4px] text-[#111827]">
                study<span className="text-[#0075de]">Sync</span>
              </span>
            </Link>
          }
        />
      </div>

      {/* DESKTOP CENTERED FLOATING PILL NAVIGATION (Desktop Only) */}
      <header className="hidden md:block fixed top-5 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[calc(100vw-24px)] pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto bg-white/92 backdrop-blur-md border rounded-[16px] px-5 py-2.5 flex items-center justify-between gap-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            <div className="w-7 h-7 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center shadow-2xs group-hover:bg-[#097fe8] transition-colors">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-[17px] tracking-[-0.4px] text-[#000000] select-none">
              study<span className="text-[#0075de]">Sync</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="flex items-center gap-1" aria-label="Main Navigation">
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

          {/* DESKTOP RIGHT ACTION CLUSTER */}
          <div className="flex items-center gap-2.5 shrink-0">
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
        </div>
      </header>
    </>
  );
};

export default FloatingNavbar;
