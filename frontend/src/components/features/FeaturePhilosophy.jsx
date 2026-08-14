import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * FeaturePhilosophy
 * Editorial typography section presenting StudySync's four core principles for feature design.
 * Uses thin dividers and large typography rather than generic feature cards.
 */
const FeaturePhilosophy = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      num: "01",
      title: "FIND PEOPLE",
      statement: "Learning becomes easier when you're surrounded by people working toward similar goals.",
    },
    {
      num: "02",
      title: "ASK QUESTIONS",
      statement: "Understanding often starts with asking the right question and talking through complex steps.",
    },
    {
      num: "03",
      title: "BUILD KNOWLEDGE",
      statement: "Useful ideas should be captured in structured Markdown, organized, and revisited over time.",
    },
    {
      num: "04",
      title: "USE AI WELL",
      statement: "AI should support student understanding and exploration, not replace active learning.",
    },
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-white px-4 sm:px-6 md:px-12 border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-bold font-mono text-[#0075de] uppercase tracking-wider block">
            06. FEATURE PHILOSOPHY
          </span>
          <h2 className="text-[36px] sm:text-[54px] font-bold text-[#000000] tracking-[-2px] leading-[1.08]">
            Built around how learning actually happens.
          </h2>
        </div>

        {/* Large Editorial Principles List with Thin Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {principles.map((p, index) => (
            <motion.div
              key={p.num}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: DURATION.STORYTELLING,
                delay: index * 0.1,
                ease: EASING.SMOOTH,
              }}
              className="pt-6 border-t border-black/[0.12] space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-mono font-bold text-[#0075de]">
                  {p.num}
                </span>
                <h3 className="text-[14px] font-mono font-bold tracking-wider text-[#111111] uppercase">
                  {p.title}
                </h3>
              </div>

              <p className="text-[18px] sm:text-[22px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] leading-[1.5]">
                {p.statement}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturePhilosophy;
