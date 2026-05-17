import { type Content, type UseEditorOptions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Typography } from "@tiptap/extension-typography";
import { TextStyle } from "@tiptap/extension-text-style";
import { Placeholder, Selection } from "@tiptap/extensions";
/* Markdown extensions:
import { Markdown } from "@tiptap/markdown";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
*/
/*
import {
  // Image,
  // FileHandler,
  // HorizontalRule,
  // CodeBlockLowlight,
  // Color, @tiptap/extension-color
  // UnsetAllMarks, //? Extensions.create doesn't have to be in the list
  // ResetMarksOnEnter, //? Extensions.create doesn't have to be in the list
  // MarkdownPaste, //* only needed if we want to support markdown
} from "../extensions";
 */
// import { fileToBase64, getOutput, randomId } from "../utils";
// import { toast } from "sonner";

//! In order to make this work we would need to install additional dependencies based on used extensions

//! Only some extensions need additional dependencies:
// Image, FileHandler, HorizontalRule, CodeBlockLowlight, Color
//TODO: Color
// Extensions.create UnsetAllMarks, ResetMarksOnEnter - these don't have to be in the list

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
  value?: Content;
  output?: "html" | "json" | "text" | "markdown";
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  onUpdate?: (content: Content) => void;
  onBlur?: (content: Content) => void;
  uploader?: (file: File) => Promise<string>;
}

/* //! for now we don't support image or file uploads
async function fakeuploader(file: File): Promise<string> {
  // NOTE: This is a fake upload function. Replace this with your own upload logic.
  // This function should return the uploaded image URL.

  // wait 3s to simulate upload
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const src = await fileToBase64(file);

  return src;
}
*/

export const createExtensions = ({
  placeholder,
  // uploader,
  // output = "html",
}: {
  placeholder: string;
  // uploader?: (file: File) => Promise<string>;
  // output: UseMinimalTiptapEditorProps["output"];
}) => [
  StarterKit.configure({
    blockquote: { HTMLAttributes: { class: "block-node" } },
    // bold
    bulletList: { HTMLAttributes: { class: "list-node" } },
    code: { HTMLAttributes: { class: "inline", spellcheck: "false" } },
    // codeBlock: false, //! replaced with StarterKit, was @tiptap/extension-code-block-lowlight
    // document
    dropcursor: { width: 2, class: "ProseMirror-dropcursor border" },
    // gapcursor
    // hardBreak
    heading: { HTMLAttributes: { class: "heading-node" } },
    // undoRedo
    // horizontalRule: false, //! replaced with StarterKit, was @tiptap/extension-horizontal-rule
    // italic
    // listItem
    // listKeymap
    link: {
      enableClickSelection: true,
      openOnClick: false,
      HTMLAttributes: {
        class: "link",
      },
    },
    orderedList: { HTMLAttributes: { class: "list-node" } },
    paragraph: { HTMLAttributes: { class: "text-node" } },
    // strike
    // text
    // underline
    // trailingNode
  }),

  TextStyle,
  Selection,
  Typography,
  Placeholder.configure({ placeholder: () => placeholder }),
  // Color, //TODO: additional dependency @tiptap/extension-color
  // HorizontalRule, //* now we use default horizontal rule from StarterKit
  // CodeBlockLowlight, //* now we use default code block from StarterKit
  // unsetAllMarks, //? Extensions.create doesn't have to be in the list
  // ResetMarksOnEnter, //? Extensions.create doesn't have to be in the list

  /* //! Image extension
  Image.configure({
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,
    uploadFn: async (file) => {
      return uploader ? await uploader(file) : await fakeuploader(file);
    },
    onToggle(editor, files, pos) {
      editor.commands.insertContentAt(
        pos,
        files.map((image) => {
          const blobUrl = URL.createObjectURL(image);
          const id = randomId();

          return {
            type: "image",
            attrs: {
              id,
              src: blobUrl,
              alt: image.name,
              title: image.name,
              fileName: image.name,
            },
          };
        })
      );
    },
    onImageRemoved({ id, src }) {
      console.log("Image removed", { id, src });
    },
    onValidationError(errors) {
      errors.forEach((error) => {
        toast.error("Image validation error", {
          position: "bottom-right",
          description: error.reason,
        });
      });
    },
    onActionSuccess({ action }) {
      const mapping = {
        copyImage: "Copy Image",
        copyLink: "Copy Link",
        download: "Download",
      };
      toast.success(mapping[action], {
        position: "bottom-right",
        description: "Image action success",
      });
    },
    onActionError(error, { action }) {
      const mapping = {
        copyImage: "Copy Image",
        copyLink: "Copy Link",
        download: "Download",
      };
      toast.error(`Failed to ${mapping[action]}`, {
        position: "bottom-right",
        description: error.message,
      });
    },
  }),
  */

  /* //! FileHandler extension
  FileHandler.configure({
    allowBase64: true,
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    onDrop: (editor, files, pos) => {
      files.forEach(async (file) => {
        const src = await fileToBase64(file);
        editor.commands.insertContentAt(pos, {
          type: "image",
          attrs: { src },
        });
      });
    },
    onPaste: (editor, files) => {
      files.forEach(async (file) => {
        const src = await fileToBase64(file);
        editor.commands.insertContent({
          type: "image",
          attrs: { src },
        });
      });
    },
    onValidationError: (errors) => {
      errors.forEach((error) => {
        toast.error("Image validation error", {
          position: "bottom-right",
          description: error.reason,
        });
      });
    },
  }),
  */

  /* //! Markdown extensions - only add if output is markdown
  // Add MarkdownPaste extension when output is markdown
  ...(output === "markdown"
    ? [
        // Markdown with GFM support for tables, task lists, etc.
        Markdown.configure({
          markedOptions: {
            gfm: true,
          },
        }),
        // Task lists (checkboxes)
        TaskList.configure({
          HTMLAttributes: { class: "task-list-node" },
        }),
        TaskItem.configure({
          nested: true,
        }),
        // Tables
        TableKit.configure({
          table: {
            resizable: true,
            HTMLAttributes: { class: "table-node" },
          },
        }),
        MarkdownPaste,
      ]
    : []),
    */
];
