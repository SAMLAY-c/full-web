import { marked } from "marked";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * 生成随机的 _key
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Markdown 转 PortableText 的配置选项
 */
export interface MarkdownToPortableTextOptions {
  /** 是否保留 HTML 标签（默认 false） */
  allowHtml?: boolean;
  /** 自定义处理器 */
  customHandlers?: {
    codeBlock?: (code: string, language: string) => PortableTextBlock[];
    listItem?: (text: string, depth: number) => PortableTextBlock;
  };
}

/**
 * 将 Markdown 标题转换为 PortableText 块
 */
function createHeadingBlock(
  text: string,
  level: number
): PortableTextBlock {
  return {
    _key: generateKey(),
    _type: "block",
    style: `h${level}`,
    children: [
      {
        _key: generateKey(),
        _type: "span",
        text,
      },
    ],
  };
}

/**
 * 将 Markdown 段落转换为 PortableText 块
 */
function createParagraphBlock(text: string): PortableTextBlock {
  return {
    _key: generateKey(),
    _type: "block",
    style: "normal",
    children: [
      {
        _key: generateKey(),
        _type: "span",
        text,
      },
    ],
  };
}

/**
 * 将 Markdown 代码块转换为 PortableText 块
 */
function createCodeBlock(
  code: string,
  language: string
): PortableTextBlock {
  return {
    _key: generateKey(),
    _type: "block",
    style: "normal",
    children: [
      {
        _key: generateKey(),
        _type: "span",
        text: code,
        marks: ["code"],
      },
    ],
    markDefs: [
      {
        _key: generateKey(),
        _type: "mark",
        [`${language}Code`]: true,
      },
    ],
  };
}

/**
 * 创建列表项块
 */
function createListItemBlock(text: string): PortableTextBlock {
  return {
    _key: generateKey(),
    _type: "block",
    style: "normal",
    listItem: "bullet",
    children: [
      {
        _key: generateKey(),
        _type: "span",
        text,
      },
    ],
  };
}

/**
 * 创建引用块
 */
function createBlockquoteBlock(text: string): PortableTextBlock {
  return {
    _key: generateKey(),
    _type: "block",
    style: "blockquote",
    children: [
      {
        _key: generateKey(),
        _type: "span",
        text,
      },
    ],
  };
}

/**
 * 解析 Markdown 并转换为 PortableText 格式
 * @param markdown Markdown 字符串
 * @param options 转换选项
 * @returns PortableText 块数组
 */
export function markdownToPortableText(
  markdown: string,
  options: MarkdownToPortableTextOptions = {}
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split("\n");
  let currentParagraph = "";
  let inCodeBlock = false;
  let codeBlockContent = "";
  let codeLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // 处理代码块
    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = trimmedLine.slice(3).trim();
        codeBlockContent = "";
        continue;
      } else {
        inCodeBlock = false;
        if (options.customHandlers?.codeBlock) {
          blocks.push(
            ...options.customHandlers.codeBlock(codeBlockContent, codeLanguage)
          );
        } else {
          blocks.push(createCodeBlock(codeBlockContent, codeLanguage));
        }
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n";
      continue;
    }

    // 处理标题
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (currentParagraph.trim()) {
        blocks.push(createParagraphBlock(currentParagraph.trim()));
        currentParagraph = "";
      }
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      blocks.push(createHeadingBlock(text, level));
      continue;
    }

    // 处理引用块
    if (trimmedLine.startsWith(">")) {
      if (currentParagraph.trim()) {
        blocks.push(createParagraphBlock(currentParagraph.trim()));
        currentParagraph = "";
      }
      const quoteText = trimmedLine.slice(1).trim();
      blocks.push(createBlockquoteBlock(quoteText));
      continue;
    }

    // 处理列表项
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      if (currentParagraph.trim()) {
        blocks.push(createParagraphBlock(currentParagraph.trim()));
        currentParagraph = "";
      }
      const itemText = trimmedLine.slice(2).trim();
      blocks.push(createListItemBlock(itemText));
      continue;
    }

    // 处理有序列表
    const orderedListMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      if (currentParagraph.trim()) {
        blocks.push(createParagraphBlock(currentParagraph.trim()));
        currentParagraph = "";
      }
      blocks.push(createListItemBlock(orderedListMatch[1]));
      continue;
    }

    // 处理空行（段落分隔）
    if (trimmedLine === "") {
      if (currentParagraph.trim()) {
        blocks.push(createParagraphBlock(currentParagraph.trim()));
        currentParagraph = "";
      }
      continue;
    }

    // 累积段落内容
    currentParagraph += (currentParagraph ? " " : "") + trimmedLine;
  }

  // 处理最后的段落
  if (currentParagraph.trim()) {
    blocks.push(createParagraphBlock(currentParagraph.trim()));
  }

  return blocks;
}

/**
 * 从 Markdown 文件读取并转换为 PortableText
 */
export async function parseMarkdownFile(
  filePath: string
): Promise<PortableTextBlock[]> {
  try {
    const fs = await import("fs/promises");
    const content = await fs.readFile(filePath, "utf-8");
    return markdownToPortableText(content);
  } catch (error) {
    throw new Error(`Failed to read markdown file: ${error}`);
  }
}

/**
 * 从文件名提取标题和 slug
 */
export function extractTitleAndSlug(
  filename: string
): { title: string; slug: string } {
  // 移除 .md 扩展名
  const name = filename.replace(/\.md$/, "");

  // 提取标题（如果文件名是 YYYY-MM-DD-title 格式）
  const dateMatch = name.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  const title = dateMatch
    ? name
    : name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  const slug = dateMatch ? dateMatch[1] : name.toLowerCase().replace(/\s+/g, "-");

  return { title, slug };
}
