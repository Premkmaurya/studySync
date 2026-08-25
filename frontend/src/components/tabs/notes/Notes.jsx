import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Search, RotateCcw, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import LibraryOverview from "./components/LibraryOverview";
import StickyNotesSearchFilter from "./components/StickyNotesSearchFilter";
import NoteCard from "./components/NoteCard";
import KnowledgeLibraryCTA from "./components/KnowledgeLibraryCTA";

import { selectNotesLoading } from "../../../features/notes/notesSelectors";
import { getSavedNotes } from "../../../features/notes/notesSlice";
import { DURATION, EASING } from "../../motion/motionTokens";

/**
 * SavedNotesContent — Redesigned Personal Knowledge Library
 * Redesigns the notes page into a personal knowledge repository featuring editorial hero,
 * compact metadata strip, sticky search/filter control, note-type badges, plain-text previews,
 * and discovery CTA.
 */
const SavedNotesContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleNotes, setVisibleNotes] = useState(9);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectNotesLoading);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setPage(1);
    setVisibleNotes(9);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchAndSet = async () => {
        const query = searchTerm.trim();
        const categoryField = selectedCategory !== "All" ? selectedCategory : null;
        const res = await dispatch(getSavedNotes({ page, limit: 100 }));
        const savedResponse = res.payload?.savedNotes || res.payload || [];
        const notesResponse = savedResponse
          .map((savedNote) => ({
            ...savedNote.noteId,
            groupId: savedNote.noteId?.groupId || savedNote.groupId,
          }))
          .filter((note) => {
            const matchesQuery = !query ||
              `${note.title || ""} ${note.content || ""}`
                .toLowerCase()
                .includes(query.toLowerCase());
            const matchesCategory = !categoryField ||
              note.groupId?.field === categoryField || note.field === categoryField;
            return matchesQuery && matchesCategory;
          });
        if (page === 1) {
          setFilteredNotes(notesResponse);
        } else {
          setFilteredNotes((prev) => [...prev, ...notesResponse]);
        }
      };

      fetchAndSet();
    }, searchTerm.trim() ? 300 : 0);
    return () => clearTimeout(timer);
  }, [dispatch, searchTerm, selectedCategory, page]);

  // Calculate unique subjects count from real notes
  const uniqueSubjects = new Set(
    filteredNotes.map((n) => n.groupId?.field || n.field).filter(Boolean)
  );

  const isSearchOrFilterActive = Boolean(searchTerm.trim() || selectedCategory !== "All");

  return (
    <div className="mx-auto max-w-[1400px] w-full bg-[#f6f5f4] text-[#000000] min-h-screen mt-[2rem] sm:mt-0 pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip">
      
      {/* 02 — Knowledge Library Hero */}
      <Header />

      {/* 03 — Library Overview Compact Metadata Strip */}
      <LibraryOverview
        notesCount={filteredNotes.length}
        subjectsCount={uniqueSubjects.size}
      />

      {/* 04 — Sticky Search + Category Filter Control */}
      <StickyNotesSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 05 — Notes Collection Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            SAVED KNOWLEDGE REPOSITORY
          </span>
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#000000] tracking-[-0.6px]">
            Notes Collection
          </h2>
          <p className="text-[13px] text-[#615d59]">
            Review, read, and build on notes captured across your groups.
          </p>
        </div>
        {filteredNotes.length > 0 && (
          <span className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[12px] font-mono text-[#757575] font-medium shadow-2xs">
            {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* 06 — Notes Grid / Skeleton / Empty States */}
      {loading && filteredNotes.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-52 bg-white rounded-[18px] border border-black/[0.08] p-6 space-y-3">
              <div className="w-20 h-4 bg-black/10 rounded-full" />
              <div className="w-44 h-6 bg-black/10 rounded" />
              <div className="w-full h-12 bg-black/10 rounded" />
            </div>
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredNotes.slice(0, visibleNotes).map((note, index) => (
              <motion.div
                key={note._id || note.id || index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.COMPONENT,
                  delay: Math.min(index * 0.05, 0.3),
                  ease: EASING.SMOOTH,
                }}
                className={index === 0 && filteredNotes.length >= 2 && !isSearchOrFilterActive ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <NoteCard
                  note={note}
                  isDominant={index === 0 && filteredNotes.length >= 2 && !isSearchOrFilterActive}
                />
              </motion.div>
            ))}
          </div>

          {filteredNotes.length > visibleNotes && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleNotes((prev) => prev + 9)}
                data-cursor-ignore="true"
                className="px-6 py-2.5 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer shadow-2xs"
              >
                Load more notes
              </button>
            </div>
          )}
        </>
      ) : isSearchOrFilterActive ? (
        /* Search / Filter Empty State */
        <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
          <div className="w-12 h-12 rounded-full bg-[#ffb110]/15 text-[#b18164] flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
            No notes found.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
            Try another search term or clear your active category filters to inspect your saved notes.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f6f5f4] hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/[0.08] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-16 h-16 text-[#757575]" />
              <span>Clear search & filters</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Library State */
        <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
          <div className="w-12 h-12 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
            Your knowledge library is empty.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
            Save notes from your study groups and they'll appear here for quick search, review, and study sessions.
          </p>
          <div className="pt-2">
            <Link
              to="/find-groups"
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors shadow-2xs"
            >
              <Compass className="w-4 h-4" />
              <span>Explore groups →</span>
            </Link>
          </div>
        </div>
      )}

      {/* 07 — Knowledge Library Bottom CTA */}
      <KnowledgeLibraryCTA />

    </div>
  );
};

export default SavedNotesContent;