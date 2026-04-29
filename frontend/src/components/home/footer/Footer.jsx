import React from "react";
import { useSelector } from "react-redux";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Social from "./Social";

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className={`min-w-screen min-h-screen overflow-hidden ${theme === "dark" ? "bg-[#080808]" : "bg-[#f1f1f1]"}`}>
      <Social theme={theme} />
      <div className="w-full px-5 flex items-center justify-center">
        <h1 className="uppercase text-[14vw] leading-none font-bold bg-linear-to-b from-[#b1c9f5] via-[#AAC4F5] to-[#111] bg-clip-text text-transparent">
          StudySync
        </h1>
      </div>
    </div>
  );
};

export default Footer;
