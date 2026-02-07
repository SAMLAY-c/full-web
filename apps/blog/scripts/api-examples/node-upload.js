/**
 * Node.js 上传HTML示例
 * 运行: node scripts/api-examples/node-upload.js
 */

const API_URL = "http://localhost:3001/api/admin/import-html";

async function uploadHTML() {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.8;
      color: #1f2937;
    }
    h1 {
      font-size: 2.5rem;
      color: #059669;
      margin-bottom: 1rem;
    }
    .feature-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin: 30px 0;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .feature-box h3 {
      margin-top: 0;
    }
    code {
      background: #f3f4f6;
      padding: 3px 8px;
      border-radius: 6px;
      color: #dc2626;
      font-family: "Monaco", monospace;
    }
  </style>
</head>
<body>
  <h1>🚀 Node.js 上传HTML示例</h1>
  <p>这是通过Node.js脚本上传的HTML文章，包含完整的CSS样式。</p>

  <div class="feature-box">
    <h3>✨ 核心特性</h3>
    <ul>
      <li>✅ 保留完整CSS样式</li>
      <li>✅ 支持JavaScript交互</li>
      <li>✅ 自动转换Markdown用于搜索</li>
      <li>✅ iframe隔离渲染</li>
    </ul>
  </div>

  <h2>代码示例</h2>
  <pre><code>// 使用fetch上传HTML
const response = await fetch('/api/admin/import-html', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ html, title })
});</code></pre>

  <p>
    <strong>工作原理：</strong>HTML通过iframe渲染，
    完整保留所有样式效果！
  </p>
</body>
</html>`;

  try {
    console.log("📤 正在上传HTML...\n");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: html,
        title: "Node.js上传HTML示例",
        status: "published",
        tags: ["Node.js", "API", "HTML"],
        postType: "article",
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ 上传成功！\n");
      console.log("文章信息:");
      console.log(`  ID: ${result.data.id}`);
      console.log(`  标题: ${result.data.title}`);
      console.log(`  Slug: ${result.data.slug}`);
      console.log(`  状态: ${result.data.status}`);
      console.log(`\n📝 查看文章: http://localhost:3001/blog/${result.data.slug}`);
    } else {
      console.error("❌ 上传失败:", result.error);
    }
  } catch (error) {
    console.error("❌ 错误:", error.message);
  }
}

// 运行上传
uploadHTML();
