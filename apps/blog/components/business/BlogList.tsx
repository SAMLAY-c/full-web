"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";

interface Post {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  tags?: string[];
  status?: string;
  source?: string;
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 按标签分组并按日期降序排列
  const groupedPosts = useMemo(() => {
    // 过滤出已发布的文章，并按日期降序排序
    const sortedPosts = posts
      .filter((post) => post.status !== "draft")
      .sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA; // 降序：最新的在前
      });

    if (selectedTag) {
      // 如果选择了特定标签，只显示该标签的文章
      return {
        [selectedTag]: sortedPosts.filter((post) =>
          post.tags?.includes(selectedTag)
        ),
      };
    }

    // 按标签分组
    const groups: Record<string, Post[]> = {};

    // 添加"最新"分组（最近30天的文章）
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 30);

    const recentPosts = sortedPosts.filter((post) => {
      if (!post.publishedAt) return false;
      return new Date(post.publishedAt) > recentDate;
    });

    if (recentPosts.length > 0) {
      groups["最新文章"] = recentPosts;
    }

    // 按标签分组（排除已经在"最新"中的文章）
    allTags.forEach((tag) => {
      const tagPosts = sortedPosts.filter(
        (post) => post.tags?.includes(tag) && !recentPosts.includes(post)
      );
      if (tagPosts.length > 0) {
        groups[tag] = tagPosts;
      }
    });

    // 未分类文章
    const uncategorized = sortedPosts.filter(
      (post) => !post.tags || post.tags.length === 0
    );
    if (uncategorized.length > 0) {
      groups["未分类"] = uncategorized;
    }

    return groups;
  }, [posts, allTags, selectedTag]);

  return (
    <main className="px-6 pb-24 pt-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600">
            Blog
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-brand-900 sm:text-5xl">
            Tutorials, experiments, and systems.
          </h1>
        </header>

        {/* 标签过滤器 */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-500 mr-2">
              分类标签:
            </span>

            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTag === null
                  ? "bg-brand-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              全部
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(tag === selectedTag ? null : tag)
                }
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedTag === tag
                    ? "bg-brand-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
                <span className="ml-2 text-xs opacity-70">
                  ({posts.filter((p) => p.tags?.includes(tag)).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 - 按分组降序展示 */}
        <div className="space-y-16">
          {Object.entries(groupedPosts).map(([category, categoryPosts]) => (
            <section key={category} className="border-t border-gray-200 pt-8">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category}
                </h2>
                <span className="text-sm text-gray-500">
                  共 {categoryPosts.length} 篇
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group rounded-3xl border border-brand-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* 文章标签 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 发布日期 */}
                    {post.publishedAt && (
                      <time className="text-xs text-gray-500 mb-2 block">
                        {format(
                          new Date(post.publishedAt),
                          "yyyy年MM月dd日",
                          { locale: zhCN }
                        )}
                      </time>
                    )}

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 空状态 */}
        {Object.keys(groupedPosts).length === 0 && (
          <div className="text-center py-20 text-gray-500">
            没有找到相关文章
          </div>
        )}
      </div>
    </main>
  );
}
