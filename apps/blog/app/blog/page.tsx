const posts = [
  {
    slug: "git-rituals",
    title: "Git rituals that keep teams calm",
    summary: "Branching rules, PR checklists, and communication habits for high-trust teams.",
    tag: "Git"
  },
  {
    slug: "ai-config-stack",
    title: "The config stack behind a reliable AI workspace",
    summary: "Cursor, Claude, and local automation stitched into a single workflow.",
    tag: "AI Config"
  },
  {
    slug: "visio-thinking",
    title: "Visio diagrams that explain complex ops",
    summary: "Diagram patterns that executives actually understand.",
    tag: "Product Ops"
  }
];

export default function BlogIndex() {
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
              <p className="text-xs uppercase tracking-[0.3em] text-brand-500">{post.tag}</p>
              <h2 className="mt-4 text-2xl font-semibold text-brand-900">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-brand-800">{post.summary}</p>
              <p className="mt-6 text-xs font-semibold text-brand-600">Read more</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
