import { postService } from "@/lib/service/posts";
import { getHomeData } from "../lib/home-data";
import { urlFor } from "../lib/sanity.image";
import BlogCard from "@/components/business/BlogCard";
import SearchProvider from "@/components/business/SearchProvider";
import HomeContent from "./HomeContent";

// ✅ ISR: 每 60 秒检查一次数据更新
export const revalidate = 60;

export default async function BlogHome() {
  // ✅ 使用 postService 获取最新 6 篇文章
  const latestPosts = await postService.getLatestPosts(6);

  // 在服务端构建图片 URL
  const postsWithCoverUrls = latestPosts.map((post) => ({
    ...post,
    coverUrl: post.source === "sanity" && post.coverImage
      ? urlFor(post.coverImage)?.width(800).height(450).url()
      : null,
  }));

  // 获取其他首页数据（分类、全局配置）
  const { categories, globalConfig } = await getHomeData();

  return (
    <SearchProvider>
      <HomeContent
        postsWithCoverUrls={postsWithCoverUrls}
        categories={categories}
        globalConfig={globalConfig}
      />
    </SearchProvider>
  );
}
