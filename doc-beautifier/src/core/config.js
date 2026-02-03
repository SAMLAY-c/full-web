/**
 * 配置管理器 - 管理所有配置选项
 */

const fs = require('fs-extra');
const path = require('path');
const { merge } = require('../utils/file');

class Config {
  constructor() {
    this.defaultConfig = null;
    this.userConfig = null;
    this.apiKeys = null;
  }

  /**
   * 加载配置
   */
  async load(configPath) {
    // 加载默认配置
    const defaultPath = path.join(__dirname, '../../config/default.json');
    if (fs.existsSync(defaultPath)) {
      this.defaultConfig = await fs.readJson(defaultPath);
    }

    // 加载用户配置（如果提供）
    if (configPath && fs.existsSync(configPath)) {
      this.userConfig = await fs.readJson(configPath);
    }

    // 加载API密钥
    const apiKeysPath = path.join(__dirname, '../../config/api-keys.json');
    if (fs.existsSync(apiKeysPath)) {
      this.apiKeys = await fs.readJson(apiKeysPath);
    }
  }

  /**
   * 合并所有配置
   */
  merge(cliOptions = {}) {
    const merged = {
      ...this.defaultConfig,
      ...this.userConfig,
      ...cliOptions,
      api: this.apiKeys
    };

    return merged;
  }

  /**
   * 获取特定配置项
   */
  get(key, defaultValue = null) {
    const keys = key.split('.');
    let value = this.merge();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return value;
  }
}

module.exports = Config;
