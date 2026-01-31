import { NextResponse } from "next/server";
import { postService } from "@/lib/service/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 获取所有已发布的文章（只返回搜索需要的字段）
    const posts = await postService.getAllPosts();

    // 只返回搜索需要的字段，减少数据传输量
    const searchData = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      tags: post.tags || [],
    }));

    return NextResponse.json(searchData);
  } catch (error) {
    console.error("[API] Search endpoint error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
