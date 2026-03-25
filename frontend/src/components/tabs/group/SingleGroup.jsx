import { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Users,
  Settings,
  Zap,
  ShieldCheck,
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
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-600/5 blur-[100px] rounded-full" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/5 blur-[80px] rounded-full" style={{ transform: 'translateZ(0)' }} />
      </div>

      {/* 2. CONTEXTUAL SUB-SIDEBAR (The Blade) */}
      <aside className="relative z-20 w-full md:w-72 lg:w-80 h-auto md:h-screen flex flex-col border-r border-white/5 bg-zinc-950/80 pt-10 px-6" style={{ transform: 'translateZ(0)' }}>
        {/* Hub Identity */}
        <div className="mb-10 group">

          <div className="relative">
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
      <main className="relative z-10 flex-1 h-screen overflow-y-auto custom-scrollbar" style={{ WebkitTransform: 'translate3d(0,0,0)', willChange: 'transform' }}>
        {/* Content Viewport */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet context={{ group }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

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

export default SingleGroupPage;