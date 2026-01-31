import type { MarkdownTemplate } from "../types";
import { components } from "./components";
import { typographyTheme } from "./typography";
import { globalStyles } from "./styles";

/**
 * 极简Markdown模板
 *
 * 特点：
 * - 简洁清爽的样式
 * - 更少的装饰元素
 * - 更快的渲染速度
 * - 适合个人博客和随笔
 */
export const minimalTemplate: MarkdownTemplate = {
  id: "minimal",
  name: "极简主题",
  description: "简洁清爽的博客样式，去除多余装饰",
  version: "1.0.0",

  // Tailwind Typography 配置
  typographyTheme,

  // PortableText 组件配置
  components,

  // 全局样式
  globalStyles: globalStyles + `
/* Minimal template specific styles */
.prose {
  /* 更紧凑的行高 */
  line-height: 1.6;
}

.prose h1,
.prose h2,
.prose h3 {
  /* 移除装饰，保持简洁 */
  border: none;
}
  `,

  // 代码块配置
  codeBlockConfig: {
    defaultTheme: "light",
    showLineNumbers: false,
  },

  // 自定义颜色（使用中性色调）
  colors: {
    primary: "#374151", // gray-700
    secondary: "#6b7280", // gray-500
    accent: "#9ca3af", // gray-400
    background: "#ffffff",
    text: "#374151", // gray-700
    code: "#374151", // gray-700
    link: "#374151", // gray-700
  },
};
