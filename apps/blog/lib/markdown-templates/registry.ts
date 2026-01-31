import type { TemplateRegistry } from "./types";
import { defaultTemplate } from "./default";
import { minimalTemplate } from "./minimal";

/**
 * Markdown模板注册表
 *
 * 所有可用的markdown样式模板都在这里注册
 */
export const templateRegistry: TemplateRegistry = {
  default: defaultTemplate,
  minimal: minimalTemplate,
};

/**
 * 获取指定的模板
 *
 * @param templateId - 模板ID
 * @returns 模板配置，如果不存在则返回默认模板
 */
export function getTemplate(templateId: string) {
  return templateRegistry[templateId] || defaultTemplate;
}

/**
 * 获取所有可用的模板列表
 *
 * @returns 模板数组
 */
export function getAllTemplates() {
  return Object.values(templateRegistry);
}

/**
 * 检查模板是否存在
 *
 * @param templateId - 模板ID
 * @returns 是否存在
 */
export function hasTemplate(templateId: string): boolean {
  return templateId in templateRegistry;
}
