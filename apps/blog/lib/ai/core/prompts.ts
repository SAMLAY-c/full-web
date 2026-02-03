import type { GenerateOptions, PromptTemplate } from "../types";

/**
 * 提示词模板系统
 */

// 基础提示词
export const PROMPTS: Record<PromptTemplate, string> = {
  /**
   * 大纲生成提示词
   */
  outline: `你是一个专业的内容策划师和编辑。请根据给定的主题生成一份详细、结构清晰的文章大纲。

要求：
1. 大纲应该包含3-5个主要章节
2. 每个章节下有2-4个子要点
3. 结构应该逻辑清晰、层次分明
4. 适合技术博客的风格
5. 使用Markdown格式

请按以下格式输出：
# [文章标题]

## [章节1标题]
- [要点1]
- [要点2]

## [章节2标题]
- [要点1]
- [要点2]
...`,

  /**
   * 文章生成提示词
   */
  article: `你是一个专业的技术作家和博客作者。请根据提供的大纲生成一篇高质量的技术文章。

要求：
1. 内容专业且易于理解
2. 包含实际代码示例（如果适用）
3. 使用清晰的小标题和段落
4. 添加适当的emoji增强可读性
5. 使用Markdown格式
6. 文章应该既有深度又实用
7. 每个技术点都应该有实际应用场景
8. 代码示例应该完整且可直接运行

写作风格：
- 开头引入要吸引人
- 使用"你"直接与读者对话
- 重要概念使用加粗强调
- 代码块使用语法高亮标记
- 每个章节结尾要有小结
- 最后有总结和行动建议`,

  /**
   * 元数据生成提示词
   */
  metadata: `请根据文章内容生成SEO友好的元数据。

要求：
1. 标题：简洁有力，包含关键词，50-60字符
2. 摘要：概括文章核心价值，150-160字符
3. 标签：3-5个相关标签，用逗号分隔
4. 关键词：5-8个SEO关键词

请按以下JSON格式输出：
{
  "title": "文章标题",
  "excerpt": "文章摘要",
  "tags": ["tag1", "tag2", "tag3"],
  "keywords": ["keyword1", "keyword2"]
}`,

  /**
   * 标题生成提示词
   */
  title: `请为主题生成一个吸引人的文章标题。

要求：
1. 简洁有力（30-50字符）
2. 包含主要关键词
3. 使用数字或疑问词增强吸引力
4. 符合技术博客风格
5. 让读者一眼看出价值

输出格式：直接输出标题字符串`,

  /**
   * 摘要生成提示词
   */
  excerpt: `请为文章生成一个吸引人的摘要。

要求：
1. 150-160字符
2. 概括文章核心价值
3. 激发阅读兴趣
4. 包含主要关键词
5. 使用你/我直接对话

输出格式：直接输出摘要字符串`,

  /**
   * 标签生成提示词
   */
  tags: `请为文章生成3-5个相关标签。

要求：
1. 与文章内容高度相关
2. 是用户会搜索的词
3. 包括技术栈和概念
4. 使用英文技术术语
5. 用逗号分隔

输出格式：["tag1", "tag2", "tag3"]`
};

/**
 * 构建提示词
 */
export function buildPrompt(
  template: PromptTemplate,
  context: {
    topic?: string;
    outline?: string;
    content?: string;
    options?: GenerateOptions;
  }
): string {
  const { topic, outline, content, options } = context;
  const prompt = PROMPTS[template];

  // 添加上下文信息
  let contextInfo = "";

  if (topic) {
    contextInfo += `\n\n主题：${topic}`;
  }

  if (outline) {
    contextInfo += `\n\n大纲：\n${outline}`;
  }

  if (content) {
    contextInfo += `\n\n文章内容：\n${content}`;
  }

  if (options) {
    const optionText = [];
    if (options.tone) optionText.push(`语气：${options.tone}`);
    if (options.length) optionText.push(`长度：${options.length}`);
    if (options.targetAudience) optionText.push(`目标读者：${options.targetAudience}`);
    if (options.includeCodeExamples) optionText.push(`包含代码示例：是`);

    if (optionText.length > 0) {
      contextInfo += `\n\n要求：\n${optionText.join("\n")}`;
    }
  }

  return prompt + contextInfo;
}

/**
 * 获取文章长度对应的token数
 */
export function getLengthTokens(length: GenerateOptions["length"] = "medium"): number {
  const tokens = {
    short: 1500,      // ~1000字
    medium: 2500,     // ~2000字
    long: 4000        // ~3000字
  };
  return tokens[length];
}
