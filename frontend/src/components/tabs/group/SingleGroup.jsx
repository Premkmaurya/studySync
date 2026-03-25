import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Users,
  Settings,
  ChevronLeft,
  Zap,
  Bot,
  Activity,
  ShieldCheck,
  MoreVertical,
  Plus,
} from "lucide-react";

// --- SUB-COMPONENTS ---

const SubNavItem = ({ to, icon: Icon, label, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 group
      ${isActive ? "bg-white text-black shadow-xl scale-[1.02]" : "text-zinc-500 hover:text-white hover:bg-white/5"}
    `}
  >
    {({ isActive }) => (
      <>
        <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
        <span className="text-[11px] font-black uppercase tracking-widest">
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="sub-active-pill"
            className="absolute -right-1 w-1 h-6 bg-indigo-500 rounded-full"
          />
        )}
      </>
    )}
  </NavLink>
);

// --- MAIN PAGE COMPONENT ---

const SingleGroupPage = () => {
  const { groupId = "nexus-01" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [group, setGroup] = useState(location.state?.groupData);
  const [loading, setLoading] = useState(!group);

  useEffect(() => {
    if (!group) {
      const fetchGroupData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/groups/search/${groupId}`,
            { withCredentials: true },
          );
          if (response.data.group) {
            setGroup(response.data.group);
          }
        } catch (err) {
          // Fallback mock for high-fidelity UI demonstration
          setGroup({
            name: "Neural Architects",
            members: 42,
            field: "AI_ML",
            description:
              "Deep research into transformer architectures and synthetic data.",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchGroupData();
    }
  }, [groupId, group]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Zap className="text-indigo-500" size={40} />
        </motion.div>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-hidden flex flex-col md:flex-row">
      {/* 1. SPATIAL BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/5 blur-[120px] rounded-full" />
      </div>

      {/* 2. CONTEXTUAL SUB-SIDEBAR (The Blade) */}
      <aside className="relative z-20 w-full md:w-72 lg:w-80 h-auto md:h-screen flex flex-col border-r border-white/5 bg-zinc-950/40 backdrop-blur-3xl pt-10 px-6">
        {/* Hub Identity */}
        <div className="mb-10 group">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[9px] font-black text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.3em] mb-8"
          >
            <ChevronLeft size={14} /> Back to Nexus
          </button>

          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Active_Collective
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase leading-none group-hover:text-indigo-400 transition-colors">
              {group?.name || "Group Hub"}
            </h2>
            <div className="flex items-center gap-4 mt-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Users size={12} /> {group?.members || 0} Synced
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-400 font-black">
                <ShieldCheck size={12} /> Secure
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <nav className="flex-1 flex flex-col gap-2">
          <SubNavItem
            to={`/group/${groupId}`}
            end
            icon={FileText}
            label="Knowledge base"
          />
          <SubNavItem
            to={`/group/${groupId}/chats`}
            icon={MessageSquare}
            label="Neural Chat"
          />
          <SubNavItem
            to={`/group/${groupId}/members`}
            icon={Users}
            label="Collective"
          />

            <SubNavItem
              to={`/group/${groupId}/settings`}
              icon={Settings}
              label="Protocols"
            />

        </nav>
      </aside>

      {/* 3. MAIN CONTENT STAGE */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto custom-scrollbar">
        {/* Dynamic Top Bar */}
        <header className="sticky top-0 w-full z-30 flex items-center justify-between px-8 py-6 bg-zinc-950/20 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-900 rounded-xl border border-white/10">
              <Activity size={16} className="text-zinc-400" />
            </div>
            <div className="hidden sm:block text-left">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                Live_Protocol
              </h3>
              <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                NODE_ID: 0X_SYNC_{groupId?.substring(0, 6)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-white/5 hover:scale-105 active:scale-95 transition-all">
              <Plus size={14} /> NEW_INSIGHT
            </button>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-500 hover:text-white transition-all">
              <MoreVertical size={16} />
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="p-8 lg:p-12 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
              {/* Preview Placeholder if no outlet content */}
              {location.pathname.endsWith(groupId) && (
                <div className="space-y-12">
                  <div className="flex items-end justify-between border-b border-white/5 pb-8">
                    <h1 className="text-5xl font-black tracking-tighter uppercase">
                      Knowledge_Base
                    </h1>
                    <span className="text-[10px] font-black text-zinc-600 tracking-[0.3em] uppercase">
                      Storage: 4.2GB / 10GB
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] hover:border-white/10 transition-all cursor-pointer group"
                      >
                        <FileText
                          size={24}
                          className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform"
                        />
                        <h4 className="text-xl font-bold text-white mb-2">
                          Protocol Architecture v{i}.0
                        </h4>
                        <p className="text-sm text-zinc-500 font-medium line-clamp-2">
                          Exploring technical requirements for the next-gen
                          neural sync gateway...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Status Footer */}
      <footer className="fixed bottom-0 right-0 px-8 py-4 flex items-center gap-10 text-[8px] font-black text-zinc-800 tracking-[0.5em] uppercase pointer-events-none z-[100]">
        <div className="flex gap-10">
          <span>SYNC_STREAM: OPTIMAL</span>
          <span>UPLINK: ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span>NEXUS_READY</span>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        h2, h1 { letter-spacing: -0.05em !important; }
      `,
        }}
      />
    </div>
  );
};

// --- WRAPPER FOR PREVIEW ---
export default SingleGroupPage;
