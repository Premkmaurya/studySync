import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, Users, Lightbulb, MessageSquare, BookOpen, TrendingUp } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * AboutHero
 * Large typography-led hero with line-based text reveal and abstract connected learning visual.
 */
const AboutHero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Headline lines for line-based reveal
  const headlineLines = [
    "Learning shouldn't",
    "happen in isolation.",
  ];

  // Visual concept nodes: students -> ideas -> discussion -> knowledge -> growth
  const conceptNodes = [
    { id: "students", label: "Students", icon: Users, color: "#0075de" },
    { id: "ideas", label: "Ideas", icon: Lightbulb, color: "#ffb110" },
    { id: "discussion", label: "Discussion", icon: MessageSquare, color: "#097fe8" },
    { id: "knowledge", label: "Knowledge", icon: BookOpen, color: "#b18164" },
    { id: "growth", label: "Growth", icon: TrendingUp, color: "#10b981" },
  ];

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="flex flex-col items-center text-center mt-[3rem]">

        {/* Headline — Line-Based Overflow Reveal */}
        <h1 className="text-[40px] sm:text-[60px] md:text-[76px] font-bold text-[#000000] tracking-[-2.5px] leading-[1.06] max-w-4xl">
          {headlineLines.map((line, index) => (
            <div key={index} className="overflow-hidden py-0.5">
              <motion.div
                initial={shouldReduceMotion ? {} : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: DURATION.STORYTELLING,
                  delay: index * 0.1,
                  ease: EASING.SMOOTH,
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.STORYTELLING,
            delay: 0.28,
            ease: EASING.SMOOTH,
          }}
          className="text-[18px] sm:text-[21px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.55] max-w-2xl mb-10"
        >
          StudySync brings students together around the subjects, ideas, and goals they care about — giving them a place to learn, share knowledge, and grow together.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.STORYTELLING,
            delay: 0.38,
            ease: EASING.SMOOTH,
          }}
          className="flex flex-wrap justify-center items-center gap-4 mb-16"
        >
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-medium text-[15px] rounded-[8px] transition-all duration-200 shadow-sm hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
          >
            <span>Get started</span>
            <ArrowRight className="w-16 h-16 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/find-groups"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white hover:bg-black/[0.03] text-[#111111] font-medium text-[15px] rounded-[8px] border border-black/15 transition-all duration-200 hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
          >
            <Compass className="w-16 h-16 text-[#757575]" />
            <span>Explore groups</span>
          </Link>
        </motion.div>

        {/* Hero Visual — Abstract Connected Learning Concept */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: DURATION.STORYTELLING,
            delay: 0.48,
            ease: EASING.SMOOTH,
          }}
          className="w-full max-w-4xl bg-white border border-black/[0.08] rounded-[20px] p-6 sm:p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] relative"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#757575] font-mono mb-6 flex items-center justify-between border-b border-black/[0.06] pb-3">
            <span>Abstract Connected Ecosystem</span>
            <span className="text-[#0075de] font-sans">students → ideas → discussion → knowledge → growth</span>
          </div>

          {/* Node Flow Diagram */}
          <div className="relative py-4 flex flex-wrap items-center justify-between gap-4 md:gap-2">
            
            {/* Background connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#0075de]/20 via-[#097fe8]/30 to-[#10b981]/20 -translate-y-1/2 pointer-events-none" />

            {conceptNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.COMPONENT,
                    delay: 0.55 + i * 0.08,
                    ease: EASING.SMOOTH,
                  }}
                  className="relative z-10 flex flex-col items-center gap-2 group mx-auto md:mx-0"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl bg-[#f6f5f4] border border-black/[0.08] flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-[#0075de]/30 transition-all duration-300"
                    style={{ color: node.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[13px] font-semibold text-[#111111]">{node.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note inside visual container */}
          <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-center gap-2 text-[12px] text-[#615d59]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0075de]" />
            <span>Built to turn isolated study into collaborative momentum</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutHero;
