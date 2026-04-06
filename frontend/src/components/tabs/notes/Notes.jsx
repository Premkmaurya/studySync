import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "react-window";
import {
  Search,
  Filter,
  Bot,
  Zap,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotes } from "../../../features/notes/notesSelectors";
import { fetchNotes } from "../../../features/notes/notesSlice";


import NoteCard from "./components/NoteCard";

const NotesRow = ({ index, style, data }) => {
  const notes = data;
  const note1 = notes[index * 3];
  const note2 = notes[index * 3 + 1];
  const note3 = notes[index * 3 + 2];

  return (
    <div style={style} className="px-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {note1 && <NoteCard note={note1} index={index * 3} />}
        {note2 && <NoteCard note={note2} index={index * 3 + 1} />}
        {note3 && <NoteCard note={note3} index={index * 3 + 2} />}
      </div>
    </div>
  );
};

const SavedNotesContent = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchAllNotes = async () => {
      const res = await dispatch(fetchNotes());
    }
    fetchAllNotes();
  },[])

  const filters = ["all", "engineering", "design", "management", "research"];

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


      <main className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
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

            <div className="relative w-full md:w-80 group">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Filter vault..."
                className="w-full bg-zinc-900/50 backdrop-blur-lg border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-emerald-500/40 transition-all placeholder:text-zinc-700"
              />
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
            <div className="p-3 bg-white/5 rounded-xl text-zinc-500">
              <Filter size={16} />
            </div>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                  activeFilter === filter
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-zinc-500 border-zinc-700 hover:border-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* 4. The Grid */}
        <div style={{ WebkitTransform: "translate3d(0,0,0)" }}>
          {notes.length > 0 ? (
            <List
              height={Math.min(Math.ceil(notes.length / 3) * 320, 800)} // Max height of 800px, row height ~320px
              itemCount={Math.ceil(notes.length / 3)} // Each row contains up to 3 items
              itemSize={320} // Height of each row
              itemData={notes}
              className="w-full"
            >
              {NotesRow}
            </List>
          ) : (
            <p className="text-zinc-500">No notes found.</p>
          )}
        </div>

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
                  AI analysis of your saved notes suggests you focus on{" "}
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
