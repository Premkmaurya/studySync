import React from "react";

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

const Social = () => {
  return (
    <footer className=" p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col gap-10">
      <div className="p-2 border border-[#2221219f] rounded-3xl">
        <div className="bg-black text-gray-200 rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-24">
              {footerLinks.map((section, index) => (
                <div key={index} className="space-y-4">
                  {/* Column Title: Bold white text to stand out
                   */}
                  <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                    {section.title}
                  </h3>

                  {/* Links: Normal text with subtle hover effect
                   */}
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={`#${link.toLowerCase().replace(" ", "-")}`}
                          className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 border border-[#2221219f] rounded-3xl">
        <div className="bg-black text-gray-200 rounded-3xl p-3 lg:p-5 shadow-2xl border-4 border-[#1a1a1a]">
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
