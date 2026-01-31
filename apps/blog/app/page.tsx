import { postService } from "@/lib/service/posts";
import { getHomeData } from "../lib/home-data";
import { urlFor } from "../lib/sanity.image";
import { Search, ArrowRight } from "lucide-react";

// ✅ ISR: 每 60 秒检查一次数据更新
export const revalidate = 60;

export default async function BlogHome() {
  // ✅ 使用 postService 获取最新 3 篇文章
  const latestPosts = await postService.getLatestPosts(3);

  // 获取其他首页数据（分类、全局配置）
  const { categories, globalConfig } = await getHomeData();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 px-[120px] pt-20 pb-20">
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
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-4">
              <Search className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-400">
                搜索教程、工具或路线图
              </span>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors">
              {globalConfig.heroCtaText}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 新手路线图 Section */}
      <section className="px-[120px] py-16">
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
      <section className="px-[120px] py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-[28px] font-semibold text-slate-900">最新更新</h2>
            <a className="text-sm font-semibold text-blue-600 hover:text-blue-700" href="/blog">
              更多文章 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => {
              const coverUrl = post.source === "sanity" && urlFor(post.coverImage)?.width(800).url();

              return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="text-xs font-semibold tracking-[0.2em] text-blue-600">
                    ARTICLE
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-slate-900">
                    {post.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-500">
                    {post.excerpt}
                  </p>
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read more →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Hook Section */}
      <section className="px-[120px] pb-20">
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
                {globalConfig.hookQrCode && urlFor(globalConfig.hookQrCode)?.width(240) ? (
                  <img
                    alt="QR Code"
                    className="h-24 w-24 rounded-xl object-cover"
                    src={urlFor(globalConfig.hookQrCode)?.width(240).url() ?? ""}
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
  );
}
