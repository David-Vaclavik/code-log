import { createHighlighter } from "shiki";

const highlighterPromise = createHighlighter({
  themes: ["dark-plus", "github-dark", "nord", "one-dark-pro", "slack-dark"],
  langs: ["typescript", "javascript", "tsx", "jsx", "css", "html", "bash", "json"],
});

export async function highlightCode(code: string, lang: string): Promise<string> {
  const highlighter = await highlighterPromise;

  try {
    return highlighter.codeToHtml(code, {
      lang: lang || "ts",
      theme: "dark-plus",
    });
  } catch (error) {
    console.error("Failed to highlight code block:", error);
    return `<pre><code>${code}</code></pre>`;
  }
}
