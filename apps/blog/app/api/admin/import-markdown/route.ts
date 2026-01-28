import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity/client";
import {
  markdownToPortableText,
  extractTitleAndSlug,
} from "@/lib/markdown/portable-text";
import fs from "fs/promises";
import path from "path";

/**
 * 从 Markdown 内容中提取元数据（YAML frontmatter）
 */
function extractMetadata(content: string): {
  metadata: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontmatter = match[1];
  const markdownContent = match[2];

  const metadata: Record<string, any> = {};
  const lines = frontmatter.split("\n");

  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();

    if (key && value) {
      switch (key.trim()) {
        case "title":
          metadata.title = value.replace(/^["']|["']$/g, "");
          break;
        case "date":
          metadata.date = value;
          break;
        case "excerpt":
          metadata.excerpt = value.replace(/^["']|["']$/g, "");
          break;
        case "tags":
          metadata.tags = value
            .replace(/^\[|\]$/g, "")
            .split(",")
            .map((tag: string) => tag.trim().replace(/^["']|["']$/g, ""));
          break;
        case "status":
          metadata.status = value;
          break;
        case "postType":
          metadata.postType = value;
          break;
      }
    }
  }

  return { metadata, content: markdownContent };
}

/**
 * POST /api/admin/import-markdown
 * 导入 Markdown 文件到 Sanity
 */
export async function POST(request: NextRequest) {
  try {
    if (!sanityWriteClient) {
      return NextResponse.json(
        { error: "Sanity write client is not configured" },
        { status: 500 }
      );
    }

    const { files } = await request.json();

    if (!Array.isArray(files)) {
      return NextResponse.json(
        { error: "Invalid files array" },
        { status: 400 }
      );
    }

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const filename of files) {
      try {
        const postsDir = path.join(process.cwd(), "posts");
        const filePath = path.join(postsDir, filename);

        // 读取文件
        const content = await fs.readFile(filePath, "utf-8");

        // 提取元数据
        const { metadata, content: markdownContent } = extractMetadata(content);

        // 获取标题和 slug
        const { title, slug } = extractTitleAndSlug(filename);
        const finalTitle = metadata.title || title;

        // 转换为 PortableText
        const portableTextContent = markdownToPortableText(markdownContent);

        // 生成文档 ID
        const docId = `post.${slug}`;

        // 创建 Sanity 文档
        const doc = {
          _id: docId,
          _type: "post",
          title: finalTitle,
          slug: {
            _type: "slug",
            current: slug,
          },
          postType: metadata.postType || "article",
          excerpt:
            metadata.excerpt ||
            markdownContent.slice(0, 150).replace(/\n/g, " ") + "...",
          status: metadata.status || "draft",
          publishedAt: metadata.date
            ? new Date(metadata.date).toISOString()
            : null,
          content: portableTextContent,
          tags: metadata.tags || [],
        };

        // 创建或更新文档
        await sanityWriteClient.createOrReplace(doc);
        successCount++;
      } catch (error) {
        failCount++;
        errors.push(
          `${filename}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    return NextResponse.json({
      successCount,
      failCount,
      errors,
      message: `导入完成：成功 ${successCount}，失败 ${failCount}`,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
