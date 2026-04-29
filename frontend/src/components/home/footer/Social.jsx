import React from "react";
import { Link } from "react-router-dom";

// Data structure for the Social links
const footerLinks = [
  {
    title: "Navigation",
    links: ["Home", "About", "Features", "Contact"],
  },
  {
    title: "Documentation",
    links: ["Changelog", "Privacy Policy", "T & C"],
  },
  {
    title: "Other Pages",
    links: ["Pricing", "404"],
  },
  {
    title: "Social Connects",
    links: ["Whatsapp", "Facebook", "Instagram"],
  },
];

const Social = ({theme}) => {
  return (
    <footer className="p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col gap-10">
      <div className="p-2 rounded-3xl">
        <div className={`text-gray-200 rounded-3xl p-8 lg:p-12 shadow-2xl border-4 ${theme === "dark" ? "bg-[#080808] border-[#1a1a1a]" : "bg-zinc-100 border-zinc-200"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-24">
              {footerLinks.map((section, index) => (
                <div key={index} className="space-y-4">
                  {/* Column Title: Bold white text to stand out
                   */}
                  <h3 className={`text-sm font-bold tracking-wider uppercase ${theme === "dark" ? "text-white" : "text-zinc-800"}`}>
                    {section.title}
                  </h3>

                  {/* Links: Normal text with subtle hover effect
                   */}
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={`/${link === "Home" ? "" : link.toLowerCase().replace(/ /g, "-")}`}
                          className={`transition-colors duration-200 ${theme === "dark" ? "text-gray-400 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"}`}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`p-2 border rounded-3xl ${theme === "dark" ? "border-[#2221219f]" : "border-black/10"}`}>
        <div className={`rounded-3xl p-3 lg:p-5 shadow-2xl border-4 ${theme === "dark" ? "bg-[#080808] text-gray-200 border-[#1a1a1a]" : "bg-zinc-100 text-zinc-800 border-zinc-200"}`}>
          <div className="max-w-7xl mx-auto text-xl flex flex-col gap-6">
              <h3>All Copyrights reserve at @StudySync</h3>
              <h3>Designed by Prem maurya</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Social;
