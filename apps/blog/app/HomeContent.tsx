"use client";

import { useState, useCallback } from "react";
import BlogCard from "@/components/business/BlogCard";
import SearchDialog from "@/components/business/SearchDialog";
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

export default function HomeContent({
  postsWithCoverUrls,
  categories,
  globalConfig,
}: HomeContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Split posts into featured and latest
  const featuredPost = postsWithCoverUrls[0];
  const latestPosts = postsWithCoverUrls.slice(1, 4);
  const remainingPosts = postsWithCoverUrls.slice(4, 7);

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section - 故事感改版 */}
        <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16 overflow-hidden">
          {/* Floating gradient backgrounds */}
          <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-gradient-radial from-brand-500/15 to-transparent animate-float pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand-400/10 to-transparent animate-float-reverse pointer-events-none" />

          <div className="mx-auto max-w-[1400px] w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content - 个人故事区 */}
              <div className="animate-slide-left">
                {/* Avatar & Status Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                        👨‍💻
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white">●</span>
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 px-3 py-1.5 rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                      正在公开转型中
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">记录每一步成长</p>
                  </div>
                </div>

                {/* Main Slogan */}
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.15] text-neutral-800 mb-4 font-sans">
                  我在公开记录：
                  <br />
                  <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                    PM → AI PM
                  </span>
                  <br />
                  <span className="text-neutral-600">的转型过程</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-md">
                  分享学习笔记、工具实践、项目复盘。不画饼，只记录真实的成长轨迹。
                </p>

                {/* CTA Buttons - 三个核心入口 */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    开始学习
                  </a>
                  <a
                    href="/course/roadmap"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 border-2 border-neutral-200 rounded-2xl font-semibold hover:border-brand-300 hover:text-brand-600 transition-all hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    查看路线图
                  </a>
                  <a
                    href="/blog?category=tools"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-2xl font-semibold hover:bg-neutral-200 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    我的工具箱
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-xs">30+</span>
                    <span>篇转型笔记</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">50+</span>
                    <span>个AI工具测评</span>
                  </div>
                </div>
              </div>

              {/* Right Content - 路线图 & 最新笔记 */}
              <div className="relative animate-slide-right">
                {/* Roadmap Preview Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-medium mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center text-white text-sm">🗺</span>
                      学习路线图
                    </h3>
                    <a href="/course/roadmap" className="text-sm text-brand-500 hover:text-brand-600 font-medium">
                      查看完整版 →
                    </a>
                  </div>
                  
                  {/* Roadmap Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 border border-green-100">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">✓</div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-800 text-sm">PM 基础能力梳理</p>
                        <p className="text-xs text-neutral-500">已完成</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-brand-50 border border-brand-200">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-800 text-sm">AI 工具链搭建</p>
                        <p className="text-xs text-brand-600">进行中</p>
                      </div>
                      <span className="text-xs text-brand-600 bg-brand-100 px-2 py-1 rounded-full">当前</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <div className="w-8 h-8 rounded-full bg-neutral-300 text-white flex items-center justify-center text-sm font-bold">3</div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-600 text-sm">Prompt Engineering 实战</p>
                        <p className="text-xs text-neutral-400">待开始</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 text-white flex items-center justify-center text-sm font-bold">4</div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-500 text-sm">AI 项目实战</p>
                        <p className="text-xs text-neutral-400">待开始</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Notes Preview */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[32px] p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <span>📝</span>
                      最新笔记
                    </h3>
                    <a href="/blog" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      全部 →
                    </a>
                  </div>
                  
                  {latestPosts.slice(0, 2).map((post, index) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors mb-3 last:mb-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-neutral-500 font-mono">0{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{post.title}</p>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-full blur-2xl" />
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
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-800 font-sans">
                  精选<span className="text-primary-500">推荐</span>
                </h2>
                <a href="/blog" className="text-primary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
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
                    <div className="w-full h-[500px] bg-gradient-to-br from-primary-50 to-primary-100" />
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
                    coverUrl={post.coverUrl}
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
