export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: any;
  body?: any;
  source: "sanity" | "local";
}
