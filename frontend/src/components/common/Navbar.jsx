import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Bot } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { label: "about", path: "/about", hasDropdown: false },
    { label: "features", path: "/features", hasDropdown: false },
    { label: "Contact", path: "/contact", hasDropdown: false },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-transparent backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-6 md:px-12 h-16 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <Bot className="text-indigo-400" size={24} />
          <span className="text-lg font-semibold text-white tracking-tight">
            StudySync
          </span>
        </Link>

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-1 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown size={14} className="text-zinc-500 mt-[1px]" />
              )}
            </Link>
          ))}
          <Link
            to="/login"
            className="flex items-center px-5 py-2 bg-white text-black text-[13px] font-medium rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
