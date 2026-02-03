/**
 * 时尚杂志风格模板 - Fashion Magazine Template
 * 高端、现代、时尚的资讯风格
 */

class FashionMagazineTemplate {
  constructor() {
    this.name = 'fashion-magazine';
    this.theme = 'luxury';
    this.config = {
      heroHeight: '85vh',
      fontSize: {
        hero: 'clamp(3rem, 8vw, 6rem)',
        h1: '3rem',
        h2: '2.25rem',
        body: '1.125rem'
      },
      colors: {
        luxury: {
          background: '#0a0a0a',
          surface: '#141414',
          text: '#ffffff',
          textMuted: '#888888',
          primary: '#d4af37', // 金色
          accent: '#ff3366',  // 玫红
          secondary: '#00d4aa', // 青绿
          border: '#2a2a2a'
        },
        editorial: {
          background: '#faf7f2',
          surface: '#ffffff',
          text: '#1a1a1a',
          textMuted: '#666666',
          primary: '#e74c3c', // 红
          accent: '#2c3e50',  // 深蓝
          secondary: '#f39c12', // 橙
          border: '#e8e8e8'
        }
      }
    };
  }

  applyTheme(themeName) {
    this.theme = themeName;
    const colors = this.config.colors[themeName] || this.config.colors.luxury;
    this.currentColors = colors;
  }

  async generateHTML(content, options) {
    const colors = this.currentColors;
    const isDark = this.theme === 'luxury';
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <style>
    ${this.generateCSS(colors, isDark)}
  </style>
</head>
<body class="${isDark ? 'theme-dark' : 'theme-light'}">
  <!-- 阅读进度条 -->
  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>

  <article class="article">
    <!-- 顶部品牌栏 -->
    <nav class="top-brand-bar">
      <div class="brand-logo">
        <span class="logo-icon">◆</span>
        <span class="logo-text">VOGUE STYLE</span>
      </div>
      <div class="brand-actions">
        <button class="action-btn" onclick="shareArticle()" title="分享">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
        <button class="action-btn" onclick="scrollToTop()" title="回到顶部">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Hero Section - 全屏视觉冲击 -->
    <header class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-label" data-aos="fade-up">
          <span class="label-line"></span>
          <span class="label-text">独家专题</span>
        </div>
        
        <h1 class="hero-title" data-aos="fade-up" data-aos-delay="100">
          ${this.splitTitleForAnimation(content.title)}
        </h1>
        
        <div class="hero-meta" data-aos="fade-up" data-aos-delay="200">
          <span class="meta-date">${new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span class="meta-divider">|</span>
          <span class="meta-read">${Math.ceil(content.wordCount / 300)} 分钟阅读</span>
          <span class="meta-divider">|</span>
          <span class="meta-author">撰文 / ${content.author || '编辑团队'}</span>
        </div>
        
        <p class="hero-excerpt" data-aos="fade-up" data-aos-delay="300">
          ${content.summary}
        </p>
        
        <div class="hero-scroll" data-aos="fade-up" data-aos-delay="400">
          <span>向下滚动</span>
          <div class="scroll-line">
            <div class="scroll-indicator"></div>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-circle visual-1"></div>
        <div class="visual-circle visual-2"></div>
        <div class="visual-circle visual-3"></div>
        <div class="visual-text">2025</div>
      </div>
    </header>

    <!-- 左侧固定目录导航 -->
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

    <!-- 侧边评论面板 -->
    <aside class="comment-panel" id="commentPanel">
      <div class="panel-header">
        <h3>💬 读者评论</h3>
        <button class="panel-close" onclick="closeCommentPanel()">×</button>
      </div>
      <div class="panel-content" id="panelContent">
        <div class="comment-placeholder">
          选中文本添加评论
        </div>
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

    <!-- Main Content -->
    <main class="content">
      <div class="content-wrapper">
        ${this.renderSections(content)}
      </div>
    </main>

    <!-- 评论区汇总 -->
    <section class="comments-section" id="allComments">
      <h2 class="section-title">读者留言</h2>
      <div class="comments-list" id="commentsList"></div>
    </section>

    <!-- Footer -->
    <footer class="article-footer">
      <div class="footer-brand">
        <span class="brand-name">VOGUE STYLE</span>
        <span class="brand-tagline">定义未来的阅读体验</span>
      </div>
      <div class="footer-share">
        <button class="share-btn" onclick="shareArticle()">
          <span>分享文章</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
      </div>
    </footer>
  </article>

  <!-- 浮动评论按钮 -->
  <button class="floating-comment-btn" id="commentBtn" onclick="openCommentPanel()">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="btn-badge" id="commentBadge">0</span>
  </button>

  <script>
    ${this.generateJS()}
  </script>
</body>
</html>`;
  }

  splitTitleForAnimation(title) {
    // 将标题分段用于动画
    const parts = title.split('：');
    if (parts.length > 1) {
      return `<span class="title-main">${parts[0]}</span><span class="title-sub">：${parts[1]}</span>`;
    }
    return `<span class="title-main">${title}</span>`;
  }

  renderSections(content) {
    return content.structure.sections.map((section, index) => {
      const level = section.level;
      const isFirst = index === 0;
      
      // 章节号
      const sectionNum = String(index + 1).padStart(2, '0');
      
      return `
        <section id="${section.id}" class="section" data-section="${index}">
          <div class="section-header">
            <span class="section-number">${sectionNum}</span>
            <h2 class="section-title">${section.title}</h2>
            <div class="section-line"></div>
          </div>
          
          <div class="section-body selectable-text" data-section-id="${section.id}">
            ${section.tokens ? this.tokensToHTML(section.tokens) : '<p>内容加载中...</p>'}
          </div>
          
          ${index % 2 === 1 && content.images[index] ? `
            <figure class="section-media" data-aos="zoom-in">
              <div class="media-frame">
                <img src="${content.images[index].url}" alt="${section.title}" loading="lazy">
                <div class="media-overlay"></div>
              </div>
              <figcaption>${content.images[index].description || '配图'}</figcaption>
            </figure>
          ` : ''}
        </section>
      `;
    }).join('\n');
  }

  tokensToHTML(tokens) {
    if (!tokens || !Array.isArray(tokens)) return '';
    
    return tokens.map(token => {
      if (token.type === 'inline') {
        let text = token.content;
        // 处理粗体
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // 处理斜体
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        return `<p>${text}</p>`;
      }
      return '';
    }).join('');
  }

  generateCSS(colors, isDark) {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
      
      :root {
        --bg: ${colors.background};
        --surface: ${colors.surface};
        --text: ${colors.text};
        --text-muted: ${colors.textMuted};
        --primary: ${colors.primary};
        --accent: ${colors.accent};
        --secondary: ${colors.secondary};
        --border: ${colors.border};
        --transition: cubic-bezier(0.4, 0, 0.2, 1);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: 'Inter', -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.8;
        font-size: 17px;
        overflow-x: hidden;
      }

      /* 进度条 */
      .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 9999;
        background: var(--border);
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        width: 0%;
        transition: width 0.1s;
      }

      /* 顶部品牌栏 */
      .top-brand-bar {
        position: fixed;
        top: 0;
        left: 280px; /* 为左侧目录留出空间 */
        right: 0;
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: rgba(10, 10, 10, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
      }

      .brand-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .logo-icon {
        color: var(--primary);
        font-size: 1.5rem;
      }

      .logo-text {
        font-weight: 700;
        font-size: 1rem;
        letter-spacing: 0.15em;
        color: var(--text);
      }

      .brand-actions {
        display: flex;
        gap: 0.5rem;
      }

      .action-btn {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: transparent;
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
      }

      .action-btn:hover {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
      }

      /* 左侧固定目录 */
      .toc-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100vh;
        background: var(--surface);
        border-right: 1px solid var(--border);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        padding: 2rem 1.5rem;
      }

      .toc-sidebar-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border);
      }

      .toc-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 1rem;
      }

      .toc-progress {
        height: 2px;
        background: var(--border);
        border-radius: 1px;
        overflow: hidden;
      }

      .toc-progress-bar {
        height: 100%;
        background: var(--primary);
        width: 0%;
        transition: width 0.3s;
      }

      .toc-sidebar-list {
        list-style: none;
        flex: 1;
        overflow-y: auto;
        padding-right: 0.5rem;
      }

      .toc-sidebar-list::-webkit-scrollbar {
        width: 4px;
      }

      .toc-sidebar-list::-webkit-scrollbar-track {
        background: transparent;
      }

      .toc-sidebar-list::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 2px;
      }

      .toc-sidebar-item {
        margin-bottom: 0.5rem;
      }

      .toc-sidebar-item.active .toc-sidebar-link {
        background: rgba(212, 175, 55, 0.1);
        border-left-color: var(--primary);
      }

      .toc-sidebar-item.active .toc-num {
        color: var(--primary);
      }

      .toc-sidebar-link {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border-left: 3px solid transparent;
        color: var(--text);
        text-decoration: none;
        transition: all 0.3s;
      }

      .toc-sidebar-link:hover {
        background: rgba(255, 255, 255, 0.05);
        border-left-color: var(--text-muted);
      }

      .toc-num {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--text-muted);
        min-width: 24px;
        transition: color 0.3s;
      }

      .toc-text {
        font-size: 0.875rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .toc-sidebar-footer {
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
        text-align: center;
      }

      .toc-count {
        font-size: 0.75rem;
        color: var(--text-muted);
        letter-spacing: 0.1em;
      }

      /* Hero Section - 为左侧目录留出空间 */
      .hero {
        min-height: ${this.config.heroHeight};
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 6rem 4rem 6rem calc(280px + 4rem); /* 左侧280px目录 + 4rem间距 */
        overflow: hidden;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
      }

      .hero-gradient {
        position: absolute;
        inset: 0;
        background: ${isDark 
          ? 'linear-gradient(135deg, #1a0a1a 0%, #0d1a2d 50%, #0a0a0a 100%)'
          : 'linear-gradient(135deg, #faf7f2 0%, #f5ebe0 50%, #faf7f2 100%)'
        };
      }

      .hero-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: 
          repeating-linear-gradient(45deg, transparent, transparent 35px, ${colors.primary} 35px, ${colors.primary} 70px),
          repeating-linear-gradient(-45deg, transparent, transparent 35px, ${colors.accent} 35px, ${colors.accent} 70px);
      }

      .hero-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 900px;
      }

      .hero-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        opacity: 0;
        animation: fadeUp 0.8s ease forwards;
      }

      .label-line {
        width: 60px;
        height: 1px;
        background: var(--primary);
      }

      .label-text {
        font-size: 0.75rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--primary);
        font-weight: 500;
      }

      .hero-title {
        font-family: 'Noto Serif SC', serif;
        font-size: ${this.config.fontSize.hero};
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 2rem;
        letter-spacing: -0.02em;
      }

      .title-main {
        display: block;
        background: linear-gradient(135deg, var(--text) 0%, var(--text-muted) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        opacity: 0;
        animation: fadeUp 0.8s ease 0.1s forwards;
      }

      .title-sub {
        display: block;
        font-size: 0.5em;
        font-weight: 400;
        color: var(--text-muted);
        margin-top: 1rem;
        opacity: 0;
        animation: fadeUp 0.8s ease 0.2s forwards;
      }

      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .hero-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-bottom: 2rem;
        opacity: 0;
        animation: fadeUp 0.8s ease 0.3s forwards;
      }

      .meta-divider {
        opacity: 0.3;
      }

      .hero-excerpt {
        font-size: 1.25rem;
        line-height: 1.8;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto 3rem;
        opacity: 0;
        animation: fadeUp 0.8s ease 0.4s forwards;
      }

      .hero-scroll {
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: var(--text-muted);
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        opacity: 0;
        animation: fadeUp 0.8s ease 0.5s forwards;
      }

      .scroll-line {
        width: 1px;
        height: 60px;
        background: var(--border);
        position: relative;
        overflow: hidden;
      }

      .scroll-indicator {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        background: var(--primary);
        animation: scrollDown 2s ease-in-out infinite;
      }

      @keyframes scrollDown {
        0%, 100% { transform: translateY(-100%); }
        50% { transform: translateY(100%); }
      }

      /* 视觉装饰元素 */
      .hero-visual {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }

      .visual-circle {
        position: absolute;
        border-radius: 50%;
        border: 1px solid var(--primary);
        opacity: 0.2;
      }

      .visual-1 {
        width: 300px;
        height: 300px;
        animation: rotate 20s linear infinite;
      }

      .visual-2 {
        width: 400px;
        height: 400px;
        top: -50px;
        left: -50px;
        animation: rotate 30s linear infinite reverse;
      }

      .visual-3 {
        width: 500px;
        height: 500px;
        top: -100px;
        left: -100px;
        border-style: dashed;
        animation: rotate 40s linear infinite;
      }

      .visual-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        font-weight: 700;
        color: var(--primary);
        opacity: 0.1;
        letter-spacing: 0.5em;
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* 评论区汇总 - 同样为目录留出空间 */
      .comments-section {
        max-width: 720px;
        margin: 0 auto;
        padding: 4rem 3rem;
        border-top: 1px solid var(--border);
        margin-left: 280px;
      }

      .comments-section .section-title {
        text-align: center;
        margin-bottom: 3rem;
      }

      .comments-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      /* Footer */
      .article-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3rem 4rem;
        border-top: 1px solid var(--border);
        margin-top: 4rem;
        margin-left: 280px;
      }

      /* 评论面板 */
      .comment-panel {
        position: fixed;
        top: 0;
        right: -450px;
        width: 450px;
        height: 100vh;
        background: var(--surface);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        transition: right 0.5s var(--transition);
        box-shadow: -10px 0 50px rgba(0,0,0,0.3);
      }

      .comment-panel.open {
        right: 0;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        border-bottom: 1px solid var(--border);
      }

      .panel-header h3 {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .panel-close {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--border);
        color: var(--text);
        font-size: 1.25rem;
        cursor: pointer;
        transition: all 0.3s;
      }

      .panel-close:hover {
        background: var(--accent);
        color: white;
      }

      .panel-content {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;
      }

      .comment-placeholder {
        text-align: center;
        color: var(--text-muted);
        padding: 3rem 1rem;
        font-style: italic;
      }

      .comment-item {
        background: var(--bg);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-left: 3px solid var(--primary);
        animation: slideIn 0.3s ease;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .comment-quote {
        font-size: 0.875rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 0.75rem;
        padding: 0.75rem;
        background: var(--surface);
        border-radius: 6px;
        border-left: 2px solid var(--accent);
      }

      .comment-text {
        font-size: 0.9375rem;
        line-height: 1.6;
        margin-bottom: 0.75rem;
      }

      .comment-meta {
        font-size: 0.75rem;
        color: var(--text-muted);
      }

      .panel-input {
        padding: 1.5rem;
        border-top: 1px solid var(--border);
        background: var(--bg);
      }

      .selected-text-preview {
        font-size: 0.875rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: var(--surface);
        border-radius: 6px;
        border-left: 2px solid var(--primary);
        max-height: 80px;
        overflow: hidden;
      }

      .panel-input textarea {
        width: 100%;
        min-height: 100px;
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text);
        font-family: inherit;
        font-size: 0.9375rem;
        resize: vertical;
        margin-bottom: 1rem;
      }

      .panel-input textarea:focus {
        outline: none;
        border-color: var(--primary);
      }

      .input-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }

      .input-actions button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-cancel {
        border: 1px solid var(--border);
        background: transparent;
        color: var(--text);
      }

      .btn-submit {
        border: none;
        background: var(--primary);
        color: white;
      }

      .btn-submit:hover {
        background: var(--accent);
        transform: translateY(-2px);
      }

      /* Content - 为左侧目录留出空间 */
      .content {
        padding: 4rem 0;
        margin-left: 280px; /* 左侧目录宽度 */
      }

      .content-wrapper {
        max-width: 720px;
        margin: 0 auto;
        padding: 0 3rem;
      }

      .section {
        margin-bottom: 5rem;
      }

      .section-header {
        margin-bottom: 2rem;
        display: flex;
        align-items: baseline;
        gap: 1rem;
      }

      .section-number {
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--primary);
        font-family: 'Inter', sans-serif;
      }

      .section-title {
        font-family: 'Noto Serif SC', serif;
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text);
      }

      .section-line {
        flex: 1;
        height: 1px;
        background: var(--border);
        margin-left: 1rem;
      }

      .section-body {
        font-family: 'Noto Serif SC', serif;
        font-size: 1.125rem;
        line-height: 2;
        color: var(--text);
      }

      .section-body p {
        margin-bottom: 1.5rem;
        text-align: justify;
      }

      .section-body p:first-of-type::first-letter {
        float: left;
        font-size: 4rem;
        line-height: 1;
        padding-right: 1rem;
        font-weight: 700;
        color: var(--primary);
        font-family: 'Noto Serif SC', serif;
      }

      .section-body strong {
        color: var(--accent);
        font-weight: 600;
      }

      .section-body em {
        color: var(--secondary);
        font-style: italic;
      }

      /* 可选择的文本 - 用于评论 */
      .selectable-text {
        position: relative;
      }

      .selectable-text::selection {
        background: var(--primary);
        color: white;
      }

      .selected-highlight {
        background: rgba(212, 175, 55, 0.3);
        border-bottom: 2px solid var(--primary);
        cursor: pointer;
        transition: all 0.3s;
      }

      .selected-highlight:hover {
        background: rgba(212, 175, 55, 0.5);
      }

      /* 媒体 */
      .section-media {
        margin: 3rem -2rem;
        position: relative;
      }

      .media-frame {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
      }

      .media-frame img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transition: transform 0.6s var(--transition);
      }

      .media-frame:hover img {
        transform: scale(1.05);
      }

      .media-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        pointer-events: none;
      }

      .section-media figcaption {
        text-align: center;
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-top: 1rem;
        font-style: italic;
      }

      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .brand-name {
        font-weight: 700;
        font-size: 1.25rem;
        letter-spacing: 0.2em;
      }

      .brand-tagline {
        font-size: 0.875rem;
        color: var(--text-muted);
      }

      .share-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        border: 1px solid var(--border);
        border-radius: 50px;
        background: transparent;
        color: var(--text);
        font-size: 0.9375rem;
        cursor: pointer;
        transition: all 0.3s;
      }

      .share-btn:hover {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
      }

      /* 浮动评论按钮 */
      .floating-comment-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        transition: all 0.3s var(--transition);
        z-index: 1500;
      }

      .floating-comment-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(212, 175, 55, 0.6);
      }

      .btn-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }

      /* 响应式 - 移动端隐藏左侧目录 */
      @media (max-width: 1024px) {
        .toc-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s var(--transition);
        }

        .toc-sidebar.open {
          transform: translateX(0);
        }

        .hero {
          padding: 5rem 1.5rem;
          padding-left: 1.5rem; /* 移动端不需要左侧空间 */
          min-height: 100vh;
        }

        .content {
          margin-left: 0;
        }

        .comments-section {
          margin-left: 0;
        }

        .article-footer {
          margin-left: 0;
        }

        .top-brand-bar {
          left: 0;
        }
      }

      @media (max-width: 768px) {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-meta {
          flex-wrap: wrap;
          justify-content: center;
        }

        .comment-panel {
          width: 100%;
          right: -100%;
        }

        .content-wrapper {
          padding: 0 1.5rem;
        }

        .section-header {
          flex-wrap: wrap;
        }

        .section-line {
          display: none;
        }

        .article-footer {
          flex-direction: column;
          gap: 2rem;
          text-align: center;
        }

        .hero-visual {
          display: none;
        }
      }

      /* 滚动显示动画 */
      .section {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s var(--transition);
      }

      .section.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
  }

  generateJS() {
    return `
      // 全局评论存储
      let comments = JSON.parse(localStorage.getItem('article-comments') || '[]');
      let currentSelection = null;
      let selectedRange = null;

      // 更新评论数量
      function updateCommentCount() {
        const badge = document.getElementById('commentBadge');
        if (badge) {
          badge.textContent = comments.length;
          badge.style.display = comments.length > 0 ? 'flex' : 'none';
        }
      }

      // 初始化
      document.addEventListener('DOMContentLoaded', () => {
        updateCommentCount();
        renderAllComments();
        initScrollAnimations();
        initProgressBar();
        initTextSelection();
        initTocHighlight();
        initTocProgress();
      });

      // 滚动到顶部
      function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // 移动端切换目录
      function toggleMobileToc() {
        const sidebar = document.getElementById('tocSidebar');
        sidebar.classList.toggle('open');
      }

      // 目录高亮 - 根据滚动位置高亮当前章节
      function initTocHighlight() {
        const sections = document.querySelectorAll('.section');
        const tocItems = document.querySelectorAll('.toc-sidebar-item');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              tocItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === sectionId) {
                  item.classList.add('active');
                }
              });
            }
          });
        }, { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));
      }

      // 目录进度条
      function initTocProgress() {
        const progressBar = document.getElementById('tocProgressBar');
        const sections = document.querySelectorAll('.section');
        const totalSections = sections.length;

        window.addEventListener('scroll', () => {
          let currentSection = 0;
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              currentSection = index + 1;
            }
          });
          const progress = (currentSection / totalSections) * 100;
          progressBar.style.width = progress + '%';
        });
      }

      // 打开评论面板
      function openCommentPanel() {
        const panel = document.getElementById('commentPanel');
        panel.classList.add('open');
      }

      // 关闭评论面板
      function closeCommentPanel() {
        const panel = document.getElementById('commentPanel');
        panel.classList.remove('open');
        clearSelection();
      }

      // 文本选择初始化
      function initTextSelection() {
        document.addEventListener('mouseup', handleTextSelection);
        document.addEventListener('touchend', handleTextSelection);
      }

      function handleTextSelection(e) {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        if (text.length > 5) {
          currentSelection = text;
          selectedRange = selection.getRangeAt(0);
          
          // 显示选中预览
          showSelectionPreview(text);
          openCommentPanel();
        }
      }

      function showSelectionPreview(text) {
        const input = document.getElementById('panelInput');
        const preview = input.querySelector('.selected-text-preview');
        preview.textContent = '「' + text.substring(0, 100) + (text.length > 100 ? '...' : '') + '」';
        input.style.display = 'block';
      }

      function clearSelection() {
        window.getSelection().removeAllRanges();
        currentSelection = null;
        selectedRange = null;
        document.getElementById('panelInput').style.display = 'none';
        document.getElementById('commentInput').value = '';
      }

      // 取消评论
      function cancelComment() {
        clearSelection();
        closeCommentPanel();
      }

      // 提交评论
      function submitComment() {
        const input = document.getElementById('commentInput');
        const text = input.value.trim();
        
        if (!text || !currentSelection) return;

        const comment = {
          id: Date.now(),
          quote: currentSelection,
          text: text,
          timestamp: new Date().toLocaleString('zh-CN'),
          sectionId: selectedRange ? selectedRange.startContainer.parentElement.closest('[data-section-id]')?.dataset.sectionId : null
        };

        comments.push(comment);
        localStorage.setItem('article-comments', JSON.stringify(comments));
        
        // 高亮文本
        highlightText(selectedRange, comment.id);
        
        // 更新UI
        renderComment(comment);
        updateCommentCount();
        renderAllComments();
        
        // 清空
        clearSelection();
        closeCommentPanel();
      }

      // 高亮选中的文本
      function highlightText(range, commentId) {
        const span = document.createElement('span');
        span.className = 'selected-highlight';
        span.dataset.commentId = commentId;
        span.onclick = () => scrollToComment(commentId);
        
        try {
          range.surroundContents(span);
        } catch (e) {
          // 跨节点选择时简化处理
          console.log('Complex selection, simplified highlighting');
        }
      }

      // 渲染单个评论到面板
      function renderComment(comment) {
        const content = document.getElementById('panelContent');
        const placeholder = content.querySelector('.comment-placeholder');
        if (placeholder) placeholder.remove();

        const item = document.createElement('div');
        item.className = 'comment-item';
        item.dataset.commentId = comment.id;
        item.innerHTML = \`
          <div class="comment-quote">\${comment.quote.substring(0, 80)}\${comment.quote.length > 80 ? '...' : ''}</div>
          <div class="comment-text">\${comment.text}</div>
          <div class="comment-meta">\${comment.timestamp}</div>
        \`;
        
        content.insertBefore(item, content.firstChild);
      }

      // 渲染所有评论到汇总区
      function renderAllComments() {
        const list = document.getElementById('commentsList');
        if (!list) return;
        
        if (comments.length === 0) {
          list.innerHTML = '<p style="text-align:center;color:var(--text-muted);">暂无评论，选中文本添加第一条评论</p>';
          return;
        }

        list.innerHTML = comments.map(c => \`
          <div class="comment-item" id="comment-\${c.id}">
            <div class="comment-quote">「\${c.quote.substring(0, 100)}\${c.quote.length > 100 ? '...' : ''}」</div>
            <div class="comment-text">\${c.text}</div>
            <div class="comment-meta">\${c.timestamp}</div>
          </div>
        \`).reverse().join('');
      }

      // 滚动到评论
      function scrollToComment(commentId) {
        const element = document.getElementById('comment-' + commentId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.background = 'var(--primary)';
          setTimeout(() => {
            element.style.background = '';
          }, 1000);
        }
      }

      // 滚动动画
      function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(section => {
          observer.observe(section);
        });
      }

      // 进度条
      function initProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        
        window.addEventListener('scroll', () => {
          const scrolled = window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrolled / height) * 100;
          progressFill.style.width = progress + '%';
        });
      }

      // 分享功能
      function shareArticle() {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href
          });
        } else {
          // 复制链接
          navigator.clipboard.writeText(window.location.href);
          alert('链接已复制到剪贴板');
        }
      }

      // 目录链接平滑滚动
      document.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            toggleToc();
          }
        });
      });

      // 加载已有评论
      if (comments.length > 0) {
        comments.forEach(c => renderComment(c));
      }
    `;
  }
}

module.exports = FashionMagazineTemplate;
