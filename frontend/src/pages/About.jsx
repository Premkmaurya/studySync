import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { 
  Target, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Users, 
  ArrowRight,
  ChevronLeft,
  Bot
} from "lucide-react";
import Footer from "../components/home/footer/Footer";

import ValueCard from "../components/about/ValueCard";
import HeroSection from "../components/about/HeroSection";
import TechnicalPerformance from "../components/about/TechnicalPerformance";
import TeamCall from "../components/about/TeamCall";

const About = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { scrollYProgress } = useScroll();
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const values = [
    {
      icon: Target,
      title: "The Mission",
      desc: "To provide the world's most intuitive infrastructure for domain-specific group collaboration. Every professional deserves a space that thinks with them.",
      color: "bg-indigo-600",
      delay: 0.1
    },
    {
      icon: Bot,
      title: "AI First",
      desc: "Our neural sync technology doesn't just store notes; it analyzes, summarizes, and connects technical dots across your professional collectives.",
      color: "bg-fuchsia-600",
      delay: 0.2
    },
    {
      icon: ShieldCheck,
      title: "Total Privacy",
      desc: "Military-grade encryption isn't an option; it's our baseline. Your collective intelligence is yours alone, protected by high-end protocol logic.",
      color: "bg-emerald-600",
      delay: 0.3
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Syncing technical documentation from New York to Tokyo in under 9ms. A truly distributed experience for a global workforce.",
      color: "bg-cyan-600",
      delay: 0.4
    }
  ];

  return (
    <div className={`relative min-h-screen w-full selection:bg-indigo-500/30 font-sans overflow-x-hidden transition-colors ${
      theme === 'light'
        ? 'bg-white text-slate-900'
        : 'bg-[#050505] text-slate-200'
    }`}>
      
      {/* 1. CINEMATIC ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ scale: orbScale, y: orbY }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-screen h-[100vh] flex items-center justify-center"
        >
          <div className="w-[900px] h-[900px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
          <div className="absolute w-[700px] h-[700px] bg-fuchsia-600/5 blur-[160px] rounded-full delay-700" />
          {/* Simulated Orb Core */}
          <div className={`absolute w-96 h-96 border rounded-full backdrop-blur-3xl ${
            theme === 'light'
              ? 'bg-black/[0.02] border-black/5 shadow-[0_0_100px_rgba(0,0,0,0.02)]'
              : 'bg-white/[0.02] border-white/5 shadow-[0_0_100px_rgba(255,255,255,0.02)]'
          }`} />
        </motion.div>
        
        {/* Film Grain & Logic Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        <div className={`absolute inset-0 ${
          theme === 'light'
            ? 'bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_70%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]'
        }`} />
      </div>

      {/* 2. HERO STORYTELLING */}
      <main className="relative z-10 pt-28">
        <HeroSection />

        {/* 3. VALUE PROPOSITIONS (Bento Grid) */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.title}
              desc={value.desc}
              color={value.color}
              delay={value.delay}
              theme={theme}
            />
          ))}
        </section>

        {/* 4. TECHNICAL PERFORMANCE (Pulse Section) */}
        <TechnicalPerformance />

        {/* 5. TEAM CALL TO ACTION */}
          <TeamCall />
      </main>
      
      <footer className="relative z-10">
        
      <Footer />
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${theme === 'light' ? '#f9f9f9' : '#050505'}; }
        ::-webkit-scrollbar-thumb { background: ${theme === 'light' ? '#e5e5e5' : '#1a1a1a'}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h1, h2, h3 { letter-spacing: -0.05em !important; }
      `}} />
    </div>
  );
};

export default About;