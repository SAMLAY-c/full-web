import { NextResponse } from "next/server";
import { sanityWriteClient } from "../../../lib/sanity/client";
import { revalidatePath } from "next/cache";

type PublishPayload = {
  title: string;
  slug: string;
  postType: "article" | "video";
  excerpt?: string;
  status?: "draft" | "published";
  videoUrl?: string;
  content?: unknown[];
  tags?: string[];
  publishedAt?: string;
};

export async function POST(request: Request) {
  if (!sanityWriteClient) {
    return NextResponse.json(
      { error: "Sanity client not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json()) as PublishPayload;

  if (!body?.title || !body?.slug || !body?.postType) {
    return NextResponse.json(
      { error: "title, slug, postType are required" },
      { status: 400 }
    );
  }

  const status = body.status ?? "published";

  const doc = {
    _type: "post",
    title: body.title,
    slug: { _type: "slug", current: body.slug },
    postType: body.postType,
    excerpt: body.excerpt ?? "",
    status,
    videoUrl: body.videoUrl,
    content: body.content ?? [],
    tags: body.tags ?? [],
    publishedAt: body.publishedAt ?? new Date().toISOString()
  };

  const result = await sanityWriteClient.createOrReplace({
    _id: `post.${body.slug}`,
    ...doc
  });

  // ✅ 自动刷新缓存
  // 如果是已发布文章，刷新博客列表和文章详情页
  if (status === "published") {
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath(`/blog/${body.slug}`);
  }

  return NextResponse.json({
    ok: true,
    result,
    revalidated: status === "published",
    message: status === "published"
      ? "文章已发布并刷新缓存"
      : "草稿已保存"
  });
}
