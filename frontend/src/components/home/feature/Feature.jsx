import React from "react";

export default function Feature() {
  return (
    <div className="w-full py-16 px-5 flex flex-col items-center justify-center bg-[#f6f5f4] text-[#000000]">
      <h2 className="text-3xl md:text-4xl font-bold text-[#000000] text-center tracking-[-0.8px]">
        Integrate & Automate Effortlessly
      </h2>

      <p className="text-center text-[#615d59] max-w-xl mt-3 text-[16px] leading-relaxed">
        From connecting with study groups to organizing your markdown notes, StudySync streamlines learning.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {[
          "https://framerusercontent.com/images/yw300BfNoo7QuILH3YwnXIGFUg.svg",
          "https://framerusercontent.com/images/oNtsBWjFbsLxfLOZMVt8C5HVEI.svg",
          "https://framerusercontent.com/images/Oo4CsXTZC6GtPr09sGUibuk.svg",
          "https://framerusercontent.com/images/OX7vNAfYiPqXJtSgJa7LQ4oVwag.svg",
        ].map((icon, i) => (
          <div
            key={i}
            className="p-3 bg-white border border-black/[0.08] rounded-[12px]"
          >
            <img
              src={icon}
              alt="integration icon"
              className="w-16 h-16 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
