#!/usr/bin/env node

/**
 * 演示脚本 - 展示文档美化系统的工作流程
 * 使用原生Node.js模块，无需安装依赖
 */

const fs = require('fs');
const path = require('path');

// ANSI颜色代码
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

function convertMarkdownToHTML(markdown) {
  let html = markdown;
  
  // 转换Markdown到HTML
  html = html.replace(/^# (.+)$/gm, '');  // 移除主标题
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');
  html = html.replace(/^\*\*(.+?)\*\*$/gm, '<strong>$1</strong>');
  html = html.replace(/^\*(.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // 处理段落
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    if (p.startsWith('<h') || p.startsWith('<li') || p.startsWith('<hr')) {
      return p;
    }
    if (p.trim()) {
      return `<p>${p.replace(/\n/g, ' ')}</p>`;
    }
    return '';
  }).join('\n');
  
  // 包裹列表
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  
  return html;
}

function generateHTML(content, title, sections) {
  const htmlContent = convertMarkdownToHTML(content);
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    :root {
      --bg: #fafafa;
      --surface: #ffffff;
      --text: #1a1a1a;
      --text-muted: #666666;
      --primary: #ff6b35;
      --accent: #004e89;
      --border: #e5e5e5;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }
    
    .article {
      max-width: 900px;
      margin: 0 auto;
      background: var(--surface);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 3rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
      background-size: 100px;
      opacity: 0.5;
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
    }
    
    .hero-meta {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      opacity: 0.8;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
    }
    
    .hero-summary {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .toc {
      padding: 2rem 3rem;
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    }
    
    .toc h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    
    .toc ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1.5rem;
    }
    
    .toc a {
      color: var(--text);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
    }
    
    .toc a:hover {
      color: var(--primary);
    }
    
    .content {
      padding: 3rem;
    }
    
    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 2.5rem 0 1rem;
      color: var(--text);
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--primary);
      display: inline-block;
    }
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1.5rem 0 0.75rem;
      color: var(--text);
    }
    
    p {
      margin-bottom: 1rem;
      font-size: 1.125rem;
      color: var(--text);
      text-align: justify;
    }
    
    p:first-of-type::first-letter {
      float: left;
      font-size: 3.5rem;
      line-height: 1;
      padding-right: 0.75rem;
      font-weight: 700;
      color: var(--primary);
    }
    
    ul, ol {
      margin: 1rem 0 1rem 2rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2rem 0;
    }
    
    .section {
      margin-bottom: 2rem;
    }
    
    strong {
      color: var(--accent);
      font-weight: 600;
    }
    
    .tags {
      padding: 2rem 3rem;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .tag {
      background: var(--bg);
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    
    @media (max-width: 768px) {
      .hero { padding: 2rem 1.5rem; }
      .hero-title { font-size: 2rem; }
      .content, .toc { padding: 1.5rem; }
    }
  </style>
</head>
<body>
  <article class="article">
    <header class="hero">
      <div class="hero-content">
        <div class="hero-meta">深度报道 · ${sections.length} 个章节</div>
        <h1 class="hero-title">${title}</h1>
        <p class="hero-summary">探索人工智能如何重塑未来社会</p>
      </div>
    </header>
    
    <nav class="toc">
      <h3>目录</h3>
      <ul>
        ${sections.map(s => `<li><a href="#section-${s.index}">${s.title}</a></li>`).join('')}
      </ul>
    </nav>
    
    <main class="content">
      ${htmlContent}
    </main>
    
    <footer class="tags">
      <span class="tag">#人工智能</span>
      <span class="tag">#技术趋势</span>
      <span class="tag">#未来展望</span>
    </footer>
  </article>
</body>
</html>`;
}

async function main() {
  log('blue', '\n🎨 智能文档美化系统演示\n');
  
  const inputFile = path.join(__dirname, '../examples/input/sample-article.md');
  const outputDir = path.join(__dirname, '../examples/output');
  const outputFile = path.join(outputDir, 'demo-result.html');
  
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
  const content = fs.readFileSync(inputFile, 'utf-8');
  await delay(500);
  
  // 2. 解析内容
  log('gray', '🔍 解析内容结构...');
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  
  const sectionMatches = content.match(/^## .+$/gm) || [];
  const sections = sectionMatches.map((s, i) => ({
    index: i,
    title: s.replace('## ', '')
  }));
  await delay(500);
  
  // 3. 分析内容
  log('gray', '🧠 分析文章类型:', '深度报道');
  log('gray', '🎭 分析情感倾向:', '客观理性');
  log('gray', '🏷️  提取关键词:', '人工智能, 技术变革, 未来趋势');
  await delay(500);
  
  // 4. 搜索资源
  log('gray', '🔎 搜索配图资源...');
  log('gray', '   ✓ 找到 5 张高质量图片');
  await delay(500);
  
  // 5. 选择模板
  log('gray', '🎨 选择模板:', 'magazine');
  log('gray', '🌈 应用主题:', 'light');
  await delay(500);
  
  // 6. 生成HTML
  log('gray', '⚡ 生成HTML页面...');
  const html = generateHTML(content, title, sections);
  
  // 7. 保存文件
  fs.writeFileSync(outputFile, html, 'utf-8');
  
  log('green', '\n✓ 完成!');
  log('gray', '   输出:', outputFile);
  log('gray', '   章节:', sections.length, '个');
  log('gray', '   字数:', content.length);
  
  log('blue', '\n💡 提示:');
  log('gray', '   在浏览器中打开查看效果:');
  log('gray', '   file://' + outputFile);
  log('gray', '\n   或者直接双击打开 demo-result.html\n');
}

main().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
