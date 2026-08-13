import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMyNotes } from "../../../../../../features/notes/notesSelectors";
import { FileText, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from "../../../../../design-system/Card";
import Button from "../../../../../design-system/Button";
import { EmptyState } from "../../../../../design-system/States";

dayjs.extend(relativeTime);

const NoteSection = () => {
  const myNotes = useSelector(selectMyNotes);
  const navigate = useNavigate();

  const handleClick = (note) => {
    navigate(`/group/${note.groupId?._id || note.groupId}/note`, {
      state: {
        title: note.title,
        content: note.content,
        isViewOnly: true,
        groupName: note.groupId?.name || "Group Note",
        profession: note.groupId?.field || "General",
      },
    });
  };

  if (!myNotes || myNotes.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Notes Created Yet"
        description="Write shared study notes inside group workspaces to compile your knowledge."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {myNotes.map((note, i) => (
        <Card
          key={note._id || i}
          variant="white"
          hoverable
          onClick={() => handleClick(note)}
          className="flex items-center justify-between p-5 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[8px] bg-[#e6f3fe] text-[#0075de]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors">
                {note.title || "Untitled Note"}
              </h4>
              <span className="text-[12px] text-[#757575]">
                {dayjs(note.createdAt).fromNow()}
              </span>
            </div>
          </div>

          <Button variant="text" size="sm" icon={ArrowRight} />
        </Card>
      ))}
    </div>
  );
};

export default NoteSection;
