import React, { useState, useRef } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactTopics from "../components/contact/ContactTopics";
import FaqSection from "@/components/ui/habit-faq-scroller";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

/**
 * Contact Page — Redesigned, Conversion-Focused Contact Experience
 * Features:
 * - Editorial typography-led hero
 * - Desktop two-column layout (Left: plain canvas context, Right: white bordered form)
 * - Mobile single-column order (Hero → Contact info → Form → Topics → FAQ → CTA → Footer)
 * - Pre-fill topic selection
 * - Verified FAQ
 * - Preserved navigation, custom cursor, and responsive design system tokens
 */
const Contact = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const formSectionRef = useRef(null);

  const handleSelectTopic = (subjectText) => {
    setSelectedSubject(subjectText);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const faqScrollerData = {
    mainTitle: "Frequently Asked Questions",
    mainSubtitle:
      "Have questions? We've got answers. Everything you need to know about StudySync study groups, shared notes, and AI support.",
    rows: [
      {
        id: "row1",
        speed: "30s",
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
    <main className="bg-[#f6f5f4] text-[#000000] min-h-screen overflow-x-clip">
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Main Contact Section (Desktop: Two-column / Mobile: Vertical) */}
      <section
        ref={formSectionRef}
        aria-label="Contact form and information"
        className="pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 max-w-[1280px] mx-auto scroll-mt-28"
      >
        <div className="grid grid-cols-1 px-8 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Context & Verified Contact Info (Plain Canvas) */}
          <div className="lg:col-span-5">
            <ContactInfo onSelectTopic={handleSelectTopic} />
          </div>

          {/* Right Column: White Bordered Contact Form Surface */}
          <div className="lg:col-span-7">
            <ContactForm
              selectedSubject={selectedSubject}
              onClearSubject={() => setSelectedSubject("")}
            />
          </div>

        </div>
      </section>

      {/* 3. What Can We Help With? */}
      <ContactTopics onSelectTopic={handleSelectTopic} />

      {/* 4. FAQ */}
      <section className="py-20 overflow-hidden bg-white border-t border-black/[0.08]">
        <FaqSection data={faqScrollerData} />
      </section>

      {/* 6. Footer */}
      <StudySyncFooter />
    </main>
  );
};

export default Contact;
