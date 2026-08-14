import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, HelpCircle, User, Check, CornerDownRight } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * DiscussionFeature
 * Shows a realistic StudySync discussion interface with question, replies, and group context.
 * Uses viewport entrance stagger for messages that settles static after reveal.
 */
const DiscussionFeature = () => {
  const shouldReduceMotion = useReducedMotion();

  const conversation = [
    {
      id: "q1",
      user: "Alex Morgan",
      avatar: "AM",
      time: "10:14 AM",
      isQuestion: true,
      text: "Can someone explain why binary search requires sorted data?",
    },
    {
      id: "r1",
      user: "Elena Rostova",
      avatar: "ER",
      time: "10:17 AM",
      isQuestion: false,
      text: "Because every comparison lets us eliminate half of the remaining search space! If the array wasn't sorted, we couldn't know whether the target element lies to the left or right of the midpoint.",
    },
    {
      id: "r2",
      user: "Marcus Chen",
      avatar: "MC",
      time: "10:20 AM",
      isQuestion: false,
      text: "Exactly. The sorted order guarantees the monotonic property. Without it, you'd be forced into O(n) linear scanning.",
    },
  ];

  return (
    <section id="discussions" className="py-20 sm:py-28 bg-white px-4 sm:px-6 md:px-12 border-b border-black/[0.08]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Discussion Workspace Visual */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="bg-[#f6f5f4] rounded-[20px] border border-black/[0.08] p-5 sm:p-7 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] space-y-4">
            
            {/* Context Header */}
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-3 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0075de]" />
                <span className="text-[13px] font-bold text-[#111111]">
                  Data Structures & Algorithms Thread
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#757575]">
                3 replies
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-4">
              {conversation.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: DURATION.COMPONENT,
                    delay: index * 0.1,
                    ease: EASING.SMOOTH,
                  }}
                  className={`p-4 rounded-[14px] border ${
                    msg.isQuestion
                      ? "bg-white border-[#0075de]/30 shadow-2xs"
                      : "bg-white/80 border-black/[0.06] ml-4 sm:ml-6"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center ${
                        msg.isQuestion ? "bg-[#0075de]" : "bg-[#615d59]"
                      }`}>
                        {msg.avatar}
                      </div>
                      <span className="text-[13px] font-bold text-[#111111]">{msg.user}</span>
                      {msg.isQuestion && (
                        <span className="px-2 py-0.5 rounded bg-[#0075de]/10 text-[#0075de] text-[10px] font-bold font-mono">
                          QUESTION
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#757575]">{msg.time}</span>
                  </div>

                  <p className="text-[13px] sm:text-[14px] text-[#111111] leading-relaxed pl-9">
                    {msg.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Editorial Text & Narrative */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
          className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#097fe8]/10 border border-[#097fe8]/20 text-[#097fe8] text-[11px] font-semibold tracking-wider uppercase font-mono">
            02. LEARN THROUGH DISCUSSION
          </span>

          <h2 className="text-[32px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.1]">
            Learning gets better when you can talk through it.
          </h2>

          <p className="text-[16px] sm:text-[19px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.6]">
            Ask questions, exchange ideas, and work through difficult concepts with other learners studying the same course material.
          </p>

          <ul className="space-y-3 pt-2 text-[14px] text-[#111111]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0075de]" />
              <span>Real-time group discussions with code snippets</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0075de]" />
              <span>Structured question & answer threads</span>
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
};

export default DiscussionFeature;
