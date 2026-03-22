import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  User, 
  Users, 
  FileText, 
  Bookmark, 
  LogOut, 
  ChevronLeft, 
  Settings, 
  Mail, 
  Shield, 
  Zap, 
  ArrowUpRight,
  MoreVertical,
  Plus,
  Code,
  Palette,
  Briefcase
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition-all group">
    <div className={`p-3 rounded-2xl w-fit mb-4 ${color} bg-opacity-10 shadow-lg`}>
      <Icon size={20} className={color} />
    </div>
    <div className="text-2xl font-black tracking-tighter text-white">{value}</div>
    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">{label}</div>
  </div>
);

// --- MAIN PROFILE VIEW ---

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'groups', label: 'My Groups', icon: Users },
    { id: 'notes', label: 'My Notes', icon: FileText },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-x-hidden">
      
      {/* 1. Spatial Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: 'opacity' }}
            className={`absolute top-0 right-0 w-[70%] h-[70%] blur-[100px] rounded-full ${
              activeTab === 'profile' ? 'bg-indigo-600' : 
              activeTab === 'groups' ? 'bg-fuchsia-600' : 
              activeTab === 'notes' ? 'bg-cyan-600' : 'bg-emerald-600'
            }`}
          />
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-zinc-800/20 blur-[80px] rounded-full" />
      </div>

      {/* 2. Top Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-zinc-400">
              <ChevronLeft size={20} />
            </button>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-[9px] font-black tracking-[0.3em] text-indigo-400 uppercase">System_Access</span>
              <h2 className="text-sm font-bold tracking-tight">User Dashboard</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-zinc-400">
              <Settings size={18} />
            </button>
            <button 
              onClick={() => navigate('/logout')}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white text-black rounded-xl text-xs font-black transition-all hover:bg-red-500 hover:text-white group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              SIGN OUT
            </button>
          </div>
        </motion.div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        
        {/* 3. Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src="https://i.pravatar.cc/300?u=premium_user" 
              className="relative w-32 h-32 md:w-44 md:h-44 rounded-[48px] border-4 border-black object-cover shadow-2xl"
              alt="Profile"
            />
            <div className="absolute -bottom-2 -right-2 p-3 bg-white text-black rounded-2xl shadow-xl">
               <Zap size={20} />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">Alex Rivera</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <span className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-indigo-500/20">
                 <Code size={12} /> Sr. Software Architect
               </span>
               <span className="text-zinc-600 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                 <Mail size={14} /> alex.n@nexus.ai
               </span>
            </div>
          </div>
        </section>

        {/* 4. Tab Switcher (Floating Pill) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[24px] shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-black shadow-xl shadow-white/5 scale-105' 
                  : 'text-zinc-500 hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'opacity, transform' }}
          >
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Notes" value="124" icon={FileText} color="text-cyan-400" />
                <StatCard label="Active Groups" value="12" icon={Users} color="text-fuchsia-400" />
                <StatCard label="Saved Items" value="56" icon={Bookmark} color="text-emerald-400" />
                <StatCard label="AI Usage" value="89%" icon={Zap} color="text-indigo-400" />
                
                <div className="md:col-span-4 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[40px] p-10 mt-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Account Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                     <div className="space-y-2">
                        <label className="text-[10px] text-indigo-400 font-black tracking-widest uppercase">Verified Profession</label>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                           Engineering Lead <Shield size={16} className="text-emerald-500" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-indigo-400 font-black tracking-widest uppercase">Nexus Access</label>
                        <div className="text-xl font-bold text-white uppercase tracking-tighter">Pro Member (Early Adopter)</div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Frontend Mavericks", tag: "ENG", icon: Code, color: "text-blue-400" },
                  { name: "Design Alpha", tag: "UI", icon: Palette, color: "text-fuchsia-400" },
                  { name: "Global Strategy", tag: "MGMT", icon: Briefcase, color: "text-amber-400" },
                ].map((group, i) => (
                  <div key={i} className="group p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] hover:border-white/10 transition-all cursor-pointer">
                    <div className={`p-4 bg-zinc-800 rounded-3xl w-fit mb-6 ${group.color} group-hover:bg-white group-hover:text-black transition-all`}>
                        <group.icon size={28} />
                    </div>
                    <h4 className="text-2xl font-black tracking-tighter text-white mb-2">{group.name}</h4>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black text-zinc-500 tracking-widest">{group.tag}</span>
                        <ArrowUpRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
                <button className="p-8 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-zinc-600 hover:text-white hover:border-white/20 transition-all gap-4 group">
                    <Plus size={40} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Create New Group</span>
                </button>
              </div>
            )}

            {activeTab === 'notes' && (
               <div className="space-y-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center justify-between p-6 bg-zinc-900/30 border border-white/5 rounded-[24px] hover:bg-white/5 transition-all cursor-pointer group">
                      <div className="flex items-center gap-6">
                         <div className="p-3 bg-white/5 rounded-xl text-zinc-500 group-hover:text-indigo-400">
                           <FileText size={20} />
                         </div>
                         <div>
                            <h4 className="text-lg font-bold text-white tracking-tight">Quantum Computing Briefing #{i}</h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Last edited 2h ago</p>
                         </div>
                      </div>
                      <MoreVertical size={18} className="text-zinc-700 hover:text-white" />
                    </div>
                  ))}
               </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2].map(i => (
                   <div key={i} className="p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] relative group overflow-hidden">
                      <div className="absolute top-6 right-6 text-emerald-400">
                         <Bookmark size={20} fill="currentColor" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">Saved: Distributed Systems Design</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-8">Highly relevant to the Nexus AI architecture. Shared by Jordan from Group Alpha.</p>
                      <button className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                         View Source <ArrowRight size={14} />
                      </button>
                   </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
      `}} />
    </div>
  );
};

// --- MOCK ARROW ICON ---
const ArrowRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);


export default Profile;