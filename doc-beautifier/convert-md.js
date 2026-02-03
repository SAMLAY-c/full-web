#!/usr/bin/env node

/**
 * 一键转换Markdown到时尚杂志HTML
 * 使用: node convert-md.js <your-file.md>
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(color, msg) {
  console.log((colors[color] || '') + msg + colors.reset);
}

// 简单的Markdown解析器
function parseMarkdown(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let sectionIndex = 0;
  let title = '';
  let summary = '';
  
  // 提取标题（第一个h1）
  const titleMatch = content.match(/^# (.+)$/m);
  if (titleMatch) {
    title = titleMatch[1];
  }
  
  // 提取摘要（第一个段落）
  const summaryMatch = content.match(/^# .+\n\n(.+?)(?:\n\n|$)/s);
  if (summaryMatch) {
    summary = summaryMatch[1].substring(0, 150) + '...';
  }
  
  // 解析章节
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('## ')) {
      // 保存上一个章节
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // 创建新章节
      currentSection = {
        id: `section-${sectionIndex}`,
        level: 2,
        title: line.replace('## ', ''),
        tokens: []
      };
      sectionIndex++;
    } else if (line.startsWith('### ')) {
      // 小节标题
      if (currentSection) {
        currentSection.tokens.push({
          type: 'heading',
          content: line.replace('### ', ''),
          level: 3
        });
      }
    } else if (line.startsWith('- ')) {
      // 列表项
      if (currentSection) {
        currentSection.tokens.push({
          type: 'list',
          content: line.replace('- ', '')
        });
      }
    } else if (line && !line.startsWith('#') && currentSection) {
      // 普通段落
      currentSection.tokens.push({
        type: 'paragraph',
        content: line
      });
    }
  }
  
  // 添加最后一个章节
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return {
    title,
    summary,
    wordCount: content.length,
    structure: { sections },
    images: [] // 可以后续添加图片
  };
}

// 渲染内容为HTML
function renderContent(content) {
  return content.structure.sections.map((section, index) => {
    const sectionNum = String(index + 1).padStart(2, '0');
    
    const bodyHTML = section.tokens.map(token => {
      switch (token.type) {
        case 'heading':
          return `<h3>${token.content}</h3>`;
        case 'list':
          return `<li>${token.content}</li>`;
        case 'paragraph':
          return `<p>${token.content}</p>`;
        default:
          return `<p>${token.content}</p>`;
      }
    }).join('\n');
    
    // 包装列表
    const wrappedBody = bodyHTML.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                               .replace(/<\/ul>\s*<ul>/g, '');
    
    return `
      <section id="${section.id}" class="section" data-section="${index}">
        <div class="section-header">
          <span class="section-number">${sectionNum}</span>
          <h2 class="section-title">${section.title}</h2>
          <div class="section-line"></div>
        </div>
        <div class="section-body selectable-text" data-section-id="${section.id}">
          ${wrappedBody}
        </div>
      </section>
    `;
  }).join('\n');
}

// 生成完整HTML
function generateFullHTML(content) {
  // 读取模板CSS
  const templatePath = path.join(__dirname, 'src/templates/presets/magazine/index.js');
  
  // 由于模板是JS文件，我们提取CSS和JS
  // 实际项目中可以直接require模板
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${generateCSS()}
  </style>
</head>
<body>
  <!-- 进度条 -->
  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>

  <!-- 左侧固定目录 -->
  <aside class="toc-sidebar" id="tocSidebar">
    <div class="toc-sidebar-header">
      <span class="toc-label">目录</span>
      <div class="toc-progress">
        <div class="toc-progress-bar" id="tocProgressBar"></div>
      </div>
    </div>
    <ul class="toc-sidebar-list">
      ${content.structure.sections.map((section, i) => `
        <li class="toc-sidebar-item" data-section="${section.id}">
          <a href="#${section.id}" class="toc-sidebar-link">
            <span class="toc-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="toc-text">${section.title}</span>
          </a>
        </li>
      `).join('')}
    </ul>
    <div class="toc-sidebar-footer">
      <span class="toc-count">共 ${content.structure.sections.length} 章</span>
    </div>
  </aside>

  <!-- 顶部品牌栏 -->
  <nav class="top-brand-bar">
    <div class="brand-logo">
      <span class="logo-icon">◆</span>
      <span class="logo-text">VOGUE STYLE</span>
    </div>
    <div class="brand-actions">
      <button class="action-btn" onclick="scrollToTop()" title="回到顶部">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/>
        </svg>
      </button>
    </div>
  </nav>

  <!-- 首屏 -->
  <header class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
    </div>
    <div class="hero-content">
      <div class="hero-label">
        <span class="label-line"></span>
        <span class="label-text">独家专题</span>
      </div>
      <h1 class="hero-title">
        <span class="title-main">${content.title}</span>
      </h1>
      <div class="hero-meta">
        <span class="meta-read">${Math.ceil(content.wordCount / 300)} 分钟阅读</span>
      </div>
      ${content.summary ? `<p class="hero-excerpt">${content.summary}</p>` : ''}
    </div>
  </header>

  <!-- 主内容 -->
  <main class="content">
    <div class="content-wrapper">
      ${renderContent(content)}
    </div>
  </main>

  <!-- 评论按钮 -->
  <button class="floating-comment-btn" id="commentBtn" onclick="openCommentPanel()">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="btn-badge" id="commentBadge">0</span>
  </button>

  <!-- 评论面板 -->
  <aside class="comment-panel" id="commentPanel">
    <div class="panel-header">
      <h3>💬 读者评论</h3>
      <button class="panel-close" onclick="closeCommentPanel()">×</button>
    </div>
    <div class="panel-content" id="panelContent">
      <div class="comment-placeholder">选中文本添加评论</div>
    </div>
    <div class="panel-input" id="panelInput" style="display:none;">
      <div class="selected-text-preview"></div>
      <textarea placeholder="写下你的想法..." id="commentInput"></textarea>
      <div class="input-actions">
        <button class="btn-cancel" onclick="cancelComment()">取消</button>
        <button class="btn-submit" onclick="submitComment()">发布</button>
      </div>
    </div>
  </aside>

  <script>
    ${generateJS()}
  </script>
</body>
</html>`;
}

function generateCSS() {
  return `
    :root {
      --bg: #0a0a0a;
      --surface: #141414;
      --text: #ffffff;
      --text-muted: #888888;
      --primary: #d4af37;
      --accent: #ff3366;
      --border: #2a2a2a;
      --transition: cubic-bezier(0.4, 0, 0.2, 1);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.8;
      font-size: 17px;
    }
    
    /* 进度条 */
    .progress-bar {
      position: fixed; top: 0; left: 0; right: 0; height: 3px;
      z-index: 9999; background: var(--border);
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      width: 0%; transition: width 0.1s;
    }
    
    /* 左侧目录 */
    .toc-sidebar {
      position: fixed; top: 0; left: 0; width: 280px; height: 100vh;
      background: var(--surface); border-right: 1px solid var(--border);
      z-index: 2000; display: flex; flex-direction: column;
      padding: 2rem 1.5rem;
    }
    .toc-sidebar-header {
      margin-bottom: 2rem; padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .toc-label {
      font-size: 0.75rem; text-transform: uppercase;
      letter-spacing: 0.2em; color: var(--text-muted);
      display: block; margin-bottom: 1rem;
    }
    .toc-progress { height: 2px; background: var(--border); border-radius: 1px; overflow: hidden; }
    .toc-progress-bar { height: 100%; background: var(--primary); width: 0%; transition: width 0.3s; }
    .toc-sidebar-list { list-style: none; flex: 1; overflow-y: auto; padding-right: 0.5rem; }
    .toc-sidebar-list::-webkit-scrollbar { width: 4px; }
    .toc-sidebar-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .toc-sidebar-item { margin-bottom: 0.5rem; }
    .toc-sidebar-item.active .toc-sidebar-link {
      background: rgba(212, 175, 55, 0.1);
      border-left-color: var(--primary);
    }
    .toc-sidebar-item.active .toc-num { color: var(--primary); }
    .toc-sidebar-link {
      display: flex; align-items: flex-start; gap: 0.75rem;
      padding: 0.75rem 1rem; border-radius: 8px;
      border-left: 3px solid transparent;
      color: var(--text); text-decoration: none; transition: all 0.3s;
    }
    .toc-sidebar-link:hover { background: rgba(255,255,255,0.05); border-left-color: var(--text-muted); }
    .toc-num { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); min-width: 24px; }
    .toc-text { font-size: 0.875rem; line-height: 1.5; }
    .toc-sidebar-footer { padding-top: 1.5rem; border-top: 1px solid var(--border); text-align: center; }
    .toc-count { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.1em; }
    
    /* 顶部栏 */
    .top-brand-bar {
      position: fixed; top: 0; left: 280px; right: 0; z-index: 1000;
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 2rem;
      background: rgba(10,10,10,0.8); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .brand-logo { display: flex; align-items: center; gap: 0.75rem; }
    .logo-icon { color: var(--primary); font-size: 1.5rem; }
    .logo-text { font-weight: 700; font-size: 1rem; letter-spacing: 0.15em; }
    .brand-actions { display: flex; gap: 0.5rem; }
    .action-btn {
      width: 40px; height: 40px; border-radius: 8px;
      border: 1px solid var(--border); background: transparent;
      color: var(--text); display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.3s;
    }
    .action-btn:hover { background: var(--primary); border-color: var(--primary); }
    
    /* 首屏 */
    .hero {
      min-height: 85vh; display: flex; align-items: center; justify-content: center;
      position: relative; padding: 6rem 4rem 6rem calc(280px + 4rem);
      overflow: hidden;
    }
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .hero-gradient {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #1a0a1a 0%, #0d1a2d 50%, #0a0a0a 100%);
    }
    .hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; }
    .hero-label { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem; }
    .label-line { width: 60px; height: 1px; background: var(--primary); }
    .label-text { font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--primary); }
    .hero-title { font-family: 'Noto Serif SC', serif; font-size: clamp(3rem, 6vw, 5rem); font-weight: 700; line-height: 1.1; margin-bottom: 2rem; }
    .title-main { background: linear-gradient(135deg, var(--text) 0%, var(--text-muted) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-meta { display: flex; align-items: center; justify-content: center; gap: 1rem; font-size: 0.875rem; color: var(--text-muted); margin-bottom: 2rem; }
    .hero-excerpt { font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); max-width: 600px; margin: 0 auto 3rem; }
    
    /* 内容区 */
    .content { padding: 4rem 0; margin-left: 280px; }
    .content-wrapper { max-width: 720px; margin: 0 auto; padding: 0 3rem; }
    .section { margin-bottom: 5rem; opacity: 0; transform: translateY(40px); transition: all 0.8s var(--transition); }
    .section.visible { opacity: 1; transform: translateY(0); }
    .section-header { margin-bottom: 2rem; display: flex; align-items: baseline; gap: 1rem; }
    .section-number { font-size: 0.875rem; font-weight: 700; color: var(--primary); font-family: 'Inter', sans-serif; }
    .section-title { font-family: 'Noto Serif SC', serif; font-size: 1.75rem; font-weight: 600; }
    .section-line { flex: 1; height: 1px; background: var(--border); margin-left: 1rem; }
    .section-body { font-family: 'Noto Serif SC', serif; font-size: 1.125rem; line-height: 2; }
    .section-body p { margin-bottom: 1.5rem; text-align: justify; }
    .section-body p:first-of-type::first-letter {
      float: left; font-size: 4rem; line-height: 1; padding-right: 1rem;
      font-weight: 700; color: var(--primary); font-family: 'Noto Serif SC', serif;
    }
    .section-body h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
    .section-body ul { margin: 1rem 0 1rem 2rem; }
    .section-body li { margin-bottom: 0.5rem; }
    .selectable-text::selection { background: var(--primary); color: white; }
    
    /* 评论面板 */
    .comment-panel {
      position: fixed; top: 0; right: -450px; width: 450px; height: 100vh;
      background: var(--surface); z-index: 3000; display: flex; flex-direction: column;
      transition: right 0.5s var(--transition); box-shadow: -10px 0 50px rgba(0,0,0,0.3);
    }
    .comment-panel.open { right: 0; }
    .panel-header { display: flex; justify-content: space-between; align-items: center; padding: 2rem; border-bottom: 1px solid var(--border); }
    .panel-header h3 { font-size: 1.25rem; font-weight: 600; }
    .panel-close { width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--border); color: var(--text); font-size: 1.25rem; cursor: pointer; }
    .panel-close:hover { background: var(--accent); }
    .panel-content { flex: 1; overflow-y: auto; padding: 2rem; }
    .comment-placeholder { text-align: center; color: var(--text-muted); padding: 3rem 1rem; font-style: italic; }
    .comment-item { background: var(--bg); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; border-left: 3px solid var(--primary); }
    .comment-quote { font-size: 0.875rem; color: var(--text-muted); font-style: italic; margin-bottom: 0.75rem; padding: 0.75rem; background: var(--surface); border-radius: 6px; border-left: 2px solid var(--accent); }
    .comment-text { font-size: 0.9375rem; line-height: 1.6; margin-bottom: 0.75rem; }
    .comment-meta { font-size: 0.75rem; color: var(--text-muted); }
    .panel-input { padding: 1.5rem; border-top: 1px solid var(--border); background: var(--bg); }
    .selected-text-preview { font-size: 0.875rem; color: var(--text-muted); font-style: italic; margin-bottom: 1rem; padding: 0.75rem; background: var(--surface); border-radius: 6px; border-left: 2px solid var(--primary); max-height: 80px; overflow: hidden; }
    .panel-input textarea { width: 100%; min-height: 100px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font-family: inherit; font-size: 0.9375rem; resize: vertical; margin-bottom: 1rem; }
    .panel-input textarea:focus { outline: none; border-color: var(--primary); }
    .input-actions { display: flex; gap: 1rem; justify-content: flex-end; }
    .input-actions button { padding: 0.75rem 1.5rem; border-radius: 6px; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
    .btn-cancel { border: 1px solid var(--border); background: transparent; color: var(--text); }
    .btn-submit { border: none; background: var(--primary); color: white; }
    .btn-submit:hover { background: var(--accent); }
    
    /* 浮动评论按钮 */
    .floating-comment-btn {
      position: fixed; bottom: 2rem; right: 2rem; width: 60px; height: 60px;
      border-radius: 50%; border: none; background: var(--primary); color: white;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 4px 20px rgba(212,175,55,0.4);
      transition: all 0.3s; z-index: 1500;
    }
    .floating-comment-btn:hover { transform: scale(1.1); }
    .btn-badge { position: absolute; top: -5px; right: -5px; width: 24px; height: 24px; border-radius: 50%; background: var(--accent); color: white; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 600; }
    
    /* 响应式 */
    @media (max-width: 1024px) {
      .toc-sidebar { transform: translateX(-100%); transition: transform 0.3s; }
      .toc-sidebar.open { transform: translateX(0); }
      .hero { padding-left: 1.5rem; }
      .content, .article-footer { margin-left: 0; }
      .top-brand-bar { left: 0; }
    }
    @media (max-width: 768px) {
      .hero-title { font-size: 2rem; }
      .comment-panel { width: 100%; right: -100%; }
      .content-wrapper { padding: 0 1.5rem; }
    }
  `;
}

function generateJS() {
  return `
    let comments = JSON.parse(localStorage.getItem('article-comments') || '[]');
    let currentSelection = null;
    let selectedRange = null;

    function updateCommentCount() {
      const badge = document.getElementById('commentBadge');
      if (badge) {
        badge.textContent = comments.length;
        badge.style.display = comments.length > 0 ? 'flex' : 'none';
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateCommentCount();
      initScrollAnimations();
      initProgressBar();
      initTocHighlight();
      initTocProgress();
      initTextSelection();
    });

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openCommentPanel() {
      document.getElementById('commentPanel').classList.add('open');
    }

    function closeCommentPanel() {
      document.getElementById('commentPanel').classList.remove('open');
      clearSelection();
    }

    function initScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.section').forEach(s => observer.observe(s));
    }

    function initProgressBar() {
      const bar = document.querySelector('.progress-fill');
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrolled / height * 100) + '%';
      });
    }

    function initTocHighlight() {
      const sections = document.querySelectorAll('.section');
      const items = document.querySelectorAll('.toc-sidebar-item');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            items.forEach(item => {
              item.classList.toggle('active', item.dataset.section === id);
            });
          }
        });
      }, { threshold: 0.5 });
      sections.forEach(s => observer.observe(s));
    }

    function initTocProgress() {
      const bar = document.getElementById('tocProgressBar');
      const sections = document.querySelectorAll('.section');
      window.addEventListener('scroll', () => {
        let current = 0;
        sections.forEach((s, i) => {
          if (s.getBoundingClientRect().top <= window.innerHeight / 2) current = i + 1;
        });
        bar.style.width = (current / sections.length * 100) + '%';
      });
    }

    function initTextSelection() {
      document.addEventListener('mouseup', () => {
        const sel = window.getSelection();
        const text = sel.toString().trim();
        if (text.length > 5) {
          currentSelection = text;
          selectedRange = sel.getRangeAt(0);
          document.querySelector('.selected-text-preview').textContent = '「' + text.substring(0, 100) + '」';
          document.getElementById('panelInput').style.display = 'block';
          openCommentPanel();
        }
      });
    }

    function clearSelection() {
      window.getSelection().removeAllRanges();
      currentSelection = null;
      selectedRange = null;
      document.getElementById('panelInput').style.display = 'none';
      document.getElementById('commentInput').value = '';
    }

    function cancelComment() {
      clearSelection();
      closeCommentPanel();
    }

    function submitComment() {
      const text = document.getElementById('commentInput').value.trim();
      if (!text || !currentSelection) return;
      
      const comment = {
        id: Date.now(),
        quote: currentSelection,
        text: text,
        timestamp: new Date().toLocaleString('zh-CN')
      };
      
      comments.push(comment);
      localStorage.setItem('article-comments', JSON.stringify(comments));
      renderComment(comment);
      updateCommentCount();
      clearSelection();
      closeCommentPanel();
    }

    function renderComment(comment) {
      const content = document.getElementById('panelContent');
      const placeholder = content.querySelector('.comment-placeholder');
      if (placeholder) placeholder.remove();
      
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = '<div class="comment-quote">' + comment.quote.substring(0, 80) + '</div><div class="comment-text">' + comment.text + '</div><div class="comment-meta">' + comment.timestamp + '</div>';
      content.insertBefore(item, content.firstChild);
    }

    if (comments.length > 0) {
      comments.forEach(c => renderComment(c));
    }

    document.querySelectorAll('.toc-sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });
  `;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('yellow', '用法: node convert-md.js <你的markdown文件.md>');
    log('gray', '示例: node convert-md.js article.md');
    process.exit(1);
  }
  
  const inputFile = args[0];
  
  if (!fs.existsSync(inputFile)) {
    log('red', '错误: 文件不存在 - ' + inputFile);
    process.exit(1);
  }
  
  log('blue', '\n🎨 正在转换Markdown到时尚杂志HTML...\n');
  
  // 读取文件
  const content = fs.readFileSync(inputFile, 'utf-8');
  log('gray', '✓ 读取文件: ' + inputFile);
  
  // 解析Markdown
  const parsed = parseMarkdown(content);
  log('gray', '✓ 解析完成: ' + parsed.structure.sections.length + ' 个章节');
  
  // 生成HTML
  const html = generateFullHTML(parsed);
  
  // 输出文件
  const outputFile = inputFile.replace('.md', '.html');
  fs.writeFileSync(outputFile, html, 'utf-8');
  
  log('green', '\n✓ 转换完成!');
  log('gray', '  输出: ' + outputFile);
  log('gray', '  章节: ' + parsed.structure.sections.length);
  log('gray', '  字数: ' + content.length);
  log('blue', '\n💡 在浏览器中打开查看效果:\n  ' + path.resolve(outputFile) + '\n');
}

main().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
