import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ContactFAQ
 * Clean, lightweight FAQ section answering recurring questions about StudySync.
 */
const ContactFAQ = () => {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is StudySync free?",
      a: "Yes, StudySync is completely open and free for students, researchers, and self-learners to join study groups and create shared notes.",
    },
    {
      q: "How do I join a study group?",
      a: "Navigate to the Explore tab in the top navigation, filter by your subject or interest, and click on any group to join the workspace.",
    },
    {
      q: "Can I create my own study group?",
      a: "Yes! Any registered user can create a private or public study group with dedicated tabs for Markdown notes, live discussion, and member roles.",
    },
    {
      q: "How do I report a problem or bug?",
      a: "Select 'Bug report' in the contact section above or send us a message through the contact form describing what happened.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f6f5f4] px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold font-mono text-[#0075de] uppercase tracking-wider block">
            QUICK ANSWERS
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-[#000000] tracking-[-1px]">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#615d59]">
            Quick answers to common questions about StudySync.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer hover:bg-black/[0.01]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] sm:text-[16px] font-bold text-[#111111]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#757575] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0075de]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[14px] text-[#615d59] leading-relaxed border-t border-black/[0.04]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactFAQ;
