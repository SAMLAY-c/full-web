import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import { sanityWriteClient } from "../lib/sanity/script-client";
import {
  markdownToPortableText,
  extractTitleAndSlug,
} from "../lib/markdown/portable-text";

/**
 * Markdown 文件的元数据接口
 */
interface MarkdownMetadata {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  status?: "draft" | "published";
  postType?: "article" | "note" | "snippet";
}

/**
 * 从 Markdown 内容中提取元数据（YAML frontmatter）
 */
function extractMetadata(content: string): {
  metadata: MarkdownMetadata;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontmatter = match[1];
  const markdownContent = match[2];

  const metadata: MarkdownMetadata = {};
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
            .map((tag) => tag.trim().replace(/^["']|["']$/g, ""));
          break;
        case "status":
          metadata.status = value.replace(/^["']|["']$/g, "") as "draft" | "published";
          break;
        case "postType":
          metadata.postType = value.replace(/^["']|["']$/g, "") as "article" | "note" | "snippet";
          break;
      }
    }
  }

  return { metadata, content: markdownContent };
}

/**
 * 将 Markdown 文件导入到 Sanity
 */
export async function importMarkdownToSanity(
  markdownPath: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!sanityWriteClient) {
      throw new Error("Sanity write client is not configured");
    }

    // 读取 Markdown 文件
    const content = await fs.readFile(markdownPath, "utf-8");

    // 提取元数据
    const { metadata, content: markdownContent } = extractMetadata(content);

    // 获取文件名
    const filename = path.basename(markdownPath);
    const { title, slug } = extractTitleAndSlug(filename);

    // 使用元数据中的标题或从文件名提取
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
      status: metadata.status || "published",
      publishedAt: metadata.date ? new Date(metadata.date).toISOString() : null,
      content: portableTextContent,
      tags: metadata.tags || [],
    };

    // 创建或更新文档
    const result = await sanityWriteClient.createOrReplace(doc);

    return {
      success: true,
      id: result._id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * 批量导入 Markdown 文件
 */
export async function importMarkdownDirectory(
  directory: string,
  pattern: string = "**/*.md"
): Promise<void> {
  console.log(`📁 Scanning directory: ${directory}`);

  // 查找所有 Markdown 文件
  const files = await glob(pattern, { cwd: directory });

  console.log(`📝 Found ${files.length} markdown files\n`);

  if (files.length === 0) {
    console.log("❌ No markdown files found");
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const fullPath = path.join(directory, file);
    console.log(`\n📄 Processing: ${file}`);

    const result = await importMarkdownToSanity(fullPath);

    if (result.success) {
      console.log(`✅ Imported successfully: ${result.id}`);
      successCount++;
    } else {
      console.log(`❌ Import failed: ${result.error}`);
      failCount++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`${"=".repeat(50)}`);
}

/**
 * CLI 入口
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: pnpm tsx scripts/import-markdown.ts <directory> [pattern]

Examples:
  pnpm tsx scripts/import-markdown.ts ./posts
  pnpm tsx scripts/import-markdown.ts ./content "**/*.md"
    `);
    process.exit(1);
  }

  const [directory, pattern] = args;

  try {
    await importMarkdownDirectory(directory, pattern);
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}
