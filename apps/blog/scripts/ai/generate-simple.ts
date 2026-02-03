/**
 * AI文章生成独立测试脚本（简化版）
 * 直接使用硅基流动API生成文章并保存到Sanity
 */

import OpenAI from "openai";
import { createClient } from "@sanity/client";

// 配置
const CONFIG = {
  siliconflow: {
    apiKey: "sk-itnytfacpeobkvireovadmsrbonrgemrsnfgsqvhesjtyppz",
    baseURL: "https://api.siliconflow.cn/v1",
    model: "deepseek-ai/DeepSeek-V3.2"
  },
  sanity: {
    projectId: "h8272qgq",
    dataset: "production",
    token: process.env.SANITY_WRITE_TOKEN
  }
};

// 生成slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// 简单的Markdown转PortableText转换器
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = [];
  const lines = markdown.split("\n");
  let currentBlock: any = null;

  for (const line of lines) {
    // 标题
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      const level = headingMatch[1].length;
      currentBlock = {
        _type: "block",
        style: level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4",
        children: [{ _type: "span", text: headingMatch[2] }]
      };
      continue;
    }

    // 代码块
    if (line.startsWith("```")) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // 空行
    if (line.trim() === "") {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // 普通文本
    if (!currentBlock) {
      currentBlock = {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: line }]
      };
    } else {
      currentBlock.children[0].text += "\n" + line;
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

async function main() {
  console.log("🤖 AI文章生成测试 - 硅基流动 DeepSeek-V3\n");

  // 初始化OpenAI客户端
  const client = new OpenAI({
    apiKey: CONFIG.siliconflow.apiKey,
    baseURL: CONFIG.siliconflow.baseURL
  });

  // 测试主题
  const topic = "Next.js 15 App Router 完全指南：从入门到实战";

  console.log(`📝 主题: ${topic}\n`);
  console.log("⏳ 开始生成...\n");

  try {
    // 步骤1: 生成大纲
    console.log("📋 步骤 1/3: 生成大纲...");
    const outlineResponse = await client.chat.completions.create({
      model: CONFIG.siliconflow.model,
      messages: [
        {
          role: "system",
          content: "你是一个专业的内容策划师，擅长创建结构清晰的技术文章大纲。"
        },
        {
          role: "user",
          content: `请为主题"${topic}"生成详细的文章大纲。\n\n要求：\n1. 包含3-5个主要章节\n2. 每个章节2-4个子要点\n3. 使用Markdown格式\n\n请按以下格式输出：\n# 文章标题\n\n## 章节1\n- 要点1\n- 要点2\n\n## 章节2...`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const outline = outlineResponse.choices[0]?.message?.content || "";
    console.log("✅ 大纲生成完成");
    console.log("   ", outline.split("\n")[0]);

    // 步骤2: 生成文章内容
    console.log("\n✍️  步骤 2/3: 生成文章内容...");
    const articleResponse = await client.chat.completions.create({
      model: CONFIG.siliconflow.model,
      messages: [
        {
          role: "system",
          content: "你是一个专业的技术作家，擅长写深入浅出的技术博客文章。使用Markdown格式，包含代码示例。"
        },
        {
          role: "user",
          content: `请根据以下大纲生成完整的技术文章：\n\n${outline}\n\n要求：\n1. 内容专业且易于理解\n2. 包含实际代码示例\n3. 使用清晰的段落结构\n4. 每个章节有小结\n5. 最后有总结`
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
    });

    const markdown = articleResponse.choices[0]?.message?.content || "";
    console.log("✅ 文章生成完成");
    console.log("   字数:", markdown.length);

    // 步骤3: 生成元数据
    console.log("\n🏷️  步骤 3/3: 生成元数据...");
    const metadataResponse = await client.chat.completions.create({
      model: CONFIG.siliconflow.model,
      messages: [
        {
          role: "system",
          content: "你是SEO专家。请返回纯JSON格式，不要包含其他文字。"
        },
        {
          role: "user",
          content: `请为以下文章生成SEO元数据，返回JSON格式：\n\n文章内容前500字：\n${markdown.substring(0, 500)}...\n\n请返回：\n{\n  "title": "文章标题",\n  "excerpt": "文章摘要(150字)",\n  "tags": ["tag1", "tag2", "tag3"],\n  "keywords": ["关键词1", "关键词2"]\n}`
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    let metadataText = metadataResponse.choices[0]?.message?.content || "{}";
    // 清理可能的markdown标记
    metadataText = metadataText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let metadata;
    try {
      metadata = JSON.parse(metadataText);
    } catch (e) {
      console.log("⚠️  JSON解析失败，使用默认值");
      metadata = {
        title: topic,
        excerpt: markdown.substring(0, 150) + "...",
        tags: ["Next.js", "React", "前端开发"],
        keywords: ["Next.js", "App Router", "React"]
      };
    }

    const slug = generateSlug(metadata.title);
    console.log("✅ 元数据生成完成");
    console.log("   标题:", metadata.title);

    // 保存到Sanity
    console.log("\n💾 保存到Sanity CMS...");
    const sanityClient = createClient({
      projectId: CONFIG.sanity.projectId,
      dataset: CONFIG.sanity.dataset,
      apiVersion: "2024-01-01",
      token: CONFIG.sanity.token
    });

    const portableText = markdownToPortableText(markdown);

    const doc = {
      _id: `post.${slug}`,
      _type: "post",
      title: metadata.title,
      slug: { _type: "slug", current: slug },
      excerpt: metadata.excerpt,
      content: portableText,
      tags: metadata.tags,
      status: "draft",
      postType: "article",
      markdownTheme: "default",
      publishedAt: new Date().toISOString()
    };

    await sanityClient.createOrReplace(doc);

    console.log("\n" + "=".repeat(60));
    console.log("✅ 文章生成并保存成功!");
    console.log("=".repeat(60));
    console.log(`📄 ID: ${doc._id}`);
    console.log(`📝 标题: ${metadata.title}`);
    console.log(`🔗 链接: /blog/${slug}`);
    console.log(`🏷️  标签: ${metadata.tags.join(", ")}`);
    console.log(`📊 字数: ${markdown.length}`);
    console.log("=".repeat(60));

    console.log("\n📄 内容预览 (前300字):");
    console.log("-".repeat(60));
    console.log(markdown.substring(0, 300) + "...");
    console.log("-".repeat(60));

  } catch (error) {
    console.error("\n❌ 错误:", error);
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
    }
    process.exit(1);
  }
}

main();
