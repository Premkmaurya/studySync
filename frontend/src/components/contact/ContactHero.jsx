import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ContactHero
 * Typography-led, minimal hero section for the Contact page with line-based text reveal
 * and a subtle communication flow graphic.
 */
const ContactHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const flowNodes = [
    { label: "message", color: "#0075de" },
    { label: "question", color: "#ffb110" },
    { label: "response", color: "#097fe8" },
    { label: "connection", color: "#10b981" },
  ];

  return (
    <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto text-center">
      <div className="flex flex-col items-center">
        
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-widest uppercase font-mono">
            GET IN TOUCH
          </span>
        </motion.div>

        {/* Headline — Line-Based Reveal */}
        <h1 className="text-[42px] sm:text-[64px] font-bold text-[#000000] tracking-[-2px] leading-[1.05] mb-5">
          <div className="overflow-hidden py-0.5">
            <motion.div
              initial={shouldReduceMotion ? {} : { y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: DURATION.STORYTELLING,
                delay: 0.1,
                ease: EASING.SMOOTH,
              }}
            >
              Let's talk.
            </motion.div>
          </div>
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.STORYTELLING,
            delay: 0.22,
            ease: EASING.SMOOTH,
          }}
          className="text-[17px] sm:text-[20px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.55] max-w-xl mb-8"
        >
          Have a question, found something that isn't working, or want to talk about StudySync? Send us a message.
        </motion.p>

        {/* Small Editorial Visual — Communication Concept */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: DURATION.COMPONENT,
            delay: 0.32,
            ease: EASING.SMOOTH,
          }}
          className="inline-flex items-center flex-wrap justify-center gap-2 px-4 py-2 bg-white rounded-full border border-black/[0.08] shadow-sm text-[12px] text-[#615d59] font-mono"
        >
          {flowNodes.map((node, i) => (
            <React.Fragment key={node.label}>
              <span className="flex items-center gap-1 font-semibold text-[#111111]">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: node.color }}
                />
                {node.label}
              </span>
              {i < flowNodes.length - 1 && (
                <span className="text-[#757575] font-sans">→</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ContactHero;
