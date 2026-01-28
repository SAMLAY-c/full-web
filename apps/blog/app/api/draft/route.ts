import { NextResponse } from "next/server";
import { sanityWriteClient } from "../../../lib/sanity/client";

type DraftPayload = {
  title: string;
  slug: string;
  postType: "article" | "video";
  excerpt?: string;
  videoUrl?: string;
  content?: unknown[];
};

export async function POST(request: Request) {
  if (!sanityWriteClient) {
    return NextResponse.json(
      { error: "Sanity client not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json()) as DraftPayload;

  if (!body?.title || !body?.slug || !body?.postType) {
    return NextResponse.json(
      { error: "title, slug, postType are required" },
      { status: 400 }
    );
  }

  const doc = {
    _type: "post",
    title: body.title,
    slug: { _type: "slug", current: body.slug },
    postType: body.postType,
    excerpt: body.excerpt ?? "",
    status: "draft",
    videoUrl: body.videoUrl,
    content: body.content ?? []
  };

  const result = await sanityWriteClient.createOrReplace({
    _id: `post.${body.slug}`,
    ...doc
  });

  return NextResponse.json({ ok: true, result });
}
