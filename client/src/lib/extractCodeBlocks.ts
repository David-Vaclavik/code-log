import { JSONContent } from "@tiptap/core";

export async function extractHighlightedCodeBlocks(
  node: JSONContent,
  highlightFn: (code: string, lang: string) => Promise<string>
): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  async function walk(n: JSONContent) {
    if (n.type === "codeBlock") {
      const code = n.content?.map((c) => c.text ?? "").join("") ?? "";
      const lang = n.attrs?.language || "ts";
      const key = `${lang}:${code}`;
      map.set(key, await highlightFn(code, lang));
    }
    if (n.content) await Promise.all(n.content.map(walk));
  }

  await walk(node);
  return map;
}
