/**
 * Markdown模板系统
 *
 * 提供可切换的markdown渲染样式模板
 *
 * @module markdown-templates
 */

// 导出类型
export type {
  MarkdownTemplate,
  MarkdownTemplateWithCategory,
  TemplateRegistry,
  TemplateCategory,
} from "./types";

// 导出模板注册功能
export {
  getTemplate,
  getAllTemplates,
  hasTemplate,
  templateRegistry,
} from "./registry";

// 导出默认模板
export { defaultTemplate } from "./default";
