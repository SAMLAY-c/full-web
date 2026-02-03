/**
 * AI文章生成服务 - 统一入口
 */

import type {
  GenerationRequest,
  GenerationResult,
  ArticleContent
} from "./types";
import { OpenAIProvider } from "./providers/openai";
import { SiliconFlowProvider } from "./providers/siliconflow";

/**
 * AI服务类
 */
export class AIService {
  private openai: OpenAIProvider;
  private siliconflow: SiliconFlowProvider;

  constructor() {
    this.openai = new OpenAIProvider();
    this.siliconflow = new SiliconFlowProvider();
  }

  /**
   * 生成文章（主入口）
   */
  async generateArticle(request: GenerationRequest): Promise<GenerationResult> {
    try {
      const { topic, options, provider = "siliconflow" } = request;

      // 选择provider
      let article: ArticleContent;

      if (provider === "siliconflow") {
        article = await this.siliconflow.generateCompleteArticle(topic, options);
      } else if (provider === "openai") {
        article = await this.openai.generateCompleteArticle(topic, options);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      return {
        success: true,
        article
      };
    } catch (error) {
      console.error("AI generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }

  /**
   * 仅生成大纲
   */
  async generateOutline(topic: string, options?: any) {
    return this.siliconflow.generateOutline(topic, options);
  }

  /**
   * 根据大纲生成文章
   */
  async generateFromOutline(outline: any, options?: any) {
    return this.siliconflow.generateArticle(outline, options);
  }
}

// 导出单例
export const aiService = new AIService();
