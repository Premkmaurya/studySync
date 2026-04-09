import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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



const ValueCard = ({ icon: Icon, title, desc, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ y: -10 }}
    className="group relative p-10 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[48px] overflow-hidden"
  >
    <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    <div className={`p-4 w-fit rounded-2xl mb-8 bg-white/5 ${color.replace('bg-', 'text-')} group-hover:bg-white group-hover:text-black transition-all duration-300`}>
      <Icon size={28} />
    </div>
    <h3 className="text-3xl font-black tracking-tighter text-white mb-4 uppercase">{title}</h3>
    <p className="text-zinc-500 text-sm font-medium leading-relaxed">{desc}</p>
  </motion.div>
);


// --- MAIN PAGE COMPONENT ---

const About = () => {
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
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ scale: orbScale, y: orbY }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-screen h-[100vh] flex items-center justify-center"
        >
          <div className="w-[900px] h-[900px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
          <div className="absolute w-[700px] h-[700px] bg-fuchsia-600/5 blur-[160px] rounded-full delay-700" />
          {/* Simulated Orb Core */}
          <div className="absolute w-96 h-96 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.02)]" />
        </motion.div>
        
        {/* Film Grain & Logic Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]" />
      </div>

      {/* 2. HERO STORYTELLING */}
      <main className="relative z-10 pt-28">
        <section className="max-w-7xl mx-auto px-6 text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-12"
           >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              Manifesto_v2.0
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-7xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.8] uppercase mb-16"
           >
             Synthesize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-fuchsia-500">Together.</span>
           </motion.h1>
           
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="max-w-3xl mx-auto p-12 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[40px] shadow-2xl"
           >
              <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed italic">
                "We believe the next era of professional growth isn't driven by solo effort, but by the seamless, AI-assisted fusion of collective knowledge."
              </p>
           </motion.div>
        </section>

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
            />
          ))}
        </section>

        {/* 4. TECHNICAL PERFORMANCE (Pulse Section) */}
        <section className="relative py-20 bg-white/[0.01] border-y border-white/5 overflow-hidden">
           <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
           
           <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-20">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                       <Cpu size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">System_Integrity</span>
                 </div>
                 <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.8] mb-10">
                    Engineered <br /> for Velocity.
                 </h2>
                 <p className="text-lg text-zinc-500 font-medium mb-12 leading-relaxed">
                    StudySync is built on a distributed cluster architecture that ensures your hubs are always live, your notes are always synced, and your AI is always ready.
                 </p>
                 <button className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all group">
                    View Technical Docs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                 {[
                   { label: "LATENCY", val: "9ms" },
                   { label: "UPTIME", val: "99.9%" },
                   { label: "ENCRYPTION", val: "AES256" },
                   { label: "NODES", val: "1.2K+" }
                 ].map((stat, i) => (
                   <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-[32px] text-center">
                      <div className="text-3xl font-black text-white mb-2">{stat.val}</div>
                      <div className="text-[9px] font-bold text-zinc-600 tracking-[0.3em] uppercase">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 5. TEAM CALL TO ACTION */}
        <section className="relative z-10 py-20 px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-10 uppercase">Join the <span className="text-indigo-500">Collective.</span></h2>
            <p className="text-zinc-500 max-w-xl mx-auto mb-12 text-lg font-medium">
               We are constantly expanding our professional domains. Whether you're in Law, Medicine, or Engineering, there's a hub waiting for your insight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button className="px-12 py-6 bg-white text-black rounded-3xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-white/5 hover:scale-105 transition-all">Create Hub</button>
               <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Learn More</button>
            </div>
        </section>
      </main>
      
      <footer className="relative z-10">
        
      <Footer />
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h1, h2, h3 { letter-spacing: -0.05em !important; }
      `}} />
    </div>
  );
};

export default About;