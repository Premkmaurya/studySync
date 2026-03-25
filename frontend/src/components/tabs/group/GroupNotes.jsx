import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  Plus,
  Search,
  FileText,
  Clock,
  Filter,
  ArrowUpRight,
  Database,
} from "lucide-react";

dayjs.extend(relativeTime);

// --- COMPONENT LOGIC ---

const GroupNotes = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getNotes() {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/notes/get",
          { withCredentials: true },
        );
        // Ensure we are setting an array
        const notesData = Array.isArray(response.data?.notes)
          ? response.data.notes
          : [];
        setArticles(notesData);
      } catch (err) {
        console.error("Error fetching notes:", err);
        // Fallback mock data for visual demonstration in preview
        setArticles([
          {
            _id: "1",
            title: "Neural Sync Architecture",
            content: "Technical deep dive into the synchronization logic...",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "2",
            title: "Distributed Database Protocols",
            content: "Observations on latency and consistency in edge nodes...",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            _id: "3",
            title: "UI Physics Research",
            content: "How haptic feedback affects long-term user retention...",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, []);

  const filteredArticles = articles.filter((article) =>
    (article.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full min-h-screen text-slate-200 bg-[#030303] p-6 md:p-12">
      {/* 1. SEARCH HUB */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
              Knowledge_Base
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute -inset-1 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative bg-zinc-900 border border-white/5 rounded-full py-3 pl-12 pr-4 flex items-center">
              <Search
                size={18}
                className="absolute left-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search archive..."
                className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-white/50 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE NOTES GRID */}
      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            Accessing Vault...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          <AnimatePresence>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={String(article._id || index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  }}
                  className="group relative p-5 bg-zinc-900/30 border border-white/5 rounded-[40px] shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all" />

                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-zinc-800 rounded-2xl text-indigo-400 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <FileText size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={10} /> {dayjs(article.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors leading-tight">
                      {String(article.title || "Untitled Note")}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/home", {
                        state: { content: article.content, isViewOnly: true },
                      })
                    }
                    className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/5 group-hover:border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black"
                  >
                    <span>Inspect Brief</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-40 text-center"
              >
                <div className="p-10 bg-white/5 border border-white/5 rounded-[48px] inline-block">
                  <Database size={48} className="text-zinc-800 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-zinc-600 uppercase tracking-widest">
                    No entries found
                  </h3>
                  <p className="text-xs text-zinc-700 mt-2">
                    The neural archive is currently empty for this query.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 3. QUANTUM FLOATING ACTION BUTTON */}
      {createPortal(
        <motion.button
          onClick={() => navigate("/")}
          className="fixed bottom-10 right-10 z-[100] p-4 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white group"
        >
          <Plus size={20} className="transition-transform" />
          <div className="absolute inset-0 rounded-full border-2 border-white/20 opacity-20 pointer-events-none" />
        </motion.button>,
        document.body,
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `,
        }}
      />
    </div>
  );
};

export default GroupNotes;
