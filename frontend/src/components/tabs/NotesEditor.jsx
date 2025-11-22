import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
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
import ChatSidebar from "../ChatSidebar";
import AIPopup from "../AiPopup";
import { MdFormatListBulleted, MdClose } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NoteTitleModal from "../NoteTilteModel";
import { io } from "socket.io-client";

export default function NotesEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const contentFromState = location.state?.content;
  const [isViewOnly, setIsViewOnly] = useState(
    location.state?.isViewOnly || false
  );
  const [isAisummarize, setIsAisummarize] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

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
      }
    );
    console.log("Note saved:", response);
    setIsModalOpen(false);
  };

  const handleAiSummarize = async () => {
    if (!editor) return;
    const content = editor.getHTML();
    setAiText(
      content +
        " Create a structured summary of the above note. Use short bullet points, highlight key ideas, and remove any unnecessary detail. Keep it concise and easy to study."
    );

    setTimeout(() => setIsAisummarize(true), 500);
  };

  return (
    <>
      <NoteTitleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateNote={handleSave}
      />
      <div>
        <AIPopup
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          setContent={setContent}
        />
      </div>
      <div
        className={`text-editor-container ${
          isModalOpen ? "blur-xs" : ""
        } relative`}
      >
        <RichTextEditor editor={editor}>
          {!isViewOnly && (
            <RichTextEditor.Toolbar
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              sticky
              stickyOffset="var(--docs-header-height)"
            >
              <RichTextEditor.ControlsGroup>
                <div className="text-black text-sm border border-black/20 px-[0.1rem] py-[0.1rem]">
                  AI
                </div>
                <RichTextEditor.Bold icon={() => <FaBold size={14} />} />
                <RichTextEditor.Italic icon={() => <FaItalic size={14} />} />
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

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 icon={() => <TbH1 size={18} />} />
                <RichTextEditor.H2 icon={() => <TbH2 size={18} />} />
                <RichTextEditor.H3 icon={() => <TbH3 size={18} />} />
                <RichTextEditor.H4 icon={() => <TbH4 size={18} />} />
                <RichTextEditor.H5 icon={() => <TbH5 size={18} />} />
                <RichTextEditor.H6 icon={() => <TbH6 size={18} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
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

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link icon={() => <FaLink size={14} />} />
                <RichTextEditor.Unlink icon={() => <FaUnlink size={14} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
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

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo icon={() => <LuUndo2 size={14} />} />
                <RichTextEditor.Redo icon={() => <LuRedo2 size={14} />} />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
          )}

          <RichTextEditor.Content />
          <div
            onClick={handleAiSummarize}
            className="fixed cursor-pointer bottom-[0.8rem] right-5 text-black font-semibold"
          >
            <p>
              Summarize with <span className="text-orange-700">AI ✨</span>
            </p>
          </div>
        </RichTextEditor>
        {!isViewOnly && (
          <div className="absolute right-4 mt-4 flex gap-4">
            <button
              onClick={handleSave}
              className="text-[#007bff] cursor-pointer px-3 py-2 border border-[#007bff] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 bg-[#007bff] cursor-pointer text-white rounded-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>
      {isAisummarize && <ChatSidebar aiText={aiText} setIsAisummarize={setIsAisummarize} />}
    </>
  );
}
