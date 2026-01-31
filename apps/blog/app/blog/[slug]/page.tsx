import { notFound } from "next/navigation";
import { postService } from "../../../lib/service/posts";
import { urlFor } from "../../../lib/sanity.image";
import PostBody from "../../../components/post-body";

// ✅ ISR: 每 60 秒检查一次文章内容修正
export const revalidate = 60;

// ✅ SSG: 告诉 Next.js 需要静态生成哪些 slug
export async function generateStaticParams() {
  const posts = await postService.getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ 允许动态参数（新文章可立即访问）
export const dynamicParams = true;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // ✅ 使用统一服务获取文章（自动处理 Sanity 和本地数据）
  const post = await postService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 根据来源处理不同的数据结构
  const isSanity = post.source === "sanity";
  const coverUrl = isSanity && post.coverImage
    ? urlFor(post.coverImage)?.width(1200).height(675).url()
    : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {post.title}
        </h1>
        {coverUrl ? (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <img alt={post.title} className="h-full w-full object-cover" src={coverUrl} />
          </div>
        ) : null}
      </header>

      {isSanity ? (
        // Sanity 文章渲染
        <PostBody className="text-gray-700 md:prose-xl" content={post.body} />
      ) : (
        // 本地文章渲染
        <div className="prose prose-lg mx-auto max-w-none text-gray-700">
          {post.body}
        </div>
      )}
    </article>
  );
}
