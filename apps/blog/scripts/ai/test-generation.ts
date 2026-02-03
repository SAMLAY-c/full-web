/**
 * AI文章生成测试脚本
 *
 * 使用方法:
 * 1. 确保 .env.local 中配置了 OPENAI_API_KEY
 * 2. 运行: pnpm tsx scripts/ai/test-generation.ts
 */

import { aiService } from "../../lib/ai";

async function main() {
  console.log("🤖 AI文章生成测试\n");

  // 测试主题
  const topic = "React Server Components 最佳实践";
  const options = {
    tone: "technical" as const,
    length: "medium" as const,
    targetAudience: "中级前端开发者",
    includeCodeExamples: true
  };

  console.log(`📝 主题: ${topic}`);
  console.log(`⚙️ 选项:`, options);
  console.log("\n⏳ 开始生成...\n");

  try {
    const result = await aiService.generateArticle({
      topic,
      options
    });

    if (result.success && result.article) {
      const article = result.article;

      console.log("✅ 生成成功!\n");
      console.log("=".repeat(60));
      console.log(`标题: ${article.title}`);
      console.log(`Slug: ${article.metadata.slug}`);
      console.log(`标签: ${article.metadata.tags.join(", ")}`);
      console.log("\n摘要:");
      console.log(article.metadata.excerpt);
      console.log("\n".repeat(60));
      console.log("文章内容预览 (前500字):");
      console.log("-".repeat(60));
      console.log(article.markdown.substring(0, 500) + "...");
      console.log("-".repeat(60));
      console.log("\n✨ 完成! 可以通过API发布到Sanity CMS");

      // 显示发布命令
      console.log("\n💡 发布命令:");
      console.log(
        `curl -X POST http://localhost:3001/api/ai-generation \\`
      );
      console.log(`  -H "Content-Type: application/json" \\`);
      console.log(`  -d '{"topic": "${topic}", "autoPublish": true}'`);
    } else {
      console.error("❌ 生成失败:", result.error);
    }
  } catch (error) {
    console.error("❌ 错误:", error);
  }
}

main();
