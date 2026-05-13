import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {
  GitBranch,
  Zap,
  Bug,
  FeatherIcon,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Wrench,
} from "lucide-react";
import Footer from "../components/home/footer/Footer";

const Changelog = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { scrollYProgress } = useScroll();
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const [expandedVersion, setExpandedVersion] = useState("v2.0.0");

  const versions = [
    {
      version: "v2.0.0",
      date: "January 15, 2025",
      tag: "MAJOR_RELEASE",
      tagColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "Neural AI Integration",
          description:
            "Advanced AI-powered note summarization and group recommendations engine. Analyzes your learning patterns and suggests relevant study groups.",
        },
        {
          type: "feature",
          icon: Zap,
          title: "Real-Time Collaboration",
          description:
            "Live multiplayer note editing with instant sync across all group members. See changes as they happen with conflict resolution.",
        },
        {
          type: "feature",
          icon: GitBranch,
          title: "Version Control for Notes",
          description:
            "Full version history for all notes with diff comparison, rollback capabilities, and collaborative editing insights.",
        },
        {
          type: "improvement",
          icon: Wrench,
          title: "Performance Optimization",
          description:
            "50% reduction in load times, improved database queries, and optimized WebSocket connections for faster real-time updates.",
        },
        {
          type: "fix",
          icon: Bug,
          title: "Bug Fixes & Stability",
          description:
            "Fixed 47 reported issues including chat pagination, group member display, and theme persistence bugs.",
        },
      ],
    },
    {
      version: "v1.9.5",
      date: "December 1, 2024",
      tag: "PATCH",
      tagColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      changes: [
        {
          type: "fix",
          icon: Bug,
          title: "Security Patch",
          description:
            "Critical security update addressing authentication vulnerability. All users are urged to update immediately.",
        },
        {
          type: "improvement",
          icon: Wrench,
          title: "Mobile Optimization",
          description:
            "Improved responsive design for mobile devices, better touch interactions, and optimized viewport handling.",
        },
        {
          type: "feature",
          icon: FeatherIcon,
          title: "Custom Themes",
          description:
            "Users can now create and save custom color themes for personalized experience.",
        },
      ],
    },
    {
      version: "v1.9.0",
      date: "November 10, 2024",
      tag: "MINOR",
      tagColor: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "Advanced Search",
          description:
            "Full-text search across all notes and messages with filters, tags, and saved searches.",
        },
        {
          type: "feature",
          icon: Lock,
          title: "End-to-End Encryption",
          description:
            "Optional E2E encryption for sensitive group collaborations and personal notes.",
        },
        {
          type: "improvement",
          icon: Wrench,
          title: "UI/UX Improvements",
          description:
            "Redesigned sidebar navigation, improved group discovery interface, and streamlined onboarding flow.",
        },
      ],
    },
    {
      version: "v1.8.0",
      date: "October 5, 2024",
      tag: "MINOR",
      tagColor: "bg-green-500/20 text-green-400 border-green-500/30",
      changes: [
        {
          type: "feature",
          icon: GitBranch,
          title: "Group Permissions System",
          description:
            "Granular control over member roles, permissions, and access levels within groups.",
        },
        {
          type: "feature",
          icon: Zap,
          title: "Export Functionality",
          description:
            "Export notes and group data as PDF, Word, or Markdown formats.",
        },
        {
          type: "improvement",
          icon: Wrench,
          title: "API Documentation",
          description:
            "Complete REST API documentation with SDKs for Python, JavaScript, and Go.",
        },
      ],
    },
    {
      version: "v1.0.0",
      date: "September 1, 2024",
      tag: "INITIAL_RELEASE",
      tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "Core Features Launch",
          description:
            "Initial release with note-taking, group creation, real-time chat, and basic user profiles.",
        },
        {
          type: "feature",
          icon: Lock,
          title: "Authentication System",
          description:
            "Secure user registration, login, and session management with JWT tokens.",
        },
      ],
    },
  ];

  const ChangeItem = ({ change }) => {
    const IconComponent = change.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex gap-4 p-4 rounded-lg border ${
          theme === "light"
            ? "bg-white/40 border-black/5 hover:border-black/10"
            : "bg-white/[0.02] border-white/5 hover:border-white/10"
        } transition-all`}
      >
        <IconComponent
          size={20}
          className={`flex-shrink-0 mt-1 ${
            change.type === "feature"
              ? "text-indigo-500"
              : change.type === "improvement"
                ? "text-cyan-500"
                : "text-red-500"
          }`}
        />
        <div>
          <h5
            className={`font-black text-sm mb-1 uppercase tracking-wide ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {change.title}
          </h5>
          <p
            className={`text-xs leading-relaxed ${
              theme === "light" ? "text-gray-600" : "text-zinc-500"
            }`}
          >
            {change.description}
          </p>
        </div>
      </motion.div>
    );
  };

  const VersionCard = ({ data, index, isExpanded }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`mb-4 border rounded-xl overflow-hidden transition-all ${
        theme === "light"
          ? "bg-white/50 border-black/10 hover:border-indigo-500/30"
          : "bg-white/[0.03] border-white/10 hover:border-indigo-500/30"
      }`}
    >
      <button
        onClick={() =>
          setExpandedVersion(isExpanded ? "" : data.version)
        }
        className="w-full p-6 flex items-center justify-between hover:bg-indigo-500/5 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h3
                className={`text-xl font-black uppercase tracking-wide ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                {data.version}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${data.tagColor}`}
              >
                {data.tag.replace(/_/g, " ")}
              </span>
            </div>
            <p
              className={`text-xs ${
                theme === "light" ? "text-gray-500" : "text-zinc-500"
              }`}
            >
              Released {data.date}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`text-indigo-500 transition-transform flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`border-t ${
              theme === "light" ? "border-black/10" : "border-white/10"
            } px-6 py-4`}
          >
            <div className="space-y-3">
              {data.changes.map((change, i) => (
                <ChangeItem key={i} change={change} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div
      className={`relative min-h-screen w-full selection:bg-indigo-500/30 font-sans overflow-x-hidden transition-colors ${
        theme === "light"
          ? "bg-white text-slate-900"
          : "bg-[#050505] text-slate-200"
      }`}
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ scale: orbScale }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-screen h-[100vh] flex items-center justify-center"
        >
          <div className="w-[900px] h-[900px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
          <div className="absolute w-[700px] h-[700px] bg-fuchsia-600/5 blur-[160px] rounded-full delay-700" />
        </motion.div>

        {/* Film Grain & Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_70%)]"
              : "bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]"
          }`}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-28 pb-20">
        <section className="max-w-4xl mx-auto px-6 mb-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-12"
          >
            <GitBranch size={14} className="fill-current" />
            Release_History
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] uppercase mb-6 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Change <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-current to-fuchsia-500">
              Log
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl font-medium leading-relaxed mb-12 ${
              theme === "light" ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Track every update, feature, and improvement made to StudySync. We
            continuously innovate to provide the best collaborative learning
            experience.
          </motion.p>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12 p-4 rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <div className="flex items-center gap-2 text-xs">
              <Sparkles size={14} className="text-indigo-500" />
              <span className={theme === "light" ? "text-gray-600" : "text-zinc-400"}>New Features</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Wrench size={14} className="text-cyan-500" />
              <span className={theme === "light" ? "text-gray-600" : "text-zinc-400"}>Improvements</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <AlertCircle size={14} className="text-red-500" />
              <span className={theme === "light" ? "text-gray-600" : "text-zinc-400"}>Bug Fixes</span>
            </div>
          </motion.div>

          {/* Versions */}
          <div className="space-y-2">
            {versions.map((version, index) => (
              <VersionCard
                key={version.version}
                data={version}
                index={index}
                isExpanded={expandedVersion === version.version}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-20 p-8 rounded-2xl border text-center ${
              theme === "light"
                ? "bg-indigo-50/50 border-indigo-200"
                : "bg-indigo-500/5 border-indigo-500/20"
            }`}
          >
            <h3
              className={`text-2xl font-black mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Always Up to Date
            </h3>
            <p
              className={`mb-6 max-w-xl mx-auto ${
                theme === "light" ? "text-gray-700" : "text-zinc-400"
              }`}
            >
              Subscribe to our newsletter to receive updates about new features,
              improvements, and important announcements.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors"
            >
              Stay Informed
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
