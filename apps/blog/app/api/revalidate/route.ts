import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * POST /api/revalidate
 * 按需重新验证（On-demand ISR）
 * 当内容更新时主动刷新缓存，而不是等待 revalidate 时间到期
 *
 * 使用场景：
 * 1. 发布新文章后刷新博客列表
 * 2. 更新文章内容后刷新文章详情页
 * 3. 批量导入后刷新相关页面
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, slug, path } = body;

    // 1. 重新验证博客列表页
    if (type === "blog-list") {
      revalidatePath("/blog");
      revalidatePath("/"); // 首页也可能显示最新文章

      return NextResponse.json({
        success: true,
        revalidated: true,
        now: Date.now(),
        message: "博客列表页缓存已刷新",
      });
    }

    // 2. 重新验证文章详情页
    if (type === "post" && slug) {
      revalidatePath(`/blog/${slug}`);

      return NextResponse.json({
        success: true,
        revalidated: true,
        now: Date.now(),
        message: `文章 /blog/${slug} 缓存已刷新`,
      });
    }

    // 3. 重新验证指定路径
    if (path) {
      revalidatePath(path);

      return NextResponse.json({
        success: true,
        revalidated: true,
        now: Date.now(),
        message: `路径 ${path} 缓存已刷新`,
      });
    }

    // 4. 重新验证所有标签（高级用法）
    if (type === "tag" && slug) {
      revalidateTag(slug);

      return NextResponse.json({
        success: true,
        revalidated: true,
        now: Date.now(),
        message: `标签 ${slug} 相关页面缓存已刷新`,
      });
    }

    return NextResponse.json(
      {
        success: false,
        revalidated: false,
        message: "无效的请求参数",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Revalidation error:", error);

    return NextResponse.json(
      {
        success: false,
        revalidated: false,
        message: "重新验证失败",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate
 * 获取可用的重新验证类型
 */
export async function GET() {
  return NextResponse.json({
    availableTypes: {
      blog_list: {
        type: "blog-list",
        description: "刷新博客列表页和首页",
        example: { type: "blog-list" },
      },
      post: {
        type: "post",
        description: "刷新指定文章详情页",
        example: { type: "post", slug: "ai-intro" },
      },
      path: {
        type: "path",
        description: "刷新指定路径",
        example: { path: "/blog" },
      },
      tag: {
        type: "tag",
        description: "刷新所有带有指定标签的页面",
        example: { type: "tag", slug: "AI" },
      },
    },
  });
}
