import React from "react";
import { useSelector } from "react-redux";

const TeamCall = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <section className="relative z-10 py-20 px-6 text-center">
      <h2
        className={`text-4xl md:text-7xl font-black tracking-tighter mb-10 uppercase ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Join the <span className="text-indigo-500">Collective.</span>
      </h2>
      <p
        className={`max-w-xl mx-auto mb-12 text-lg font-medium ${
          theme === "light" ? "text-zinc-600" : "text-zinc-500"
        }`}
      >
        We are constantly expanding our professional domains. Whether you're in
        Law, Medicine, or Engineering, there's a hub waiting for your insight.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button
          className={`px-12 py-6 border rounded-3xl text-xs font-black uppercase tracking-widest shadow-2xl transition-all${
            theme === "light"
              ? "bg-black/5 border-black/10 text-black hover:bg-black/10"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          Create Hub
        </button>
        <button
          className={`px-12 py-6 border rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${
            theme === "light"
              ? "bg-black/5 border-black/10 text-black hover:bg-black/10"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default TeamCall;
