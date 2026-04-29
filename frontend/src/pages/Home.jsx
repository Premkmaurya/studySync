import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Sparkles,
  ArrowDown,
  Bot,
  Zap,
  Globe,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";

import MagicBento from "../components/ui/MagicBento";
import Faq from "../components/home/FAQ/Faq";
import Footer from "../components/home/footer/Footer";

// --- INLINED COMPONENTS FOR PREVIEW STABILITY ---

const Skill = ({ theme }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
    {[
      { label: "Engineering", icon: Terminal, val: "98%" },
      { label: "Neural Net", icon: Bot, val: "92%" },
      { label: "Security", icon: ShieldCheck, val: "99%" },
      { label: "Architecture", icon: Cpu, val: "95%" },
    ].map((s, i) => (
      <div
        key={i}
        className={`p-6 rounded-3xl border text-center group hover:border-indigo-500/30 transition-all ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}
      >
        <s.icon
          className="mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform"
          size={32}
        />
        <div className={`text-xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}>{s.val}</div>
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {s.label}
        </div>
      </div>
    ))}
  </div>
);

const BentoCard = ({
  title,
  desc,
  icon: Icon,
  span = "col-span-1",
  color = "bg-indigo-500",
  theme
}) => (
  <div
    className={`relative p-8 rounded-[32px] border overflow-hidden group ${span} ${theme === "dark" ? "bg-zinc-900/40 border-white/5" : "bg-zinc-100/40 border-black/5"}`}
  >
    <div
      className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${color}`}
    />
    <Icon className={`mb-6 ${theme === "dark" ? "text-white" : "text-black"}`} size={28} />
    <h4 className={`text-xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>{title}</h4>
    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

const Feature = ({ theme }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <BentoCard
      title="Neural Synthesis"
      desc="AI that understands the hierarchy of your technical documentation."
      icon={Bot}
      theme={theme}
    />
    <BentoCard
      title="Global Hubs"
      desc="Join high-performance professional collectives."
      icon={Globe}
      color="bg-fuchsia-500"
      theme={theme}
    />
    <BentoCard
      title="Sync Engine"
      desc="Zero-latency document distribution across groups."
      icon={Zap}
      color="bg-cyan-500"
      theme={theme}
    />
  </div>
);

// --- MAIN PAGE COMPONENT ---

const Home = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className={`relative selection:bg-indigo-500/30 font-sans overflow-x-hidden ${theme === "dark" ? "bg-[#050505] text-slate-200" : "bg-[#f9f9f9] text-[#1a1a1a]"}`}>
      {/* 1. THE GLOBAL STAGE (Background Effects) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03] contrast-150 brightness-150"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
      </div>

      {/* 2. THE HERO CHAPTER */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-screen h-screen flex flex-col items-center z-10"
      >
        {/* Frame around the image */}
        <div className="fixed inset-0 w-screen h-screen overflow-hidden">
          <img
            className="w-full h-full object-cover brightness-[0.6]"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Hero Content Overlay */}
        <div className="mt-auto mb-32 z-20 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400"
          >
            <Sparkles size={12} className="animate-pulse" />
            Collective Intelligence Reimagined
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-8xl font-black tracking-tighter text-center leading-[0.85] uppercase"
          >
            STUDY_SYNC <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
              NEXUS_CORE
            </span>
          </motion.h1>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">
              Launch Hub
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
              Explore Hubs
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
          <ArrowDown size={24} />
        </div>
      </motion.div>

      {/* 3. SKILL SECTION STAGE */}
      <section className={`relative z-10 py-18 border-y ${theme === "dark" ? "bg-white/[0.01] border-white/5" : "bg-black/[0.02] border-black/5"}`}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-20 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4 block">
              Domain_Focus
            </span>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase ${theme === "dark" ? "text-white" : "text-black"}`}>
              Multidisciplinary Mastery
            </h2>
          </div>
          <Skill theme={theme} />
        </div>
      </section>

      {/* 4. THE BENTO EXPERIENCE */}
      <section className="relative z-10 w-screen py-20 flex flex-col justify-center gap-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
              <Bot size={24} className="fill-current" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              AI_Synthesis_Module
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className={`capitalize font-black text-6xl md:text-9xl tracking-tighter leading-[0.8] ${theme === "dark" ? "text-white" : "text-black"}`}>
              Predictive <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500">
                Syncing.
              </span>
            </h2>
            <p className="text-xl text-zinc-500 max-w-sm font-medium leading-relaxed mb-4">
              Experience the first engine that proactively connects dots across
              your group hubs.
            </p>
          </div>
        </div>

        {/* Bento Integration Frame */}
        <MagicBento />
      </section>

      {/* 5. FEATURE SECTION */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-10 mb-24">
            <div className="flex items-center gap-6">
              <h2 className={`text-5xl font-black tracking-tighter uppercase ${theme === "dark" ? "text-white" : "text-black"}`}>
                Collectives
              </h2>
              <div className="h-[2px] w-48 bg-gradient-to-r from-indigo-500 to-transparent" />
            </div>
          </div>
          <div className="px-10">
            <Feature theme={theme} />
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className={`relative z-10 pt-28 ${theme === "dark" ? "bg-[#080808]" : "bg-[#f1f1f1]"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-indigo-500/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Query_Database
              </span>
              <div className="h-px w-12 bg-indigo-500/50" />
            </div>
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] ${theme === "dark" ? "text-white" : "text-black"}`}>
              Frequent <br /> Protocols.
            </h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* 7. THE LEGACY FOOTER (Consolidated) */}
      <footer className={`relative z-10 w-screen overflow-x-hidden ${theme === "dark" ? "bg-black" : "bg-[#e5e5e5]"}`}>
        <Footer />
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h1, h2 { letter-spacing: -0.05em !important; }
      `,
        }}
      />
    </div>
  );
};

export default Home;
