import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity/client";
import { htmlToMarkdown, extractTitleFromHtml } from "@/lib/converters/html-to-markdown";
import { markdownToPortableText } from "@/lib/markdown/portable-text";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * POST /api/admin/import-html
 * 将 HTML 转为 Markdown 再写入 Sanity
 */
export async function POST(request: NextRequest) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { html, title, slug, tags, status, postType, publishedAt } = body || {};

    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "html is required" }, { status: 400 });
    }

    const inferredTitle = extractTitleFromHtml(html);
    const finalTitle = (title || inferredTitle || "Untitled").trim();
    const finalSlug = (slug || slugify(finalTitle)).trim();

    const markdown = htmlToMarkdown(html);
    const portableTextContent = markdownToPortableText(markdown);

    const doc = {
      _id: `post.${finalSlug}`,
      _type: "post",
      title: finalTitle,
      slug: { _type: "slug", current: finalSlug },
      postType: postType || "article",
      excerpt: markdown.slice(0, 150).replace(/\n/g, " ") + "...",
      status: status || "published",
      publishedAt: publishedAt || new Date().toISOString(),
      tags: Array.isArray(tags) ? tags : [],
      content: portableTextContent,
      markdownContent: markdown,
      htmlContent: html
    };

    const result = await sanityWriteClient.createOrReplace(doc);

    return NextResponse.json({
      success: true,
      data: {
        id: result._id,
        slug: result.slug?.current || finalSlug,
        title: result.title,
        status: result.status
      }
    });
  } catch (error) {
    console.error("Import HTML error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error"
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/import-html
 * 提示用法（避免浏览器直接访问出现 405）
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST with JSON body to import HTML.",
    example: {
      html: "<!DOCTYPE html>...</html>",
      title: "Optional title",
      status: "draft",
      tags: ["AI", "Skills"]
    }
  });
}
