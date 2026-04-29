import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NotesGrid from "./components/NotesGrid";
import {
  selectNotes,
  selectNotesLoading,
} from "../../../../features/notes/notesSelectors";
import {
  getNoteById,
  searchNotes,
  setLoading,
  setNotes,
} from "../../../../features/notes/notesSlice";

const GroupNotes = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreNotes, setHasMoreNotes] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groupId } = useParams();

  const loading = useSelector(selectNotesLoading);
  const notes = useSelector(selectNotes);
  const notesRef = useRef(notes);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    setPage(1);
    setHasMoreNotes(true);
  }, [searchTerm, groupId]);

  useEffect(() => {
    if (!groupId) return;

    let isCancelled = false;

    const loadNotes = async () => {
      dispatch(setLoading(true));

      let res;
      if (searchTerm.trim()) {
        res = await dispatch(
          searchNotes({
            query: searchTerm.trim(),
            groupId,
            page,
            limit: 8,
          }),
        );
      } else {
        res = await dispatch(getNoteById({ noteId: groupId, page, limit: 8 }));
      }

      if (isCancelled) return;

      const fetchedNotes = res.payload?.notes || res.payload?.note || [];
      const nextNotes =
        page === 1
          ? fetchedNotes
          : [...(Array.isArray(notesRef.current) ? notesRef.current : []), ...fetchedNotes];

      dispatch(setNotes(nextNotes));
      setHasMoreNotes(fetchedNotes.length === 8);
      dispatch(setLoading(false));
    };

    const timer = setTimeout(loadNotes, 300);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [groupId, searchTerm, page, dispatch]);

  return (
    <div className={`relative w-full min-h-screen p-6 md:p-12 ${theme === "dark" ? "bg-[#0e0e0f] text-slate-200" : "bg-[#f9f9f9] text-[#1a1a1a]"}`}>
      {/* 1. SEARCH HUB */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase ${theme === "dark" ? "text-white" : "text-black"}`}>
              Knowledge_Base
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute -inset-1 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className={`relative border rounded-full py-3 pl-12 pr-4 flex items-center ${
              theme === "dark" ? "bg-zinc-900 border-white/5" : "bg-white border-black/10 shadow-sm"
            }`}>
              <Search
                size={18}
                className={`absolute left-4 transition-colors ${
                  theme === "dark" ? "text-zinc-600 group-focus-within:text-indigo-400" : "text-zinc-400 group-focus-within:text-indigo-500"
                }`}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search archive..."
                className={`w-full bg-transparent text-sm font-bold outline-none ${
                  theme === "dark" ? "placeholder:text-white/50 text-white" : "placeholder:text-black/50 text-black"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE NOTES GRID */}
      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <div className={`w-10 h-10 border-2 border-t-indigo-500 rounded-full animate-spin ${theme === "dark" ? "border-white/5" : "border-black/5"}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"}`}>
            Accessing Vault...
          </span>
        </div>
      ) : (
        <>
          <NotesGrid searchTerm={searchTerm} />
          {hasMoreNotes && !loading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-6 py-3 bg-indigo-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* 3. QUANTUM FLOATING ACTION BUTTON */}
      {createPortal(
        <motion.button
          onClick={() => navigate(`/group/${groupId}/note`)}
          className={`fixed bottom-10 right-10 z-[100] p-4 rounded-full group shadow-2xl transition-all ${
            theme === "dark" ? "bg-white text-black hover:bg-indigo-500 hover:text-white" : "bg-black text-white hover:bg-indigo-500"
          }`}
        >
          <Plus size={20} className="transition-transform" />
          <div className={`absolute inset-0 rounded-full border-2 opacity-20 pointer-events-none ${theme === "dark" ? "border-white/20" : "border-black/20"}`} />
        </motion.button>,
        document.body,
      )}
    </div>
  );
};

export default GroupNotes;
