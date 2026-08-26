import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * FeatureSummary
 * Concise product map before the final CTA outlining the continuous learning loop.
 * Renders as a simple horizontal/vertical editorial flow without heavy cards.
 */
const FeatureSummary = () => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { label: "DISCOVER", action: "Find study groups." },
    { label: "CONNECT", action: "Join conversations." },
    { label: "CREATE", action: "Build shared notes." },
    { label: "ASK", action: "Get help from peers and AI." },
    { label: "CONTINUE", action: "Return to your knowledge and keep learning." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f6f5f4] px-6 my-[6rem] sm:px-6 md:px-12 border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-bold font-mono text-[#0075de] uppercase tracking-wider block">
            THE LEARNING INFRASTRUCTURE MAP
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-1px]">
            How StudySync fits together.
          </h2>
        </div>

        {/* Product Map Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: DURATION.COMPONENT,
                delay: index * 0.08,
                ease: EASING.SMOOTH,
              }}
              className="flex flex-col space-y-2 p-4 bg-white/60 rounded-[14px] border border-black/[0.06]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#0075de]">
                  0{index + 1}
                </span>
                <h3 className="text-[13px] font-mono font-bold text-[#111111] tracking-wider">
                  {step.label}
                </h3>
              </div>
              <p className="text-[13px] text-[#615d59] leading-snug">
                {step.action}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureSummary;
