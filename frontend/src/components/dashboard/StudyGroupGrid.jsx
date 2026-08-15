import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, ArrowRight, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import StudyGroupCard from "./StudyGroupCard";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * StudyGroupGrid
 * Renders user's joined study groups in an asymmetric responsive grid layout (1st group card is dominant when multiple exist).
 */
const StudyGroupGrid = ({ groups = [], hasMore = false, onLoadMore }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            MY COMMUNITIES
          </span>
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#000000] tracking-[-0.6px]">
            Your study groups
          </h2>
          <p className="text-[13px] text-[#615d59]">
            Groups you're actively collaborating with.
          </p>
        </div>
        {groups.length > 0 && (
          <Link
            to="/find-groups"
            className="group text-[13px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
          >
            <span>View directory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Asymmetric Responsive Grid */}
      {groups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {groups.map((group, index) => (
              <motion.div
                key={group._id || group.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: DURATION.COMPONENT,
                  delay: index * 0.08,
                  ease: EASING.SMOOTH,
                }}
                className={index === 0 && groups.length >= 2 ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <StudyGroupCard
                  group={group}
                  isDominant={index === 0 && groups.length >= 2}
                />
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={onLoadMore}
                data-cursor-ignore="true"
                className="px-6 py-2.5 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer"
              >
                Load more groups
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-[18px] border border-black/[0.08] p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-[17px] font-bold text-[#111111]">
            No study groups joined yet.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-sm leading-relaxed font-sans">
            Find a community around something you're learning to start collaborating with peers.
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigate("/find-groups")}
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore groups</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudyGroupGrid;
