import React from "react";
import { useSelector } from "react-redux";
import { selectMyNotes } from "../../../../../../features/notes/notesSelectors";
import { FileText, MoreVertical } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NoteSection = () => {
  const myNotes = useSelector(selectMyNotes);

  return (
    <div className="space-y-4">
      {myNotes?.length > 0 ? (
        myNotes.map((note,i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 bg-zinc-900/30 border border-white/5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-white/5 rounded-xl text-zinc-500 group-hover:text-indigo-400">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {note.title} #{i}
                </h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {dayjs(note.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-white mb-4">
            No Notes Created Yet
          </h3>
          <p className="text-zinc-500 mb-6">
            Start creating notes to see them here. Your notes will be displayed
            in this section once you have created them.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Create Your First Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteSection;
