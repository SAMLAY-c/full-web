"""
Python上传HTML示例
运行: python3 scripts/api-examples/python-upload.py
"""

import requests
import json

# API地址
API_URL = "http://localhost:3001/api/admin/import-html"

# HTML内容
html_content = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.8;
      color: #1f2937;
    }
    h1 {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    .info-box {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 25px;
      border-radius: 12px;
      margin: 30px 0;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    code {
      background: #f3f4f6;
      padding: 3px 10px;
      border-radius: 6px;
      color: #dc2626;
      font-family: "Monaco", "Consolas", monospace;
      font-size: 0.9em;
    }
    pre {
      background: #1f2937;
      color: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
    }
    pre code {
      background: transparent;
      color: #f9fafb;
      padding: 0;
    }
  </style>
</head>
<body>
  <h1>🐍 Python上传HTML示例</h1>
  <p>这是通过Python脚本上传的HTML文章，包含精美的CSS样式设计。</p>

  <div class="info-box">
    <h3>✨ Python Requests库</h3>
    <p>使用Python的requests库轻松上传HTML内容到博客系统！</p>
  </div>

  <h2>代码示例</h2>
  <pre><code>import requests

url = "http://localhost:3001/api/admin/import-html"

data = {
    "html": html_content,
    "title": "Python上传示例"
}

response = requests.post(url, json=data)
print(response.json())</code></pre>

  <p>
    <strong>优势：</strong>Python脚本易于编写、调试和维护，
    适合批量导入大量HTML文章。
  </p>

  <h2>工作流程</h2>
  <ol>
    <li>准备HTML内容（可以是文件或字符串）</li>
    <li>构造请求数据（包含html、title等）</li>
    <li>发送POST请求到API</li>
    <li>获取响应结果（文章ID和链接）</li>
  </ol>
</body>
</html>
"""

# 请求数据
data = {
    "html": html_content,
    "title": "Python上传HTML示例",
    "status": "published",
    "tags": ["Python", "API", "HTML"],
    "postType": "article"
}

# 发送请求
print("📤 正在上传HTML...\n")

try:
    response = requests.post(API_URL, json=data)
    result = response.json()

    if response.status_code == 200 and result.get("success"):
        print("✅ 上传成功！\n")
        print("文章信息:")
        print(f"  ID: {result['data']['id']}")
        print(f"  标题: {result['data']['title']}")
        print(f"  Slug: {result['data']['slug']}")
        print(f"  状态: {result['data']['status']}")
        print(f"\n📝 查看文章: http://localhost:3001/blog/{result['data']['slug']}")
    else:
        print(f"❌ 上传失败: {result.get('error', 'Unknown error')}")
except Exception as e:
    print(f"❌ 错误: {e}")
