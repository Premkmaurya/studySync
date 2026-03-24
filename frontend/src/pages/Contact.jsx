import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
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
  Linkedin,
} from "lucide-react";
import Footer from "../components/home/footer/Footer";
import Faq from "../components/home/FAQ/Faq";
import ContactForm from "../components/contact/ContactForm";
import ContactDetails from "../components/contact/ContactDetails";

const Contact = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* 1. CINEMATIC ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-indigo-600/20 blur-3xl rounded-full transform-gpu opacity-50" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-fuchsia-600/10 blur-3xl rounded-full transform-gpu opacity-50" />

        {/* Grain Texture & Grid Line Motif */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* 2. HERO SECTION */}
      <main className="relative z-10 pt-28">
        <section className="max-w-7xl mx-auto px-6 text-center mb-30">
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
            Reach The <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-fuchsia-500">
              Collective.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Whether you're looking for technical support, partnership protocols,
            or specialized hub creation, our neural team is ready.
          </motion.p>
        </section>

        {/* 3. DETAIL BENTO GRID */}
        <section className="w-full max-w-screen mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-30">
          <ContactDetails />
        </section>

        {/* 4. THE GLASS TERMINAL (CONTACT FORM) */}
        <section className="max-w-5xl mx-auto px-6 mb-30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 p-1 pb-10 bg-gradient-to-br from-white/10 to-transparent rounded-[48px] shadow-3xl"
          >
            <ContactForm />
          </motion.div>
        </section>

        {/* 5. FAQ SECTION */}
        <section className="relative py-18 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-indigo-500/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  Query_Database
                </span>
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
      <footer className="relative z-10 bg-[#050505]">
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

export default Contact;
