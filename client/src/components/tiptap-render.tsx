import { renderJSONContentToReactElement } from "@tiptap/static-renderer/json/react";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { JSONContent } from "@tiptap/core";
import { createExtensions } from "@/lib/tiptap-extensions";
// import { Content } from "@tiptap/react";
import { type NodeType } from "@tiptap/core";
import { extractHighlightedCodeBlocks } from "@/lib/extractCodeBlocks";
import { highlightCode } from "@/lib/highlight";

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
          // const code = node.textContent;
          // const highlighted = highlightedBlocks.get(code);

          // renderer
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
            <div className="not-prose my-6" dangerouslySetInnerHTML={{ __html: highlighted }} />
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
    <article className="flex flex-col w-full prose prose-zinc dark:prose-invert max-w-none">
      {rendered}
    </article>
  );
}

export function TiptapManualRenderer({ content }: TiptapRendererProps) {
  if (!content) return null;

  const renderJson = renderJSONContentToReactElement({
    nodeMapping: {
      doc: ({ children }) => <div>{children}</div>,
      paragraph: ({ children }) => <p>{children}</p>,
      heading: ({ node, children }) => {
        const level = node.attrs?.level ?? 1;
        const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
        return <Tag>{children}</Tag>;
      },
      bulletList: ({ children }) => <ul>{children}</ul>,
      orderedList: ({ children }) => <ol>{children}</ol>,
      listItem: ({ children }) => <li>{children}</li>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
      codeBlock: ({ node, children }) => (
        <pre data-language={node.attrs?.language}>
          <code>{children}</code>
        </pre>
      ),
      horizontalRule: () => <hr />,
      hardBreak: () => <br />,
      // text: ({ node }) => <>{node.text}</>,
      text: ({ node }) => <>{(node as JSONContent).text}</>,
    },
    markMapping: {
      bold: ({ children }) => <strong>{children}</strong>,
      italic: ({ children }) => <em>{children}</em>,
      strike: ({ children }) => <s>{children}</s>,
      code: ({ children }) => <code>{children}</code>,
      underline: ({ children }) => <u>{children}</u>,
      link: ({ mark, children }) => (
        <a
          href={mark.attrs?.href}
          target={mark.attrs?.target ?? "_blank"}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      textStyle: ({ mark, children }) => {
        const style: React.CSSProperties = {
          ...(mark.attrs?.color && { color: mark.attrs.color }),
          ...(mark.attrs?.fontSize && { fontSize: mark.attrs.fontSize }),
          ...(mark.attrs?.fontFamily && { fontFamily: mark.attrs.fontFamily }),
        };
        return <span style={style}>{children}</span>;
      },
    },
  });

  return (
    <div className="prose prose-zinc dark:prose-invert">
      {renderJson({ content: content as NodeType })}
    </div>
  );
}
