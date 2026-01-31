/**
 * Markdown模板配置
 *
 * 在这里切换不同的markdown样式模板
 */

import { getTemplate } from "./registry";
import type { MarkdownTemplate } from "./types";

/**
 * 当前使用的模板ID
 *
 * 修改此值以切换不同的markdown样式模板
 * 可选值:
 * - "default" - 默认主题（专业博客样式）
 */
export const CURRENT_TEMPLATE_ID = "default";

/**
 * 获取当前激活的模板
 *
 * @returns 当前模板配置
 */
export function getCurrentTemplate(): MarkdownTemplate {
  return getTemplate(CURRENT_TEMPLATE_ID);
}

/**
 * 模板配置文件
 *
 * 你可以通过修改这个文件来：
 * 1. 切换不同的markdown样式模板
 * 2. 自定义当前模板的配置
 * 3. 添加新的模板
 *
 * @example
 * ```typescript
 * // 切换到不同的模板
 * export const CURRENT_TEMPLATE_ID = "minimal";
 *
 * // 或者动态切换
 * import { getCurrentTemplate } from "@/lib/markdown-templates/config";
 * const template = getCurrentTemplate();
 * ```
 */
