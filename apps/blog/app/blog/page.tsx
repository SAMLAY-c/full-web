import { sanityClient } from "@/lib/sanity/client";

const allPostsQuery = `*[_type == "post" && status == "published"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  "type": postType,
  publishedAt,
  tags
}`;

export default async function BlogIndex() {
  const posts = await sanityClient.fetch(allPostsQuery);

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
          {posts.map((post: any) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-brand-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {post.tags && post.tags.length > 0 && (
                <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
                  {post.tags[0]}
                </p>
              )}
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
