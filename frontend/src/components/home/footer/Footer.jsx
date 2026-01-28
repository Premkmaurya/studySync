import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Social from "./Social";

const Footer = () => {
  return (
    <div className="w-screen min-h-screen mt-16 bg-black overflow-hidden">
      <Social />
      <div className="w-full px-5 flex items-center justify-center">
        <h1 className="uppercase text-[14vw] leading-none font-bold bg-linear-to-b from-[#b1c9f5] via-[#AAC4F5] to-[#111] bg-clip-text text-transparent">
          StudySync
        </h1>
      </div>
    </div>
  );
};

export default Footer;
