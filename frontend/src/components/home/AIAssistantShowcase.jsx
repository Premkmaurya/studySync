import React, { useState } from "react";
import { Bot, Send, Sparkles, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "../motion/Reveal";
import StaggerContainer, { StaggerItem } from "../motion/StaggerContainer";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * AIAssistantShowcase
 * Core storytelling section 4: GET HELP FROM AI / AI STUDY ASSISTANT DEMO
 * Student-focused conversational UI panel with smooth prompt transitions and staggered capabilities.
 */
const AIAssistantShowcase = ({ className = "" }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const sampleConversations = [
    {
      userQuery: "Explain binary search simply.",
      aiResponse:
        "Think of searching for a word in a printed dictionary. Instead of checking every page one by one, you open the book in the middle. If your word comes earlier, you eliminate the entire right half and repeat on the left half.",
    },
    {
      userQuery: "Summarize BFS vs DFS key differences.",
      aiResponse:
        "BFS (Breadth-First) explores all neighbor nodes at the current depth before moving deeper—like ripples in water. DFS (Depth-First) explores as far down one branch as possible before backtracking.",
    },
    {
      userQuery: "Give me 2 practice quiz questions on dynamic programming.",
      aiResponse:
        "1. What is the main difference between memoization (top-down) and tabulation (bottom-up)?\n2. When should you choose dynamic programming over recursive backtracking?",
    },
  ];

  const currentConv = sampleConversations[activePromptIndex];

  return (
    <section 
      className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto ${className}`}
      aria-labelledby="ai-showcase-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-6 items-center">
        
        {/* LEFT COLUMN: Editorial Headline & Copy */}
        <Reveal direction="up" distance={18} className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20 inline-block mb-4">
              AI Study Assistant
            </span>
            <h2 
              id="ai-showcase-heading"
              className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#000000] tracking-[-1.5px] leading-[1.12]"
            >
              Learn with an assistant when you need one.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] text-[#615d59] leading-relaxed">
              StudySync's AI assistant helps you understand difficult concepts, work through questions, and make sense of the knowledge you're building inside your study group.
            </p>
          </div>

          {/* Interactive Prompt Picker */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono font-semibold text-[#757575] uppercase tracking-wider block">
              Sample questions to ask AI:
            </span>
            <div className="flex flex-col gap-2">
              {sampleConversations.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePromptIndex(idx)}
                  className={`text-left text-[13px] px-3.5 py-2.5 rounded-[8px] border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    activePromptIndex === idx
                      ? "bg-[#0075de]/10 border-[#0075de] text-[#0075de] font-semibold"
                      : "bg-white border-black/[0.08] text-[#615d59] hover:bg-black/[0.02]"
                  }`}
                >
                  <span>"{item.userQuery}"</span>
                  {activePromptIndex === idx && <Sparkles className="w-3.5 h-3.5 text-[#0075de] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* RIGHT COLUMN: Realistic Conversational AI Interface */}
        <Reveal direction="up" distance={20} delay={0.1} className="lg:col-span-7">
          <div className="w-full rounded-[12px] bg-white border border-black/[0.08] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-left flex flex-col justify-between min-h-[380px]">
            
            {/* Panel Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[8px] bg-[#02093a] text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#000000] block leading-tight">
                    StudySync AI Assistant
                  </span>
                  <span className="text-[11.5px] text-[#757575]">
                    Active in Computer Science Workspace
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11.5px] font-mono text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20">
                <span className="w-2 h-2 rounded-full bg-[#0075de] animate-pulse" /> Live Support
              </span>
            </div>

            {/* Conversation Messages with AnimatePresence */}
            <div className="space-y-4 mb-6 min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePromptIndex}
                  initial={!shouldReduceMotion ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={!shouldReduceMotion ? { opacity: 0, y: -8 } : false}
                  transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
                  className="space-y-4"
                >
                  {/* User Message Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#0075de] text-white text-[13.5px] px-4 py-2.5 rounded-[12px] rounded-tr-none max-w-[85%] leading-relaxed shadow-xs">
                      {currentConv.userQuery}
                    </div>
                  </div>

                  {/* AI Response Message Bubble */}
                  <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-1 border border-[#0075de]/20">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div className="bg-[#f6f5f4] border border-black/[0.06] text-[#111111] text-[13.5px] p-4 rounded-[12px] rounded-tl-none max-w-[90%] leading-relaxed space-y-2">
                      <span className="text-[11px] font-mono font-bold text-[#0075de] block">StudySync AI</span>
                      <p className="whitespace-pre-line">{currentConv.aiResponse}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input Prompt Box */}
            <div className="relative flex items-center bg-[#f6f5f4] rounded-[8px] p-2 border border-black/[0.08] focus-within:border-[#0075de] transition-colors">
              <input
                type="text"
                readOnly
                value="Ask another question..."
                className="w-full bg-transparent px-3 text-[13px] text-[#757575] focus:outline-none cursor-default"
              />
              <button 
                type="button" 
                aria-label="Send query"
                className="w-9 h-9 rounded-[6px] bg-[#0075de] text-white flex items-center justify-center shrink-0 hover:bg-[#097fe8] transition-colors active:scale-95"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

          {/* AI CAPABILITIES STAGGERED ROW */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <StaggerItem>
              <div className="bg-white rounded-[10px] p-4 border border-black/[0.06] flex items-start gap-3 hover:border-[#0075de]/30 transition-colors">
                <div className="w-9 h-9 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#000000]">Understand</h4>
                  <p className="text-[12px] text-[#615d59]">Break down difficult concepts into simple terms.</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-[10px] p-4 border border-black/[0.06] flex items-start gap-3 hover:border-[#e89d01]/30 transition-colors">
                <div className="w-9 h-9 rounded-[8px] bg-[#fff4cc] text-[#e89d01] flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#000000]">Explore</h4>
                  <p className="text-[12px] text-[#615d59]">Ask follow-up questions and test your memory.</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-[10px] p-4 border border-black/[0.06] flex items-start gap-3 hover:border-[#0075de]/30 transition-colors">
                <div className="w-9 h-9 rounded-[8px] bg-[#0075de]/10 text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#000000]">Learn</h4>
                  <p className="text-[12px] text-[#615d59]">Go deeper whenever you are ready for more.</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

        </Reveal>

      </div>
    </section>
  );
};

export default AIAssistantShowcase;
