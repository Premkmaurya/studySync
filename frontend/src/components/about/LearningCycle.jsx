import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Users, MessageSquare, HelpCircle, Edit3, Bookmark, RefreshCw, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * LearningCycle
 * Product storytelling sequence demonstrating how StudySync works as a continuous learning system.
 * Features scroll-driven active step detection on the left while the right UI preview stays sticky in position.
 */
const LearningCycle = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  const steps = [
    {
      num: "01",
      title: "Find a group",
      desc: "Discover public study groups or create a private team around your active subjects.",
      icon: Users,
    },
    {
      num: "02",
      title: "Join the conversation",
      desc: "Participate in structured live study group discussions and subject threads.",
      icon: MessageSquare,
    },
    {
      num: "03",
      title: "Ask questions",
      desc: "Get peer answers and bounce ideas off members studying the same material.",
      icon: HelpCircle,
    },
    {
      num: "04",
      title: "Create a note",
      desc: "Capture concepts in rich Markdown notes with code blocks and formatting.",
      icon: Edit3,
    },
    {
      num: "05",
      title: "Save useful knowledge",
      desc: "Organize notes into searchable group knowledge repositories for quick access.",
      icon: Bookmark,
    },
    {
      num: "06",
      title: "Come back & continue",
      desc: "Return anytime to review summaries, test knowledge, and build momentum.",
      icon: RefreshCw,
    },
  ];

  // Scroll Synchronization: Update active step as user scrolls past each step card on the left
  useEffect(() => {
    if (shouldReduceMotion) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-step-index"));
          if (!isNaN(index)) {
            setActiveStep(index);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Helper to render active UI fragment based on selected step
  const renderUIFragment = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold">
                Study Group
              </span>
              <span className="text-[12px] text-[#757575] font-mono">14 Active Members</span>
            </div>
            <h4 className="text-[18px] font-bold text-[#111111]">
              Computer Science — Data Structures & Algorithms
            </h4>
            <p className="text-[13px] text-[#615d59] leading-relaxed">
              Weekly deep-dives into trees, graph algorithms, dynamic programming, and interview prep.
            </p>
            <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[12px]">
              <span className="text-[#0075de] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Joined Group
              </span>
              <span className="text-[#757575]">Public Group</span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-sm space-y-3">
            <div className="text-[11px] font-mono text-[#757575] uppercase tracking-wider mb-1">
              Live Group Discussion
            </div>
            <div className="bg-[#f6f5f4] p-3.5 rounded-[12px] border border-black/[0.06] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0075de] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                AM
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#111111]">Alex Morgan</span>
                  <span className="text-[10px] text-[#757575]">10:14 AM</span>
                </div>
                <p className="text-[13px] text-[#111111] leading-relaxed">
                  "Hey everyone! Ready to start working through graph traversal problem sets today?"
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-sm space-y-3">
            <div className="text-[11px] font-mono text-[#757575] uppercase tracking-wider mb-1">
              Group Q&A Thread
            </div>
            <div className="p-3.5 rounded-[12px] bg-[#e6f3fe]/60 border border-[#0075de]/20 space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#0075de] text-white text-[10px] font-bold font-mono">
                QUESTION
              </span>
              <h5 className="text-[14px] font-bold text-[#111111]">
                Does Dijkstra's algorithm work with negative edge weights?
              </h5>
              <p className="text-[12px] text-[#615d59]">
                "No, Dijkstra assumes greedy non-negative paths. Use Bellman-Ford for negative edge weights!"
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-sm space-y-3 font-sans">
            <div className="text-[11px] font-mono text-[#757575] uppercase tracking-wider">
              Markdown Note Editor
            </div>
            <div className="space-y-2">
              <h4 className="text-[16px] font-bold text-[#111111] border-b border-black/[0.06] pb-1">
                # Dijkstra's Algorithm Overview
              </h4>
              <p className="text-[12px] text-[#615d59]">
                Dijkstra calculates the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.
              </p>
              <div className="bg-[#05080d] text-emerald-400 p-2.5 rounded-[8px] font-mono text-[11px]">
                <code>const dist = new Array(V).fill(Infinity);</code>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-sm space-y-3">
            <div className="text-[11px] font-mono text-[#757575] uppercase tracking-wider">
              Group Knowledge Repository
            </div>
            <div className="p-3 rounded-[12px] bg-[#f6f5f4] border border-black/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#0075de]" />
                <span className="text-[13px] font-bold text-[#111111]">Graph Algorithms Master Reference.md</span>
              </div>
              <span className="px-2 py-0.5 bg-white text-[#757575] border border-black/[0.08] rounded text-[11px] font-mono">
                Saved
              </span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-white rounded-[16px] border-2 border-[#10b981] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-[11px] font-mono font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Knowledge Companion
              </span>
              <span className="text-[11px] text-[#757575] font-mono">Active Cycle</span>
            </div>
            <p className="text-[13px] text-[#111111] leading-relaxed">
              "Great session! Your notes on Graph Traversal are organized. You're ready to tackle practice questions."
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f6f5f4] mb-18 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-wider uppercase font-mono mb-4">
          04. The StudySync Experience
        </span>
        <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1] mb-5">
          Learning becomes a cycle.
        </h2>
        <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
          See how StudySync works as a continuous, connected workflow from initial curiosity to master notes and review.
        </p>
      </div>

      {/* Storytelling Layout: Left Cards Scroll Vertically / Right Fragment Remains Sticky */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[1280px] mx-auto">
        
        {/* Left Column: Vertically Scrolling Step Cards */}
        <div className="lg:col-span-6 flex flex-col gap-6 py-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[index] = el)}
                data-step-index={index}
                onClick={() => handleStepClick(index)}
                className={`w-full text-left p-6 sm:p-7 rounded-[20px] transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-white border-[#0075de] shadow-lg scale-[1.01]"
                    : "bg-white/70 border-black/[0.08] hover:bg-white hover:border-black/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[13px] font-mono font-bold ${isActive ? "text-[#0075de]" : "text-[#757575]"}`}>
                      {step.num}
                    </span>
                    <h3 className={`text-[18px] font-bold ${isActive ? "text-[#000000]" : "text-[#615d59]"}`}>
                      {step.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0075de]/10 text-[#0075de]" : "bg-black/[0.04] text-[#757575]"
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>
                <p className="text-[14px] text-[#615d59] pl-7 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Product UI Fragment Showcase */}
        <div className="lg:col-span-6 sticky top-[120px] self-start workflow-preview">
          <div className="bg-white rounded-[24px] border border-black/[0.08] p-6 sm:p-7 shadow-[0px_12px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#757575] font-mono">
                System Flow Preview — Step {steps[activeStep].num}
              </span>
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep === i ? "bg-[#0075de] w-5" : "bg-black/15 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
              >
                {renderUIFragment(activeStep)}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[12px] text-[#615d59]">
              <span>Scroll down to advance through the workflow</span>
              <button
                onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                className="text-[#0075de] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LearningCycle;
