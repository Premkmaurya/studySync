import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, User, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * AIFeature
 * Highlights the StudySync AI Learning Assistant strictly as a helpful tool within the workspace.
 * Avoids marketing hype while demonstrating realistic contextual AI explanation capabilities.
 */
const AIFeature = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ai" className="py-20 sm:py-28 bg-white px-4 sm:px-6 md:px-12 border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: AI Assistant Product Interaction Visual */}
        <div className="lg:col-span-7">
          <div className="bg-[#f6f5f4] rounded-[20px] border border-black/[0.08] p-5 sm:p-7 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13px] font-bold text-[#111111] font-mono">
                  StudySync AI Assistant
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#10b981]/10 text-[#0f5132] text-[10px] font-mono font-bold">
                Contextual Helper
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="space-y-4 pt-1">
              
              {/* User Prompt */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: DURATION.COMPONENT, delay: 0.1, ease: EASING.SMOOTH }}
                className="p-4 rounded-[14px] bg-white border border-black/[0.08] shadow-2xs space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#111111]">
                  <User className="w-3.5 h-3.5 text-[#0075de]" />
                  <span>You</span>
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#111111] pl-5 leading-relaxed">
                  "Explain binary search simply."
                </p>
              </motion.div>

              {/* AI Explanation Response */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: DURATION.COMPONENT, delay: 0.25, ease: EASING.SMOOTH }}
                className="p-4 sm:p-5 rounded-[14px] bg-white border-2 border-[#10b981]/40 shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#10b981]">
                  <Bot className="w-16 h-16" />
                  <span>StudySync AI</span>
                </div>

                <p className="text-[13px] sm:text-[14px] text-[#111111] leading-relaxed pl-6">
                  Think of binary search like looking for a word in a printed dictionary:
                </p>

                <ul className="list-disc list-inside space-y-1.5 text-[13px] text-[#615d59] pl-8 font-sans">
                  <li>You open to the middle page.</li>
                  <li>If your target word is alphabetically earlier, you throw away the right half.</li>
                  <li>You repeat this halving process until you find the exact word in O(log n) time.</li>
                </ul>
              </motion.div>

            </div>

            {/* Input Bar Placeholder */}
            <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[12px] text-[#757575] font-mono">
              <span>Ask another question in your study note workspace...</span>
              <span className="px-2.5 py-1 rounded bg-white border border-black/[0.08] text-[#111111]">
                Press Return ↵
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Editorial Narrative & Guardrails */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="lg:col-span-5 flex flex-col items-start space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#0f5132] text-[11px] font-semibold tracking-wider uppercase font-mono">
            04. AI LEARNING ASSISTANT
          </span>

          <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1]">
            Get help when you're stuck.
          </h2>

          <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Use StudySync's AI assistant to understand difficult concepts and explore questions without leaving your collaborative learning environment.
          </p>

          <div className="space-y-3 pt-2 text-[14px] text-[#111111]">
            <div className="p-3 rounded-[10px] bg-[#f6f5f4] border border-black/[0.06] flex items-start gap-2.5">
              <Sparkles className="w-16 h-16 text-[#10b981] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#615d59] leading-snug">
                <strong className="text-[#111111]">Designed to assist, not replace:</strong> AI helps clarify confusing steps while keeping peer discussion central.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIFeature;
