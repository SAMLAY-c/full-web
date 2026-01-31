import { NextRequest, NextResponse } from "next/server";
import { sanityReadClient, sanityWriteClient } from "@/lib/sanity/client";
import { revalidatePath } from "next/cache";

/**
 * GET /api/posts
 * 获取文章列表（支持查询参数过滤）
 */
export async function GET(request: NextRequest) {
  try {
    if (!sanityReadClient) {
      return NextResponse.json(
        { error: "Sanity client not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit");
    const postType = searchParams.get("postType");

    // 构建查询条件
    let filters = ["_type == \"post\""];

    if (status) {
      filters.push(`status == "${status}"`);
    }

    if (postType) {
      filters.push(`postType == "${postType}"`);
    }

    if (tag) {
      filters.push(`"${tag}" in tags`);
    }

    const query = `*[${filters.join(" && ")}] | order(isPinned desc, pinOrder asc, publishedAt desc)${
      limit ? ` [0...${parseInt(limit)}]` : ""
    } {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      coverImage,
      mainImage,
      tags,
      status,
      postType,
      isPinned,
      pinOrder,
      _createdAt,
      _updatedAt
    }`;

    const posts = await sanityReadClient.fetch(query);

    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * 创建新文章
 */
export async function POST(request: NextRequest) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // 验证必填字段
    if (!body?.title || !body?.slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "post",
      title: body.title,
      slug: { _type: "slug", current: body.slug },
      postType: body.postType || "article",
      excerpt: body.excerpt || "",
      status: body.status || "draft",
      publishedAt: body.publishedAt || new Date().toISOString(),
      tags: body.tags || [],
      content: body.content || [],
      videoUrl: body.videoUrl,
      coverImage: body.coverImage,
      mainImage: body.mainImage,
    };

    const result = await sanityWriteClient.create(doc);

    // ✅ 自动刷新缓存（仅已发布文章）
    if (doc.status === "published") {
      revalidatePath("/blog");
      revalidatePath("/");
      revalidatePath(`/blog/${doc.slug.current}`);
    }

    return NextResponse.json({
      success: true,
      data: result,
      revalidated: doc.status === "published",
    });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/posts
 * 批量更新文章
 */
export async function PATCH(request: NextRequest) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { ids, updates } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "ids array is required" },
        { status: 400 }
      );
    }

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { error: "updates object is required" },
        { status: 400 }
      );
    }

    // 批量更新
    const results = await Promise.all(
      ids.map((id) =>
        sanityWriteClient.patch(id).set(updates).commit({ autoGenerateArrayKeys: true })
      )
    );

    // ✅ 自动刷新缓存（如果更新了已发布文章）
    // 批量更新时，刷新博客列表
    revalidatePath("/blog");
    revalidatePath("/");

    // 如果更新包含 slug，也刷新对应的文章详情页
    for (const result of results) {
      if (result.slug?.current) {
        revalidatePath(`/blog/${result.slug.current}`);
      }
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
      revalidated: true,
    });
  } catch (error) {
    console.error("PATCH /api/posts error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts
 * 批量删除文章
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",") || [];

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "ids parameter is required" },
        { status: 400 }
      );
    }

    // 批量删除
    const results = await Promise.all(
      ids.map((id) => sanityWriteClient.delete(id))
    );

    // ✅ 自动刷新缓存
    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
      revalidated: true,
      message: "文章已删除，缓存已刷新",
    });
  } catch (error) {
    console.error("DELETE /api/posts error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
