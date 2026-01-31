import { NextRequest, NextResponse } from "next/server";
import { sanityReadClient, sanityWriteClient } from "@/lib/sanity/client";

/**
 * GET /api/posts/[slug]
 * 获取单篇文章详情
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!sanityReadClient) {
      return NextResponse.json(
        { error: "Sanity client not configured" },
        { status: 500 }
      );
    }

    const { slug } = params;

    const query = `*[_type == "post" && slug.current == $slug][0]{
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
      content,
      videoUrl,
      _createdAt,
      _updatedAt
    }`;

    const post = await sanityReadClient.fetch(query, { slug });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(`GET /api/posts/${params.slug} error:`, error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/posts/[slug]
 * 更新单篇文章
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const { slug } = params;
    const body = await request.json();

    // 先获取文档 ID
    const existingPost = await sanityReadClient?.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug }
    );

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // 准备更新数据
    const updates: Record<string, any> = {};

    if (body.title !== undefined) updates.title = body.title;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    if (body.status !== undefined) updates.status = body.status;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.publishedAt !== undefined) updates.publishedAt = body.publishedAt;
    if (body.content !== undefined) updates.content = body.content;
    if (body.videoUrl !== undefined) updates.videoUrl = body.videoUrl;
    if (body.coverImage !== undefined) updates.coverImage = body.coverImage;
    if (body.mainImage !== undefined) updates.mainImage = body.mainImage;

    // 如果要更新 slug，需要特殊处理
    if (body.slug !== undefined && body.slug !== slug) {
      updates.slug = { _type: "slug", current: body.slug };
    }

    const result = await sanityWriteClient
      .patch(existingPost)
      .set(updates)
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(`PATCH /api/posts/${params.slug} error:`, error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts/[slug]
 * 删除单篇文章
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const { slug } = params;

    // 先获取文档 ID
    const existingPost = await sanityReadClient?.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug }
    );

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await sanityWriteClient.delete(existingPost);

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(`DELETE /api/posts/${params.slug} error:`, error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
