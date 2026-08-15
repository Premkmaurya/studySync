import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../../../motion/motionTokens";

/**
 * Knowledge Library Hero Header
 * Editorial knowledge hero with connected note fragment SVG visual accent.
 */
const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
      className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08] mb-6 overflow-hidden"
    >
      {/* Background Connected Note Fragments SVG Accent */}
      <div className="absolute right-0 top-0 -z-10 opacity-30 pointer-events-none hidden md:block">
        <svg width="280" height="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="180" y="20" width="70" height="45" rx="6" fill="#0075de" opacity="0.15" stroke="#0075de" strokeWidth="1" />
          <rect x="100" y="65" width="65" height="40" rx="6" fill="#ffb110" opacity="0.15" stroke="#ffb110" strokeWidth="1" />
          <rect x="200" y="75" width="60" height="35" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
          <line x1="180" y1="42" x2="132" y2="65" stroke="#0075de" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1="165" y1="85" x2="200" y2="90" stroke="#ffb110" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        </svg>
      </div>

      {/* Hero Headline & Statement */}
      <div className="space-y-2 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> KNOWLEDGE LIBRARY
          </span>
          <span className="text-[12px] font-mono text-[#757575]">
            • Personal Repository
          </span>
        </div>

        <h1 className="text-[36px] sm:text-[52px] font-bold text-[#000000] tracking-[-2px] leading-[1.05]">
          Everything you've learned, in one place.
        </h1>

        <p className="text-[15px] sm:text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.5]">
          Search, revisit, and build on the knowledge notes you've collected across your study groups.
        </p>
      </div>
    </motion.div>
  );
};

export default Header;
