import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import StaggeredMenu from "../ui/StaggeredMenu";

/**
 * FloatingNavbar Component
 * Renders desktop floating pill navigation for desktop mode (md+)
 * and integrates React Bits <StaggeredMenu /> for mobile mode (<md).
 */
const FloatingNavbar = ({ variant = "public" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

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
    { label: "Notes", path: "/notes" },
  ];

  const navItems = isAuthView ? authNavItems : publicNavItems;

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
    <div className="block">
      <StaggeredMenu
        className="nav-glass"
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
            <div className="w-7 h-7 rounded-[8px] bg-notion-blue text-white flex items-center justify-center shadow-2xs">
              <Sparkles className="w-16 h-16 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-[16px] tracking-[-0.4px] text-[#111827]">
              study<span className="text-notion-blue">Sync</span>
            </span>
          </Link>
        }
      />
    </div>
  );
};

export default FloatingNavbar;
