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
}
