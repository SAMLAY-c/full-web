/**
 * AI文章生成独立测试脚本
 * 直接调用硅基流动API生成文章并保存到Sanity
 */

import { SiliconFlowProvider } from "../../lib/ai/providers/siliconflow";
import { createClient } from "@sanity/client";
import { markdownToPortableText } from "../../lib/markdown/portable-text";

async function main() {
  console.log("🤖 AI文章生成测试 - 硅基流动 DeepSeek-V3\n");

  // 初始化Provider
  const provider = new SiliconFlowProvider();

  // 测试主题
  const topic = "Next.js 15 App Router 完全指南：从入门到实战";
  const options = {
    tone: "technical" as const,
    length: "medium" as const,
    targetAudience: "前端开发者",
    includeCodeExamples: true
  };

  console.log(`📝 主题: ${topic}`);
  console.log(`⚙️  选项:`, options);
  console.log("\n⏳ 开始生成...\n");

  try {
    // 生成文章
    const article = await provider.generateCompleteArticle(topic, options);

    console.log("✅ 生成成功!\n");
    console.log("=".repeat(60));
    console.log(`标题: ${article.title}`);
    console.log(`Slug: ${article.metadata.slug}`);
    console.log(`标签: ${article.metadata.tags.join(", ")}`);
    console.log("\n摘要:");
    console.log(article.metadata.excerpt);
    console.log("\n" + "=".repeat(60));

    // 保存到Sanity
    console.log("\n💾 保存到Sanity CMS...");

    const sanityClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "h8272qgq",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_WRITE_TOKEN
    });

    // 转换Markdown为PortableText
    const portableText = markdownToPortableText(article.markdown);

    // 创建文档
    const doc = {
      _id: `post.${article.metadata.slug}`,
      _type: "post",
      title: article.title,
      slug: {
        _type: "slug",
        current: article.metadata.slug
      },
      excerpt: article.metadata.excerpt,
      content: portableText,
      tags: article.metadata.tags,
      status: "draft", // 默认为草稿
      postType: "article",
      markdownTheme: "default",
      publishedAt: new Date().toISOString()
    };

    await sanityClient.createOrReplace(doc);

    console.log(`✅ 文章已保存: ${doc._id}`);
    console.log(`🔗 访问链接: /blog/${article.metadata.slug}`);
    console.log("\n📊 文章统计:");
    console.log(`   - 字数: ${article.markdown.length}`);
    console.log(`   - 段落数: ${article.markdown.split("\n\n").length}`);
    console.log(`   - 代码块数: ${(article.markdown.match(/```/g) || []).length / 2}`);

    // 显示内容预览
    console.log("\n📄 内容预览 (前300字):");
    console.log("-".repeat(60));
    console.log(article.markdown.substring(0, 300) + "...");
    console.log("-".repeat(60));

  } catch (error) {
    console.error("\n❌ 错误:", error);
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
      console.error(`   Stack: ${error.stack}`);
    }
    process.exit(1);
  }
}

main();
