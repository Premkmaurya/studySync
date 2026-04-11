import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NotesGrid from "./components/NotesGrid";
import { selectNotesLoading } from "../../../../features/notes/notesSelectors";
import {
  getNoteById,
  searchNotes,
  setLoading,
  setNotes,
} from "../../../../features/notes/notesSlice";

const GroupNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groupId } = useParams();

  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    const loadNotes = async () => {
      dispatch(setLoading(true));
      if (searchTerm.trim()) {
        const res = await dispatch(
          searchNotes({ query: searchTerm.trim(), groupId }),
        );
        if (res.payload?.notes) {
          dispatch(setNotes(res.payload.notes));
        } else {
          dispatch(setNotes([]));
        }
      } else {
        const res = await dispatch(getNoteById(groupId));
        dispatch(setNotes(res.payload?.note || []));
      }
      dispatch(setLoading(false));
    };

    const timer = setTimeout(loadNotes, 300);
    return () => clearTimeout(timer);
  }, [dispatch, groupId, searchTerm]);

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
        <NotesGrid searchTerm={searchTerm} />
      )}

      {/* 3. QUANTUM FLOATING ACTION BUTTON */}
      {createPortal(
        <motion.button
          onClick={() => navigate(`/group/${groupId}/note`)}
          className="fixed bottom-10 right-10 z-[100] p-4 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white group"
        >
          <Plus size={20} className="transition-transform" />
          <div className="absolute inset-0 rounded-full border-2 border-white/20 opacity-20 pointer-events-none" />
        </motion.button>,
        document.body,
      )}
    </div>
  );
};

export default GroupNotes;
