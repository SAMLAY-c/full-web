import { sanityReadClient } from "../sanity/client";
import { getPost as getLocalPost, getLatestPosts as getLocalLatestPosts } from "../posts";
import type { Post } from "../types";

// GROQ 查询：获取所有文章（列表用，不包含全文）
// 先按置顶排序（coalesce处理null值，确保isPinned=true的排在最前），然后按pinOrder，最后按发布时间
const LIST_QUERY = `*[_type == "post" && status == "published"] | order(coalesce(isPinned, false) desc, pinOrder asc, publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  coverImage,
  tags,
  status,
  isPinned,
  pinOrder,
  markdownTheme
}`;

// GROQ 查询：获取单篇文章（详情用，包含全文）
const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  content,
  htmlContent,
  mainImage,
  coverImage,
  tags,
  status,
  markdownTheme
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
      allPosts = localPosts.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        publishedAt: p.date || new Date().toISOString(),
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
            body: sanityPost.content, // 映射 content -> body
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
      const post: any = {
        slug: localPost.slug,
        title: localPost.title,
        publishedAt: (localPost as any).date || new Date().toISOString(),
        excerpt: localPost.excerpt,
        source: "local",
      };

      // ArticlePost 有 content 字段
      if ("content" in localPost) {
        post.body = (localPost as any).content;
      }

      return post;
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
  },

  /**
   * 获取所有标签（去重）
   */
  async getAllTags(): Promise<string[]> {
    try {
      if (sanityReadClient) {
        // 只从已发布文章中获取标签
        const TAGS_QUERY = `*[_type == "post" && status == "published" && defined(tags)].tags[]`;
        const tags = await sanityReadClient.fetch(TAGS_QUERY) as string[];
        if (tags && tags.length > 0) {
          // 去重并排序
          return [...new Set(tags.filter(Boolean))].sort();
        }
      }
    } catch (error) {
      console.warn("[postService] Fetch tags failed, returning empty array", error);
    }
    return [];
  }
};
