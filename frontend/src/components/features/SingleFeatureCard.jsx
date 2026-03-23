import React from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeatureIcon = ({ icon: Icon, color }) => (
  <div className={`p-4 rounded-2xl bg-zinc-900 border border-white/10 ${color} shadow-lg relative group-hover:scale-110 transition-transform`}>
    <Icon size={24} />
    <div className={`absolute inset-0 blur-xl opacity-20 -z-10 ${color.replace('text-', 'bg-')}`} />
  </div>
);

const SingleFeatureCard = ({ title, desc, icon: Icon, color, delay }) => {


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10 }}
      className="group relative p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden hover:border-white/20 transition-all duration-500"
    >
      <div className="flex flex-col h-full">
        <FeatureIcon icon={Icon} color={color} />
        <h3 className="text-2xl font-black tracking-tighter text-white mt-8 mb-4">
          {title}
        </h3>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8">
          {desc}
        </p>
        <button className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore Protocol <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default SingleFeatureCard;
