import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeatureIcon = ({ icon: Icon, color, theme }) => (
  <div className={`p-4 rounded-2xl border shadow-lg relative group-hover:scale-110 transition-transform ${
    theme === 'light'
      ? 'bg-white/40 border-black/10'
      : 'bg-zinc-900 border-white/10'
  } ${color}`}>
    <Icon size={24} />
    <div className={`absolute inset-0 blur-xl opacity-20 -z-10 ${color.replace('text-', 'bg-')}`} />
  </div>
);

const SingleFeatureCard = ({ title, desc, icon: Icon, color, delay }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10 }}
      className={`group relative p-8 backdrop-blur-3xl rounded-[40px] overflow-hidden transition-all duration-500 ${
        theme === 'light'
          ? 'bg-white/40 border border-black/5 hover:border-black/20'
          : 'bg-zinc-900/40 border border-white/5 hover:border-white/20'
      }`}
    >
      <div className="flex flex-col h-full">
        <FeatureIcon icon={Icon} color={color} theme={theme} />
        <h3 className={`text-2xl font-black tracking-tighter mt-8 mb-4 ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          {title}
        </h3>
        <p className={`text-sm font-medium leading-relaxed mb-8 ${
          theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
        }`}>
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
