import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
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
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import NoteTitleModal from "./NoteTilteModel";

export default function NotesEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const contentFromState = location.state?.content;
  const [isViewOnly,setIsViewOnly]= useState(location.state?.isViewOnly || false);

  const content =
    typeof contentFromState === "string" && contentFromState.trim().length > 0
      ? contentFromState
      : `<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2>
       <p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. 
       <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p>
       <ul>
         <li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></li>
         <li>Headings (h1-h6)</li>
         <li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li>
         <li>Ordered and bullet lists</li>
         <li>Text align</li>
         <li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li>
       </ul>`;

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editable: !isViewOnly,
  });

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

  return (
    <>
      <NoteTitleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateNote={handleSave}
      />
      <div
        className={`text-editor-container ${
          isModalOpen ? "blur-xs" : ""
        } relative`}
      >
        <RichTextEditor editor={editor}>
          {!isViewOnly && <RichTextEditor.Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            sticky
            stickyOffset="var(--docs-header-height)"
          >
            <RichTextEditor.ControlsGroup>
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
          </RichTextEditor.Toolbar>}

          <RichTextEditor.Content />
        </RichTextEditor>
        {!isViewOnly && <div className="absolute right-4 mt-4 flex gap-4">
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
        </div>}
      </div>
    </>
  );
}
