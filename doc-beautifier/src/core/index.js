/**
 * 核心控制器 - 整个系统的入口和协调器
 */

const Pipeline = require('./pipeline');
const Config = require('./config');
const logger = require('../utils/logger');

class DocBeautifier {
  constructor() {
    this.pipeline = new Pipeline();
    this.config = new Config();
  }

  /**
   * 处理文档的主入口
   * @param {string} inputPath - 输入文件路径
   * @param {Object} options - 处理选项
   * @returns {Promise<Object>} 处理结果
   */
  async process(inputPath, options = {}) {
    try {
      logger.info('开始处理文档...', { input: inputPath });

      // 1. 加载配置
      await this.config.load(options.configPath);
      const mergedOptions = this.config.merge(options);

      // 2. 执行处理流程
      const result = await this.pipeline.execute(inputPath, mergedOptions);

      logger.info('文档处理完成', { 
        output: result.outputPath,
        duration: result.duration 
      });

      return result;

    } catch (error) {
      logger.error('处理失败', error);
      throw error;
    }
  }

  /**
   * 批量处理多个文档
   * @param {string[]} inputPaths - 输入文件路径数组
   * @param {Object} options - 处理选项
   */
  async batchProcess(inputPaths, options = {}) {
    const results = [];
    
    for (const inputPath of inputPaths) {
      try {
        const result = await this.process(inputPath, options);
        results.push({ success: true, ...result });
      } catch (error) {
        results.push({ 
          success: false, 
          input: inputPath, 
          error: error.message 
        });
      }
    }

    return results;
  }

  /**
   * 获取可用模板列表
   */
  getAvailableTemplates() {
    return this.pipeline.getTemplates();
  }

  /**
   * 获取可用主题列表
   */
  getAvailableThemes() {
    return this.pipeline.getThemes();
  }
}

// 导出单例实例
module.exports = new DocBeautifier();
