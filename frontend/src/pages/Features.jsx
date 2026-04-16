import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { 
  Cpu, 
  Zap, 
  Bot, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Layers, 
  Workflow, 
  ArrowRight,
  Maximize2
} from "lucide-react";
import Footer from "../components/home/footer/Footer";
import MagicBento from "../components/ui/MagicBento";
import SingleFeatureCard from "../components/features/SingleFeatureCard";


const Features = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { scrollYProgress } = useScroll();
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.2]);

  const features = [
    {
      title: "Neural Core",
      desc: "Large language models integrated into the fabric of your editor for seamless synthesis.",
      icon: Bot,
      color: "text-indigo-400",
      delay: 0.1
    },
    {
      title: "Sync Engine",
      desc: "Zero-latency document distribution across multiple professional collectives.",
      icon: Zap,
      color: "text-amber-400",
      delay: 0.2
    },
    {
      title: "Vault Security",
      desc: "Military grade AES-256 encryption for all documentation and private group chats.",
      icon: ShieldCheck,
      color: "text-emerald-400",
      delay: 0.3
    },
    {
      title: "Global Mesh",
      desc: "Connect with specialists worldwide through our domain-specific professional hubs.",
      icon: Globe,
      color: "text-cyan-400",
      delay: 0.4
    },
    {
      title: "Workflow Logic",
      desc: "Customizable pipelines for technical documentation and research peer review.",
      icon: Workflow,
      color: "text-fuchsia-400",
      delay: 0.5
    },
    {
      title: "Architecture",
      desc: "Built on a distributed cloud infrastructure for 99.9% uptime and high availability.",
      icon: Layers,
      color: "text-rose-400",
      delay: 0.6
    }
  ];

  return (
    <div className={`relative min-h-screen w-full selection:bg-indigo-500/30 font-sans overflow-x-hidden transition-colors ${
      theme === 'light'
        ? 'bg-white text-slate-900'
        : 'bg-[#050505] text-slate-200'
    }`}>
      
      {/* 1. CINEMATIC BACKGROUND (The Engine) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Your Orb reimagined as a background atmosphere */}
        <motion.div 
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[100vh] flex items-center justify-center"
        >
          <div className="w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full delay-1000" />
        </motion.div>
        
        {/* Digital Grain & Grid Motif */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 3. HERO INTRODUCTION */}
      <main className="relative z-10 pt-28 pb-32 px-6">
        <section className="max-w-7xl mx-auto text-center mb-40">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10"
           >
              <Zap size={14} className="fill-current" />
              Advanced Capability Suite
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12 ${
               theme === 'light' ? 'text-black' : 'text-white'
             }`}
           >
             System <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500">Intelligence.</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className={`text-xl max-w-2xl mx-auto font-medium leading-relaxed ${
               theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
             }`}
           >
             A complete infrastructure for professional collective knowledge management, optimized for speed and high-density technical syncing.
           </motion.p>
        </section>

        {/* 4. THE FEATURES GRID (FeaturesCards Redesigned) */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <SingleFeatureCard
              key={index}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </section>

        {/* 5. THE BENTO STAGE (MagicBento Redesigned) */}
        <section className={`relative py-18 border-y rounded-[80px] transition-colors ${
          theme === 'light'
            ? 'bg-black/[0.01] border-black/5'
            : 'bg-white/[0.01] border-white/5'
        }`}>
           <div className="max-w-5xl mx-auto text-center mb-10 px-6">
              <div className="flex items-center justify-center gap-4 mb-8">
                 <div className="h-px w-12 bg-indigo-500/50" />
                 <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                   theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                 }`}>Autonomous Module</span>
                 <div className="h-px w-12 bg-indigo-500/50" />
              </div>
              <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-10 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}>
                Adaptive <br /> Intelligence
              </h2>
              <p className={`text-lg max-w-lg mx-auto font-medium ${
                theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
                Automating communication in Slack, scheduling via Calendar, and syncing intelligence across your ecosystem.
              </p>
           </div>

           {/* Bento Frame */}
           <div className="max-w-7xl mx-auto px-6">
             <MagicBento />
           </div>
        </section>
      </main>

      {/* 6. THE LEGACY FOOTER (Consistent with Brand) */}
      <footer className="relative z-10 w-screen">
        <Footer />
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${theme === 'light' ? '#f9f9f9' : '#050505'}; }
        ::-webkit-scrollbar-thumb { background: ${theme === 'light' ? '#e5e5e5' : '#1a1a1a'}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h1, h2 { letter-spacing: -0.05em !important; }
      `}} />
    </div>
  );
};

export default Features;