import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    // Base container: Light background, dark text, padding, subtle top shadow
    <footer className="bg-gray-50 w-full text-gray-700 p-8 md:px-12 shadow-inner border-t border-gray-200 font-sans">
      {/* Top section: Mimics Woogency upper area structure */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-300 mb-6">
        {/* Footer Brand (Logo/Tagline) */}
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="text-2xl flex items-center font-bold text-blue-600 mb-1">
            <img className="w-20 h-20" src="/img/logo.png" alt="" />
          </span>
          <span className="text-sm text-gray-500">Learn. Grow. Succeed.</span>
        </div>

        {/* Footer Keywords (COMMUNICATION • RESEARCH • ADAPTATION line) */}
        <div className="flex flex-col justify-end items-end gap-x-6 gap-y-2 text-sm text-gray-500 font-semibold uppercase">
          <div className="flex gap-5">
            <span>• ANNOTATANE</span>
            <span>• ELEGANT</span>
            <span>• KING CLOTHES</span>
          </div>
          <div className="w-[30%] h-10 flex gap-8 items-center mb-10 justify-center pr-5 text-black">
            <a href="">
              <FaInstagram size={22} />
            </a>
            <a href="">
              <FaGithub size={22} />
            </a>
            <a href="">
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section: Mimics Woogency lower area structure */}
      <div className="flex flex-col md:flex-row justify-between py-7 items-start border-y border-black md:items-center">
        {/* Contact Info (Address, Email, Phone) */}
        <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 text-sm  text-gray-500 mb-4 md:mb-0">
          <p className="m-0 border-r border-black pr-4">
            3rd Floor, 34 Logan, 5H Avenue, 12th Lane. LA, USA
          </p>
          {/* Use text-blue-600 for the link color */}
          <a
            href="mailto:hello@studysync.info"
            className="m-0 text-blue-600 hover:text-blue-700 border-r border-black pr-4 transition duration-200"
          >
            hello@studysync.info
          </a>
          <p className="m-0">+000 9872 3847</p>
        </div>

        {/* Footer Navigation */}
        <nav>
          <ul className="flex flex-col md:flex-row gap-x-6 gap-y-2 list-none m-0 p-0 text-sm font-semibold">
            <li>
              <a
                href="#home"
                className="hover:text-blue-600 transition border-r border-black pr-4 duration-200"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-blue-600 transition border-r border-black pr-4 duration-200"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-600 transition border-r border-black pr-4 duration-200"
              >
                CONTACT
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:text-blue-600 transition duration-200"
              >
                PRICING
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
