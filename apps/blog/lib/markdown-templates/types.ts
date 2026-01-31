import type { Config } from "tailwindcss";
import type { PortableTextComponents } from "@portabletext/react";

/**
 * Markdown模板配置接口
 */
export interface MarkdownTemplate {
  /**
   * 模板唯一标识
   */
  id: string;

  /**
   * 模板名称
   */
  name: string;

  /**
   * 模板描述
   */
  description: string;

  /**
   * 模板版本
   */
  version: string;

  /**
   * 模板作者
   */
  author?: string;

  /**
   * Tailwind Typography 主题配置
   */
  typographyTheme?: any;

  /**
   * PortableText 组件配置
   */
  components?: PortableTextComponents;

  /**
   * 全局CSS样式（仅markdown相关的）
   */
  globalStyles?: string;

  /**
   * 代码块样式配置
   */
  codeBlockConfig?: {
    defaultTheme?: "light" | "dark";
    showLineNumbers?: boolean;
    customStyles?: Record<string, string>;
  };

  /**
   * 额外的Tailwind配置扩展
   */
  tailwindExtend?: Partial<Config["theme"]>;

  /**
   * 自定义颜色主题
   */
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
    code?: string;
    link?: string;
  };
}

/**
 * 模板类别
 */
export type TemplateCategory =
  | "default"
  | "minimal"
  | "github"
  | "notion"
  | "docs"
  | "custom";

/**
 * 扩展的模板接口，包含类别信息
 */
export interface MarkdownTemplateWithCategory extends MarkdownTemplate {
  category: TemplateCategory;
}

/**
 * 模板注册表类型
 */
export type TemplateRegistry = Record<string, MarkdownTemplate>;
