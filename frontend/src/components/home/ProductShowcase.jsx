import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from "lucide-react";
import Reveal from "../motion/Reveal";
import LineReveal from "../motion/LineReveal";
import HoverArrow from "../motion/HoverArrow";

/**
 * ProductShowcase & WhyStudySync
 * Core storytelling sections 5 & 6: SEE THE COMPLETE PRODUCT & UNDERSTAND WHY STUDYSYNC EXISTS
 * Central workspace composition with staggered entrance and typography-led editorial line reveal statement.
 */
const ProductShowcase = ({ className = "" }) => {
  return (
    <section 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto ${className}`}
      aria-labelledby="product-showcase-heading"
    >
      {/* SECTION 5: COMPLETE PRODUCT ECOSYSTEM SHOWCASE */}
      <Reveal direction="up" distance={18} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20 inline-block mb-4">
          Complete Ecosystem
        </span>
        <h2 
          id="product-showcase-heading"
          className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#000000] tracking-[-1.5px] leading-[1.1]"
        >
          Everything you need to learn together.
        </h2>
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#615d59] leading-relaxed">
          Groups, shared notes, discussions, and AI assistance — connected in one unified learning workspace.
        </p>
      </Reveal>

      {/* LARGE CENTRAL STUDYSYNC INTERFACE COMPOSITION */}
      <Reveal direction="up" distance={24} duration={0.75} className="relative max-w-6xl mx-auto mb-24">
        
        {/* Main Central Product UI Surface */}
        <div className="w-full rounded-[16px] bg-white border border-black/[0.10] p-4 sm:p-6 lg:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] text-left relative overflow-hidden">
          
          {/* Mac-style Window Bar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-[13px] font-medium text-[#757575] ml-2">
                studySync Workspace / CS — Data Structures & AI
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0075de] bg-[#e6f3fe] px-2.5 py-1 rounded-full border border-[#0075de]/20">
              <Sparkles className="w-3 h-3 text-[#0075de]" /> Live Connected Workspace
            </span>
          </div>

          {/* 3-Column Mock Workspace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Sidebar (Col 1-3) */}
            <div className="md:col-span-3 bg-[#f6f5f4] rounded-[10px] p-4 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold text-[#757575] uppercase tracking-wider block">
                  Study Groups
                </span>
                
                <div className="bg-white p-2.5 rounded-[8px] border border-black/[0.08] text-[13px] font-bold text-[#0075de] flex items-center justify-between shadow-xs">
                  <span>📘 AI & Machine Learning</span>
                  <span className="w-2 h-2 rounded-full bg-[#0075de]" />
                </div>

                <div className="p-2.5 text-[13px] text-[#615d59] hover:bg-black/[0.03] rounded-[8px] font-medium">
                  📄 Data Structures (DSA)
                </div>
                
                <div className="p-2.5 text-[13px] text-[#615d59] hover:bg-black/[0.03] rounded-[8px] font-medium">
                  📄 System Architecture
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.08] text-[12px] text-[#757575] flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-[#0075de]" />
                <span>124 Active Members</span>
              </div>
            </div>

            {/* Main Active Group Area (Col 4-8) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              
              {/* Channel Tabs */}
              <div className="flex items-center gap-2 border-b border-black/[0.08] pb-3">
                <span className="text-[13px] font-bold text-[#0075de] border-b-2 border-[#0075de] pb-1 px-1 flex items-center gap-1.5">
                  <FileText className="w-4.5 h-4.5" /> Shared Notes
                </span>
                <span className="text-[13px] text-[#757575] hover:text-black pb-1 px-2 flex items-center gap-1.5 cursor-pointer">
                  <MessageSquare className="w-4.5 h-4.5" /> Group Chat
                </span>
                <span className="text-[13px] text-[#757575] hover:text-black pb-1 px-2 flex items-center gap-1.5 cursor-pointer">
                  <Users className="w-4.5 h-4.5" /> Members
                </span>
              </div>

              {/* Note Content */}
              <div className="space-y-3">
                <h4 className="text-[18px] font-bold text-[#000000]">
                  Graph Traversal Algorithms (BFS & DFS)
                </h4>
                <p className="text-[13px] text-[#615d59] leading-relaxed">
                  Breadth-First Search (BFS) uses a queue data structure to explore nodes layer by layer, while Depth-First Search (DFS) uses recursion or a stack to explore as far as possible down each branch...
                </p>
                <div className="p-3 bg-[#f6f5f4] rounded-[8px] border border-black/[0.06] font-mono text-[11.5px] text-[#0075de]">
                  // Visited set ensures nodes are not re-processed during graph traversal
                </div>
              </div>

              {/* Note Footer */}
              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#757575]">
                <span>Category: Algorithms</span>
                <span className="text-[#0075de] font-semibold">Updated 10 mins ago by Alex</span>
              </div>
            </div>

            {/* Integrated AI Drawer (Col 9-12) */}
            <div className="md:col-span-3 bg-[#e6f3fe]/40 rounded-[10px] p-4 border border-[#0075de]/20 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#0075de]" />
                  <span className="text-[13px] font-bold text-[#000000]">AI Assistant</span>
                </div>
                
                <div className="bg-white p-3 rounded-[8px] border border-[#0075de]/20 text-[12px] text-[#111111] leading-relaxed shadow-2xs">
                  <span className="font-semibold text-[#0075de] block mb-1">AI Summary:</span>
                  BFS visits vertices level-by-level; DFS visits as deep as possible before backtracking.
                </div>
              </div>

              <div className="text-[11px] text-[#0075de] font-mono font-medium pt-2">
                ⚡ Ready to answer questions
              </div>
            </div>

          </div>

        </div>

        {/* OVERLAPPING UI FRAGMENTS DEMONSTRATING CONNECTEDNESS */}
        {/* Fragment 1: Floating Group Tag */}
        <div className="hidden lg:flex absolute -top-5 -left-4 bg-white border border-black/10 rounded-[10px] p-3 shadow-md items-center gap-2 text-[12px] font-bold text-[#000000] z-20">
          <span className="w-3 h-3 rounded-full bg-[#0075de]" />
          <span>Active Study Cohort: AI & ML</span>
        </div>

        {/* Fragment 2: Floating Saved Note Chip */}
        <div className="hidden lg:flex absolute -bottom-5 -right-4 bg-white border border-black/10 rounded-[10px] p-3 shadow-md items-center gap-2.5 text-[12.5px] font-semibold text-[#0075de] z-20">
          <CheckCircle2 className="w-5 h-5 text-[#0075de]" />
          <span>Saved to Group Archive</span>
        </div>

      </Reveal>

      {/* SECTION 6: WHY STUDYSYNC — TYPOGRAPHY-LED EDITORIAL LINE REVEAL */}
      <div className="max-w-4xl mx-auto pt-12 pb-8 border-t border-black/[0.08] text-center">
        
        {/* Line-based Editorial Statement Reveal */}
        <LineReveal duration={0.8} className="mb-8">
          <h3 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-[#000000] tracking-[-2px] leading-[1.08] font-['Source_Serif_4',Georgia,serif] italic">
            "Learning shouldn't happen in isolation."
          </h3>
        </LineReveal>

        {/* Explanatory Contrast Copy */}
        <Reveal direction="up" distance={16} delay={0.2} className="max-w-2xl mx-auto space-y-3 text-[16px] sm:text-[18px] text-[#615d59] leading-relaxed mb-10">
          <p><strong className="text-[#000000] font-semibold">Courses</strong> give you information.</p>
          <p><strong className="text-[#000000] font-semibold">Search</strong> gives you answers.</p>
          <p>
            <strong className="text-[#0075de] font-semibold">StudySync</strong> gives you a place to learn consistently with people who share your goals.
          </p>
        </Reveal>

        {/* Climax Statement & Action */}
        <Reveal direction="up" distance={16} delay={0.3}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-6 sm:px-8 sm:py-6 rounded-[12px] border border-black/[0.08] shadow-xs hover:border-[#0075de]/30 transition-colors">
            <span className="text-[16px] sm:text-[18px] font-bold text-[#000000] tracking-[-0.3px]">
              Connect the people, knowledge, and tools around your learning.
            </span>
            <Link
              to="/register"
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-medium text-[14px] rounded-[8px] transition-all duration-200 shadow-xs hover:-translate-y-0.5 hover:shadow"
            >
              <span>Get started</span>
              <HoverArrow />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default ProductShowcase;
