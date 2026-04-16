import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Icon } from "lucide-react";

const ValueCard = ({ icon: Icon, title, desc, color, delay, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -10 }}
      className={`group relative p-10 backdrop-blur-3xl border rounded-[48px] overflow-hidden transition-colors ${
        theme === "light"
          ? "bg-white/40 border-black/5 shadow-[0_10px_60px_rgba(0,0,0,0.05)]"
          : "bg-zinc-900/40 border-white/5 shadow-[0_0_60px_rgba(255,255,255,0.05)]"
      }`}
    >
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${color}`}
      />
      <div
        className={`p-4 w-fit rounded-2xl mb-8 transition-all duration-300 ${
          theme === "light"
            ? "bg-black/5 group-hover:bg-black group-hover:text-white"
            : "bg-white/5 group-hover:bg-white group-hover:text-black"
        } ${color.replace("bg-", "text-")}`}
      >
        <Icon size={28} />
      </div>
      <h3
        className={`text-3xl font-black tracking-tighter mb-4 uppercase ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm font-medium leading-relaxed ${
          theme === "light" ? "text-zinc-600" : "text-zinc-500"
        }`}
      >
        {desc}
      </p>
    </motion.div>
  );
};

export default ValueCard;
