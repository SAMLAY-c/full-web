"use client";

import { useState, useCallback } from "react";
import SearchTrigger from "@/components/business/SearchTrigger";
import BlogCard from "@/components/business/BlogCard";
import SearchDialog from "@/components/business/SearchDialog";
import type { Post } from "@/lib/types";

interface HomeContentProps {
  postsWithCoverUrls: Post[];
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

export default function HomeContent({
  postsWithCoverUrls,
  categories,
  globalConfig,
}: HomeContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const handleCtaClick = useCallback(() => {
    window.location.href = "/blog";
  }, []);

  // Split posts into featured and latest
  const featuredPost = postsWithCoverUrls[0];
  const latestPosts = postsWithCoverUrls.slice(1, 4);
  const remainingPosts = postsWithCoverUrls.slice(4, 7);

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section - 暖阳风格 */}
        <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16 overflow-hidden">
          {/* Floating gradient backgrounds */}
          <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-gradient-radial from-brand-500/15 to-transparent animate-float pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand-400/10 to-transparent animate-float-reverse pointer-events-none" />

          <div className="mx-auto max-w-[1400px] w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div className="animate-slide-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-500 px-5 py-2.5 rounded-lg text-sm font-medium mb-6">
                  <span className="text-xs">✦</span>
                  探索生活的无限可能
                </div>

                {/* Title */}
                <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.1] text-text-dark mb-6 font-display">
                  {globalConfig.heroTitle.split("，")[0] || "用文字记录"}
                  <br />
                  <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                    {globalConfig.heroTitle.split("，")[1] || "每一个精彩瞬间"}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-text-medium leading-relaxed mb-8 max-w-lg">
                  {globalConfig.heroSubtitle}
                </p>

                {/* Search & CTA */}
                <SearchTrigger
                  onSearchOpen={openSearch}
                  ctaText={globalConfig.heroCtaText}
                  onCtaClick={handleCtaClick}
                />
              </div>

              {/* Right Visual */}
              <div className="relative animate-slide-right">
                <div className="relative rounded-[48px] overflow-hidden shadow-strong">
                  {featuredPost?.coverUrl ? (
                    <img
                      src={featuredPost.coverUrl}
                      alt="Featured"
                      className="w-full h-[400px] sm:h-[500px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <span className="text-8xl font-bold text-brand-300/50">☀</span>
                    </div>
                  )}
                </div>

                {/* Stats Card */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-[32px] p-6 shadow-medium flex gap-10">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-brand-500 font-display">200+</span>
                    <span className="text-sm text-text-light">精选文章</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-brand-500 font-display">50K</span>
                    <span className="text-sm text-text-light">月度读者</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-brand-500 font-display">15</span>
                    <span className="text-sm text-text-light">内容分类</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - 精选推荐 */}
        {featuredPost && (
          <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-24 bg-white">
            <div className="mx-auto max-w-[1400px]">
              {/* Section Header */}
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-text-dark font-display">
                  精选<span className="text-brand-500">推荐</span>
                </h2>
                <a href="/blog" className="text-brand-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  查看全部 →
                </a>
              </div>

              {/* Featured Grid */}
              <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                {/* Main Featured */}
                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative rounded-[48px] overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                >
                  {featuredPost.coverUrl ? (
                    <img
                      src={featuredPost.coverUrl}
                      alt={featuredPost.title}
                      className="w-full h-[500px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[500px] bg-gradient-to-br from-brand-50 to-brand-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <span className="inline-block bg-brand-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider mb-4">
                      {featuredPost.tags?.[0] || "精选"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 font-display leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2 max-w-xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-white/70">
                      <span>📅 {new Date(featuredPost.publishedAt).toLocaleDateString('zh-CN')}</span>
                      <span>⏱ 8分钟阅读</span>
                    </div>
                  </div>
                </a>

                {/* Side Cards */}
                <div className="flex flex-col gap-6">
                  {latestPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-warm-cream rounded-[32px] p-6 hover:bg-white hover:shadow-soft transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="inline-block bg-brand-500/10 text-brand-500 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider mb-3">
                        {post.tags?.[0] || "文章"}
                      </span>
                      <h4 className="text-lg font-semibold text-text-dark mb-3 font-display leading-snug">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-text-light">
                        <span>{new Date(post.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Section - 分类探索 */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark font-display">
                探索<span className="text-brand-500">分类</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <a
                  key={category.slug}
                  href={`/blog?category=${category.slug}`}
                  className="group bg-white rounded-[32px] p-8 text-center border-2 border-transparent hover:border-brand-500 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-[20px] bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center text-2xl text-white">
                    {["💻", "🎨", "✈️", "📚"][index % 4]}
                  </div>
                  <h3 className="text-xl font-semibold text-text-dark mb-2 font-display">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-light">{category.skillsList}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles Section - 最新文章 */}
        {remainingPosts.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-24 bg-warm-cream">
            <div className="mx-auto max-w-[1400px]">
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-text-dark font-display">
                  最新<span className="text-brand-500">文章</span>
                </h2>
                <a href="/blog" className="text-brand-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  查看全部 →
                </a>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    publishedAt={post.publishedAt}
                    tags={post.tags}
                    coverUrl={(post as any).coverUrl}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section - 订阅区 */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-24 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600" />
          <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full bg-white/5" />

          <div className="mx-auto max-w-[800px] text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">
              {globalConfig.hookTitle || "订阅我们的周刊"}
            </h2>
            <p className="text-lg text-white/90 mb-10">
              {globalConfig.hookDescription || "每周精选好文直达邮箱，与 50,000+ 读者一起成长"}
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="flex-1 px-6 py-4 rounded-[32px] bg-white/95 text-text-dark placeholder:text-text-light outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-[32px] bg-text-dark text-white font-semibold hover:bg-brand-700 transition-colors whitespace-nowrap"
              >
                立即订阅
              </button>
            </form>
          </div>
        </section>
      </main>

      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
