import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, Search, Video, FileText, MessageSquare, Bot, AppWindow, Sparkles, ArrowRight } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ProblemSection
 * Visualizes the fragmentation of modern learning tools and demonstrates consolidation into StudySync.
 */
const ProblemSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isConsolidated, setIsConsolidated] = useState(false);

  const fragmentedElements = [
    { id: "courses", label: "Courses", icon: Layers, note: "Syllabus & Videos" },
    { id: "search", label: "Search", icon: Search, note: "Quick Answers" },
    { id: "notes", label: "Notes App", icon: FileText, note: "Isolated Jottings" },
    { id: "chat", label: "Chat Apps", icon: MessageSquare, note: "Chaotic Threads" },
    { id: "ai", label: "AI Tools", icon: Bot, note: "Prompt Windows" },
    { id: "apps", label: "Other Tools", icon: AppWindow, note: "Bookmarks" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-black/[0.08] px-5 sm:px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[11px] font-semibold tracking-wider uppercase font-mono mb-4">
            01. The Problem
          </span>
          <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1] mb-5">
            Everything you need to learn is everywhere.
          </h2>
          <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Courses give you information. Search gives you answers. But learning often happens across disconnected tools, conversations, notes, and communities.
          </p>
        </div>

        {/* Interactive Fragmentation vs Consolidation Canvas */}
        <div className="bg-[#f6f5f4] rounded-[24px] border border-black/[0.08] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-black/[0.08] mb-8">
            <div>
              <h3 className="text-[16px] font-bold text-[#111111]">
                {isConsolidated ? "Consolidated in StudySync" : "Current Fragmented Landscape"}
              </h3>
              <p className="text-[13px] text-[#615d59]">
                {isConsolidated
                  ? "All learning components synchronized under one calm, collaborative workspace."
                  : "Click 'Consolidate' or toggle below to see how StudySync unifies your workflow."}
              </p>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsConsolidated(!isConsolidated)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[10px] transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-16 h-16" />
              <span>{isConsolidated ? "Show Fragmented View" : "Consolidate into StudySync"}</span>
            </button>
          </div>

          {/* Visual Container */}
          <div className="min-h-[380px] sm:min-h-[320px] flex items-center justify-center relative">
            
            {/* STATE A: FRAGMENTED VIEW */}
            {!isConsolidated ? (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.COMPONENT }}
                className="w-full grid grid-cols-2 place-items-center mx-auto sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
              >
                {fragmentedElements.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={shouldReduceMotion ? {} : { y: (index % 2 === 0 ? 15 : -15), opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: DURATION.COMPONENT,
                        delay: index * 0.05,
                        ease: EASING.SMOOTH,
                      }}
                      className="bg-white rounded-[14px] p-8 border border-black/[0.08] shadow-md hover:shadow-lg flex flex-col items-center text-center gap-2 hover:border-[#0075de]/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#f6f5f4] text-[#615d59] flex items-center justify-center">
                        <Icon className="w-10 h-10" />
                      </div>
                      <span className="text-[13px] font-bold text-[#111111]">{item.label}</span>
                      <span className="text-[11px] text-[#757575] font-mono">{item.note}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* STATE B: CONSOLIDATED STUDYSYNC VIEW */
              <motion.div
                initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
                className="w-full max-w-3xl bg-white rounded-[18px] border-2 border-[#0075de] p-6 sm:p-8 shadow-[0px_8px_32px_rgba(0,117,222,0.12)] flex flex-col items-center text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0075de] text-white flex items-center justify-center mb-4 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-[24px] font-bold text-[#000000] tracking-[-0.5px] mb-2">
                  STUDYSYNC WORKSPACE
                </h4>
                <p className="text-[14px] text-[#615d59] max-w-lg mb-6 leading-relaxed">
                  Study groups, live chat discussions, structured Markdown notes, and contextual AI support connected seamlessly.
                </p>

                {/* Unified Chips */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {fragmentedElements.map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[12px] font-medium flex items-center gap-1.5"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* Bottom Caption */}
          <div className="mt-3 text-center text-[12px] text-[#757575] border-t border-black/[0.06] pt-4 font-mono">
            Focus on understanding, not context-switching.
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
