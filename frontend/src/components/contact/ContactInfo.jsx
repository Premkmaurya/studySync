import React from "react";
import { HelpCircle, MessageSquare, Bug, Handshake, CheckCircle2 } from "lucide-react";

/**
 * ContactInfo
 * Left-side column for the main contact layout.
 * Renders directly on the page canvas (#f6f5f4) without extra card borders to establish visual hierarchy.
 */
const ContactInfo = ({ onSelectTopic }) => {
  const topics = [
    {
      id: "general",
      title: "GENERAL QUESTIONS",
      desc: "Questions about StudySync or getting started.",
      icon: HelpCircle,
      subjectText: "General question",
    },
    {
      id: "feedback",
      title: "PRODUCT FEEDBACK",
      desc: "Ideas or suggestions for improving the product.",
      icon: MessageSquare,
      subjectText: "Product feedback",
    },
    {
      id: "bugs",
      title: "BUG REPORTS",
      desc: "Something isn't working as expected.",
      icon: Bug,
      subjectText: "Bug report",
    },
    {
      id: "collab",
      title: "COLLABORATION",
      desc: "Interested in working with StudySync.",
      icon: Handshake,
      subjectText: "Collaboration",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full space-y-8 pr-0 lg:pr-6">
      
      {/* Intro Context */}
      <div className="space-y-4">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-1px] leading-tight">
          Have a question?
        </h2>
        <p className="text-[15px] sm:text-[17px] text-[#615d59] leading-relaxed max-w-md">
          We're here to help with questions about StudySync, study group workflows, shared notes, or platform feedback.
        </p>
      </div>

      {/* Editorial Contact Topics List */}
      <div className="space-y-5 pt-2">
        <span className="text-[11px] font-bold font-mono text-[#757575] uppercase tracking-wider block">
          What you can contact us about:
        </span>

        <div className="space-y-4">
          {topics.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => onSelectTopic && onSelectTopic(t.subjectText)}
                className="group flex items-start gap-3.5 p-3 rounded-[12px] hover:bg-white/60 transition-colors cursor-pointer border border-transparent hover:border-black/[0.06]"
              >
                <div className="w-8 h-8 rounded-[8px] bg-white border border-black/[0.08] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:bg-[#0075de] group-hover:text-white transition-colors">
                  <Icon className="w-16 h-16" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[12px] font-bold tracking-wider text-[#111111] font-mono group-hover:text-[#0075de] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-[13px] text-[#615d59] leading-snug">
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Commitment Note */}
      <div className="pt-6 border-t border-black/[0.08] space-y-2">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#111111]">
          <CheckCircle2 className="w-16 h-16 text-[#0075de]" />
          <span>Send us a message using the form</span>
        </div>
        <p className="text-[13px] text-[#615d59] pl-6 leading-relaxed">
          We review every submission carefully and get back to you as soon as possible.
        </p>
      </div>

    </div>
  );
};

export default ContactInfo;
