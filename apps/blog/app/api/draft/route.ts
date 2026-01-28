import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

const sanityClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        token,
        useCdn: false
      })
    : null;

type DraftPayload = {
  title: string;
  slug: string;
  postType: "article" | "video";
  excerpt?: string;
  videoUrl?: string;
  content?: unknown[];
};

export async function POST(request: Request) {
  if (!sanityClient) {
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

  const result = await sanityClient.createOrReplace({
    _id: `post.${body.slug}`,
    ...doc
  });

  return NextResponse.json({ ok: true, result });
}
