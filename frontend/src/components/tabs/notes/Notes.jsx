import React, { useState, useEffect } from "react";
import {
  Search,
  LayoutGrid,
  Zap,
  Filter,
  Code,
  Cpu,
  Shield,
  Palette,
  Globe,
  Bot,
  Sparkles,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotes, selectNotesLoading } from "../../../features/notes/notesSelectors";
import { fetchNotes, searchNotes } from "../../../features/notes/notesSlice";

import NoteCard from "./components/NoteCard";

const SavedNotesContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreNotes, setHasMoreNotes] = useState(true);

  const dispatch = useDispatch();
  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    setPage(1);
    setHasMoreNotes(true);
  }, [searchTerm, selectedCategory]);

  // Combined search and filter effect with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchAndSet = async () => {
        const query = searchTerm.trim();
        const categoryField = selectedCategory !== "All" ? selectedCategory : null;
        let res;

        if (query) {
          res = await dispatch(
            searchNotes({
              query: query.toLowerCase(),
              groupId: null,
              page,
              limit: 9,
            }),
          );
        } else {
          res = await dispatch(fetchNotes({ page, limit: 9 }));
        }

        const notesResponse = res.payload?.notes || res.payload || [];
        const filtered =
          categoryField && categoryField !== "All"
            ? notesResponse.filter((g) => g.field === categoryField)
            : notesResponse;

        if (page === 1) {
          setFilteredNotes(filtered);
        } else {
          setFilteredNotes((prev) => [...prev, ...filtered]);
        }

        setHasMoreNotes(filtered.length === 9);
      };

      fetchAndSet();
    }, searchTerm.trim() ? 300 : 0);
    return () => clearTimeout(timer);
  }, [dispatch, searchTerm, selectedCategory, page]);

  const CATEGORIES = [
    { id: "All", label: "All Hubs", icon: LayoutGrid, color: "text-white" },
    {
      id: "web-dev",
      label: "Web Engineering",
      icon: Code,
      color: "text-cyan-400",
    },
    { id: "dsa", label: "Algorithms", icon: Cpu, color: "text-amber-400" },
    {
      id: "ai-ml",
      label: "Neural Networks",
      icon: Sparkles,
      color: "text-indigo-400",
    },
    {
      id: "cybersecurity",
      label: "Security",
      icon: Shield,
      color: "text-emerald-400",
    },
    {
      id: "design",
      label: "Visual Systems",
      icon: Palette,
      color: "text-fuchsia-400",
    },
    { id: "bio", label: "Bio-Tech", icon: Globe, color: "text-emerald-300" },
    { id: "other", label: "Others", icon: Globe, color: "text-zinc-400" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-hidden">
      {/* 1. Spatial Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
      </div>

      <main className="relative z-10 pt-36 pb-12 px-6 max-w-6xl mx-auto">
        {/* 3. Hero & Search */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
                <span className="text-emerald-500">Insights</span>
              </h1>
              <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                Access your curated database of professional knowledge, synced
                across all collectives and AI enhanced.
              </p>
            </div>

            <div className="relative w-full lg:w-[400px] group">
              <div className="relative bg-transparent border-b border-white/10 py-2 pl-14 pr-8">
                <Search
                  size={24}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full bg-transparent text-lg outline-none text-white placeholder:text-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div
            className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar"
            style={{
              willChange: "scroll-position",
              WebkitTransform: "translate3d(0,0,0)",
            }}
          >
            <div className="p-2 bg-white/5 rounded-xl text-zinc-500">
              <Filter size={16} />
            </div>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border-1 ${
                  selectedCategory === category.id
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-zinc-500 border-zinc-700 hover:border-white/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* 4. The Grid */}
        <div style={{ WebkitTransform: "translate3d(0,0,0)" }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-white/5 border-t-emerald-500 rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                Loading Insights...
              </span>
            </div>
          ) : filteredNotes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.slice(0, visibleNotes)?.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center">No notes found.</p>
          )}
        </div>
        {filteredNotes.length > visibleNotes && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleNotes((prev) => prev + 9)}
              className="px-6 py-3 bg-emerald-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all"
            >
              Load More
            </button>
          </div>
        )}

        {/* 5. AI Reference Widget (Floating) */}
        <div
          className="mt-24 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[48px] p-4 relative overflow-hidden group"
          style={{ WebkitTransform: "translate3d(0,0,0)" }}
        >
          <div className="absolute top-0 right-0 w-[30%] h-full bg-indigo-500/10 blur-[70px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-40 animate-pulse" />
                <div className="relative p-4 bg-black rounded-[32px] border border-white/10">
                  <Bot size={30} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-white mb-2">
                  Neural Synthesis
                </h3>
                <p className="text-sm text-zinc-500 max-w-md font-medium">
                  AI analysis of your notes suggests you focus on{" "}
                  <span className="text-indigo-400">
                    Distributed Architectures
                  </span>{" "}
                  this week. Want a combined summary?
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-4 px-5 py-3 bg-white text-black rounded-3xl text-[0.5rem] font-black uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-gray-100 transition-all"
              style={{ willChange: "background-color" }}
            >
              <Zap size={16} /> Generate Synthesis
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedNotesContent;