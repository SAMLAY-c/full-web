/**
 * AI文章生成系统 - 类型定义
 */

// 文章大纲项
export interface OutlineItem {
  level: number; // 1-6, 对应h1-h6
  title: string;
  content?: string;
}

// 完整大纲
export interface Outline {
  title: string;
  items: OutlineItem[];
}

// 文章元数据
export interface ArticleMetadata {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  keywords: string[];
}

// 生成的文章内容
export interface ArticleContent {
  title: string;
  markdown: string;
  metadata: ArticleMetadata;
  outline: Outline;
}

// 生成选项
export interface GenerateOptions {
  tone?: "professional" | "casual" | "technical" | "friendly";
  length?: "short" | "medium" | "long";
  language?: string;
  keywords?: string[];
  targetAudience?: string;
  includeCodeExamples?: boolean;
}

// Provider类型
export type AIProvider = "openai" | "anthropic";

// AI模型
export type AIModel = "gpt-4o" | "gpt-4o-mini" | "claude-3-5-sonnet-20241022";

// 生成请求
export interface GenerationRequest {
  topic: string;
  options?: GenerateOptions;
  provider?: AIProvider;
  model?: AIModel;
}

// 生成结果
export interface GenerationResult {
  success: boolean;
  article?: ArticleContent;
  error?: string;
  tokensUsed?: number;
  cost?: number;
}

// Token使用情况
export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

// 提示词模板类型
export type PromptTemplate =
  | "outline"
  | "article"
  | "metadata"
  | "title"
  | "excerpt"
  | "tags";
