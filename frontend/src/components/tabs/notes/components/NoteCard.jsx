import React from "react";
import { FileText, ArrowRight, Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import Card from "../../../design-system/Card";
import Pill from "../../../design-system/Pill";
import Button from "../../../design-system/Button";

dayjs.extend(relativeTime);

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleNoteClick = () => {
    const groupId = note.groupId?._id || note.groupId;
    if (groupId) {
      navigate(`/group/${groupId}`);
      setTimeout(() => {
        navigate(`/group/${groupId}/note`, {
          state: {
            title: note.title,
            content: note.content,
            isViewOnly: true,
            groupName: note.groupId?.name || note.group,
            profession: note.groupId?.field,
          },
        });
      }, 200);
    }
  };

  const groupName = note.groupId?.name || note.group || "Study Group";
  const categoryField = note.groupId?.field || note.field || "General";

  return (
    <Card
      variant="white"
      hoverable
      onClick={handleNoteClick}
      className="flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Pill variant="sky" size="sm">
            {categoryField}
          </Pill>
          <div className="flex items-center gap-1 text-[12px] text-[#757575]">
            <Clock className="w-3.5 h-3.5" />
            <span>{dayjs(note.createdAt).fromNow()}</span>
          </div>
        </div>

        <h3 className="text-[18px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors mb-2 line-clamp-2">
          {note.title || "Untitled Note"}
        </h3>

        {note.content && (
          <p className="text-[13px] text-[#615d59] line-clamp-3 leading-relaxed mb-4">
            {note.content.replace(/<[^>]*>/g, "")}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between mt-auto">
        <span className="text-[12px] font-medium text-[#757575] truncate max-w-[180px]">
          {groupName}
        </span>
        <Button variant="text" size="sm" icon={ArrowRight} iconPosition="right">
          Read Note
        </Button>
      </div>
    </Card>
  );
};

export default NoteCard;
