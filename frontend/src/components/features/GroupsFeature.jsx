import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Users, ArrowRight, Compass, Folder, CheckCircle2 } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * GroupsFeature
 * Showcases the study group discovery experience with an asymmetric layout:
 * Left: Editorial typography & explanation.
 * Right: Layered realistic StudySync group cards.
 */
const GroupsFeature = () => {
  const shouldReduceMotion = useReducedMotion();

  const groups = [
    {
      id: "cs-algo",
      title: "AI & Machine Learning",
      subject: "Computer Science",
      desc: "Explore machine learning, deep learning architectures, neural networks, and practical AI projects.",
      members: "124 members",
      isPublic: true,
      activeNote: "Transformer Architecture Deep Dive.md",
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      subject: "Software Engineering",
      desc: "Weekly problem sets covering graph algorithms, dynamic programming, and technical interview prep.",
      members: "98 members",
      isPublic: true,
      activeNote: "Graph Traversal BFS & DFS.md",
    },
  ];

  return (
    <section id="groups" className="py-20 sm:py-28 bg-[#f6f5f4] px-6 sm:px-6 md:px-12 max-w-[1440px] mx-auto border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Large Editorial Typography & Narrative */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="lg:col-span-5 flex flex-col items-start space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-semibold tracking-wider uppercase font-mono">
            01. DISCOVER STUDY GROUPS
          </span>

          <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1]">
            Find people who are learning what you're learning.
          </h2>

          <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Discover study groups built around subjects, interests, and goals — whether you're mastering algorithms, preparing for exams, or building projects.
          </p>

          <div className="pt-2">
            <Link
              to="/find-groups"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[14px] font-semibold rounded-[8px] transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
            >
              <span>Explore study groups</span>
              <ArrowRight className="w-16 h-16 text-white transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Layered StudySync Group Cards */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, delay: 0.15, ease: EASING.SMOOTH }}
          className="lg:col-span-7 relative flex flex-col gap-4"
        >
          {/* Main Front Group Card */}
          <div className="bg-white rounded-[20px] border border-black/[0.08] p-6 sm:p-7 shadow-[0px_8px_32px_rgba(0,0,0,0.06)] relative z-10 space-y-4 hover:border-[#0075de]/40 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="px-3 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold">
                {groups[0].subject}
              </span>
              <span className="text-[12px] text-[#757575] font-mono flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0075de]" />
                {groups[0].members}
              </span>
            </div>

            <h3 className="text-[22px] sm:text-[24px] font-bold text-[#111111]">
              {groups[0].title}
            </h3>

            <p className="text-[14px] text-[#615d59] leading-relaxed">
              {groups[0].desc}
            </p>

            <div className="p-3 rounded-[10px] bg-[#f6f5f4] border border-black/[0.06] flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-[#615d59]">
                <Folder className="w-3.5 h-3.5 text-[#0075de]" />
                <span>Active note: <strong className="text-[#111111]">{groups[0].activeNote}</strong></span>
              </div>
              <span className="text-[#0075de] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Open Group
              </span>
            </div>

            <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between">
              <span className="text-[12px] font-mono text-[#757575]">Group ID: #ml-cohort-4</span>
              <Link
                to="/find-groups"
                className="group/link inline-flex items-center gap-1 text-[13px] font-semibold text-[#0075de] hover:underline"
              >
                <span>View group</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Secondary Offset Background Card (Reduced emphasis) */}
          <div className="bg-white/80 rounded-[20px] border border-black/[0.06] p-5 shadow-2xs opacity-85 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#615d59] text-[11px] font-mono font-semibold">
                {groups[1].subject}
              </span>
              <span className="text-[11px] text-[#757575] font-mono">{groups[1].members}</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#111111] mb-1">{groups[1].title}</h4>
            <p className="text-[13px] text-[#615d59] line-clamp-1">{groups[1].desc}</p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default GroupsFeature;
