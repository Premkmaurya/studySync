import React from "react";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../../../../motion/motionTokens";

/**
 * Directory Hero Header
 * Editorial discovery hero with SVG connected topic node accent and aggregate community statement.
 */
const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
      className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08] mb-8 overflow-hidden"
    >
      {/* Background Connected Topic Node Visual Accent */}
      <div className="absolute right-0 top-0 -z-10 opacity-30 pointer-events-none hidden md:block">
        <svg width="300" height="130" viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="35" r="5" fill="#0075de" />
          <circle cx="70" cy="90" r="4" fill="#6366f1" />
          <circle cx="230" cy="95" r="4" fill="#f59e0b" />
          <line x1="150" y1="35" x2="70" y2="90" stroke="#0075de" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="150" y1="35" x2="230" y2="95" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <text x="160" y="32" fill="#0075de" fontSize="10" fontFamily="monospace" fontWeight="bold">Cybersecurity</text>
          <text x="25" y="105" fill="#6366f1" fontSize="10" fontFamily="monospace" fontWeight="bold">AI & ML</text>
          <text x="220" y="112" fill="#d97706" fontSize="10" fontFamily="monospace" fontWeight="bold">Design</text>
        </svg>
      </div>

      {/* Hero Headline & Supporting Statement */}
      <div className="space-y-2 max-w-3xl">
        <div className="flex items-left flex-col sm:items-center sm:flex-row gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 w-fit rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> GROUP DIRECTORY
          </span>
          <span className="text-[12px] font-mono text-[#757575]">
            • Collaborative Learning Communities
          </span>
        </div>

        <h1 className="text-[36px] sm:text-[52px] font-bold text-[#000000] tracking-[-2px] leading-[1.05]">
          Find your people.
        </h1>

        <p className="text-[15px] sm:text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.5]">
          Discover study groups built around the subjects, skills, and course concepts you want to explore.
        </p>
      </div>
    </motion.div>
  );
};

export default Header;