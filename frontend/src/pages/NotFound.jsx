import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  ShieldAlert,
  Bot,
  Ghost,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  // Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const dx = useSpring(
    useTransform(mouseX, [0, window.innerWidth], [-20, 20]),
    springConfig,
  );
  const dy = useSpring(
    useTransform(mouseY, [0, window.innerHeight], [-20, 20]),
    springConfig,
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-slate-200 selection:bg-indigo-500/40 font-sans overflow-hidden flex items-center justify-center p-8">
      {/* 1. INTERACTIVE ATMOSPHERE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Aura Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-600/5 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-600/5 blur-[140px] rounded-full" />

        {/* Grain & Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] contrast-125 brightness-150"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Glitch Scanner Line */}
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent z-10"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* 2. THE ERROR CORE */}
      <main className="relative z-20 w-full max-w-5xl text-center">
        {/* Floating Bot Context */}
        <motion.div style={{ x: dx, y: dy, willChange: "transform" }} className="mb-8 inline-block">
          <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl relative group">
            <div className="absolute -inset-2 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bot
              size={48}
              className="text-indigo-400 group-hover:rotate-12 transition-transform"
            />
          </div>
        </motion.div>

        {/* Parallax 404 Digits */}
        <motion.div
          style={{
            x: useTransform(dx, (v) => v * 1.5),
            y: useTransform(dy, (v) => v * 1.5),
            willChange: "transform"
          }}
          className="relative inline-block mb-8 select-none"
        >
          <h1 className="text-[14rem] md:text-[24rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_80px_rgba(99,102,241,0.1)]">
            404
          </h1>

          {/* Glitch Shadows */}
          <motion.div
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.05 }}
            className="absolute top-0 left-0 w-full h-full text-rose-500/10 mix-blend-screen pointer-events-none"
            style={{ willChange: "transform" }}
          >
            <span className="text-[14rem] md:text-[24rem] font-black tracking-tighter leading-none">
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Diagnostic Metadata */}
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2"
            >
              <ShieldAlert size={12} className="text-rose-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Node_Isolation_Protocol_Active
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              Lost in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
                Null Space.
              </span>
            </h2>
          </div>

          <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-lg mx-auto italic">
            The hub you've attempted to access has desynced from the main
            collective network. Access tokens invalidated.
          </p>

          {/* RECONNECTION CTAS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* PRIMARY HOME BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:scale-105 hover:bg-zinc-100 active:scale-95 transition-all"
            >
              <Home size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              Return to Base
            </button>

            {/* SECONDARY ACTION */}
            <button
              onClick={() => navigate("/find-groups")}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-zinc-900/50 border border-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-105 active:scale-95 transition-all group"
            >
              <Search
                size={14}
                className="group-hover:text-indigo-400 group-hover:scale-110 transition-all"
              />
              Available Hubs
            </button>
          </motion.div>
        </div>
      </main>

      {/* 3. FLOATING FRAGMENTS (lost data) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: "transform"
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Ghost size={24} className="text-indigo-500/20" />
        </motion.div>
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        h1 { text-shadow: 0 0 100px rgba(99, 102, 241, 0.05); }
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default NotFound;
