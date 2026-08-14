import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, Users, MessageSquare, BookOpen, Bot, Sparkles, Folder, CheckCircle2 } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * FeaturesHero
 * Large editorial hero component featuring line-based headline reveal and a layered StudySync product ecosystem visual.
 */
const FeaturesHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const headlineLines = [
    "Everything you need",
    "to learn together.",
  ];

  return (
    <section className="pt-28 mt-[3rem] sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">


      {/* 100ms — Headline Line-Based Reveal */}
      <h1 className="text-[40px] sm:text-[62px] md:text-[76px] font-bold text-[#000000] tracking-[-2.5px] leading-[1.05] max-w-4xl mb-6">
        {headlineLines.map((line, index) => (
          <div key={index} className="overflow-hidden py-0.5">
            <motion.div
              initial={shouldReduceMotion ? {} : { y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: DURATION.STORYTELLING,
                delay: 0.1 + index * 0.08,
                ease: EASING.SMOOTH,
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </h1>

      {/* 250ms — Supporting Copy */}
      <motion.p
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DURATION.STORYTELLING,
          delay: 0.25,
          ease: EASING.SMOOTH,
        }}
        className="text-[18px] sm:text-[21px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.55] max-w-2xl mb-10"
      >
        Find people who share your goals, discuss ideas, build shared knowledge, and get help when you need it.
      </motion.p>

      {/* 350ms — Action CTAs */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DURATION.STORYTELLING,
          delay: 0.35,
          ease: EASING.SMOOTH,
        }}
        className="flex flex-wrap justify-center items-center gap-4 mb-16"
      >
        <Link
          to="/register"
          className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-semibold text-[15px] rounded-[8px] transition-all duration-200 shadow-sm hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
        >
          <span>Get started</span>
          <ArrowRight className="w-16 h-16 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/find-groups"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white hover:bg-black/[0.03] text-[#111111] font-semibold text-[15px] rounded-[8px] border border-black/15 transition-all duration-200 hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
        >
          <Compass className="w-16 h-16 text-[#757575]" />
          <span>Explore groups</span>
        </Link>
      </motion.div>

      {/* 450ms — Connected Product Ecosystem Visual */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: DURATION.STORYTELLING,
          delay: 0.45,
          ease: EASING.SMOOTH,
        }}
        className="w-full max-w-5xl bg-white border border-black/[0.08] rounded-[20px] shadow-[0px_12px_40px_rgba(0,0,0,0.06)] overflow-hidden text-left p-4 sm:p-6"
      >
        {/* Top Product Window Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            <span className="text-[12px] font-mono text-[#757575] ml-2 hidden sm:inline-block">
              studySync / Product Ecosystem Overview
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de]">
            Connected Infrastructure
          </span>
        </div>

        {/* Ecosystem Nodes Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { label: "Study Groups", icon: Users, note: "Discover & Join", color: "#0075de" },
            { label: "Discussion", icon: MessageSquare, note: "Ask & Clarify", color: "#097fe8" },
            { label: "Shared Notes", icon: BookOpen, note: "Markdown Library", color: "#ffb110" },
            { label: "AI Helper", icon: Bot, note: "Contextual Support", color: "#10b981" },
            { label: "Knowledge", icon: Sparkles, note: "Revisit & Master", color: "#b18164" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-[#f6f5f4] rounded-[14px] p-4 border border-black/[0.06] flex flex-col items-center text-center gap-2 hover:border-[#0075de]/30 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs border border-black/[0.06]"
                  style={{ color: item.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[13px] font-bold text-[#111111]">{item.label}</span>
                <span className="text-[11px] font-mono text-[#757575]">{item.note}</span>
              </div>
            );
          })}
        </div>

      </motion.div>

    </section>
  );
};

export default FeaturesHero;
