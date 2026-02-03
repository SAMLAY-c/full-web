import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai";
import { createClient } from "@sanity/client";
import { markdownToPortableText } from "@/lib/markdown/portable-text";

/**
 * AI文章生成API
 * POST /api/ai-generation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, options, autoPublish = false } = body;

    // 验证请求
    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "请提供有效的文章主题" },
        { status: 400 }
      );
    }

    console.log(`🤖 开始生成文章: ${topic}`);

    // 调用AI生成
    const result = await aiService.generateArticle({
      topic,
      options
    });

    if (!result.success || !result.article) {
      return NextResponse.json(
        { error: result.error || "生成失败" },
        { status: 500 }
      );
    }

    const article = result.article;

    // 如果需要自动发布
    if (autoPublish) {
      const sanityClient = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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
        status: "draft", // 默认为草稿，需审核
        postType: "article",
        markdownTheme: "default",
        publishedAt: new Date().toISOString()
      };

      await sanityClient.createOrReplace(doc);

      console.log(`✅ 文章已保存到Sanity: ${doc._id}`);

      return NextResponse.json({
        success: true,
        articleId: doc._id,
        slug: article.metadata.slug,
        article: {
          title: article.title,
          excerpt: article.metadata.excerpt,
          tags: article.metadata.tags
        }
      });
    }

    // 仅返回生成的内容
    return NextResponse.json({
      success: true,
      article: {
        title: article.title,
        markdown: article.markdown,
        excerpt: article.metadata.excerpt,
        tags: article.metadata.tags,
        slug: article.metadata.slug
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "服务器错误",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai-generation
 * 获取服务状态
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AI Article Generation",
    version: "1.0.0",
    providers: ["openai", "anthropic"],
    defaultProvider: "openai"
  });
}
