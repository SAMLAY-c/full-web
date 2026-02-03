/**
 * Markdown解析器
 */

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

class MarkdownParser {
  async parse(content) {
    const tokens = md.parse(content, {});
    
    const structure = this.buildStructure(tokens);
    
    return {
      type: 'markdown',
      tokens,
      html: md.render(content),
      structure,
      content: content
    };
  }

  /**
   * 从token构建文档结构
   */
  buildStructure(tokens) {
    const sections = [];
    let currentSection = null;
    let sectionIndex = 0;

    for (const token of tokens) {
      if (token.type === 'heading_open') {
        const level = parseInt(token.tag.charAt(1));
        
        // 保存之前的section
        if (currentSection) {
          sections.push(currentSection);
        }

        // 创建新section
        currentSection = {
          id: `section-${sectionIndex++}`,
          level,
          title: '',
          content: [],
          tokens: []
        };
      } else if (token.type === 'inline' && currentSection && !currentSection.title) {
        currentSection.title = token.content;
      } else if (currentSection) {
        currentSection.tokens.push(token);
      }
    }

    // 添加最后一个section
    if (currentSection) {
      sections.push(currentSection);
    }

    return { sections };
  }
}

module.exports = new MarkdownParser();
