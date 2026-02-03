import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { env } from "@/lib/env";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeFrontmatter(value: string) {
  return value.replace(/"/g, '\\"');
}

function buildFrontmatter({
  title,
  date,
  status,
  excerpt
}: {
  title: string;
  date: string;
  status: "draft" | "published";
  excerpt: string;
}) {
  return [
    "---",
    `title: \"${escapeFrontmatter(title)}\"`,
    `date: \"${date}\"`,
    `excerpt: \"${escapeFrontmatter(excerpt)}\"`,
    `status: \"${status}\"`,
    "---",
    ""
  ].join("\n");
}

/**
 * POST /api/admin/extract-markdown
 * 使用 LLM 从 HTML 提取 Markdown，并写入本地 markdown 文件
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { html, title, slug, status, filename } = body || {};

    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "html is required" }, { status: 400 });
    }

    if (!env.SILICONFLOW_API_KEY) {
      return NextResponse.json(
        { error: "SILICONFLOW_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const finalTitle = (title || "Untitled").trim();
    const finalSlug = (slug || slugify(finalTitle)).trim() || "untitled";
    const finalStatus = status === "draft" ? "draft" : "published";

    const res = await fetch(`${env.AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.SILICONFLOW_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3.2",
        enable_thinking: false,
        messages: [
          {
            role: "system",
            content:
              "你是一个将HTML转换为高质量Markdown的助手。请保留标题层级、列表、引用、代码块、链接。去除导航、按钮、脚本、样式等无关内容。输出纯Markdown。"
          },
          { role: "user", content: html }
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 4096
      })
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "LLM request failed", detail: text },
        { status: 500 }
      );
    }

    const data = await res.json();
    const markdown = data?.choices?.[0]?.message?.content?.trim();

    if (!markdown) {
      return NextResponse.json(
        { error: "LLM returned empty content" },
        { status: 500 }
      );
    }

    const excerpt = markdown.replace(/\n+/g, " ").slice(0, 150);
    const frontmatter = buildFrontmatter({
      title: finalTitle,
      date: new Date().toISOString(),
      status: finalStatus,
      excerpt
    });

    const postsDir = path.join(process.cwd(), "posts");
    const file = filename
      ? filename.endsWith(".md")
        ? filename
        : `${filename}.md`
      : `${finalSlug}.md`;
    const filePath = path.join(postsDir, file);

    await fs.mkdir(postsDir, { recursive: true });
    await fs.writeFile(filePath, `${frontmatter}${markdown}\n`, "utf-8");

    return NextResponse.json({
      success: true,
      file: filePath,
      slug: finalSlug,
      title: finalTitle
    });
  } catch (error) {
    console.error("Extract markdown error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
