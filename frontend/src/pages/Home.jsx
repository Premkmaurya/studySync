import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

import Button from "../components/design-system/Button";
import Pill from "../components/design-system/Pill";
import HowItWorks from "../components/home/HowItWorks";
import GroupShowcase from "../components/home/GroupShowcase";
import KnowledgeShowcase from "../components/home/KnowledgeShowcase";
import AIAssistantShowcase from "../components/home/AIAssistantShowcase";
import ProductShowcase from "../components/home/ProductShowcase";
import StudySyncCTA from "../components/StudySyncCTA";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";
import FaqSection from "@/components/ui/habit-faq-scroller";

/**
 * StudySync Homepage
 * Continuous storytelling narrative flow:
 * Hero -> How It Works -> Find Your People -> Build Shared Knowledge -> Get Help From AI -> Complete Product Showcase & Why StudySync -> CTA & Footer
 */
const Home = () => {
  const user = useSelector((state) => state?.auth?.user);

  const faqScrollerData = {
    mainTitle: "Frequently Asked Questions",
    mainSubtitle:
      "Have questions? We've got answers. Everything you need to know about StudySync study groups, shared notes, and AI support.",
    rows: [
      {
        id: "row1",
        speed: "55s",
        direction: "left",
        faqItems: [
          {
            id: "q1",
            question: "What is StudySync?",
            answer:
              "StudySync is a collaborative learning platform designed to help students, researchers, and self-learners create study groups and share knowledge in real time.",
          },
          {
            id: "q2",
            question: "How do study groups work?",
            answer:
              "You can discover public study groups by subject or create your own private group with dedicated workspace tabs for shared notes, chat, and member roles.",
          },
          {
            id: "q3",
            question: "Is my study data secure?",
            answer:
              "Absolutely. We use industry-standard encryption and privacy controls so you can collaborate with peace of mind.",
          },
        ],
      },
      {
        id: "row2",
        speed: "40s",
        direction: "right",
        faqItems: [
          {
            id: "q4",
            question: "Can I take rich format notes?",
            answer:
              "Yes! StudySync features a rich TipTap document editor with markdown support, code blocks, formatting, and live autosave.",
          },
          {
            id: "q5",
            question: "Is there an AI study assistant?",
            answer:
              "StudySync includes an integrated AI assistant that helps summarize notes, explain complex concepts, and generate study guides.",
          },
          {
            id: "q6",
            question: "Can I access StudySync for free?",
            answer:
              "Yes, StudySync is open to everyone! You can join public groups, create notes, and collaborate without any cost.",
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        {/* Hero Eyebrow */}
        <div className="mb-6">
          <Pill variant="sky" size="md">
            Shared Learning Workspace
          </Pill>
        </div>

        {/* Hero Headline with Highlighted Verb Pill */}
        <h1 className="text-[40px] sm:text-[60px] md:text-[76px] font-bold text-[#000000] tracking-[-2.5px] leading-[1.05] max-w-4xl mb-6">
          Learning works better when knowledge is{" "}
          <span className="inline-block bg-[#f6d5b8] text-black px-4 py-1 rounded-full text-[36px] sm:text-[54px] md:text-[68px] font-semibold align-middle my-1">
            shared.
          </span>
        </h1>

        {/* Editorial Subhead */}
        <p className="text-[18px] sm:text-[20px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.56] max-w-2xl mb-10">
          StudySync gives students a calm, tactile place to learn, build shared notes, discover study groups, and collaborate with peers working toward the same goals.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <Link to={user ? "/home" : "/register"}>
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              {user ? "Go to Dashboard" : "Get started free"}
            </Button>
          </Link>
          <Link to="/find-groups">
            <Button variant="ghost" size="lg">
              Explore study groups
            </Button>
          </Link>
        </div>

        {/* Product UI Mockup Preview */}
        <div className="w-full max-w-5xl rounded-[16px] bg-white border border-black/[0.08] p-4 sm:p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] text-left">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-[13px] font-medium text-[#757575] ml-2">
                studySync / Computer Science — Data Structures & Algorithms
              </span>
            </div>
            <Pill variant="sky" size="sm">
              Live Workspace
            </Pill>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Sidebar */}
            <div className="bg-[#f6f5f4] rounded-[10px] p-4 flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#757575] uppercase tracking-wider">
                Group Notes
              </span>
              <div className="bg-white p-3 rounded-[8px] border border-black/[0.08] text-[13px] font-medium text-[#0075de]">
                📘 Graph Traversal Algorithms
              </div>
              <div className="p-3 text-[13px] text-[#615d59] hover:bg-black/[0.03] rounded-[8px]">
                📄 Dynamic Programming Basics
              </div>
              <div className="p-3 text-[13px] text-[#615d59] hover:bg-black/[0.03] rounded-[8px]">
                📄 Binary Search Trees Overview
              </div>
            </div>

            {/* Mock Content */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <h3 className="text-[22px] font-bold text-[#000000]">
                Graph Traversal Algorithms (BFS & DFS)
              </h3>
              <p className="text-[14px] text-[#615d59] leading-relaxed">
                Breadth-First Search (BFS) uses a queue data structure to explore nodes layer by layer, while Depth-First Search (DFS) uses a stack or recursion to explore as far as possible down each branch before backtracking.
              </p>
              <div className="flex gap-2">
                <Pill variant="marigold" size="sm">
                  Algorithms
                </Pill>
                <Pill variant="sky" size="sm">
                  Updated today by Alex
                </Pill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Timeline Sequence: 01 Find -> 02 Learn -> 03 Share) */}
      <div className="bg-white border-y border-black/[0.08]">
        <HowItWorks />
      </div>

      {/* 3. FIND YOUR PEOPLE (Asymmetric Study Group Showcase) */}
      <GroupShowcase />

      {/* 4. BUILD SHARED KNOWLEDGE (Note Editor Showcase) */}
      <div className="bg-white border-y border-black/[0.08]">
        <KnowledgeShowcase />
      </div>

      {/* 5. GET HELP FROM AI (Conversational AI Assistant Showcase) */}
      <AIAssistantShowcase />

      {/* 6. SEE THE COMPLETE PRODUCT & WHY STUDYSYNC */}
      <div className="bg-white border-t border-black/[0.08]">
        <ProductShowcase />
      </div>

      {/* 7. HIGH-IMPACT CTA SECTION */}
      <StudySyncCTA />

      {/* 8. FAQ SCROLLER SECTION */}
      <section className="py-20 overflow-hidden bg-white border-t border-black/[0.08]">
        <FaqSection data={faqScrollerData} />
      </section>

      {/* 9. FOOTER */}
      <StudySyncFooter />

    </div>
  );
};

export default Home;
