/**
 * 模板注册表 - 管理所有可用模板
 */

const MagazineTemplate = require('./presets/magazine');
const templatesConfig = require('../../../config/templates.json');

class TemplateRegistry {
  constructor() {
    this.templates = new Map();
    this.registerDefaults();
  }

  registerDefaults() {
    // 注册杂志模板
    this.register('magazine', MagazineTemplate);
    
    // 其他模板将在后续实现
    // this.register('minimal', MinimalTemplate);
    // this.register('tech', TechTemplate);
    // this.register('literary', LiteraryTemplate);
    // this.register('corporate', CorporateTemplate);
  }

  register(name, TemplateClass) {
    this.templates.set(name, {
      name,
      config: templatesConfig.templates[name],
      create: () => new TemplateClass()
    });
  }

  get(name) {
    const template = this.templates.get(name);
    if (!template) {
      throw new Error(`模板不存在: ${name}`);
    }
    return template.create();
  }

  list() {
    return Array.from(this.templates.values()).map(t => ({
      name: t.name,
      ...t.config
    }));
  }
}

module.exports = new TemplateRegistry();
