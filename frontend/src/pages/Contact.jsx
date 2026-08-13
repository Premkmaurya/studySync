import React, { useState, useRef } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactTopics from "../components/contact/ContactTopics";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactCTA from "../components/contact/ContactCTA";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
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

      {/* 4. FAQ / Quick Answers */}
      <ContactFAQ />

      {/* 5. Final CTA */}
      <ContactCTA />

      {/* 6. Footer */}
      <StudySyncFooter />
    </main>
  );
};

export default Contact;
