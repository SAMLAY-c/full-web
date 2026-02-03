/**
 * 模板系统入口
 */

const registry = require('./registry');
const base = require('./base/layout');

class Templates {
  constructor() {
    this.registry = registry;
    this.base = base;
  }

  /**
   * 选择并加载模板
   */
  async select(analysis, templateName, themeName) {
    // 获取模板配置
    const template = this.registry.get(templateName || analysis.recommendedTemplate);
    
    // 应用主题
    template.applyTheme(themeName || analysis.recommendedTheme);
    
    return template;
  }

  getAvailable() {
    return this.registry.list();
  }

  getThemes() {
    return ['light', 'dark', 'warm', 'cool', 'vibrant'];
  }
}

module.exports = Templates;
