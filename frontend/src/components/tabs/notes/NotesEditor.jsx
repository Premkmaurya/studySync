import React, { useState, useEffect, useRef } from "react";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// React Router
import { useLocation } from "react-router-dom";

// Mantine TipTap Editor
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";

// Styles
import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

// Icons
import {
  TbClearFormatting,
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbH5,
  TbH6,
  TbBlockquote,
} from "react-icons/tb";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaHighlighter,
  FaCode,
  FaLink,
  FaUnlink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { MdFormatListBulleted, MdClose } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { LuUndo2, LuRedo2 } from "react-icons/lu";

// Using lucide-react as the primary, stable icon engine
import { ChevronLeft, Share2, CloudUpload, Sparkles, Bot } from "lucide-react";

// Custom Components
import AIPopup from "../chats/AiPopup";
import ChatSidebar from "../chats/ChatSidebar";

// Axios and Socket.io
import axios from "axios";
import { io } from "socket.io-client";

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

  const [title, setTitle] = useState("AI Strategy Memo 2024");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      Placeholder.configure({
        placeholder:
          "Generate notes (ctrl+shift+K).Start typing to dismiss or don't show this again.",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: contentFromState || content,
    editable: !isViewOnly,
  });

  // Listener for activate AI (ctrl+shift+k)
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsAIOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    // socket.io connection

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);
  useEffect(() => {
    if (editor && content) {
      editor.commands.focus("end");
      editor.commands.insertContent(content);
    }
  }, [editor, content]);

  const handleSave = async (title) => {
    if (!editor || !title) return;
    const content = editor.getHTML();
    const response = await axios.post(
      "http://localhost:3000/api/notes/create",
      { content, title },
      {
        withCredentials: true,
      },
    );
    console.log("Note saved:", response);
    setIsModalOpen(false);
  };

  const handleAiSummarize = async () => {
    if (!editor) return;
    const content = editor.getHTML();
    setAiText(
      content +
        " Create a structured summary of the above note. Use short bullet points, highlight key ideas, and remove any unnecessary detail. Keep it concise and easy to study.",
    );

    setTimeout(() => setIsAisummarize(true), 500);
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
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
          <div className="bg-zinc-900/40 backdrop-blur-3xl border rounded-[24px] px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-4">
              <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 group">
                <ChevronLeft
                  size={22}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <div className="flex flex-col border-l border-white/10 pl-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black leading-none mb-1">
                  {profession}
                </span>
                <h2 className="text-sm font-bold tracking-tight text-white/90">
                  {groupName}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((i) => (
                  <motion.img
                    key={i}
                    whileHover={{ y: -4, scale: 1.1 }}
                    src={`https://i.pravatar.cc/100?u=${i + 20}`}
                    className="w-9 h-9 rounded-full border-2 border-zinc-900 shadow-2xl cursor-pointer"
                  />
                ))}
              </div>
              {!isViewOnly ? (
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
                    isSaving
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-indigo-50 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  <CloudUpload
                    size={18}
                    className={isSaving ? "animate-bounce" : ""}
                  />
                  {isSaving ? "SYNCING..." : "SAVE CHANGES"}
                </button>
              ) : (
                <button
                  onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                  className="p-2.5 bg-white/95 border border-white/10 rounded-xl transition-all text-black"
                >
                  AI Summary
                </button>
              )}
              <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-400">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>
        <RichTextEditor editor={editor} className="border border-transparent">
          {!isViewOnly && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-1 bg-white/50 backdrop-blur-3xl p-2 rounded-[24px]"
              >
                <RichTextEditor.Toolbar
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-50 h-8 flex items-center justify-center">
                    <RichTextEditor.Bold icon={() => <FaBold size={14} />} />
                    <RichTextEditor.Italic
                      icon={() => <FaItalic size={14} />}
                    />
                    <RichTextEditor.Underline
                      icon={() => <FaUnderline size={14} />}
                    />
                    <RichTextEditor.Strikethrough
                      icon={() => <FaStrikethrough size={14} />}
                    />
                    <RichTextEditor.ClearFormatting
                      icon={() => <TbClearFormatting size={14} />}
                    />
                    <RichTextEditor.Highlight
                      icon={() => <FaHighlighter size={14} />}
                    />
                    <RichTextEditor.Code icon={() => <FaCode size={14} />} />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-42 h-8 flex items-center justify-center">
                    <RichTextEditor.H1 icon={() => <TbH1 size={18} />} />
                    <RichTextEditor.H2 icon={() => <TbH2 size={18} />} />
                    <RichTextEditor.H3 icon={() => <TbH3 size={18} />} />
                    <RichTextEditor.H4 icon={() => <TbH4 size={18} />} />
                    <RichTextEditor.H5 icon={() => <TbH5 size={18} />} />
                    <RichTextEditor.H6 icon={() => <TbH6 size={18} />} />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-29 h-8 flex items-center justify-center">
                    <RichTextEditor.Blockquote
                      icon={() => <TbBlockquote size={14} />}
                    />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList
                      icon={() => <MdFormatListBulleted size={14} />}
                    />
                    <RichTextEditor.OrderedList
                      icon={() => <GoListOrdered size={14} />}
                    />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-20 h-8 flex items-center justify-center gap-2">
                    <RichTextEditor.Link icon={() => <FaLink size={14} />} />
                    <RichTextEditor.Unlink
                      icon={() => <FaUnlink size={14} />}
                    />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-32 h-8 flex items-center justify-center gap-2">
                    <RichTextEditor.AlignLeft
                      icon={() => <FaAlignLeft size={14} />}
                    />
                    <RichTextEditor.AlignCenter
                      icon={() => <FaAlignCenter size={14} />}
                    />
                    <RichTextEditor.AlignJustify
                      icon={() => <FaAlignJustify size={14} />}
                    />
                    <RichTextEditor.AlignRight
                      icon={() => <FaAlignRight size={14} />}
                    />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup className="bg-[#1f1f21] rounded-lg w-15 h-8 flex items-center justify-center">
                    <RichTextEditor.Undo icon={() => <LuUndo2 size={14} />} />
                    <RichTextEditor.Redo icon={() => <LuRedo2 size={14} />} />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
                  }}
                  onClick={() => setIsAIOpen(!isAIOpen)}
                  className="flex items-center gap-2.5 px-5 py-2.5 bg-indigo-600 rounded-xl text-lg w-22 h-10 text-white ml-2 shadow-lg"
                >
                  <Sparkles size={16} />
                  AI
                </motion.button>
              </motion.div>
            </div>
          )}
          <div className="w-full h-[80vh] ">
            <motion.div className="bg-zinc-900/20 mt-[3rem] backdrop-blur-sm rounded-[48px] p-12 md:p-20 shadow-3xl min-h-[850px] w-full relative transition-all hover:bg-zinc-900/30">
              <input
                type="text"
                value={title}
                style={{ fontSize: "3rem", fontWeight: "bold" }}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-5xl md:text-6xl font-black tracking-tighter text-white placeholder:text-zinc-800 outline-none mb-6"
                placeholder="Draft Name..."
              />

              <div className="flex flex-wrap items-center gap-4 mb-14 text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                  <Bot size={14} /> AI ENGINE ENGAGED
                </span>
                <span className="hidden sm:block opacity-20">|</span>
                <span className="tracking-widest">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="prose max-w-none wrap-break-word whitespace-pre-wrap text-lg leading-relaxed text-black">
                <RichTextEditor.Content />
              </div>
            </motion.div>
          </div>
          {isViewOnly && (
            <div
              onClick={handleAiSummarize}
              className="fixed cursor-pointer bottom-[0.8rem] right-5 text-black font-semibold"
            >
              <p>
                Summarize with <span className="text-orange-700">AI ✨</span>
              </p>
            </div>
          )}
        </RichTextEditor>

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
