import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import Reveal from "../motion/Reveal";
import StaggerContainer, { StaggerItem } from "../motion/StaggerContainer";

/**
 * GroupShowcase
 * Core storytelling section 2: FIND YOUR PEOPLE / STUDY GROUPS
 * Asymmetric editorial split layout featuring realistic StudySync group cards with micro-interaction feedback.
 */
const GroupShowcase = ({ className = "" }) => {
  const sampleGroups = [
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      description: "Discuss ML algorithms, deep learning models, PyTorch projects, and academic papers.",
      membersCount: 124,
      category: "AI / ML",
      accentBg: "bg-[#e6f3fe]",
      accentBorder: "border-[#0075de]/30",
      accentTag: "text-[#0075de] bg-[#0075de]/10",
      activity: "Active today",
    },
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      description: "Master graph traversal, dynamic programming, tree traversals, and coding interviews.",
      membersCount: 189,
      category: "Computer Science",
      accentBg: "bg-[#fff4cc]",
      accentBorder: "border-[#e89d01]/30",
      accentTag: "text-[#e89d01] bg-[#e89d01]/10",
      activity: "Weekly discussions",
    },
    {
      id: "web-dev",
      name: "Modern Fullstack Engineering",
      description: "Building scalable web platforms using React, Node.js, databases, and microservices.",
      membersCount: 96,
      category: "Engineering",
      accentBg: "bg-[#f64932]/10",
      accentBorder: "border-[#f64932]/25",
      accentTag: "text-[#f64932] bg-[#f64932]/10",
      activity: "3 live channels",
    },
    {
      id: "system-design",
      name: "System Architecture & Design",
      description: "Explore load balancers, caching strategies, distributed consensus, and database sharding.",
      membersCount: 78,
      category: "Architecture",
      accentBg: "bg-[#f6f5f4]",
      accentBorder: "border-black/10",
      accentTag: "text-[#615d59] bg-black/5",
      activity: "Shared archives",
    },
  ];

  return (
    <section 
      className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto ${className}`}
      aria-labelledby="group-showcase-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Editorial Headline & Copy */}
        <Reveal direction="up" distance={18} className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20 inline-block mb-4">
              Community Discovery
            </span>
            <h2 
              id="group-showcase-heading"
              className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#000000] tracking-[-1.5px] leading-[1.12]"
            >
              Find people who are learning what you're learning.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] text-[#615d59] leading-relaxed">
              StudySync helps you discover focused communities built around subjects, interests, and academic goals. Connect with peers who share your drive to master complex topics.
            </p>
          </div>

          {/* Key Community Highlights */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#000000]">Subject-focused groups</h4>
                <p className="text-[13px] text-[#615d59]">Discover communities dedicated to specific courses, research topics, and exams.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#000000]">Private or public study hubs</h4>
                <p className="text-[13px] text-[#615d59]">Join open student groups or set up invitation-only cohorts for your course team.</p>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-2">
            <Link
              to="/find-groups"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-medium text-[15px] rounded-[8px] transition-all duration-200 shadow-xs hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
            >
              <span>Explore groups</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* RIGHT COLUMN: Staggered Asymmetric Collection of Group Cards */}
        <StaggerContainer staggerDelay={0.08} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {sampleGroups.map((group) => (
            <StaggerItem key={group.id}>
              <div
                className={`group rounded-[12px] p-6 border ${group.accentBorder} ${group.accentBg} transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between min-h-[220px]`}
              >
                <div>
                  {/* Category Pill & Member Count Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded ${group.accentTag}`}>
                      {group.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#757575] font-medium">
                      <Users className="w-4 h-4 text-[#0075de]" />
                      <span>{group.membersCount} members</span>
                    </div>
                  </div>

                  {/* Group Title & Description */}
                  <h3 className="text-[18px] font-bold text-[#000000] mb-2 leading-snug group-hover:text-[#0075de] transition-colors duration-150">
                    {group.name}
                  </h3>
                  <p className="text-[13px] text-[#615d59] leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Card Footer Link with Hover Arrow */}
                <div className="pt-4 mt-2 border-t border-black/[0.06] flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#0075de] inline-flex items-center gap-1">
                    View group <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] font-mono text-[#757575] bg-white/60 px-2 py-0.5 rounded border border-black/5">
                    {group.activity}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

export default GroupShowcase;
