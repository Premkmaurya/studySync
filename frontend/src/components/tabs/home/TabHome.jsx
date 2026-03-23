import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  Zap,
  Star,
  Compass,
  LayoutGrid,
  Bot
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const GroupCard = ({ group, isSuggested = false }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
    style={{ willChange: 'transform, background-color' }}
    className={`relative group p-6 rounded-[32px] border transition-all duration-300 ${
      isSuggested 
      ? 'bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40 shadow-[0_20px_50px_rgba(99,102,241,0.05)]' 
      : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
    }`}
  >
    {/* Match Percentage for Suggested */}
    {isSuggested && (
      <div className="absolute top-6 right-6 px-2 py-1 bg-indigo-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest">
        {group.match}% Match
      </div>
    )}

    <div className="flex items-start gap-5 mb-8">
      <div className="relative">
        <div className={`absolute inset-0 blur-xl opacity-20 ${group.accent}`} />
        <img 
          src={group.image} 
          className="relative w-16 h-16 rounded-2xl object-cover border border-white/10" 
          alt={group.name} 
        />
      </div>
      <div className="flex-1">
        <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-1">
          {group.field}
        </div>
        <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {group.name}
        </h4>
      </div>
    </div>

    <div className="flex items-center gap-4 mb-8">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <img key={i} src={`https://i.pravatar.cc/100?u=${group.id + i}`} className="w-7 h-7 rounded-full border-2 border-zinc-950" />
        ))}
        <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-400 border-2 border-zinc-950">
          +{group.members}
        </div>
      </div>
      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Active Now</span>
    </div>

    <div className="flex gap-2 mt-auto">
      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
        <MessageSquare size={14} /> Chat
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
        <FileText size={14} /> Notes
      </button>
      {isSuggested && (
        <button className="p-3 bg-white text-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
          <Plus size={16} />
        </button>
      )}
    </div>
  </motion.div>
);

const Home = () => {

  const joinedGroups = [
    { id: 1, name: "Neural Architects", field: "AI Engineering", members: 42, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200", accent: "bg-indigo-500" },
    { id: 2, name: "FinTech Alpha", field: "Economics", members: 128, image: "https://images.unsplash.com/photo-1611974717482-aa8a66164ae1?auto=format&fit=crop&q=80&w=200", accent: "bg-emerald-500" },
    { id: 3, name: "Design Systems", field: "Creative", members: 15, image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=200", accent: "bg-fuchsia-500" },
  ];

  const suggestedGroups = [
    { id: 4, name: "Rust Core Devs", field: "Engineering", members: 89, match: 98, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200", accent: "bg-orange-500" },
    { id: 5, name: "Quantum Labs", field: "Research", members: 34, match: 85, image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=200", accent: "bg-cyan-500" },
  ];

  return (
    <div className="relative pt-26 min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-x-hidden">
      
      {/* 1. Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[90px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-fuchsia-600/5 blur-[80px] rounded-full" />
      </div>

      {/* 2. Page Header */}
      <header className="relative z-10 pt-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Hello, <span className="text-indigo-500">Alex</span>
          </h1>
        </div>
      </header>

      {/* 3. Main Sections */}
      <main className="relative z-10 px-6 max-w-7xl mx-auto space-y-24 pb-32">
        
        {/* Joined Groups Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tighter text-white">Your Collectives</h2>
              <div className="h-px w-24 bg-gradient-to-r from-indigo-500/50 to-transparent" />
            </div>
            <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
 
          </div>
        </section>

        {/* Suggested Discovery Section */}
        <section className="relative">
          {/* Section Glow */}
          <div className="absolute inset-0 bg-indigo-500/5 blur-[70px] pointer-events-none rounded-full" />
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
               <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Compass size={20} />
               </div>
               <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white">Neural Discovery</h2>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Suggested for your profession</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedGroups.map((group) => (
                <GroupCard key={group.id} group={group} isSuggested />
              ))}
              
              {/* Promotion/Stats Bento Card */}
              <div className="p-8 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-[32px] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
                 <div className="relative z-10 flex flex-col h-full">
                    <TrendingUp size={32} className="text-white mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-black tracking-tighter text-white mb-2 leading-tight">Professional Velocity</h3>
                    <p className="text-xs text-white/70 font-medium mb-8">Users in AI groups have increased note output by 40% this month.</p>
                    <button className="mt-auto w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all">
                       Explore Trending
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #4f46e5; }
      `}} />
    </div>
  );
};

export default Home;