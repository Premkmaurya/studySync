import React from "react";
import { selectSavedNotes } from "../../../../../../features/notes/notesSelectors";
import { useSelector } from "react-redux";
import { Bookmark, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedNote = () => {
  const savedNotes = useSelector(selectSavedNotes);
  const navigate = useNavigate();
   const handleClick = (note) => {
    // First navigate to group
    navigate(`/group/${note.groupId._id}`);
    // Then navigate to note after a brief delay
    setTimeout(() => {
      navigate(`/group/${note.groupId._id}/note`, {
        state: {
          title: note.noteId.title,
          content: note.noteId.content,
          isViewOnly: true,
          groupName: note.groupId.name,
          profession: note.groupId.field,
        },
      });
    }, 300);
  };
  return (
    <div className="space-y-6">
      {savedNotes.length > 0 ? (
        savedNotes.map((note, i) => (
          <div
            onClick={() => handleClick(note)}
            key={i}
            className="p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] relative group overflow-hidden"
          >
            <div className="absolute top-6 right-6 text-emerald-400">
              <Bookmark size={20} fill="currentColor" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">
              Saved: {note.noteId.title || "Untitled Note"}
            </h4>
            <button
              onClick={() => console.log(note)}
              className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all"
            >
              View Source <ArrowRight size={14} />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-white mb-4">
            No Saved Notes Yet
          </h3>
          <p className="text-zinc-500 mb-6">
            Start saving notes to see them here. Your saved notes will be
            displayed in this section once you have saved them.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Explore Notes
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedNote;
