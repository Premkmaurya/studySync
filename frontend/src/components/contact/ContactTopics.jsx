import React from "react";
import { HelpCircle, MessageSquare, Bug, Handshake, ArrowUpRight } from "lucide-react";

/**
 * ContactTopics
 * Lightweight section rendering compact topic pills/rows.
 * Clicking a topic pre-fills the subject field in the contact form above.
 */
const ContactTopics = ({ onSelectTopic }) => {
  const topics = [
    { label: "General question", icon: HelpCircle, desc: "Account, groups, or getting started" },
    { label: "Product feedback", icon: MessageSquare, desc: "Suggestions to make StudySync better" },
    { label: "Bug report", icon: Bug, desc: "Report something not working right" },
    { label: "Collaboration", icon: Handshake, desc: "Partnerships & study group leads" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-black/[0.08] px-4 sm:px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-center sm:text-left space-y-2">
          <span className="text-[11px] font-bold font-mono text-[#0075de] uppercase tracking-wider block">
            QUICK SUBJECT SELECTOR
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-1px]">
            What can we help with?
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#615d59]">
            Click any topic below to pre-fill the subject field in the form.
          </p>
        </div>

        {/* Compact Grid of Bordered Topic Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.label}
                onClick={() => onSelectTopic && onSelectTopic(t.label)}
                className="group flex flex-col justify-between p-4 sm:p-5 rounded-[14px] bg-[#f6f5f4] hover:bg-white border border-black/[0.08] hover:border-[#0075de]/40 shadow-2xs transition-all duration-200 text-left cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-black/[0.08] text-[#0075de] flex items-center justify-center group-hover:bg-[#0075de] group-hover:text-white transition-colors">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#757575] group-hover:text-[#0075de] transition-colors" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#111111] group-hover:text-[#0075de] transition-colors mb-1">
                    {t.label}
                  </h3>
                  <p className="text-[12px] text-[#615d59] leading-snug">
                    {t.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactTopics;
