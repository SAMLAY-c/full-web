import type { MarkdownTemplate } from "../types";
import { components } from "./components";
import { typographyTheme } from "./typography";
import { globalStyles } from "./styles";

/**
 * 默认Markdown模板
 *
 * 特点：
 * - 专业排版样式
 * - Prism.js代码高亮
 * - 深色模式支持
 * - 响应式设计
 * - 品牌色主题
 */
export const defaultTemplate: MarkdownTemplate = {
  id: "default",
  name: "默认主题",
  description: "专业的博客文章排版样式，支持代码高亮和深色模式",
  version: "1.0.0",
  author: "Samlay",

  // Tailwind Typography 配置
  typographyTheme,

  // PortableText 组件配置
  components,

  // 全局样式
  globalStyles,

  // 代码块配置
  codeBlockConfig: {
    defaultTheme: "dark",
    showLineNumbers: true,
  },

  // 自定义颜色（使用品牌色）
  colors: {
    primary: "#0a6de6", // brand-600
    secondary: "#49a4ff", // brand-400
    accent: "#7ec0ff", // brand-300
    background: "#ffffff",
    text: "#374151", // gray-700
    code: "#0a6de6", // brand-600
    link: "#0a6de6", // brand-600
  },
};
