import React, { useEffect } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";


import { Sparkles, Save, LoaderCircle } from "lucide-react";

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
import {
  TbClearFormatting,
  TbH1,
  TbH2,
  TbH3,
  TbBlockquote,
} from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import { Sparkles } from "lucide-react";
import Button from "../../../design-system/Button";

import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

const Editor = ({
  isViewOnly,
  contentFromState,
  title,
  setTitle,
  isAIOpen,
  setIsAIOpen,
  setAiText,
  setEditor,
  content,
  handleSave,
  isSaving,
}) => {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      Placeholder.configure({
        placeholder: "Start typing your study notes or AI summary here...",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: contentFromState || content || "",
    editable: !isViewOnly,
  });

  useEffect(() => {
    setAiText(contentFromState || content);
  }, []);

  useEffect(() => {
    if (editor && content) {
      editor.commands.focus("end");
      editor.commands.insertContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    if (editor && setEditor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title Input & AI Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-black/[0.08] pb-4">
        <input
          type="text"
          value={title}
          disabled={isViewOnly}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-[32px] sm:text-[40px] font-bold text-[#000000] tracking-[-1px] outline-none placeholder-[#757575]"
          placeholder="Untitled Note"
        />

        <div className="flex items-center justify-end md:pb-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isViewOnly}
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#0075de] text-white px-4 py-2.5 text-[13px] font-semibold shadow-sm hover:bg-[#0068c7] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? (
            <>
              <LoaderCircle className="w-14 h-14 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />
              Save
            </>
          )}
        </button>
      </div>

        {!isViewOnly && (
          <Button
            variant="ghost"
            size="sm"
            icon={Sparkles}
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="flex items-center gap-2 tracking-tight whitespace-nowrap text-[#0075de] hover:text-[#005bb5]"
          >
            AI Assistant
          </Button>
        )}
      </div>

      {/* TipTap Rich Text Editor Container */}
      <RichTextEditor
        editor={editor}
        className="bg-white border border-black/[0.08] rounded-[12px] p-4 min-h-[500px] shadow-none"
      >
        {!isViewOnly && (
          <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md pb-3 border-b border-black/[0.08] mb-4">
            <RichTextEditor.Toolbar className="flex flex-wrap gap-1 bg-transparent border-none p-0">
              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.Bold icon={() => <FaBold size={13} />} />
                <RichTextEditor.Italic icon={() => <FaItalic size={13} />} />
                <RichTextEditor.Underline icon={() => <FaUnderline size={13} />} />
                <RichTextEditor.Strikethrough icon={() => <FaStrikethrough size={13} />} />
                <RichTextEditor.ClearFormatting icon={() => <TbClearFormatting size={13} />} />
                <RichTextEditor.Highlight icon={() => <FaHighlighter size={13} />} />
                <RichTextEditor.Code icon={() => <FaCode size={13} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.H1 icon={() => <TbH1 size={16} />} />
                <RichTextEditor.H2 icon={() => <TbH2 size={16} />} />
                <RichTextEditor.H3 icon={() => <TbH3 size={16} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.Blockquote icon={() => <TbBlockquote size={13} />} />
                <RichTextEditor.BulletList icon={() => <MdFormatListBulleted size={13} />} />
                <RichTextEditor.OrderedList icon={() => <GoListOrdered size={13} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.Link icon={() => <FaLink size={13} />} />
                <RichTextEditor.Unlink icon={() => <FaUnlink size={13} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.AlignLeft icon={() => <FaAlignLeft size={13} />} />
                <RichTextEditor.AlignCenter icon={() => <FaAlignCenter size={13} />} />
                <RichTextEditor.AlignRight icon={() => <FaAlignRight size={13} />} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className="flex gap-0.5 bg-black/[0.03] p-1 rounded-[6px]">
                <RichTextEditor.Undo icon={() => <LuUndo2 size={13} />} />
                <RichTextEditor.Redo icon={() => <LuRedo2 size={13} />} />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
          </div>
        )}

        <RichTextEditor.Content className="text-[16px] text-[#000000] leading-relaxed min-h-[400px]" />
      </RichTextEditor>
    </div>
  );
};

export default Editor;
