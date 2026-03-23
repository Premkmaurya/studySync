import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Globe, 
  Send, 
  ChevronDown, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Bot,
  Twitter,
  Github,
  Linkedin
} from "lucide-react";
import Footer from "../components/home/footer/Footer";
import Faq from "../components/home/FAQ/Faq";
import ContactForm from "../components/contact/ContactForm";
import ContactDetails from "../components/contact/ContactDetails";

// --- INLINED SUB-COMPONENTS FOR CANVAS STABILITY ---


const DetailCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ y: -8 }}
    className="group relative p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden"
  >
    <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    <div className={`p-4 w-fit rounded-2xl mb-8 bg-white/5 ${color.replace('bg-', 'text-')} group-hover:bg-white group-hover:text-black transition-all duration-300`}>
      <Icon size={24} />
    </div>
    <div className="text-[10px] font-black text-zinc-600 tracking-[0.3em] uppercase mb-2">{title}</div>
    <div className="text-xl font-bold text-white tracking-tight">{value}</div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const formY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[160px] rounded-full" />
        
        {/* Grain Texture & Grid Line Motif */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>


      {/* 2. HERO SECTION */}
      <main className="relative z-10 pt-48 pb-32">
        <section className="max-w-7xl mx-auto px-6 text-center mb-40">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-12"
           >
              <Zap size={14} className="fill-current" />
              Establish_Contact
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase mb-12"
           >
             Reach The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-fuchsia-500">Collective.</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed"
           >
             Whether you're looking for technical support, partnership protocols, or specialized hub creation, our neural team is ready.
           </motion.p>
        </section>

        {/* 3. DETAIL BENTO GRID */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
           <ContactDetails />
        </section>

        {/* 4. THE GLASS TERMINAL (CONTACT FORM) */}
        <section className="max-w-5xl mx-auto px-6 mb-60">
           <motion.div 
             style={{ y: formY, opacity: formOpacity }}
             className="relative z-14 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[48px] shadow-3xl"
           >
              <div className="p-12 md:p-20 bg-zinc-900/60 backdrop-blur-3xl rounded-[44px] relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5">
                    <MessageSquare size={200} />
                 </div>

                 <div className="flex items-center gap-4 mb-16">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                       <Bot size={28} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Inquiry Protocol</h2>
                       <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">System will analyze your intent</p>
                    </div>
                 </div>

                 <ContactForm />
              </div>
           </motion.div>
        </section>

        {/* 5. FAQ SECTION */}
        <section className="relative py-48 bg-white/[0.01] border-y border-white/5">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-24">
                 <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 bg-indigo-500/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Query_Database</span>
                    <div className="h-px w-12 bg-indigo-500/50" />
                 </div>
                 <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.8]">
                    Frequent <br /> Protocols.
                 </h2>
              </div>
              <Faq />
           </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h1, h2 { letter-spacing: -0.05em !important; }
        input::placeholder, textarea::placeholder { font-weight: 900; }
      `}} />
    </div>
  );
};

export default Contact;