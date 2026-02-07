#!/bin/bash

# HTML上传API测试脚本
# 使用方法: ./test-html-upload.sh

# API地址
API_URL="http://localhost:3001/api/admin/import-html"

# 测试HTML内容（带样式）
HTML_CONTENT='<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: "Microsoft YaHei", sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      color: #2563eb;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 10px;
    }
    p {
      color: #374151;
    }
    .highlight {
      background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    code {
      background: #f3f4f6;
      padding: 2px 8px;
      border-radius: 4px;
      color: #dc2626;
    }
  </style>
</head>
<body>
  <h1>如何使用HTML上传API</h1>
  <p>这是一篇测试文章，演示如何上传带样式的HTML到博客系统。</p>

  <div class="highlight">
    <h2>✨ 功能特点</h2>
    <ul>
      <li>保留完整CSS样式</li>
      <li>支持JavaScript交互</li>
      <li>自动转换为Markdown</li>
      <li>保存到Sanity CMS</li>
    </ul>
  </div>

  <h2>代码示例</h2>
  <pre><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>

  <p>
    <strong>注意：</strong>上传的HTML会通过iframe渲染，
    完整保留所有样式和交互效果！
  </p>
</body>
</html>'

# 发送请求
echo "📤 正在上传HTML到博客系统..."
echo ""

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"html\": $(echo "$HTML_CONTENT" | jq -Rs .),
    \"title\": \"HTML上传API测试文章\",
    \"status\": \"published\",
    \"tags\": [\"API\", \"HTML\", \"测试\"],
    \"postType\": \"article\"
  }" \
  | jq .

echo ""
echo "✅ 上传完成！"
echo "📝 查看文章: http://localhost:3001/blog/html上传api测试文章"
