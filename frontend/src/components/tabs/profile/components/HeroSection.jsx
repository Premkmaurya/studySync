import React, { useRef } from "react";
import { Mail, Pencil, Sparkles, User, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { selectUser } from "../../../../features/auth/authSelectors";
import { updateProfilePicture, setUser } from "../../../../features/auth/authSlice";
import Avatar from "../../../design-system/Avatar";
import { DURATION, EASING } from "../../../motion/motionTokens";

/**
 * HeroSection
 * Personal Learning Identity Hero & Identity Card Object.
 * Features editorial typography, live user data, avatar upload trigger, and subtle node SVG background.
 */
const HeroSection = () => {
  const imageRef = useRef(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const shouldReduceMotion = useReducedMotion();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const userId = user?._id || user?.id;
      const res = await dispatch(
        updateProfilePicture({ id: userId, profilePicture: formData })
      );
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(
          setUser({ ...user, profilePicture: res.payload.user.profilePicture })
        );
      }
    }
  };

  const fullName = user?.fullname
    ? `${user.fullname.firstname || ""} ${user.fullname.lastname || ""}`.trim()
    : user?.username || "Student";

  return (
    <div className="space-y-8 mb-8">
      {/* 01 — Hero Header Statement */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
        className="space-y-2 max-w-3xl"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> YOUR LEARNING PROFILE
          </span>
          <span className="text-[12px] font-mono text-[#757575]">
            • Active Learner Identity
          </span>
        </div>

        <h1 className="text-[36px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.08]">
          Your learning identity.
        </h1>

        <p className="text-[15px] sm:text-[17px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.5]">
          Manage your profile, communities, and the knowledge you've built across StudySync.
        </p>
      </motion.div>

      {/* 02 — Main Identity Card Object */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.STORYTELLING, delay: 0.1, ease: EASING.SMOOTH }}
        className="relative bg-white rounded-[20px] border border-black/[0.1] p-6 sm:p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] overflow-hidden space-y-6"
      >
        {/* Subtle Background SVG Node Accent */}
        <div className="absolute right-0 top-0 -z-10 opacity-25 pointer-events-none hidden md:block">
          <svg width="260" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="180" cy="35" r="4" fill="#0075de" />
            <circle cx="220" cy="85" r="3" fill="#6366f1" />
            <line x1="180" y1="35" x2="220" y2="85" stroke="#0075de" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Container with Upload Badge */}
            <div className="relative group shrink-0">
              <Avatar
                src={user?.profilePicture}
                name={fullName}
                size="xl"
                borderColor="#0075de"
              />
              <input
                ref={imageRef}
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profilePicture"
                data-cursor-ignore="true"
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0075de] text-white hover:bg-[#097fe8] cursor-pointer shadow-2xs transition-all hover:scale-105"
                title="Upload avatar"
              >
                <Pencil className="w-3.5 h-3.5" />
              </label>
            </div>

            {/* Identity Details */}
            <div className="text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#000000] tracking-[-0.6px]">
                  {fullName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-bold uppercase">
                  Member
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-[13px] text-[#615d59]">
                <Mail className="w-4 h-4 text-[#757575]" />
                <span className="font-mono">{user?.email || "No email linked"}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[12px] font-mono text-[#10b981] font-semibold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Learning on StudySync
              </div>
            </div>
          </div>

          {/* Compact Edit Action Button */}
          <label
            htmlFor="profilePicture"
            data-cursor-ignore="true"
            className="px-4 py-2 bg-white hover:bg-black/5 border border-black/15 text-[#111111] text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            Edit profile picture
          </label>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
