import { globalConfig, getCategories } from "./site";
import { getLatestPosts } from "./posts";
import { sanityClient } from "./sanity/client";
import { homeQuery } from "./sanity.queries";

export type HomeData = {
  globalConfig: {
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    hookTitle: string;
    hookDescription: string;
    hookQrCode?: unknown | null;
  };
  categories: Array<{
    name: string;
    skillsList: string;
    slug: string;
    order: number;
  }>;
  posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: unknown | null;
    type: "video" | "article";
  }>;
};

export async function getHomeData(): Promise<HomeData> {
  if (!sanityClient) {
    console.log("[home-data] Sanity client not configured, using local fallback.");
    return {
      globalConfig,
      categories: getCategories(),
      posts: getLatestPosts(3).map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        type: post.type
      }))
    };
  }

  const data = await sanityClient.fetch(homeQuery);

  return {
    globalConfig: data.siteConfig ?? globalConfig,
    categories: data.categories ?? getCategories(),
    posts: data.posts ?? []
  };
}
