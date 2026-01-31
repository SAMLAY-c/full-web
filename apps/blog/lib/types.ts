import type { ThemeId } from "./markdown-templates/theme-mapping";

export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: any;
  mainImage?: any;
  body?: any;
  tags?: string[];
  status?: "draft" | "published";
  source: "sanity" | "local";
  /**
   * Markdown样式主题ID
   * 仅在 source === "sanity" 时存在
   */
  markdownTheme?: ThemeId;
}
