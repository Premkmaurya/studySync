import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { FaBold } from "react-icons/fa";
import "@mantine/core/styles.css";
import axios from "axios"

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function NotesEditor() {
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
  });
  const handleSave = async () => {
    if (!editor) return;
    const html = editor.getHTML();
    // const response = await axios.post("http://localhost:3000/api/notes/create",html,{
    //   withCredentials:true
    // })
    // console.log(response)

    const response = await axios.get("http://localhost:3000/api/auth/me",{
      withCredentials:true
    })

    console.log(response);
  };

  return (
    <>
      <RichTextEditor editor={editor}>
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
            <RichTextEditor.Bold
              icon={() => <FaBold size={18} />}
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Italic
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Underline
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Strikethrough
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.ClearFormatting
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Highlight
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Code
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.H2
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.H3
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.H4
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Hr
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.BulletList
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.OrderedList
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Unlink
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.AlignCenter
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.AlignJustify
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.AlignRight
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
            <RichTextEditor.Redo
              style={{ width: "2rem", height: "2rem", fontSize: "1.3rem" }}
            />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <button
        onClick={handleSave}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        💾 Save
      </button>
    </>
  );
}
