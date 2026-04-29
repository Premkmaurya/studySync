import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Clock, ArrowUpRight, Database, Loader2 } from "lucide-react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  selectNotes,
  selectSavedNotes,
} from "../../../../../features/notes/notesSelectors";
import {
  saveNote,
  getSavedNotes,
  setSavedNotes,
} from "../../../../../features/notes/notesSlice";

dayjs.extend(relativeTime);

const NotesGrid = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const savedNotes = useSelector(selectSavedNotes);
  const notesArray = Array.isArray(notes)
    ? notes
    : Array.isArray(notes?.notes)
      ? notes.notes
      : [];
  const [bookmarks, setBookmarks] = useState({});
  const [visibleNotes, setVisibleNotes] = useState(8);
  const [savingNoteIds, setSavingNoteIds] = useState({});

  const handleSaveNote = async (note) => {
    setSavingNoteIds((prev) => ({ ...prev, [note._id]: true }));
    try {
      const data = {
        noteId: note._id,
        groupId: note.groupId._id,
      }
      const res = await dispatch(
        saveNote(data),
      );

      if (res.meta?.requestStatus === "fulfilled") {
        const savedRes = await dispatch(getSavedNotes());
        if (savedRes.payload?.savedNotes) {
          dispatch(setSavedNotes(savedRes.payload.savedNotes));
        }
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setSavingNoteIds((prev) => {
        const next = { ...prev };
        delete next[note._id];
        return next;
      });
    }
  };

  useEffect(() => {
    const loadSavedNotes = async () => {
      if (savedNotes.length === 0) {
        const res = await dispatch(getSavedNotes());
        if (res.payload?.savedNotes) {
          dispatch(setSavedNotes(res.payload.savedNotes));
        }
      }
    };

    loadSavedNotes();
  }, []);

  useEffect(() => {
    const savedIds = new Set(
      savedNotes.map((item) => item.noteId?._id || item.noteId),
    );

    const nextBookmarks = {};
    notesArray.forEach((note) => {
      nextBookmarks[note._id] = savedIds.has(note._id);
    });

    setBookmarks(nextBookmarks);
  }, [notesArray, savedNotes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
      <AnimatePresence>
        {notesArray.length > 0 ? (
          notesArray.slice(0, visibleNotes).map((article, index) => (
            <motion.div
              key={String(article._id || index)}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className={`group relative p-5 border rounded-[40px] shadow-2xl transition-all duration-500 overflow-hidden ${
                theme === "dark" ? "bg-[#0e0e0f] border-white/10 hover:bg-[#202024]/80 backdrop-blur-sm" : "bg-white/60 border-black/10 hover:bg-white/80 backdrop-blur-sm"
              }`}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all pointer-events-none" />

              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  theme === "dark" ? "bg-zinc-800 text-indigo-400 group-hover:bg-white group-hover:text-black" : "bg-black/5 text-indigo-500 group-hover:bg-black group-hover:text-white"
                }`}>
                  <FileText size={24} />
                </div>
                <div className="flex flex-row  items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${theme === "dark" ? "text-zinc-600" : "text-zinc-500"}`}>
                    <Clock size={10} /> {dayjs(article.createdAt).fromNow()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveNote(article);
                    }}
                    disabled={savingNoteIds[article._id]}
                    className={`p-3 w-10 h-10 rounded-full cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                      theme === "dark" ? "bg-zinc-800 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-700" : "bg-black/5 text-zinc-500 hover:text-indigo-500 hover:bg-black/10"
                    }`}
                    title={savingNoteIds[article._id]
                      ? "Saving..."
                      : bookmarks[article._id]
                        ? "Unsave Note"
                        : "Save Note"}
                  >
                    {savingNoteIds[article._id] ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : bookmarks[article._id] ? (
                      <FaBookmark size={16} />
                    ) : (
                      <FaRegBookmark size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className={`text-2xl font-black tracking-tight group-hover:text-indigo-400 transition-colors leading-tight ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}>
                  {String(article.title || "Untitled Note")}
                </h3>
              </div>

              <button
                onClick={() =>
                  navigate(`/group/${groupId}/note`, {
                    state: {
                      isViewOnly: true,
                      content: article.content,
                      title: article.title,
                      groupName: article.groupId.name,
                      profession: article.groupId.field,
                    },
                  })
                }
                className={`w-full flex items-center justify-between px-6 py-4 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  theme === "dark" ? "bg-white/5 border-white/5 group-hover:border-white/10 hover:bg-white hover:text-black text-white" : "bg-black/5 border-black/5 group-hover:border-black/10 hover:bg-black hover:text-white text-black"
                }`}
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
            <div className={`p-10 border rounded-[48px] inline-block ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"}`}>
              <Database size={48} className={`mx-auto mb-6 ${theme === "dark" ? "text-zinc-800" : "text-zinc-400"}`} />
              <h3 className={`text-xl font-bold uppercase tracking-widest ${theme === "dark" ? "text-zinc-600" : "text-zinc-500"}`}>
                No entries found
              </h3>
              <p className={`text-xs mt-2 ${theme === "dark" ? "text-zinc-700" : "text-zinc-500"}`}>
                The neural archive is currently empty for this query.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {notes?.length > visibleNotes && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleNotes((prev) => prev + 8)}
            className="px-6 py-3 bg-indigo-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesGrid;
