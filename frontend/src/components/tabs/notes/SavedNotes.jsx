import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, BrowserRouter } from "react-router-dom";
import {
  Bookmark,
  Search,
  FileText,
  Share2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  Filter,
  Clock,
  Bot,
  Zap,
  ArrowUpRight,
  Code,
  Palette,
  Briefcase,
} from "lucide-react";

// --- SUB-COMPONENTS ---

const NoteCard = ({ note, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.08,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    style={{ willChange: "transform, background-color" }}
    className="group relative p-8 bg-zinc-900/30 border border-white/5 rounded-[40px] hover:border-emerald-500/30 transition-all duration-300 shadow-2xl overflow-hidden"
  >
    {/* Emerald Glow on Hover */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all" />

    <div className="flex items-start justify-between mb-8">
      <div
        className={`p-4 rounded-2xl bg-zinc-800 ${note.color} bg-opacity-10 group-hover:bg-white group-hover:text-black transition-all duration-300`}
      >
        <note.icon size={24} />
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
          <Share2 size={16} />
        </button>
        <button className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-xl text-zinc-400 hover:text-red-500 transition-all">
          <Trash2 size={16} />
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase">
          {note.group}
        </span>
        <span className="text-zinc-800">•</span>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          {note.date}
        </span>
      </div>
      <h3 className="text-2xl font-black tracking-tighter text-white leading-tight group-hover:text-emerald-400 transition-colors">
        {note.title}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 font-medium">
        {note.snippet}
      </p>
    </div>

    <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-zinc-700" />
        <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
          4 min read
        </span>
      </div>
      <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.2em] group/btn">
        OPEN INSIGHT{" "}
        <ArrowUpRight
          size={14}
          className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
        />
      </button>
    </div>
  </motion.div>
);

const SavedNotesContent = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const notes = [
    {
      id: 1,
      title: "Neural Architecture Patterns",
      group: "Neural Architects",
      snippet:
        "Exploring the fundamental trade-offs between latency and accuracy in distributed LLM deployments. Key focus on edge-case scenarios...",
      date: "Oct 12, 2024",
      icon: Code,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "UI Design Principles v2",
      group: "Design Systems Alpha",
      snippet:
        "A deep dive into spatial UI and the importance of negative space in high-density data applications. Observations on user haptic feedback...",
      date: "Oct 08, 2024",
      icon: Palette,
      color: "text-fuchsia-400",
    },
    {
      id: 3,
      title: "Market Velocity Report",
      group: "FinTech Strategy",
      snippet:
        "Comprehensive analysis of Q3 market shifts and the impact of decentralized finance protocols on traditional banking liquidity...",
      date: "Sep 28, 2024",
      icon: Briefcase,
      color: "text-amber-400",
    },
  ];

  const filters = ["all", "engineering", "design", "management", "research"];

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-hidden">
      {/* 1. Spatial Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
      </div>


      <main className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
        {/* 3. Hero & Search */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
                Saved <span className="text-emerald-500">Insights</span>
              </h1>
              <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                Access your curated database of professional knowledge, synced
                across all collectives and AI enhanced.
              </p>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Filter vault..."
                className="w-full bg-zinc-900/50 backdrop-blur-lg border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-emerald-500/40 transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div
            className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar"
            style={{
              willChange: "scroll-position",
              WebkitTransform: "translate3d(0,0,0)",
            }}
          >
            <div className="p-3 bg-white/5 rounded-xl text-zinc-500">
              <Filter size={16} />
            </div>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                  activeFilter === filter
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-zinc-500 border-zinc-700 hover:border-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* 4. The Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          style={{ WebkitTransform: "translate3d(0,0,0)" }}
        >
          {notes.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} />
          ))}
        </div>

        {/* 5. AI Reference Widget (Floating) */}
        <div
          className="mt-24 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[48px] p-4 relative overflow-hidden group"
          style={{ WebkitTransform: "translate3d(0,0,0)" }}
        >
          <div className="absolute top-0 right-0 w-[30%] h-full bg-indigo-500/10 blur-[70px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-40 animate-pulse" />
                <div className="relative p-4 bg-black rounded-[32px] border border-white/10">
                  <Bot size={30} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-white mb-2">
                  Neural Synthesis
                </h3>
                <p className="text-sm text-zinc-500 max-w-md font-medium">
                  AI analysis of your saved notes suggests you focus on{" "}
                  <span className="text-indigo-400">
                    Distributed Architectures
                  </span>{" "}
                  this week. Want a combined summary?
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-4 px-5 py-3 bg-white text-black rounded-3xl text-[0.5rem] font-black uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-gray-100 transition-all"
              style={{ willChange: "background-color" }}
            >
              <Zap size={16} /> Generate Synthesis
            </button>
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 4px; display: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-3xl { box-shadow: 0 40px 100px rgba(0,0,0,0.8); }
      `,
        }}
      />
    </div>
  );
};

export default SavedNotesContent;
