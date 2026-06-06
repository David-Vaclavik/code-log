import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { JSONContent } from "@tiptap/core";
import { createExtensions } from "@/lib/tiptap-extensions";
import { extractHighlightedCodeBlocks } from "@/lib/extractCodeBlocks";
import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

interface TiptapRendererProps {
  content: JSONContent;
}

export async function TiptapExtensionsRenderer({ content }: TiptapRendererProps) {
  if (!content) return null;

  const highlightedBlocks = await extractHighlightedCodeBlocks(content, highlightCode);

  const rendered = renderToReactElement({
    extensions: createExtensions({ placeholder: "" }),
    content,
    options: {
      nodeMapping: {
        codeBlock: ({ node }) => {
          const code = node.textContent;
          const lang = node.attrs?.language || "ts";
          const key = `${lang}:${code}`;
          const highlighted = highlightedBlocks.get(key);

          if (!highlighted)
            return (
              <pre>
                <code>Failed to highlight</code>
              </pre>
            );

          return (
            <div className="not-prose my-2 overflow-hidden relative group">
              {/* language label and button top right */}
              <div className="absolute top-0 right-0 z-50 px-2 py-0 select-none">
                <span className="text-sm font-medium text-neutral-400 tracking-wide group-hover:opacity-0 transition-opacity">
                  {lang}
                </span>
              </div>
              <CopyButton code={code} />

              {/* Shiki output */}
              <div dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          );
        },
      },
      markMapping: {
        code: ({ children }) => <code spellCheck={false}>{children}</code>,
      },
    },
  });

  return (
    // prose sets max-width: 65ch by default. Add max-w-none to override it:
    <article className="flex flex-col w-full prose prose-neutral dark:prose-invert max-w-none">
      {rendered}
    </article>
  );
}
