/**
 * 流程编排器 - 协调各个模块的工作流程
 */

const Parser = require('../parser');
const Analyzer = require('../analyzer');
const Search = require('../search');
const Templates = require('../templates');
const Renderer = require('../renderer');
const logger = require('../utils/logger');

class Pipeline {
  constructor() {
    this.parser = new Parser();
    this.analyzer = new Analyzer();
    this.search = new Search();
    this.templates = new Templates();
    this.renderer = new Renderer();
  }

  /**
   * 执行完整的处理流程
   */
  async execute(inputPath, options) {
    const startTime = Date.now();
    
    logger.info('=== 第1步: 解析文档 ===');
    const parsedContent = await this.parser.parse(inputPath);
    
    logger.info('=== 第2步: 分析内容 ===');
    const analysis = await this.analyzer.analyze(parsedContent);
    
    logger.info('=== 第3步: 智能搜索 ===');
    const enrichedContent = await this.search.enrich(
      parsedContent, 
      analysis, 
      options
    );
    
    logger.info('=== 第4步: 选择模板 ===');
    const template = await this.templates.select(
      analysis, 
      options.template,
      options.theme
    );
    
    logger.info('=== 第5步: 生成页面 ===');
    const html = await this.renderer.render(
      enrichedContent,
      template,
      options
    );
    
    logger.info('=== 第6步: 输出文件 ===');
    const outputPath = await this.renderer.save(html, options.output);
    
    const duration = Date.now() - startTime;

    return {
      outputPath,
      duration,
      stats: {
        sections: enrichedContent.sections.length,
        images: enrichedContent.images.length,
        words: enrichedContent.wordCount,
        template: template.name,
        theme: template.theme
      }
    };
  }

  getTemplates() {
    return this.templates.getAvailable();
  }

  getThemes() {
    return this.templates.getThemes();
  }
}

module.exports = Pipeline;
