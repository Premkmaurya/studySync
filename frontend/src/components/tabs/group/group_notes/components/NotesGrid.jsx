import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Clock, ArrowUpRight, Database } from "lucide-react";
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

  const handleSaveNote = async (noteId) => {
    try {
      const res = await dispatch(
        saveNote(noteId, groupId),
      );

      if (res.meta?.requestStatus === "fulfilled") {
        const savedRes = await dispatch(getSavedNotes());
        if (savedRes.payload?.savedNotes) {
          dispatch(setSavedNotes(savedRes.payload.savedNotes));
        }
      }
    } catch (error) {
      console.error("Failed to save note:", error);
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
              className="group relative p-5 bg-zinc-900/30 border border-white/5 rounded-[40px] shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all pointer-events-none" />

              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-zinc-800 rounded-2xl text-indigo-400 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <FileText size={24} />
                </div>
                <div className="flex flex-row  items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={10} /> {dayjs(article.createdAt).fromNow()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveNote(article._id);
                    }}
                    className="p-3 bg-zinc-800 w-10 h-10 rounded-full text-zinc-400 cursor-pointer hover:text-indigo-400 hover:bg-zinc-700 transition-all duration-300"
                    title={bookmarks[article._id] ? "Unsave Note" : "Save Note"}
                  >
                    {bookmarks[article._id] ? (
                      <FaBookmark size={16} />
                    ) : (
                      <FaRegBookmark size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors leading-tight">
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
