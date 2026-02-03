#!/usr/bin/env node

/**
 * 时尚杂志风格演示脚本
 * 展示高端时尚杂志模板效果
 */

const fs = require('fs');
const path = require('path');

// ANSI颜色
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  reset: '\x1b[0m'
};

function log(color, ...args) {
  console.log(colors[color], ...args, colors.reset);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 加载FashionMagazineTemplate
const FashionMagazineTemplate = require('../src/templates/presets/magazine');

async function main() {
  log('blue', '\n✨ 时尚杂志风格演示\n');
  
  const inputFile = path.join(__dirname, '../examples/input/sample-article.md');
  const outputDir = path.join(__dirname, '../examples/output');
  const outputFile = path.join(outputDir, 'fashion-magazine.html');
  
  // 检查输入文件
  if (!fs.existsSync(inputFile)) {
    log('yellow', '⚠ 示例文件不存在:', inputFile);
    return;
  }
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 1. 读取文档
  log('gray', '📄 读取文档:', inputFile);
  const rawContent = fs.readFileSync(inputFile, 'utf-8');
  await delay(300);
  
  // 2. 解析内容
  log('gray', '🔍 解析内容结构...');
  const titleMatch = rawContent.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  
  // 解析章节
  const sections = [];
  const lines = rawContent.split('\n');
  let currentSection = null;
  let sectionIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        id: `section-${sectionIndex}`,
        level: 2,
        title: line.replace('## ', ''),
        tokens: []
      };
      sectionIndex++;
    } else if (line.startsWith('### ')) {
      if (currentSection) {
        currentSection.tokens.push({ type: 'inline', content: line.replace('### ', ''), tag: 'h3' });
      }
    } else if (line.trim() && !line.startsWith('#') && currentSection) {
      // 处理段落
      if (line.startsWith('- ')) {
        // 列表项
        currentSection.tokens.push({ type: 'inline', content: line.replace('- ', ''), tag: 'li' });
      } else if (line.startsWith('**')) {
        // 粗体
        currentSection.tokens.push({ type: 'inline', content: line, tag: 'strong' });
      } else {
        // 普通段落
        currentSection.tokens.push({ type: 'inline', content: line });
      }
    }
  }
  
  if (currentSection) {
    sections.push(currentSection);
  }
  await delay(300);
  
  // 3. 分析内容
  log('gray', '🧠 分析文章类型:', '高端科技时尚专题');
  log('gray', '🎨 分析视觉风格:', '奢华黑金配色');
  log('gray', '🏷️  提取关键词:', 'AI, 未来, 变革, 科技');
  await delay(300);
  
  // 4. 初始化模板
  log('gray', '🎨 加载时尚杂志模板...');
  const template = new FashionMagazineTemplate();
  template.applyTheme('luxury');
  await delay(300);
  
  // 5. 生成HTML
  log('gray', '⚡ 生成高端时尚页面...');
  log('gray', '   ✓ 添加全屏首屏动效');
  log('gray', '   ✓ 添加划线评论系统');
  log('gray', '   ✓ 添加滚动进度条');
  log('gray', '   ✓ 添加章节渐入动画');
  
  const content = {
    title,
    summary: '探索人工智能如何重塑未来社会，从工具到伙伴的进化之路',
    author: '时尚科技编辑部',
    wordCount: rawContent.length,
    structure: { sections },
    images: [
      { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200', description: 'AI未来概念图' },
      { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200', description: '神经网络可视化' },
      { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', description: '机器人与人协作' }
    ]
  };
  
  const html = await template.generateHTML(content, { theme: 'luxury' });
  
  // 6. 保存文件
  fs.writeFileSync(outputFile, html, 'utf-8');
  
  log('green', '\n✓ 时尚杂志页面生成完成!');
  log('gray', '   输出:', outputFile);
  log('gray', '   章节:', sections.length, '个');
  log('gray', '   字数:', rawContent.length);
  
  log('cyan', '\n🎨 新特性:');
  log('gray', '   • 奢华黑金配色方案');
  log('gray', '   • 全屏首屏视觉冲击力');
  log('gray', '   • 旋转装饰动画');
  log('gray', '   • 划线评论系统（选中文本即可评论）');
  log('gray', '   • 章节渐入动效');
  log('gray', '   • 滚动进度条');
  log('gray', '   • 侧边目录导航');
  
  log('blue', '\n💡 查看方式:');
  log('gray', '   在浏览器中打开查看效果:');
  log('gray', '   file://' + outputFile);
  log('gray', '\n   或者双击打开 fashion-magazine.html\n');
}

main().catch(err => {
  console.error('错误:', err);
  console.error(err.stack);
  process.exit(1);
});
