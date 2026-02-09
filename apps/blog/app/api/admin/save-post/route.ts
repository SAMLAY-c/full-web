import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { sanityWriteClient } from "@/lib/sanity/client";
import { saveVersion } from "@/lib/versioning/history";

// 检查用户是否有管理员权限
async function checkAdminAuth() {
  // 简化权限检查 - 生产环境应该使用 next-auth 的 getServerSession
  // 这里为了演示，暂时允许访问
  return true;
}

// 保存为本地 Markdown 文件
async function saveToLocalFile(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  status: string;
}) {
  const postsDir = path.join(process.cwd(), "posts");
  
  // 确保目录存在
  if (!existsSync(postsDir)) {
    await mkdir(postsDir, { recursive: true });
  }

  const filePath = path.join(postsDir, `${data.slug}.md`);

  // 构建 frontmatter
  const frontmatter = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${data.publishedAt}"
tags: [${data.tags.map(t => `"${t}"`).join(", ")}]
status: "${data.status}"
---

`;

  const fullContent = frontmatter + data.content;
  await writeFile(filePath, fullContent, "utf-8");

  return { path: filePath, type: "local" };
}

// 保存到 Sanity CMS
async function saveToSanity(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  status: string;
  _id?: string;
}) {
  if (!sanityWriteClient) {
    throw new Error("Sanity write client not configured");
  }

  const doc: any = {
    _type: "post",
    title: data.title,
    slug: { current: data.slug },
    excerpt: data.excerpt,
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: data.content,
          },
        ],
      },
    ],
    tags: data.tags,
    publishedAt: data.publishedAt,
    status: data.status,
  };

  // 如果有 _id 则添加，否则让 Sanity 自动生成
  if (data._id) {
    doc._id = data._id;
  }

  const result = await sanityWriteClient.createOrReplace(doc);
  return { id: result._id, type: "sanity" };
}

export async function POST(request: NextRequest) {
  try {
    // 权限检查
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 解析请求数据
    const data = await request.json();

    // 验证必填字段
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // 清理 slug
    const cleanSlug = data.slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const postData = {
      ...data,
      slug: cleanSlug,
    };

    // 同时保存到本地和 Sanity（如果配置了）
    const results: any[] = [];

    // 1. 保存到本地 Markdown
    try {
      const localResult = await saveToLocalFile(postData);
      results.push(localResult);
    } catch (error) {
      console.error("Failed to save local file:", error);
    }

    // 2. 尝试保存到 Sanity
    if (sanityWriteClient) {
      try {
        const sanityResult = await saveToSanity(postData);
        results.push(sanityResult);
      } catch (error) {
        console.error("Failed to save to Sanity:", error);
      }
    }

    // 3. 保存历史版本（永久本地备份）
    try {
      await saveVersion({
        slug: cleanSlug,
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content || "",
        tags: data.tags || [],
        status: data.status || "draft",
        author: data.author || "admin",
        changeSummary: data.changeSummary || `保存于 ${new Date().toLocaleString("zh-CN")}`,
      });
    } catch (error) {
      console.error("Failed to save version history:", error);
      // 历史版本保存失败不影响主流程
    }

    return NextResponse.json({
      success: true,
      slug: cleanSlug,
      results,
      message: `文章已保存到: ${results.map(r => r.type).join(", ")}`,
    });

  } catch (error) {
    console.error("Save post error:", error);
    return NextResponse.json(
      { error: "Failed to save post" },
      { status: 500 }
    );
  }
}
