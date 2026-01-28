import { postService } from "@/lib/service/posts";

export default async function BlogIndex() {
  // ✅ 使用统一服务获取文章列表（自动处理 Sanity 和本地数据）
  const posts = await postService.getAllPosts();

  return (
    <main className="px-6 pb-24 pt-10 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600">Blog</p>
          <h1 className="mt-4 text-3xl font-semibold text-brand-900 sm:text-5xl">
            Tutorials, experiments, and systems.
          </h1>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-brand-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* 可选：显示数据来源（方便调试） */}
              {/* <span className="text-xs px-2 py-1 rounded bg-gray-100">{post.source}</span> */}

              <h2 className="mt-4 text-2xl font-semibold text-brand-900">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-brand-800">{post.excerpt}</p>
              <p className="mt-6 text-xs font-semibold text-brand-600">Read more</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
