import React from "react";
import { useSelector } from "react-redux";
import { Cpu, ArrowRight } from "lucide-react";

const TechnicalPerformance = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <section
      className={`relative py-20 border-y overflow-hidden transition-colors ${
        theme === "light"
          ? "bg-black/[0.01] border-black/5"
          : "bg-white/[0.01] border-white/5"
      }`}
    >
      <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <Cpu size={24} />
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                theme === "light" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              System_Integrity
            </span>
          </div>
          <h2
            className={`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-10 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Engineered <br /> for Velocity.
          </h2>
          <p
            className={`text-lg font-medium mb-12 leading-relaxed ${
              theme === "light" ? "text-zinc-600" : "text-zinc-500"
            }`}
          >
            StudySync is built on a distributed cluster architecture that
            ensures your hubs are always live, your notes are always synced, and
            your AI is always ready.
          </p>
          <button
            className={`flex items-center gap-4 px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all group ${
              theme === "light"
                ? "bg-black text-white hover:bg-indigo-600"
                : "bg-white text-black hover:bg-indigo-500 hover:text-white"
            }`}
          >
            View Technical Docs{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          {[
            { label: "LATENCY", val: "9ms" },
            { label: "UPTIME", val: "99.9%" },
            { label: "ENCRYPTION", val: "AES256" },
            { label: "NODES", val: "1.2K+" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-8 border rounded-[32px] text-center transition-colors ${
                theme === "light"
                  ? "bg-white border-black/5"
                  : "bg-zinc-900 border-white/5"
              }`}
            >
              <div
                className={`text-3xl font-black mb-2 ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                {stat.val}
              </div>
              <div
                className={`text-[9px] font-bold tracking-[0.3em] uppercase ${
                  theme === "light" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalPerformance;
