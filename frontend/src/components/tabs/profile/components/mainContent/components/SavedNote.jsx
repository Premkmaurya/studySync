import React, { useState } from "react";
import { selectSavedNotes } from "../../../../../../features/notes/notesSelectors";
import { useSelector } from "react-redux";
import { Bookmark, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../../design-system/Card";
import Button from "../../../../../design-system/Button";
import { EmptyState } from "../../../../../design-system/States";

const SavedNote = () => {
  const savedNotes = useSelector(selectSavedNotes);
  const navigate = useNavigate();
  const [visibleSavedNotes, setVisibleSavedNotes] = useState(6);

  const handleClick = (note) => {
    navigate(`/group/${note.groupId?._id || note.groupId}/note`, {
      state: {
        title: note.noteId?.title || "Saved Note",
        content: note.noteId?.content || "",
        isViewOnly: true,
        groupName: note.groupId?.name || "Group Note",
        profession: note.groupId?.field || "General",
      },
    });
  };

  if (!savedNotes || savedNotes.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No Saved Notes Yet"
        description="Bookmark notes while browsing group knowledge bases to access them quickly here."
        actionLabel="Explore Notes"
        onAction={() => navigate("/saved-notes")}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedNotes.slice(0, visibleSavedNotes).map((note, i) => (
          <Card
            key={note._id || i}
            variant="white"
            hoverable
            onClick={() => handleClick(note)}
            className="flex items-center justify-between p-5 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-[8px] bg-[#e6f3fe] text-[#0075de]">
                <Bookmark className="w-5 h-5 fill-[#0075de]" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors">
                  {note.noteId?.title || "Saved Note"}
                </h4>
                <span className="text-[12px] text-[#757575]">
                  Saved knowledge entry
                </span>
              </div>
            </div>

            <Button variant="text" size="sm" icon={ArrowRight} />
          </Card>
        ))}
      </div>

      {savedNotes.length > visibleSavedNotes && (
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setVisibleSavedNotes((prev) => prev + 6)}
          >
            Load more saved notes
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedNote;
