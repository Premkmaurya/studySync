import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  Compass,
  FileText,
  Plus,
  BookOpen,
  User,
  Menu,
  X,
} from "lucide-react";
import Button from "../../design-system/Button";
import Avatar from "../../design-system/Avatar";

const NavSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Explore", path: "/find-groups", icon: Compass },
    { label: "Notes", path: "/saved-notes", icon: FileText },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-[100] bg-[#f6f5f4] border-b border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Main Nav */}
        <div className="flex items-center gap-10">
          <NavLink to="/home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center font-bold text-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-[18px] tracking-[-0.3px] text-[#000000]">
              studySync
            </span>
          </NavLink>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-[8px] text-[14px] font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-[#e6f3fe] text-[#0075de]"
                      : "text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04]"
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: Actions & User Avatar */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/create-group">
            <Button variant="ghost" size="sm" icon={Plus}>
              Create Group
            </Button>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-1 rounded-[8px] transition-colors ${
                isActive ? "bg-black/[0.05]" : "hover:bg-black/[0.04]"
              }`
            }
          >
            <Avatar
              name={user?.username || user?.email || "User"}
              size="sm"
              borderColor={location.pathname === "/profile" ? "#0075de" : "#e6f3fe"}
            />
            <span className="text-[14px] font-medium text-[#111111] pr-1">
              {user?.username || "Account"}
            </span>
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-[6px] text-[#111111] hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#f6f5f4] border-b border-black/[0.08] px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-[8px] text-[15px] font-medium flex items-center gap-3 ${
                  isActive
                    ? "bg-[#e6f3fe] text-[#0075de]"
                    : "text-[#615d59] hover:bg-black/5"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-2">
            <NavLink to="/create-group">
              <Button variant="ghost" fullWidth icon={Plus}>
                Create Group
              </Button>
            </NavLink>
            <NavLink to="/profile">
              <Button variant="outlined" fullWidth icon={User}>
                Profile ({user?.username || "Account"})
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavSidebar;
