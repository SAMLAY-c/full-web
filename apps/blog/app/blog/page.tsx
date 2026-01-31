import { postService } from "@/lib/service/posts";
import BlogList from "@/components/business/BlogList";

// ✅ ISR: 每 60 秒检查一次新文章
export const revalidate = 60;

export default async function BlogIndex() {
  // ✅ 使用统一服务获取文章列表和标签（自动处理 Sanity 和本地数据）
  const [posts, allTags] = await Promise.all([
    postService.getAllPosts(),
    postService.getAllTags(),
  ]);

  return <BlogList posts={posts} allTags={allTags} />;
}
