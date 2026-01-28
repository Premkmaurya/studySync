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
      ref={containerRef} // Attach the scope ref here
      className="w-[80%] p-2 rounded-xl hover:bg-linear-to-t from-white to-blue-100 border border-black/50 transition-all duration-125"
    >
      <div
        onClick={openHandler}
        className="w-full h-auto border border-black/20 rounded-xl flex flex-col justify-between px-8 py-6 cursor-pointer"
      >
        <div className="w-full flex justify-between items-center">
          <p className="text-xl text-black/70">{q}</p>
          {!isOpen ? (
            <FaPlus size={24} color="#cccccc" />
          ) : (
            <FaMinus size={24} color="#cccccc" />
          )}
        </div>

        {/* 3. Removed 'hidden' class. Added 'h-0 overflow-hidden' for initial closed state. */}
        {/* Moved margin (mt-6) inside to padding (pt-6) so it animates smoothly with height */}
        <div className="faq-card-answer h-0 overflow-hidden opacity-0">
          <p className="pt-6 transition-all duration-105">{ans}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;