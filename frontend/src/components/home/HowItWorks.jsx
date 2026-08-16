import React from "react";
import { Users, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../motion/Reveal";
import StaggerContainer, { StaggerItem } from "../motion/StaggerContainer";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * HowItWorks
 * Core storytelling section 1: Three-step horizontal timeline on desktop, vertical on mobile.
 * Connects 01 FIND -> 02 LEARN -> 03 SHARE with progressive connecting line animation.
 */
const HowItWorks = ({ className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      step: "01",
      tag: "FIND",
      title: "Find your people",
      description:
        "Discover study groups based on your interests, subjects, and learning goals.",
      icon: Users,
      accentBg: "bg-[#e6f3fe]",
      accentColor: "text-[#0075de]",
    },
    {
      step: "02",
      tag: "LEARN",
      title: "Learn together",
      description:
        "Discuss concepts, ask questions, and collaborate with people working toward similar goals.",
      icon: MessageSquare,
      accentBg: "bg-[#fff4cc]",
      accentColor: "text-[#e89d01]",
    },
    {
      step: "03",
      tag: "SHARE",
      title: "Build shared knowledge",
      description:
        "Create notes, save useful information, and turn group discussions into lasting knowledge.",
      icon: FileText,
      accentBg: "bg-[#0075de]/10",
      accentColor: "text-[#0075de]",
    },
  ];

  return (
    <section 
      className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto ${className}`}
      aria-labelledby="how-it-works-heading"
    >
      {/* Section Header with Reveal */}
      <Reveal direction="up" distance={16} className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
        <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20 inline-block mb-4">
          How It Works
        </span>
        <h2 
          id="how-it-works-heading"
          className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#000000] tracking-[-1.5px] leading-[1.1]"
        >
          How StudySync works
        </h2>
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-relaxed">
          Find the right people, learn together, and turn what you learn into knowledge you can keep.
        </p>
      </Reveal>

      {/* DESKTOP: Horizontal Storytelling Sequence with Progressive Line Animation */}
      <div className="hidden md:block relative max-w-6xl mx-auto">
        
        {/* Animated Hairline Horizontal Connecting Line */}
        {!shouldReduceMotion ? (
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
            className="absolute top-12 left-[18%] right-[18%] h-[1px] bg-[#0075de]/30 origin-left z-0" 
            aria-hidden="true" 
          />
        ) : (
          <div className="absolute top-12 left-[18%] right-[18%] h-[1px] bg-black/10 z-0" aria-hidden="true" />
        )}

        {/* Staggered Grid Steps */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-3 gap-8 items-stretch relative z-10">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <StaggerItem key={item.step}>
                <div className="group h-full bg-white rounded-[12px] border border-black/[0.08] p-6 lg:p-8 flex flex-col justify-between hover:border-[#0075de]/40 hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md">
                  <div>
                    {/* Header Row: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[28px] lg:text-[32px] font-bold text-[#0075de] font-mono tracking-tighter">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#757575] bg-[#f6f5f4] px-2 py-0.5 rounded border border-black/5 uppercase">
                          {item.tag}
                        </span>
                      </div>
                      <div className={`w-16 h-16 rounded-[10px] ${item.accentBg} ${item.accentColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}>
                        <IconComponent className="w-16 h-16" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-[20px] lg:text-[22px] font-bold text-[#000000] mb-2 tracking-[-0.3px]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#615d59] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Step indicator arrow for 01 and 02 */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-[#0075de] mt-6 pt-4 border-t border-black/[0.04]">
                      <span>Next step</span>
                      <ArrowRight className="w-16 h-16 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* MOBILE: Vertical Timeline Sequence with Animated Vertical Line */}
      <div className="md:hidden relative flex flex-col gap-6 max-w-md mx-auto">
        {/* Animated Vertical Line */}
        {!shouldReduceMotion ? (
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
            className="absolute top-6 bottom-6 left-6 w-[2px] bg-[#0075de]/30 origin-top z-0" 
            aria-hidden="true" 
          />
        ) : (
          <div className="absolute top-6 bottom-6 left-6 w-[2px] bg-black/10 z-0" aria-hidden="true" />
        )}

        <StaggerContainer staggerDelay={0.12} className="flex flex-col gap-6">
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <StaggerItem key={item.step}>
                <div className="relative z-10 bg-white rounded-[12px] border border-black/[0.08] p-5 pl-14 flex flex-col gap-2 shadow-xs">
                  {/* Left Circle Step Badge */}
                  <div className="absolute left-2.5 top-5 w-7 h-7 rounded-full bg-[#0075de] text-white font-mono text-[12px] font-bold flex items-center justify-center shadow-xs">
                    {item.step}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#0075de] uppercase">
                      {item.tag}
                    </span>
                    <div className={`w-9 h-9 rounded-[8px] ${item.accentBg} ${item.accentColor} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-[18px] font-bold text-[#000000]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#615d59] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default HowItWorks;
