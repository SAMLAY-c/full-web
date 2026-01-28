import { sanityReadClient } from "../sanity/client";
import { getPost as getLocalPost, getLatestPosts as getLocalLatestPosts } from "../posts";
import type { Post } from "../types";

// GROQ 查询：获取所有文章（列表用，不包含全文）
const LIST_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage
}`;

// GROQ 查询：获取单篇文章（详情用，包含全文）
const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  content,
  mainImage
}`;

/**
 * 统一的文章服务
 * 负责在 Sanity 和本地数据之间做切换
 */
export const postService = {
  /**
   * 获取所有已发布的文章列表
   */
  async getAllPosts(): Promise<Post[]> {
    let allPosts: Post[] = [];

    // 1. 尝试从 Sanity 获取
    try {
      if (sanityReadClient) {
        const sanityPosts = await sanityReadClient.fetch(LIST_QUERY);
        if (sanityPosts && sanityPosts.length > 0) {
          allPosts = sanityPosts.map((p: any) => ({
            ...p,
            source: "sanity" as const,
          }));
        }
      }
    } catch (error) {
      console.warn("[postService] Fetch Sanity posts failed, falling back to local data", error);
    }

    // 2. 如果 Sanity 没数据，回退到本地数据
    if (allPosts.length === 0) {
      const localPosts = getLocalLatestPosts(100);
      allPosts = localPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        publishedAt: p.date,
        excerpt: p.excerpt,
        source: "local" as const,
      }));
    }

    return allPosts;
  },

  /**
   * 根据 slug 获取单篇文章（含全文）
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    // 1. 先尝试从 Sanity 获取
    try {
      if (sanityReadClient) {
        const sanityPost = await sanityReadClient.fetch(POST_BY_SLUG_QUERY, { slug });
        if (sanityPost) {
          return {
            ...sanityPost,
            source: "sanity",
          };
        }
      }
    } catch (error) {
      console.warn("[postService] Fetch Sanity post failed, falling back to local data", error);
    }

    // 2. 如果 Sanity 没找到，回退到本地数据
    const localPost = getLocalPost(slug);
    if (localPost && localPost.status === "published") {
      return {
        slug: localPost.slug,
        title: localPost.title,
        publishedAt: localPost.date,
        excerpt: localPost.excerpt,
        body: localPost.content,
        source: "local",
      };
    }

    // 3. 都没找到，返回 null
    return null;
  },

  /**
   * 获取最新 N 篇文章
   */
  async getLatestPosts(limit: number = 3): Promise<Post[]> {
    const allPosts = await this.getAllPosts();
    return allPosts.slice(0, limit);
  }
};
