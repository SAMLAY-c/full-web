import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced"
});

turndown.use(gfm);

turndown.addRule("ignoreScriptsAndStyles", {
  filter: ["script", "style", "link"],
  replacement: () => ""
});

function cleanHtml(html: string) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function htmlToMarkdown(html: string): string {
  return turndown.turndown(cleanHtml(html));
}

export function extractTitleFromHtml(html: string): string | null {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch?.[1]) {
    const title = titleMatch[1].replace(/\s+/g, " ").trim();
    if (title) return title;
  }

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match?.[1]) {
    const title = h1Match[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (title) return title;
  }

  return null;
}
