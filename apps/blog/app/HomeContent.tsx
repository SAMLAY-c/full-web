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
    hookQrCode: any;
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
    // 跳转到博客页面
    window.location.href = "/blog";
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 text-xs font-semibold tracking-[0.4em] text-blue-600">
              LEARNING HUB
            </div>
            <h1 className="mb-6 text-[56px] font-bold leading-tight text-slate-900">
              {globalConfig.heroTitle}
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-slate-500">
              {globalConfig.heroSubtitle}
            </p>

            {/* Search Box and CTA */}
            <SearchTrigger
              onSearchOpen={openSearch}
              ctaText={globalConfig.heroCtaText}
              onCtaClick={handleCtaClick}
            />
          </div>
        </section>

        {/* 新手路线图 Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-[28px] font-semibold text-slate-900">新手路线图</h2>
              <a className="text-sm font-semibold text-blue-600 hover:text-blue-700" href="/blog">
                查看全部 →
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((card) => (
                <div
                  key={card.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{card.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{card.skillsList}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 最新更新 Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-[28px] font-semibold text-slate-900">最新更新</h2>
              <a className="text-sm font-semibold text-blue-600 hover:text-blue-700" href="/blog">
                更多文章 →
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postsWithCoverUrls.map((post) => (
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

        {/* The Hook Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-10">
              <div className="flex items-center gap-10">
                <div className="flex-1">
                  <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-600">
                    THE HOOK
                  </div>
                  <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                    {globalConfig.hookTitle}
                  </h2>
                  <p className="text-slate-500">
                    {globalConfig.hookDescription}
                  </p>
                </div>
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white px-3 shadow-sm">
                  {globalConfig.hookQrCode ? (
                    <img
                      alt="QR Code"
                      className="h-24 w-24 rounded-xl object-cover"
                      src={globalConfig.hookQrCode}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">
                      QR Code
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
