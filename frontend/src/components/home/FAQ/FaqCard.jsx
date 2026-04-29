import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FaqCard = ({ q, ans, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null); // 1. Create a ref for scoping

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  // 2. Pass the scope and dependencies to useGSAP
  useGSAP(
    () => {
      // Select the specific answer div inside this component
      const answerElement = ".faq-card-answer";

      if (isOpen) {
        gsap.to(answerElement, {
          height: "auto",
          opacity: 1,
          duration: 0.5, // 0.5s is usually snappier for UI
          ease: "power2.out",
        });
      } else {
        gsap.to(answerElement, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    },
    { scope: containerRef, dependencies: [isOpen] },
  );

  return (
    <div
      ref={containerRef}
      className={`w-[90%] md:w-[80%] max-w-4xl p-1 md:p-2 rounded-xl transition-all duration-125 ${theme === "dark" ? "border border-white/50 from-white to-blue-100" : "border border-black/10"}`}
    >
      <div
        onClick={openHandler}
        className={`w-full h-auto border rounded-xl flex flex-col justify-between px-4 py-4 md:px-8 md:py-6 cursor-pointer ${theme === "dark" ? "border-white/20 hover:bg-white/5" : "border-black/20 hover:bg-black/5"}`}
      >
        <div className="w-full flex justify-between items-center gap-4">
          <p className={`text-base md:text-xl text-left ${theme === "dark" ? "text-whitesmoke" : "text-zinc-800"}`}>{q}</p>
          <div className="flex-shrink-0">
            {!isOpen ? (
              <FaPlus className={`w-5 h-5 md:w-6 md:h-6 ${theme === "dark" ? "text-[#cccccc]" : "text-zinc-600"}`} />
            ) : (
              <FaMinus className={`w-5 h-5 md:w-6 md:h-6 ${theme === "dark" ? "text-[#cccccc]" : "text-zinc-600"}`} />
            )}
          </div>
        </div>

        {/* 3. Removed 'hidden' class. Added 'h-0 overflow-hidden' for initial closed state. */}
        {/* Moved margin (mt-6) inside to padding (pt-6) so it animates smoothly with height */}
        <div className="faq-card-answer h-0 overflow-hidden opacity-0">
          <p className={`pt-4 md:pt-6 text-sm md:text-base text-left transition-all duration-105 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>{ans}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;