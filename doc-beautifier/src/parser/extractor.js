/**
 * 内容提取器 - 提取标题、摘要、关键词等
 */

class Extractor {
  /**
   * 从解析后的内容中提取关键信息
   */
  extract(parsed) {
    const { structure, content } = parsed;
    
    // 提取标题
    const title = this.extractTitle(structure);
    
    // 提取摘要
    const summary = this.extractSummary(content);
    
    // 提取关键词
    const keywords = this.extractKeywords(content);
    
    // 统计信息
    const stats = this.calculateStats(content);

    return {
      title,
      summary,
      keywords,
      ...stats
    };
  }

  extractTitle(structure) {
    if (!structure || !structure.sections || structure.sections.length === 0) {
      return 'Untitled';
    }

    // 找第一个h1标题
    const h1 = structure.sections.find(s => s.level === 1);
    if (h1) {
      return h1.title;
    }

    // 如果没有h1，用第一个标题
    return structure.sections[0].title || 'Untitled';
  }

  extractSummary(content) {
    // 提取前200字作为摘要
    const text = this.stripHtml(content);
    return text.slice(0, 200).trim() + (text.length > 200 ? '...' : '');
  }

  extractKeywords(content) {
    // 简单提取：找出现频率高的词
    const text = this.stripHtml(content).toLowerCase();
    const words = text.match(/\b\w{4,}\b/g) || [];
    
    const frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // 排序并取前10
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  calculateStats(content) {
    const text = this.stripHtml(content);
    return {
      wordCount: text.split(/\s+/).length,
      charCount: text.length,
      paragraphCount: content.split('\n\n').length
    };
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

module.exports = new Extractor();
