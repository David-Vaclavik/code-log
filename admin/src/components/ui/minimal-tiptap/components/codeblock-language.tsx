import { useCallback } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { label: "Plain Text", value: "plaintext" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "JSX", value: "jsx" },
  { label: "TSX", value: "tsx" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Markdown", value: "markdown" },
  { label: "JSON", value: "json" },
  { label: "Shell", value: "shellscript" },
  { label: "SQL", value: "sql" },
];

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  bash: "shellscript",
  sh: "shellscript",
  shell: "shellscript",
  zsh: "shellscript",
  md: "markdown",
};

const normalizeLanguage = (lang: string | null | undefined): string => {
  if (!lang) return "plaintext";
  return LANGUAGE_ALIASES[lang] ?? lang;
};

interface CodeBlockLanguageSwitcherProps {
  editor: Editor;
}

export function CodeBlockLanguageSwitcher({ editor }: CodeBlockLanguageSwitcherProps) {
  // Using useEditorState to subscribe to editor state changes and extract relevant information about code block status and current language
  //? maybe we can use our custom useTiptapEditor hook?
  const { isInCodeBlock, currentLanguage } = useEditorState({
    editor,
    selector: (ctx) => ({
      isInCodeBlock: ctx.editor.isActive("codeBlock"),
      currentLanguage: normalizeLanguage(ctx.editor.getAttributes("codeBlock").language),
    }),
  });

  const handleChange = useCallback(
    (value: string) => {
      const language = value;

      const success = editor.chain().focus().updateAttributes("codeBlock", { language }).run();

      if (!success) {
        console.error("Failed to update code block language.");
      }
    },
    [editor]
  );

  return (
    <Select disabled={!isInCodeBlock} value={currentLanguage} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LANGUAGES.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
