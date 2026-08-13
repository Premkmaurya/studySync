import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import api from "../../../services/api";
import AIPopup from "../chats_components/AiPopup";
import ChatSidebar from "../chats_components/ChatSidebar";
import Header from "./components/Header";
export default function NotesEditor() {
  const location = useLocation();
  const { groupId } = useParams();

  const contentFromState = location.state?.content;
  const [isViewOnly] = useState(location.state?.isViewOnly || false);
  const [isAisummarize, setIsAisummarize] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [title, setTitle] = useState(location.state?.title || "Untitled Note");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState(null);
  const [aiText, setAiText] = useState("");
  const [content, setContent] = useState("");

  const groupName = location.state?.groupName || "Study Group";
  const profession = location.state?.profession || "General";
  const id = location.state?.id || null;

  const handleSave = async () => {
    setIsSaving(true);
    if (!editor || !title) {
      setIsSaving(false);
      return;
    }
    const editorContent = editor.getHTML();
    try {
      await api.post("/notes/create", {
        content: editorContent,
        title,
        groupId,
      });
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen flex flex-col">
      <AIPopup
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        setContent={setContent}
      />

      {/* Editor Header Bar */}
      <Header
        groupName={groupName}
        profession={profession}
        isViewOnly={isViewOnly}
        isAiPanelOpen={isAiPanelOpen}
        setIsAiPanelOpen={setIsAiPanelOpen}
        isShareOpen={isShareOpen}
        setIsShareOpen={setIsShareOpen}
        handleSave={handleSave}
        isSaving={isSaving}
        groupId={groupId}
      />

      {/* Document Workspace */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        <Editor
          isViewOnly={isViewOnly}
          contentFromState={contentFromState}
          title={title}
          setTitle={setTitle}
          isAIOpen={isAIOpen}
          setIsAIOpen={setIsAIOpen}
          isAisummarize={isAisummarize}
          setIsAisummarize={setIsAisummarize}
          aiText={aiText}
          setAiText={setAiText}
          setEditor={setEditor}
          content={content}
        />
      </div>

      {/* AI Summary Sidebar */}
      <AnimatePresence>
        {isAiPanelOpen && (
          <ChatSidebar
            id={id}
            isAiPanelOpen={isAiPanelOpen}
            setIsAiPanelOpen={setIsAiPanelOpen}
            aiText={aiText}
            setIsAisummarize={setIsAisummarize}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
