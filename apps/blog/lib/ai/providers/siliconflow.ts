import OpenAI from "openai";
import { env } from "../../env";
import type {
  Outline,
  ArticleContent,
  ArticleMetadata,
  GenerateOptions,
  TokenUsage
} from "../types";
import { buildPrompt } from "../core/prompts";

/**
 * 硅基流动(SiliconFlow) Provider 实现
 * 使用DeepSeek-V3模型
 */
export class SiliconFlowProvider {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.SILICONFLOW_API_KEY,
      baseURL: env.AI_BASE_URL
    });
    this.model = env.AI_DEFAULT_MODEL;
  }

  /**
   * 生成大纲
   */
  async generateOutline(topic: string, options?: GenerateOptions): Promise<Outline> {
    const prompt = buildPrompt("outline", { topic, options });

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: "你是一个专业的内容策划师，擅长创建结构清晰的技术文章大纲。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content || "";
    return this.parseOutline(content);
  }

  /**
   * 根据大纲生成文章
   */
  async generateArticle(
    outline: Outline,
    options?: GenerateOptions
  ): Promise<string> {
    const outlineText = this.formatOutline(outline);
    const prompt = buildPrompt("article", { outline: outlineText, options });

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: "你是一个专业的技术作家，擅长写深入浅出的技术博客文章。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
    });

    return response.choices[0]?.message?.content || "";
  }

  /**
   * 生成文章元数据
   */
  async generateMetadata(
    content: string,
    title?: string
  ): Promise<ArticleMetadata> {
    const prompt = buildPrompt("metadata", { content });

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: "你是SEO专家，擅长优化技术文章的元数据。请务必返回有效的JSON格式。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    let result = response.choices[0]?.message?.content || "{}";

    // 清理可能的markdown代码块标记
    result = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {
      const metadata = JSON.parse(result);

      // 生成slug
      const slug = this.generateSlug(metadata.title);

      return {
        title: metadata.title || title || "Untitled",
        slug,
        excerpt: metadata.excerpt || "",
        tags: metadata.tags || [],
        keywords: metadata.keywords || []
      };
    } catch (error) {
      console.error("解析元数据失败:", error);
      console.log("原始响应:", result);

      // 降级处理：生成基础元数据
      return {
        title: title || "Untitled",
        slug: this.generateSlug(title || "untitled"),
        excerpt: content.substring(0, 150) + "...",
        tags: ["技术"],
        keywords: []
      };
    }
  }

  /**
   * 完整的文章生成流程
   */
  async generateCompleteArticle(
    topic: string,
    options?: GenerateOptions
  ): Promise<ArticleContent> {
    console.log(`🤖 使用硅基流动 DeepSeek-V3 生成文章: ${topic}`);

    // 1. 生成大纲
    console.log("📝 生成大纲...");
    const outline = await this.generateOutline(topic, options);

    // 2. 生成文章内容
    console.log("✍️  生成文章内容...");
    const markdown = await this.generateArticle(outline, options);

    // 3. 生成元数据
    console.log("🏷️  生成元数据...");
    const metadata = await this.generateMetadata(markdown);

    return {
      title: metadata.title,
      markdown,
      metadata,
      outline
    };
  }

  /**
   * 解析大纲文本
   */
  private parseOutline(text: string): Outline {
    const lines = text.split("\n");
    const title = lines[0]?.replace(/^#\s*/, "") || "Untitled";

    const items: any[] = [];
    let currentLevel = 0;

    for (const line of lines.slice(1)) {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const title = match[2];

        items.push({
          level,
          title,
          content: ""
        });

        currentLevel = level;
      }
    }

    return { title, items };
  }

  /**
   * 格式化大纲为文本
   */
  private formatOutline(outline: Outline): string {
    let text = `# ${outline.title}\n\n`;

    for (const item of outline.items) {
      const prefix = "#".repeat(item.level);
      text += `${prefix} ${item.title}\n\n`;
    }

    return text;
  }

  /**
   * 生成URL友好的slug
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  /**
   * 获取token使用情况
   */
  getTokenUsage(response: any): TokenUsage {
    const usage = response.usage;
    return {
      promptTokens: usage?.prompt_tokens || 0,
      completionTokens: usage?.completion_tokens || 0,
      totalTokens: usage?.total_tokens || 0
    };
  }
}
