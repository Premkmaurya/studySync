import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, MessageCircle, BookOpen, Bot, CheckCircle2, FileText, Sparkles, Folder, Hash } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ProductIdea
 * Explains what StudySync is through an asymmetric visual composition surrounding a real product UI workspace.
 */
const ProductIdea = () => {
  const shouldReduceMotion = useReducedMotion();

  const capabilities = [
    {
      id: "groups",
      number: "01",
      title: "STUDY GROUPS",
      desc: "Find communities built around your interests.",
      icon: Users,
      color: "#0075de",
      positionClass: "lg:col-span-4 lg:row-span-1",
    },
    {
      id: "discussions",
      number: "02",
      title: "DISCUSSIONS",
      desc: "Ask questions and learn with others.",
      icon: MessageCircle,
      color: "#097fe8",
      positionClass: "lg:col-span-4 lg:row-span-1",
    },
    {
      id: "notes",
      number: "03",
      title: "SHARED NOTES",
      desc: "Capture and organize useful knowledge.",
      icon: BookOpen,
      color: "#ffb110",
      positionClass: "lg:col-span-4 lg:row-span-1",
    },
    {
      id: "ai",
      number: "04",
      title: "AI ASSISTANT",
      desc: "Get help understanding difficult concepts.",
      icon: Bot,
      color: "#10b981",
      positionClass: "lg:col-span-4 lg:row-span-1",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f6f5f4] px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-wider uppercase font-mono mb-4">
          02. The Idea
        </span>
        <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1] mb-5">
          One place to learn with people who share your goals.
        </h2>
        <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
          StudySync connects study groups, discussions, shared notes, and learning assistance in one collaborative workspace.
        </p>
      </div>

      {/* Asymmetric Composition: Central Workspace + Surrounding Capability Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Central Workspace UI Showcase (Col 1-8 on desktop) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="lg:col-span-8 bg-white border border-black/[0.08] rounded-[20px] shadow-[0px_8px_32px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-[#f6f5f4] border-b border-black/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              <span className="text-[12px] font-mono text-[#757575] ml-2 hidden sm:inline-block">
                studySync / CS-401 — Advanced Algorithms & Notes
              </span>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] font-mono">
              Live Workspace
            </span>
          </div>

          {/* Inner 3-Column UI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
            
            {/* Sidebar (Md: 3 cols) */}
            <div className="md:col-span-3 bg-[#faf9f8] p-3 border-r border-black/[0.06] flex flex-col gap-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#757575] font-mono px-2 pt-1">
                Workspace
              </div>
              <div className="flex flex-col gap-1">
                <div className="px-2.5 py-1.5 rounded-[6px] bg-[#0075de]/10 text-[#0075de] text-[13px] font-medium flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5" />
                  <span>Groups</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-[6px] hover:bg-black/5 text-[#615d59] text-[13px] font-medium flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#757575] font-mono px-2 pt-3">
                Active Group
              </div>
              <div className="px-2.5 py-2 rounded-[8px] bg-white border border-black/[0.08] text-[12px] font-semibold text-[#111111]">
                ⚡ Algorithms Cohort 4
              </div>
            </div>

            {/* Main Content Area (Md: 6 cols) */}
            <div className="md:col-span-6 p-4 flex flex-col gap-4 border-r border-black/[0.06]">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
                <h4 className="text-[15px] font-bold text-[#111111]">
                  Graph Traversal (DFS vs BFS)
                </h4>
                <span className="text-[11px] text-[#757575] font-mono">Updated 5m ago</span>
              </div>

              {/* Discussion Thread Fragment */}
              <div className="bg-[#f6f5f4] p-3 rounded-[10px] border border-black/[0.06] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-[#0075de]">@alex_dev</span>
                  <span className="text-[10px] text-[#757575]">10:42 AM</span>
                </div>
                <p className="text-[12px] text-[#111111] leading-snug">
                  "When implementing DFS for cycle detection in directed graphs, remember to track the recursion stack array alongside visited!"
                </p>
              </div>

              {/* Shared Note Preview Fragment */}
              <div className="bg-white p-3 rounded-[10px] border border-black/[0.08] flex flex-col gap-1.5 text-[12px] text-[#615d59]">
                <div className="font-semibold text-[#111111] flex items-center gap-1.5 text-[13px]">
                  <BookOpen className="w-3.5 h-3.5 text-[#0075de]" />
                  <span>Key Traversal Properties:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[12px]">
                  <li>BFS uses Queue (FIFO) for shortest paths in unweighted graphs</li>
                  <li>DFS uses Stack (LIFO) for topological sorting and cycle detection</li>
                </ul>
              </div>
            </div>

            {/* AI Assistant Side Panel (Md: 3 cols) */}
            <div className="md:col-span-3 bg-[#fdfdfd] p-3 flex flex-col gap-2 justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10b981] font-mono mb-2">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Study Assistant</span>
                </div>
                <div className="p-2.5 rounded-[8px] bg-[#10b981]/10 border border-[#10b981]/20 text-[11px] text-[#0f5132] leading-tight">
                  💡 "Would you like me to generate 3 quick quiz questions on Topological Sort?"
                </div>
              </div>
              <div className="text-[10px] text-[#757575] font-mono text-center pt-2 border-t border-black/[0.06]">
                Contextual AI Helper
              </div>
            </div>

          </div>
        </motion.div>

        {/* Four Surrounding Capabilities (Col 9-12 on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: DURATION.COMPONENT,
                  delay: i * 0.08,
                  ease: EASING.SMOOTH,
                }}
                className="bg-white p-5 rounded-[16px] border border-black/[0.08] shadow-sm hover:border-[#0075de]/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-[8px] bg-[#f6f5f4] flex items-center justify-center"
                      style={{ color: cap.color }}
                    >
                      <Icon className="w-16 h-16" />
                    </div>
                    <h3 className="text-[14px] font-bold text-[#111111] tracking-wider font-mono">
                      {cap.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#757575] font-semibold">{cap.number}</span>
                </div>
                <p className="text-[13px] text-[#615d59] leading-relaxed">
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductIdea;
