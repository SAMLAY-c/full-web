/**
 * 渲染引擎入口
 */

const htmlRenderer = require('./html');
const cssRenderer = require('./css');
const fs = require('fs-extra');

class Renderer {
  async render(content, template, options) {
    // 生成CSS
    const styles = await cssRenderer.generate(template);
    
    // 生成HTML
    const html = await htmlRenderer.render(content, template, styles, options);
    
    return html;
  }

  async save(html, outputPath) {
    await fs.writeFile(outputPath, html, 'utf-8');
    return outputPath;
  }
}

module.exports = Renderer;
