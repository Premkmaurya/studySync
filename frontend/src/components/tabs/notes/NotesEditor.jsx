import { useState} from "react";

// Framer Motion
import { AnimatePresence } from "framer-motion";

// React Router
import { useLocation } from "react-router-dom";


// Using lucide-react as the primary, stable icon engine

// Custom Components
import AIPopup from "../chats/AiPopup";
import ChatSidebar from "../chats/ChatSidebar";
import Share from "./components/Share";
import Header from "./components/Header";

// Axios and Socket.io
import axios from "axios";
import Editor from "./components/Editor";

export default function NotesEditor({
  groupName = "Design Engineers",
  profession = "Software Development",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [content, setContent] = useState("");

  const location = useLocation();
  const contentFromState = location.state?.content;

  const [isViewOnly, setIsViewOnly] = useState(
    location.state?.isViewOnly || false,
  );
  const [isAisummarize, setIsAisummarize] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [title, setTitle] = useState("AI Strategy Memo 2024");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    if (!editor || !title) return;
    const editorContent = editor.getHTML();
    const response = await axios.post(
      "http://localhost:3000/api/notes/create",
      { content: editorContent, title },
      {
        withCredentials: true,
      },
    );
    console.log("Note saved:", response);
    setIsSaving(false);
    setIsModalOpen(false);
  };



  return (
    <>
      <div>
        <AIPopup
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          setContent={setContent}
        />
      </div>
      <div
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#030303] selection:bg-indigo-500/40 font-sans text-editor-container ${
          isModalOpen ? "blur-xs" : ""
        } relative`}
      >
        <div className="absolute top-0 -left-20 w-[700px] h-[700px] bg-indigo-600/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-fuchsia-600/5 blur-[160px] rounded-full pointer-events-none" />

        {/* Floating Header */}
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
        />

        {/* editor */}
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
        />

        {/* share your notes with others */}
        <Share isShareOpen={isShareOpen} setIsShareOpen={setIsShareOpen} />
        {/* AI Summary Sidebar */}
        <AnimatePresence>
          {isAiPanelOpen && (
            <ChatSidebar
              isAiPanelOpen={isAiPanelOpen}
              setIsAiPanelOpen={setIsAiPanelOpen}
              aiText={aiText}
              setIsAisummarize={setIsAisummarize}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
