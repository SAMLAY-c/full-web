"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import FilterBar from "./FilterBar";

interface Post {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
  status?: string;
  source?: string;
  coverImage?: any;
  mainImage?: any;
  coverUrl?: string | null;
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

const CATEGORY_CONFIG: Record<string, { label: string }> = {
  "ai": { label: "AI" },
  "pm": { label: "PM" },
  "coding": { label: "编程" },
  "tools": { label: "工具" },
  "thinking": { label: "思考" },
};

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "difficulty">("latest");

  // 准备分类数据
  const categories = useMemo(() => {
    const cats = ["ai", "pm", "coding", "tools", "thinking"];
    return cats.map(slug => ({
      value: slug,
      label: CATEGORY_CONFIG[slug]?.label || slug,
      count: posts.filter(p => p.tags?.includes(slug)).length,
    })).filter(c => c.count > 0);
  }, [posts]);

  // 准备标签数据
  const tags = useMemo(() => {
    return allTags.slice(0, 10).map(tag => ({
      value: tag,
      label: tag,
      count: posts.filter(p => p.tags?.includes(tag)).length,
    }));
  }, [allTags, posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory) {
      result = result.filter(p => p.tags?.includes(selectedCategory));
    }

    if (selectedTag) {
      result = result.filter(p => p.tags?.includes(selectedTag));
    }

    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
    }

    return result;
  }, [posts, selectedCategory, selectedTag, sortBy]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        {/* Header */}
        <header className="mb-10">
          <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Blog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            所有文章
          </h1>
          <p className="text-neutral-500 mt-2 max-w-2xl">
            记录从 PM 到 AI PM 的学习历程，分享真实的工具实践和项目复盘。
          </p>
        </header>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onTagChange={setSelectedTag}
          onSortChange={setSortBy}
        />

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                tags={post.tags}
                coverUrl={post.coverUrl}
                category={post.tags?.[0]}
                readTime={Math.max(5, Math.round((post.excerpt?.length || 0) / 200))}
                difficulty={post.tags?.includes("advanced") ? "advanced" : post.tags?.includes("beginner") ? "beginner" : "intermediate"}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl">
              🔍
            </div>
            <p className="text-neutral-500">没有找到相关文章</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
