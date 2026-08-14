import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, FileText, Tag, Clock, Share2, Sparkles } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * NotesFeature
 * Showcases the StudySync Markdown knowledge editor with a 4-step staggered reveal sequence:
 * 1. Note shell → 2. Title → 3. Content → 4. Metadata
 */
const NotesFeature = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="notes" className="py-20 sm:py-28 bg-[#f6f5f4] px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial Narrative */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="lg:col-span-5 flex flex-col items-start space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#ffb110]/15 border border-[#ffb110]/30 text-[#b18164] text-[11px] font-semibold tracking-wider uppercase font-mono">
            03. BUILD SHARED KNOWLEDGE
          </span>

          <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1]">
            Turn what you learn into knowledge you can keep.
          </h2>

          <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Capture useful ideas, organize your learning, and return to it later. Shared group notes make sure great explanations aren't lost in chat scrollbacks.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-[12px] font-mono text-[#757575]">
            <span className="px-2.5 py-1 rounded-md bg-white border border-black/[0.08] text-[#111111]">
              Markdown Support
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-black/[0.08] text-[#111111]">
              Code Syntax Blocks
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-black/[0.08] text-[#111111]">
              Group Repositories
            </span>
          </div>
        </motion.div>

        {/* Right Column: Note Editor Interface Showcase (4-Step Staggered Entrance) */}
        <div className="lg:col-span-7">
          
          {/* 1. Note Shell */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
            className="bg-white rounded-[20px] border border-black/[0.08] p-6 sm:p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.06)] space-y-6"
          >
            {/* Top Editor Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#0075de]" />
                <span className="text-[13px] font-bold text-[#111111] font-mono">
                  Machine Learning / Notes
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#f6f5f4] text-[#757575] text-[11px] font-mono border border-black/[0.06]">
                Autosaved
              </span>
            </div>

            {/* 2. Title */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: DURATION.COMPONENT, delay: 0.15, ease: EASING.SMOOTH }}
              className="space-y-1"
            >
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#000000] tracking-[-0.5px]">
                Gradient Descent & Optimization
              </h3>
            </motion.div>

            {/* 3. Content */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: DURATION.COMPONENT, delay: 0.25, ease: EASING.SMOOTH }}
              className="space-y-4 text-[14px] text-[#615d59] leading-relaxed font-sans"
            >
              <p>
                Gradient descent is a first-order iterative optimization algorithm used to find a local minimum of a differentiable cost function \(\theta\).
              </p>

              {/* Code Snippet Box */}
              <div className="bg-[#05080d] text-slate-200 p-4 rounded-[10px] font-mono text-[12px] space-y-1">
                <div className="text-slate-400 font-sans text-[11px] mb-2">// Parameter Update Formula</div>
                <div><span className="text-purple-400">def</span> <span className="text-blue-400">gradient_descent</span>(X, y, theta, alpha):</div>
                <div className="pl-4">predictions = X.dot(theta)</div>
                <div className="pl-4">errors = predictions - y</div>
                <div className="pl-4">gradient = X.T.dot(errors) / len(y)</div>
                <div className="pl-4 text-emerald-400">return theta - alpha * gradient</div>
              </div>
            </motion.div>

            {/* 4. Metadata */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: DURATION.COMPONENT, delay: 0.35, ease: EASING.SMOOTH }}
              className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-[12px]"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] font-mono font-semibold">
                  #machine-learning
                </span>
                <span className="text-[#757575] font-mono">AI & Machine Learning Group</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#757575] font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Updated 12m ago by Alex</span>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default NotesFeature;
