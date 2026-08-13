import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Sparkles, Check } from "lucide-react";
import Button from "../../../design-system/Button";
import Pill from "../../../design-system/Pill";

const Header = ({
  groupName,
  profession,
  isViewOnly,
  isAiPanelOpen,
  setIsAiPanelOpen,
  handleSave,
  isSaving,
  groupId,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f6f5f4] border-b border-black/[0.08] px-6 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Back & Group Metadata */}
        <div className="flex items-center gap-3">
          <Link to={groupId ? `/group/${groupId}` : "/home"}>
            <Button variant="text" size="sm" icon={ArrowLeft}>
              Back to Group
            </Button>
          </Link>
          <div className="h-4 w-px bg-black/10" />
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#000000]">{groupName}</span>
            <Pill variant="sky" size="sm">
              {profession}
            </Pill>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!isViewOnly ? (
            <Button
              variant="primary"
              size="sm"
              icon={isSaving ? Check : Save}
              loading={isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save Note"}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              icon={Sparkles}
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            >
              AI Summary
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
