/**
 * 内容解析器入口
 * 支持多种文档格式
 */

const fs = require('fs-extra');
const path = require('path');

const markdownParser = require('./markdown');
const plainTextParser = require('./plain-text');
const docxParser = require('./docx');
const extractor = require('./extractor');

class Parser {
  /**
   * 解析文档
   * @param {string} filePath - 文件路径
   * @returns {Promise<Object>} 解析后的内容结构
   */
  async parse(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const rawContent = await fs.readFile(filePath, 'utf-8');
    
    let parsed;
    
    switch (ext) {
      case '.md':
      case '.markdown':
        parsed = await markdownParser.parse(rawContent);
        break;
      case '.txt':
        parsed = await plainTextParser.parse(rawContent);
        break;
      case '.docx':
        parsed = await docxParser.parse(filePath);
        break;
      case '.html':
        // HTML重新美化
        parsed = { type: 'html', content: rawContent };
        break;
      default:
        throw new Error(`不支持的文件格式: ${ext}`);
    }

    // 提取关键信息
    const extracted = extractor.extract(parsed);
    
    return {
      sourcePath: filePath,
      fileType: ext,
      ...parsed,
      ...extracted,
      rawLength: rawContent.length
    };
  }
}

module.exports = Parser;
