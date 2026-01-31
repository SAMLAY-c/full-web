import { postService } from "@/lib/service/posts";
import BlogList from "@/components/business/BlogList";
import { urlFor } from "@/lib/sanity.image";

// ✅ 缓存策略：ISR 增量静态再生成
// 每 300 秒（5 分钟）检查一次新文章
// 在后台重新生成，不影响用户访问旧缓存
export const revalidate = 300;

// ✅ 强制静态生成（构建时生成页面）
export const dynamic = "force-static";

export default async function BlogIndex() {
  // ✅ 使用统一服务获取文章列表和标签（自动处理 Sanity 和本地数据）
  const [posts, allTags] = await Promise.all([
    postService.getAllPosts(),
    postService.getAllTags(),
  ]);

  // 在服务端构建图片 URL
  const postsWithCoverUrls = posts.map((post) => ({
    ...post,
    coverUrl: post.source === "sanity" && post.coverImage
      ? urlFor(post.coverImage)?.width(800).height(450).url()
      : null,
  }));

  return <BlogList posts={postsWithCoverUrls} allTags={allTags} />;
}
