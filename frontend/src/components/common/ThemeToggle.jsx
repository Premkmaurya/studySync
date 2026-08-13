import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-[8px] bg-black/[0.04] hover:bg-black/[0.08] text-[#111111] transition-colors border border-black/[0.08]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon size={18} className="text-[#0075de]" />
      ) : (
        <Sun size={18} className="text-[#ffab00]" />
      )}
    </button>
  );
};

export default ThemeToggle;
