import { getHomeData } from "../lib/home-data";
import { urlFor } from "../lib/sanity.image";

export default async function BlogHome() {
  const { categories, globalConfig, posts } = await getHomeData();

  return (
    <main className="px-6 pb-24 pt-12 sm:px-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-brand-100 bg-white p-10 shadow-sm">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600">Learning Hub</p>
          <h1 className="mt-6 text-4xl font-semibold text-brand-900 sm:text-6xl">
            {globalConfig.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-brand-800">{globalConfig.heroSubtitle}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-3 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-700">
              <span className="text-brand-400">🔍</span>
              搜索教程、工具或路线图
            </div>
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-200"
            >
              {globalConfig.heroCtaText}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-brand-900">新手路线图</h2>
          <a className="text-xs font-semibold text-brand-600" href="/blog">
            查看全部
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {categories.map((card) => (
            <div
              key={card.slug}
              className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-brand-900">{card.name}</h3>
              <p className="mt-3 text-sm text-brand-700">{card.skillsList}</p>
              <p className="mt-6 text-xs font-semibold text-brand-600">
                /category/{card.slug}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-brand-900">最新更新</h2>
          <a className="text-xs font-semibold text-brand-600" href="/blog">
            更多文章
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const coverUrl = urlFor(post.coverImage)?.width(800).url();

            return (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="h-40 bg-gradient-to-br from-brand-100 via-brand-50 to-white"
                  style={
                    coverUrl
                      ? { backgroundImage: `url(${coverUrl})`, backgroundSize: "cover" }
                      : undefined
                  }
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
                    {post.type === "video" ? "Video" : "Article"}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-brand-900">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-700">{post.excerpt}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-600">The Hook</p>
              <h2 className="mt-4 text-2xl font-semibold text-brand-900">
                {globalConfig.hookTitle}
              </h2>
              <p className="mt-3 text-sm text-brand-800">
                {globalConfig.hookDescription}
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-brand-700 shadow-sm">
              {urlFor(globalConfig.hookQrCode)?.width(240) ? (
                <img
                  alt="QR Code"
                  className="h-14 w-14 rounded-xl object-cover"
                  src={urlFor(globalConfig.hookQrCode)?.width(240).url() ?? ""}
                />
              ) : (
                <span className="h-14 w-14 rounded-xl bg-brand-100" />
              )}
              QR Code
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
