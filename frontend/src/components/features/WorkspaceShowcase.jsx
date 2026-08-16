import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Folder, FileText, MessageSquare, Bot, Sparkles, Home, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * WorkspaceShowcase
 * The visual centerpiece of the Features page displaying the full connected StudySync product workspace.
 * Uses a 6-step staggered entrance sequence: Shell → Sidebar → Main → Note → Discussion → AI Panel.
 */
const WorkspaceShowcase = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="workspace" className="py-20 sm:py-28 bg-[#f6f5f4] px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-wider uppercase font-mono">
            05. THE COMPLETE PRODUCT CENTERPIECE
          </span>
          <h2 className="text-[36px] sm:text-[54px] font-bold text-[#000000] tracking-[-2px] leading-[1.08]">
            Everything connected in one learning workspace.
          </h2>
          <p className="text-[17px] sm:text-[20px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Groups, discussions, notes, and learning assistance work together instead of living in separate places.
          </p>
        </div>

        {/* Full Product Workspace Shell (1. App Shell Enters) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="w-full bg-white rounded-[24px] border border-black/[0.08] shadow-[0px_16px_48px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="px-5 py-3 bg-[#faf9f8] border-b border-black/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              <span className="text-[12px] font-mono text-[#757575] ml-2 hidden sm:inline-block">
                studySync / Live Connected Workspace — CS-401 Algorithms
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold px-3 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de]">
              Unified Interface
            </span>
          </div>

          {/* Inner Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            
            {/* 2. Sidebar Settles (Md: 3 Cols) */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: DURATION.COMPONENT, delay: 0.15, ease: EASING.SMOOTH }}
              className="md:col-span-3 bg-[#f6f5f4] p-4 border-r border-black/[0.06] flex flex-col gap-4"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#757575] font-mono px-1">
                Navigation
              </div>
              <div className="space-y-1">
                <div className="px-3 py-2 rounded-[8px] bg-white border border-black/[0.08] text-[#0075de] text-[13px] font-semibold flex items-center gap-2.5 shadow-2xs">
                  <Folder className="w-16 h-16" />
                  <span>Groups</span>
                </div>
                <div className="px-3 py-2 rounded-[8px] hover:bg-black/5 text-[#615d59] text-[13px] font-medium flex items-center gap-2.5">
                  <FileText className="w-16 h-16" />
                  <span>Notes</span>
                </div>
                <div className="px-3 py-2 rounded-[8px] hover:bg-black/5 text-[#615d59] text-[13px] font-medium flex items-center gap-2.5">
                  <MessageSquare className="w-16 h-16" />
                  <span>Discussions</span>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#757575] font-mono px-1 pt-2">
                Active Cohort
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-black/[0.08] text-[12px] space-y-1">
                <div className="font-bold text-[#111111]">AI & Machine Learning</div>
                <div className="text-[11px] text-[#757575] font-mono">124 members online</div>
              </div>
            </motion.div>

            {/* Main Area (Md: 6 Cols) */}
            <div className="md:col-span-6 p-5 sm:p-6 border-r border-black/[0.06] space-y-5">
              
              {/* 3. Main Header Settles */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: DURATION.COMPONENT, delay: 0.25, ease: EASING.SMOOTH }}
                className="flex items-center justify-between border-b border-black/[0.06] pb-3"
              >
                <div>
                  <h4 className="text-[18px] font-bold text-[#111111]">
                    Transformer Architecture Deep Dive
                  </h4>
                  <span className="text-[12px] text-[#757575] font-mono">Group Knowledge Base</span>
                </div>
                <span className="px-2.5 py-0.5 bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold rounded">
                  Live Sync
                </span>
              </motion.div>

              {/* 4. Shared Note Editor Card Appears */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: DURATION.COMPONENT, delay: 0.35, ease: EASING.SMOOTH }}
                className="p-4 rounded-[14px] bg-white border border-black/[0.08] space-y-2 shadow-2xs text-[13px] text-[#615d59]"
              >
                <div className="font-bold text-[#111111] text-[14px] flex items-center gap-2">
                  <FileText className="w-16 h-16 text-[#0075de]" />
                  <span>Self-Attention Mechanism:</span>
                </div>
                <p className="leading-relaxed">
                  Self-attention relates different positions of a single sequence to compute a representation of the sequence.
                </p>
                <div className="p-2 rounded bg-[#05080d] text-emerald-400 font-mono text-[11px]">
                  Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
                </div>
              </motion.div>

              {/* 5. Discussion Thread Settles */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: DURATION.COMPONENT, delay: 0.45, ease: EASING.SMOOTH }}
                className="p-3.5 rounded-[12px] bg-[#f6f5f4] border border-black/[0.06] flex items-start gap-3 text-[12px]"
              >
                <div className="w-7 h-7 rounded-full bg-[#0075de] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  AM
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">Alex</span>
                    <span className="text-[10px] text-[#757575] font-mono">10:45 AM</span>
                  </div>
                  <p className="text-[#111111] leading-tight mt-0.5">
                    "Scaling by sqrt(d_k) prevents extremely small gradients during softmax initialization!"
                  </p>
                </div>
              </motion.div>

            </div>

            {/* 6. AI Assistant Panel (Md: 3 Cols) */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: DURATION.COMPONENT, delay: 0.55, ease: EASING.SMOOTH }}
              className="md:col-span-3 bg-[#fdfdfd] p-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#10b981] font-mono border-b border-black/[0.06] pb-2">
                  <Bot className="w-16 h-16" />
                  <span>AI Learning Helper</span>
                </div>
                <div className="p-3 rounded-[10px] bg-[#10b981]/10 border border-[#10b981]/20 text-[11px] text-[#0f5132] leading-relaxed">
                  💡 "Would you like a 3-question self-quiz on Multi-Head Attention?"
                </div>
              </div>
              <div className="text-[10px] text-[#757575] font-mono text-center pt-3 border-t border-black/[0.06]">
                Contextually Linked
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkspaceShowcase;
