import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import "../index.css"

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
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Italic className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Underline className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Strikethrough className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.ClearFormatting className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Highlight className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Code className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.H2 className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.H3 className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.H4 className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Hr className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.BulletList className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.OrderedList className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Subscript className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Superscript className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Unlink className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.AlignCenter className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.AlignJustify className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.AlignRight className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo className="mantine-RichTextEditor-controlIcon" />
          <RichTextEditor.Redo className="mantine-RichTextEditor-controlIcon" />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}