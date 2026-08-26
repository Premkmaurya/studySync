import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * PhilosophySection
 * Typography-led section presenting StudySync's four core beliefs about learning.
 * Uses a large editorial grid with generous whitespace and subtle dividers instead of generic cards.
 */
const PhilosophySection = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      number: "01",
      heading: "Learn together.",
      description: "The right community can make difficult subjects easier to understand.",
    },
    {
      number: "02",
      heading: "Share what you know.",
      description: "Knowledge becomes more useful when other people can build on it.",
    },
    {
      number: "03",
      heading: "Make learning active.",
      description: "Asking, explaining, discussing, and creating are part of understanding.",
    },
    {
      number: "04",
      heading: "Use AI as a tool.",
      description: "AI should help students understand and explore — not replace the learning process.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-y border-black/[0.08] px-5 sm:px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-wider uppercase font-mono mb-4">
            03. Our Philosophy
          </span>
          <h2 className="text-[36px] sm:text-[54px] font-bold text-[#000000] tracking-[-2px] leading-[1.08]">
            What we believe about learning.
          </h2>
        </div>

        {/* Large Editorial Grid (2x2 Desktop, Stacked Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 sm:gap-y-20">
          {principles.map((p, index) => (
            <motion.div
              key={p.number}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: DURATION.STORYTELLING,
                delay: index * 0.1,
                ease: EASING.SMOOTH,
              }}
              className="pt-6 border-t border-black/[0.12] flex flex-col items-start space-y-4"
            >
              {/* Large Editorial Number */}
              <span className="text-[14px] sm:text-[16px] font-mono font-bold text-[#0075de] tracking-wider uppercase">
                {p.number}
              </span>

              {/* Strong Heading */}
              <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] tracking-[-1px] leading-tight">
                {p.heading}
              </h3>

              {/* Short Description */}
              <p className="text-[16px] sm:text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] leading-[1.6]">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PhilosophySection;
