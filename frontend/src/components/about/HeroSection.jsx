import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <section className="max-w-7xl mx-auto px-6 text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`inline-flex items-center gap-3 px-5 py-2 border rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 ${
          theme === "light"
            ? "bg-black/5 border-black/10 text-zinc-600"
            : "bg-white/5 border-white/10 text-zinc-500"
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
        Manifesto_v2.0
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase mb-16 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Synthesize <br />{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-current to-fuchsia-500">
          Together.
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`max-w-3xl mx-auto p-12 backdrop-blur-xl rounded-[40px] shadow-2xl transition-colors ${
          theme === "light"
            ? "bg-black/[0.02] border border-black/5"
            : "bg-white/[0.02] border border-white/5"
        }`}
      >
        <p
          className={`text-xl md:text-2xl font-medium leading-relaxed italic ${
            theme === "light" ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          "We believe the next era of professional growth isn't driven by solo
          effort, but by the seamless, AI-assisted fusion of collective
          knowledge."
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
