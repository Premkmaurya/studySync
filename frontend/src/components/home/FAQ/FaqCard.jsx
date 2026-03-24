import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FaqCard = ({ q, ans }) => {
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
      className="w-[90%] md:w-[80%] max-w-4xl p-1 md:p-2 rounded-xl from-white to-blue-100 border border-white/50 transition-all duration-125"
    >
      <div
        onClick={openHandler}
        className="w-full h-auto border border-white/20 rounded-xl flex flex-col justify-between px-4 py-4 md:px-8 md:py-6 cursor-pointer"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <p className="text-base md:text-xl text-whitesmoke text-left">{q}</p>
          <div className="flex-shrink-0">
            {!isOpen ? (
              <FaPlus className="w-5 h-5 md:w-6 md:h-6 text-[#cccccc]" />
            ) : (
              <FaMinus className="w-5 h-5 md:w-6 md:h-6 text-[#cccccc]" />
            )}
          </div>
        </div>

        {/* 3. Removed 'hidden' class. Added 'h-0 overflow-hidden' for initial closed state. */}
        {/* Moved margin (mt-6) inside to padding (pt-6) so it animates smoothly with height */}
        <div className="faq-card-answer h-0 overflow-hidden opacity-0">
          <p className="pt-4 md:pt-6 text-sm md:text-base text-zinc-400 text-left transition-all duration-105">{ans}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;