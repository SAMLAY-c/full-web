# HTML上传API完整使用教程

## 🎯 API信息

**端点：** `POST http://localhost:3001/api/admin/import-html`

**功能：** 上传HTML → 自动转换Markdown → 保存到Sanity CMS

---

## 📋 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `html` | string | ✅ | HTML内容（完整文档或片段） |
| `title` | string | ❌ | 文章标题（不填则从`<title>`或`<h1>`提取） |
| `slug` | string | ❌ | URL路径（不填则根据标题自动生成） |
| `status` | string | ❌ | 状态：`draft`或`published`，默认`published` |
| `tags` | array | ❌ | 标签数组：`["React", "JavaScript"]` |
| `postType` | string | ❌ | 文章类型，默认`article` |
| `publishedAt` | string | ❌ | 发布时间（ISO格式），默认当前时间 |

---

## 💡 使用示例

### 1️⃣ Node.js

```javascript
const response = await fetch('http://localhost:3001/api/admin/import-html', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    html: '<h1>Hello World</h1><p>This is a test article.</p>',
    title: '测试文章',
    status: 'published',
    tags: ['测试', 'API']
  })
});

const result = await response.json();
console.log(result);
```

**运行示例：**
```bash
node scripts/api-examples/node-upload.js
```

---

### 2️⃣ Python

```python
import requests
import json

url = "http://localhost:3001/api/admin/import-html"

html_content = """
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; max-width: 800px; margin: 0 auto; }
    h1 { color: #2563eb; }
  </style>
</head>
<body>
  <h1>Python上传示例</h1>
  <p>这是通过Python上传的HTML文章</p>
</body>
</html>
"""

data = {
    "html": html_content,
    "title": "Python上传示例",
    "status": "published",
    "tags": ["Python", "API"]
}

response = requests.post(url, json=data)
result = response.json()

print(f"✅ 上传成功！")
print(f"文章ID: {result['data']['id']}")
print(f"文章链接: http://localhost:3001/blog/{result['data']['slug']}")
```

---

### 3️⃣ cURL

```bash
curl -X POST http://localhost:3001/api/admin/import-html \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<h1>Hello World</h1><p>测试内容</p>",
    "title": "cURL测试",
    "status": "published",
    "tags": ["cURL", "测试"]
  }'
```

---

### 4️⃣ 前端JavaScript

```tsx
'use client';

import { useState } from 'react';

export default function HTMLUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; }
            h1 { color: #059669; }
          </style>
        </head>
        <body>
          <h1>前端上传示例</h1>
          <p>这是从前端上传的文章</p>
        </body>
      </html>
    `;

    setUploading(true);
    try {
      const response = await fetch('/api/admin/import-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html,
          title: '前端上传示例',
          status: 'published'
        })
      });

      const result = await response.json();
      alert(`✅ 上传成功！\n文章ID: ${result.data.id}`);
    } catch (error) {
      alert('❌ 上传失败：' + error.message);
    }
    setUploading(false);
  };

  return (
    <button onClick={handleUpload} disabled={uploading}>
      {uploading ? '上传中...' : '上传HTML'}
    </button>
  );
}
```

---

### 5️⃣ 从文件读取HTML并上传

```javascript
import { readFileSync } from 'fs';

// 读取本地HTML文件
const html = readFileSync('./my-article.html', 'utf-8');

// 上传到博客
const response = await fetch('http://localhost:3001/api/admin/import-html', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    html,
    title: '从文件上传的文章',
    status: 'published'
  })
});

const result = await response.json();
console.log('文章链接:', `http://localhost:3001/blog/${result.data.slug}`);
```

---

## 📦 响应格式

### ✅ 成功响应

```json
{
  "success": true,
  "data": {
    "id": "post.article-slug",
    "slug": "article-slug",
    "title": "文章标题",
    "status": "published"
  }
}
```

### ❌ 错误响应

```json
{
  "error": "错误信息描述"
}
```

---

## 🎨 HTML样式支持

### ✅ 完全支持：

- 内联CSS `<style>...</style>`
- 外部CSS `<link rel="stylesheet">`
- 内联JavaScript `<script>...</script>`
- 外部JS `<script src="..."></script>`
- 所有HTML5标签和属性

### ⚠️ 注意事项：

1. **外部资源**需要确保可访问（如CDN链接）
2. **相对路径**图片可能无法加载（建议用绝对路径）
3. **iframe隔离**意味着无法与父页面通信

---

## 🔄 工作流程

```
HTML文件（含CSS/JS）
  ↓
POST /api/admin/import-html
  ↓
服务器处理：
  1. 提取标题（如果没有提供）
  2. 生成slug（如果没有提供）
  3. HTML → Markdown (用于搜索)
  4. Markdown → PortableText (用于编辑)
  ↓
保存到Sanity CMS：
  - content: PortableText
  - markdownContent: Markdown
  - htmlContent: 原始HTML (完整保留)
  ↓
文章页面检测到 htmlContent
  ↓
使用 HtmlPostFrame iframe 渲染
  ↓
完整展示原始HTML效果 ✨
```

---

## 🧪 测试脚本

项目已包含以下测试脚本：

1. **Bash脚本**: `scripts/api-examples/test-html-upload.sh`
2. **Node.js脚本**: `scripts/api-examples/node-upload.js`

直接运行即可测试：
```bash
# 运行Node.js示例
node scripts/api-examples/node-upload.js

# 运行Bash示例（需要jq工具）
./scripts/api-examples/test-html-upload.sh
```

---

## 📚 相关文件

- API路由: `apps/blog/app/api/admin/import-html/route.ts`
- 转换器: `apps/blog/lib/converters/html-to-markdown.ts`
- 渲染组件: `apps/blog/components/html-post-frame.tsx`
- Markdown转换: `apps/blog/lib/markdown/portable-text.ts`

---

## 🎯 最佳实践

1. **完整的HTML文档**：包含`<!DOCTYPE html>`和完整的`<html>`结构
2. **内联CSS**：推荐使用`<style>`标签而不是外部CSS
3. **响应式设计**：添加viewport meta标签
4. **图片链接**：使用绝对路径或Base64编码
5. **测试效果**：先在浏览器中打开HTML文件预览效果

---

**现在就试试上传你的第一篇文章吧！** 🚀
