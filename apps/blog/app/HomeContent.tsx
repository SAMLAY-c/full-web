"use client";

import { useState, useCallback, useMemo } from "react";
import BlogCard from "@/components/business/BlogCard";
import SearchDialog from "@/components/business/SearchDialog";
import RoadmapCard from "@/components/business/RoadmapCard";
import FilterBar from "@/components/business/FilterBar";
import PersonalHero from "@/components/business/PersonalHero";
import Footer from "@/components/Footer";
import type { Post } from "@/lib/types";

interface PostWithCoverUrl extends Post {
  coverUrl?: string | null;
}

interface HomeContentProps {
  postsWithCoverUrls: PostWithCoverUrl[];
  categories: Array<{
    slug: string;
    name: string;
    skillsList: string;
  }>;
  globalConfig: {
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    hookTitle: string;
    hookDescription: string;
    hookQrCode?: any;
  };
}

// 分类配置 - 60%白 30%灰 10%橙配色
const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  "ai": { label: "AI", color: "bg-neutral-900" },
  "pm": { label: "PM", color: "bg-neutral-700" },
  "coding": { label: "编程", color: "bg-neutral-600" },
  "tools": { label: "工具", color: "bg-neutral-500" },
  "thinking": { label: "思考", color: "bg-neutral-400" },
};

export default function HomeContent({
  postsWithCoverUrls,
  categories,
}: HomeContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "difficulty">("latest");

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // 准备筛选数据
  const categoryOptions = useMemo(() => {
    return categories.map(cat => ({
      value: cat.slug,
      label: CATEGORY_CONFIG[cat.slug]?.label || cat.name,
      count: postsWithCoverUrls.filter(p => p.tags?.includes(cat.slug)).length,
    }));
  }, [categories, postsWithCoverUrls]);

  // 获取所有标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    postsWithCoverUrls.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).slice(0, 10).map(tag => ({
      value: tag,
      label: tag,
      count: postsWithCoverUrls.filter(p => p.tags?.includes(tag)).length,
    }));
  }, [postsWithCoverUrls]);

  // 筛选文章
  const filteredPosts = useMemo(() => {
    let posts = [...postsWithCoverUrls];

    // 按分类筛选
    if (selectedCategory) {
      posts = posts.filter(p => p.tags?.includes(selectedCategory));
    }

    // 按标签筛选
    if (selectedTag) {
      posts = posts.filter(p => p.tags?.includes(selectedTag));
    }

    // 排序
    if (sortBy === "latest") {
      posts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
    } else if (sortBy === "popular") {
      // 按阅读时间估算热度，实际应该用真实数据
      posts.sort((a, b) => (b.excerpt?.length || 0) - (a.excerpt?.length || 0));
    }

    return posts;
  }, [postsWithCoverUrls, selectedCategory, selectedTag, sortBy]);

  // 精选文章（第一篇）
  const featuredPost = filteredPosts[0];
  // 其余文章
  const remainingPosts = filteredPosts.slice(1);

  // 准备最新笔记数据
  const latestNotes = postsWithCoverUrls.slice(0, 3).map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : "",
  }));

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section - 个人化改版 */}
        <PersonalHero latestNotes={latestNotes} />

        {/* Roadmap Section */}
        <section className="py-24 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
              {/* Left: Description */}
              <div className="lg:sticky lg:top-24">
                <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Learning Path
                </span>
                <h2 className="text-3xl font-bold text-neutral-900 mt-3 mb-4">
                  从 0 到 1 的<br />
                  <span className="text-neutral-400">AI PM 转型路径</span>
                </h2>
                <p className="text-neutral-500 mb-6 leading-relaxed">
                  不是零散的文章堆砌，而是一个完整的学习体系。每个阶段都有明确的目标、推荐的学习资源和实战项目。
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    已完成 8 篇
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    进行中 5 篇
                  </div>
                </div>
              </div>

              {/* Right: Roadmap Card */}
              <div>
                <RoadmapCard />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section - 文章列表 */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  All Articles
                </span>
                <h2 className="text-3xl font-bold text-neutral-900 mt-3">
                  学习笔记
                </h2>
              </div>
              <button
                onClick={openSearch}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                搜索文章
              </button>
            </div>

            {/* Filter Bar */}
            <FilterBar
              categories={categoryOptions}
              tags={allTags}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onTagChange={setSelectedTag}
              onSortChange={setSortBy}
            />

            {/* Featured Post */}
            {featuredPost && !selectedCategory && !selectedTag && (
              <div className="mb-12">
                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="group block relative rounded-2xl overflow-hidden bg-neutral-900 aspect-[21/9]"
                >
                  {featuredPost.coverUrl ? (
                    <img
                      src={featuredPost.coverUrl}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity group-hover:scale-105 duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      {featuredPost.tags?.[0] && (
                        <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-medium rounded-full">
                          {featuredPost.tags[0]}
                        </span>
                      )}
                      <span className="text-white/60 text-sm">精选文章</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/70 max-w-2xl line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </a>
              </div>
            )}

            {/* Posts Grid */}
            {remainingPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
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
        </section>

        {/* Newsletter Section - 宽度与上方一致 */}
        <section className="py-24 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                订阅更新
              </h2>
              <p className="text-neutral-500 mb-6">
                每周一封邮件，分享最新的学习笔记和工具发现。没有垃圾邮件，随时退订。
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
              >
                订阅
              </button>
            </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
