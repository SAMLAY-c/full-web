/**
 * Markdown主题配置映射
 *
 * 管理所有可用主题的配置，支持中文显示名和英文ID的映射
 */

import type { MarkdownTemplate } from "./types";

/**
 * 主题选项配置
 * 定义Sanity Studio中显示的主题选项
 */
export interface ThemeOption {
  /**
   * 主题ID（存储在数据库中的值）
   */
  value: string;

  /**
   * 主题显示名称（在Sanity Studio中显示的中文标题）
   */
  label: string;

  /**
   * 主题描述
   */
  description?: string;
}

/**
 * 所有可用的Markdown主题选项
 *
 * 这个数组应该与 Sanity schema 中的 options.list 保持同步
 *
 * @example
 * // 在 post.ts schema 中使用：
 * options: {
 *   list: THEME_OPTIONS.map(t => ({ title: t.label, value: t.value }))
 * }
 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "default",
    label: "默认主题",
    description: "专业的博客文章排版样式，支持代码高亮和深色模式",
  },
  {
    value: "minimal",
    label: "极简主题",
    description: "简洁清爽的博客样式，去除多余装饰",
  },
];

/**
 * 获取主题显示名称
 *
 * @param themeId - 主题ID
 * @returns 主题显示名称，如果未找到则返回主题ID本身
 */
export function getThemeLabel(themeId: string): string {
  const theme = THEME_OPTIONS.find((t) => t.value === themeId);
  return theme?.label || themeId;
}

/**
 * 验证主题ID是否有效
 *
 * @param themeId - 主题ID
 * @returns 是否为有效的主题ID
 */
export function isValidThemeId(themeId: string): boolean {
  return THEME_OPTIONS.some((t) => t.value === themeId);
}

/**
 * 获取默认主题ID
 *
 * @returns 默认主题ID
 */
export function getDefaultThemeId(): string {
  return "default";
}

/**
 * 主题ID类型
 * 从 THEME_OPTIONS 中自动推导出所有可能的主题ID
 */
export type ThemeId = typeof THEME_OPTIONS[number]["value"];

/**
 * TypeScript类型守卫：检查字符串是否为有效的ThemeId
 */
export function isThemeId(value: string): value is ThemeId {
  return isValidThemeId(value);
}
