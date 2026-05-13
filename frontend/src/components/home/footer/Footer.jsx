import React, { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Social from "./Social";

// Ensure proper dynamic imports and fallback handling
const FaInstagram = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaInstagram })));
const FaGithub = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaGithub })));
const FaLinkedin = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaLinkedin })));

// Add error boundary for better handling of dynamic imports
const IconFallback = () => <div>Loading icon...</div>;

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode);


  return (
    <div className={`min-w-screen overflow-hidden ${theme === "dark" ? "bg-[#080808]" : "bg-[#f1f1f1]"}`}>
      <Social theme={theme} />
      <div className="w-full px-5 flex items-center justify-center">
        <h1 className="uppercase text-[14vw] leading-none font-bold bg-linear-to-b from-[#b1c9f5] via-[#AAC4F5] to-[#111] bg-clip-text text-transparent">
          StudySync
        </h1>
      </div>
      <Suspense fallback={<IconFallback />}>
        <div className="flex justify-center space-x-4">
          <FaInstagram />
          <FaGithub />
          <FaLinkedin />
        </div>
      </Suspense>
      
      {/* Copyright */}
      <div className={`text-center py-6 border-t ${
        theme === "light" ? "border-black/10 text-gray-500" : "border-white/10 text-zinc-500"
      }`}>
        <p className="text-xs font-medium">
          © {new Date().getFullYear()} StudySync. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default memo(Footer);
