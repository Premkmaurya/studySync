import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Clock, ArrowRight, Bookmark, Loader2 } from "lucide-react";
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
import Card from "../../../../design-system/Card";
import Button from "../../../../design-system/Button";
import Pill from "../../../../design-system/Pill";
import { EmptyState } from "../../../../design-system/States";

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
  const [savingNoteIds, setSavingNoteIds] = useState({});

  const handleSaveNote = async (e, note) => {
    e.stopPropagation();
    setSavingNoteIds((prev) => ({ ...prev, [note._id]: true }));
    try {
      const data = {
        noteId: note._id,
        groupId: note.groupId?._id || groupId,
      };
      const res = await dispatch(saveNote(data));

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
    const savedIds = new Set(
      savedNotes.map((item) => item.noteId?._id || item.noteId)
    );
    const nextBookmarks = {};
    notesArray.forEach((note) => {
      nextBookmarks[note._id] = savedIds.has(note._id);
    });
    setBookmarks(nextBookmarks);
  }, [notesArray, savedNotes]);

  if (notesArray.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No notes in this group yet"
        description="Be the first to create a shared knowledge note for your group."
        actionLabel="Create Note"
        onAction={() => navigate(`/group/${groupId}/note`)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notesArray.map((article, index) => (
        <Card
          key={String(article._id || index)}
          variant="white"
          hoverable
          onClick={() =>
            navigate(`/group/${groupId}/note`, {
              state: {
                isViewOnly: true,
                id: article._id,
                content: article.content,
                title: article.title,
                groupName: article.groupId?.name || "Group Note",
                profession: article.groupId?.field || "General",
              },
            })
          }
          className="flex flex-col justify-between h-full group"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-[12px] text-[#757575]">
                <Clock className="w-3.5 h-3.5" />
                <span>{dayjs(article.createdAt).fromNow()}</span>
              </div>
              <button
                type="button"
                onClick={(e) => handleSaveNote(e, article)}
                disabled={savingNoteIds[article._id]}
                className="p-1.5 rounded-[6px] text-[#757575] hover:text-[#0075de] hover:bg-[#e6f3fe] transition-colors"
                title={bookmarks[article._id] ? "Saved" : "Save to library"}
              >
                {savingNoteIds[article._id] ? (
                  <Loader2 className="w-16 h-16 animate-spin text-[#0075de]" />
                ) : (
                  <Bookmark
                    className={`w-16 h-16 ${
                      bookmarks[article._id]
                        ? "fill-[#0075de] text-[#0075de]"
                        : ""
                    }`}
                  />
                )}
              </button>
            </div>

            <h3 className="text-[18px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors mb-2 line-clamp-2">
              {String(article.title || "Untitled Note")}
            </h3>

            {article.content && (
              <p className="text-[13px] text-[#615d59] line-clamp-3 leading-relaxed mb-4">
                {article.content.replace(/<[^>]*>/g, "")}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-end mt-auto">
            <Button
              variant="text"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              Open Note
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotesGrid;
