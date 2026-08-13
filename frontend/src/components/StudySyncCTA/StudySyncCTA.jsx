import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";

/**
 * StudySyncCTA
 * High-impact, modern technology CTA section inspired by modern product landing pages.
 * Features a dark technical surface (#05080d), restrained aesthetics, responsive horizontal/vertical composition,
 * and an interactive abstract particle network visual representing flowing knowledge and community convergence.
 */
const StudySyncCTA = ({
  primaryTo,
  primaryText,
  secondaryTo = "/find-groups",
  secondaryText = "Explore groups",
  className = "",
}) => {
  // Access auth state if available in Redux, fallback gracefully
  const user = useSelector((state) => state?.auth?.user);

  const resolvedPrimaryTo = primaryTo || (user ? "/home" : "/register");
  const resolvedPrimaryText = primaryText || (user ? "Go to Dashboard" : "Get started");

  return (
    <section 
      aria-labelledby="cta-heading"
      className={`w-full py-16 sm:py-20 md:py-24 max-w-[1440px] mx-auto ${className}`}
    >
      {/* Outer CTA Card Container */}
      <div className="relative w-full bg-[#02093a] border border-white/10 overflow-hidden shadow-[0px_24px_64px_rgba(0,0,0,0.4)]">
        
        {/* Ambient background subtle depth glow (No heavy glassmorphism/neon) */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,117,222,0.12),rgba(255,255,255,0))]"
          aria-hidden="true"
        />

        {/* Responsive Grid Structure:
            Mobile (< 768px): Vertical stacked (Visual top ~35-40% height, Content bottom)
            Desktop (>= 768px): Horizontal composition (Visual left 45-50%, Content right 50-55%)
        */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center min-h-[500px] lg:min-h-[460px]">
          
          {/* INTERACTIVE VISUAL / NETWORK GRAPH (Mobile: Top, Desktop: Left 45-50% -> col-span-5 or col-span-6) */}
          <div className="md:col-span-5 lg:col-span-6 w-full h-[240px] sm:h-[280px] md:h-full flex items-center justify-center p-2 sm:p-4 border-b md:border-b-0 md:border-r border-white/[0.06]">
            <ParticleNetwork className="w-full h-full" />
          </div>

          {/* CONTENT SECTION (Mobile: Bottom, Desktop: Right 50-55% -> col-span-7 or col-span-6) */}
          <div className="md:col-span-7 lg:col-span-6 w-full p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center items-start text-left">
            
            {/* Eyebrow & Status Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8ba3c7] font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0075de]" aria-hidden="true" />
                START LEARNING TOGETHER
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/70 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0075de] animate-pulse" aria-hidden="true" />
                Open to everyone
              </span>
            </div>

            {/* Headline */}
            <h2 
              id="cta-heading"
              className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] font-bold text-white tracking-[-1.5px] leading-[1.08] mb-4 sm:mb-5"
            >
              Get started with{" "}
              <span className="text-[#0075de] inline-block font-bold">
                StudySync
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-slate-300/90 leading-relaxed max-w-[420px] mb-8 font-normal">
              Find your people, share knowledge, and learn together.
            </p>

            {/* Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Primary CTA - Visually Dominant */}
              <Link
                to={resolvedPrimaryTo}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-medium text-[15px] rounded-[8px] transition-all duration-200 shadow-[0_4px_16px_rgba(0,117,222,0.3)] hover:shadow-[0_6px_20px_rgba(0,117,222,0.45)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080d]"
              >
                <span>{resolvedPrimaryText}</span>
                <ArrowRight className="w-12 h-12 text-white transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>

              {/* Secondary CTA - Subordinate */}
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-white/[0.07] active:bg-white/[0.12] text-white/90 hover:text-white font-medium text-[15px] rounded-[8px] border border-white/20 hover:border-white/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080d]"
              >
                <Compass className="w-12 h-12 text-white/70" aria-hidden="true" />
                <span>{secondaryText}</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default StudySyncCTA;
