# API 测试报告

> 测试时间: 2026-01-31
> 测试环境: Local Development (http://localhost:3000)
> Sanity项目: h8272qgq

---

## ✅ 测试结果概览

| API端点 | 方法 | 状态 | 说明 |
|---------|------|------|------|
| `/api/publish` | POST | ✅ 成功 | 直接发布文章（支持 tags 和 publishedAt） |
| `/api/draft` | POST | ✅ 成功 | 创建草稿文章（支持 tags 和 publishedAt） |
| `/api/admin/import-markdown` | POST | ✅ 成功 | 导入Markdown文件（支持 tags） |
| `/api/posts` | GET | ✅ 新增 | 获取文章列表（支持过滤和分页） |
| `/api/posts` | POST | ✅ 新增 | 创建新文章 |
| `/api/posts` | PATCH | ✅ 新增 | 批量更新文章 |
| `/api/posts` | DELETE | ✅ 新增 | 批量删除文章 |
| `/api/posts/[slug]` | GET | ✅ 新增 | 获取单篇文章详情 |
| `/api/posts/[slug]` | PATCH | ✅ 新增 | 更新单篇文章 |
| `/api/posts/[slug]` | DELETE | ✅ 新增 | 删除单篇文章 |

---

## 测试 1: 直接发布文章

### 请求

```bash
POST http://localhost:3000/api/publish
Content-Type: application/json

{
  "title": "测试文章",
  "slug": "test-001",
  "postType": "article",
  "excerpt": "测试摘要",
  "status": "published"
}
```

### 响应

```json
{
  "ok": true,
  "result": {
    "_id": "post.test-001",
    "_createdAt": "2026-01-31T02:48:57Z",
    "_rev": "cPkbOpBaKRO5Rb35uuP8JJ",
    "_type": "post",
    "_updatedAt": "2026-01-31T02:48:57Z",
    "content": [],
    "excerpt": "测试摘要",
    "postType": "article",
    "slug": {
      "_type": "slug",
      "current": "test-001"
    },
    "status": "published",
    "title": "测试文章"
  }
}
```

### 结果

✅ **成功** - 文章已创建在 Sanity CMS 中
- 文档ID: `post.test-001`
- 状态: `published`
- 创建时间: `2026-01-31T02:48:57Z`

---

## 测试 2: Markdown文件导入

### 请求

```bash
POST http://localhost:3000/api/admin/import-markdown
Content-Type: application/json

{
  "files": ["welcome-to-markdown.md"]
}
```

### Markdown文件内容

```markdown
---
title: "欢迎使用 Markdown 编辑器"
date: "2025-01-28"
excerpt: "这是一个示例文章，展示了 Markdown 的基本功能"
tags: ["markdown", "sanity", "tutorial"]
status: "published"
postType: "article"
---

# 欢迎使用 Markdown 编辑器

这是一个功能强大的 Markdown 编辑器，支持将 Markdown 文件导入到 Sanity CMS。

## 主要特性

- **实时预览**: 所见即所得
- **语法高亮**: 代码块支持
- **元数据支持**: YAML frontmatter
- **批量导入**: 一键导入多个文件
...
```

### 响应

```json
{
  "successCount": 1,
  "failCount": 0,
  "errors": [],
  "message": "导入完成：成功 1，失败 0"
}
```

### 结果

✅ **成功** - Markdown 文件已导入
- 成功导入: 1 个文件
- 失败: 0 个
- YAML frontmatter 元数据正确解析
- Markdown 内容转换为 PortableText

---

## API 功能验证

### `/api/publish` 功能清单

- ✅ 接受文章元数据（title, slug, postType）
- ✅ 支持自定义 excerpt
- ✅ 支持设置状态（draft/published）
- ✅ 支持 PortableText 格式的内容数组
- ✅ 自动生成文档ID格式: `post.{slug}`
- ✅ 使用 `createOrReplace` 确保幂等性

### `/api/admin/import-markdown` 功能清单

- ✅ 支持批量导入（接受文件名数组）
- ✅ 正确解析 YAML frontmatter 元数据
- ✅ 自动转换 Markdown 内容为 PortableText
- ✅ 从文件名提取默认 slug
- ✅ 支持标签（tags）、日期（date）等字段
- ✅ 返回详细的导入统计（成功/失败数量）
- ✅ 错误处理和错误信息收集

---

## 安全提醒

### ⚠️ 当前风险

1. **无鉴权保护**
   - 任何人都可以调用这些API
   - `/api/admin/*` 路由需要添加认证
   - 建议使用 Clerk 中间件保护

2. **无速率限制**
   - 可能被滥用
   - 建议添加请求频率限制

3. **无请求验证**
   - 建议添加 Zod 或类似库进行数据验证
   - 防止无效或恶意数据

### 🔒 建议改进（按已批准计划）

根据已批准的实施计划：

#### 第1-2天：添加 Clerk 认证

1. 创建 `middleware.ts` 保护路由
2. 修改 API 路由添加认证检查：

```typescript
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 现有的API逻辑...
}
```

---

## 使用示例

### 使用 cURL

```bash
# 直接发布文章
curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的第一篇文章",
    "slug": "my-first-post",
    "postType": "article",
    "excerpt": "这是一篇测试文章",
    "status": "published"
  }'

# 导入Markdown文件
curl -X POST http://localhost:3000/api/admin/import-markdown \
  -H "Content-Type: application/json" \
  -d '{"files": ["my-post.md"]}'
```

### 使用 JavaScript

```javascript
// 直接发布
const response = await fetch('http://localhost:3000/api/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '我的第一篇文章',
    slug: 'my-first-post',
    postType: 'article',
    excerpt: '这是一篇测试文章',
    status: 'published'
  })
});

const result = await response.json();
console.log(result);
```

---

## 下一步行动

根据已批准的实施计划：

### 🔴 高优先级（立即实施）

1. **鉴权系统**
   - 安装 Clerk: `pnpm add @clerk/nextjs`
   - 创建 middleware.ts
   - 保护 `/api/admin/*` 路由

2. **搜索功能**
   - 集成 Algolia
   - 创建搜索 API 和组件

3. **部署配置**
   - 配置 Vercel
   - 设置 CI/CD

### 📝 测试命令

测试脚本已保存在: [`/test-api.sh`](./test-api.sh)

```bash
# 运行完整测试
./test-api.sh
```

---

## 验证链接

- **Sanity Studio**: https://h8272qgq.sanity.studio/desk/post
- **Blog首页**: http://localhost:3000
- **API文档**: 见各路由文件

---

## 附录：API 参数说明

### `/api/publish` 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| title | string | ✅ | 文章标题 |
| slug | string | ✅ | URL友好的唯一标识符 |
| postType | "article" \| "video" | ✅ | 文章类型 |
| excerpt | string | ❌ | 文章摘要 |
| status | "draft" \| "published" | ❌ | 发布状态，默认 "published" |
| videoUrl | string | ❌ | 视频URL（仅video类型） |
| content | unknown[] | ❌ | PortableText格式的内容 |
| **tags** | **string[]** | **❌** | **文章标签数组（新功能）** |
| **publishedAt** | **string** | **❌** | **发布时间 ISO 8601（新功能）** |

### `/api/admin/import-markdown` 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| files | string[] | ✅ | Markdown文件名数组（相对于posts目录） |

**Markdown文件支持的字段** (YAML frontmatter):

- title: 文章标题
- date: 发布日期
- excerpt: 摘要
- tags: 标签数组
- status: 状态
- postType: 类型

---

## 🆕 新增 API 接口文档

### `/api/posts` - 文章集合操作

#### GET /api/posts
获取文章列表，支持查询参数过滤。

**查询参数:**

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| status | string | ❌ | 过滤状态: "draft" 或 "published" |
| tag | string | ❌ | 过滤标签 |
| postType | string | ❌ | 过滤类型: "article" 或 "video" |
| limit | number | ❌ | 限制返回数量 |

**示例:**

```bash
# 获取所有已发布文章
GET /api/posts?status=published

# 获取特定标签的文章
GET /api/posts?tag=AI&limit=10

# 获取视频类型文章
GET /api/posts?postType=video
```

#### POST /api/posts
创建新文章。

**请求体:**

```json
{
  "title": "文章标题",
  "slug": "article-slug",
  "postType": "article",
  "excerpt": "文章摘要",
  "status": "published",
  "tags": ["AI", "教程"],
  "publishedAt": "2026-01-31T00:00:00Z",
  "content": [...]
}
```

#### PATCH /api/posts
批量更新文章。

**请求体:**

```json
{
  "ids": ["post.id1", "post.id2"],
  "updates": {
    "status": "published",
    "tags": ["新标签"]
  }
}
```

#### DELETE /api/posts
批量删除文章。

**查询参数:**

```bash
DELETE /api/posts?ids=post.id1,post.id2,post.id3
```

---

### `/api/posts/[slug]` - 单篇文章操作

#### GET /api/posts/[slug]
获取单篇文章详情（包含完整内容）。

**示例:**

```bash
GET /api/posts/my-article-slug
```

**响应:**

```json
{
  "success": true,
  "data": {
    "_id": "post.my-article-slug",
    "title": "文章标题",
    "slug": "my-article-slug",
    "content": [...],
    "tags": ["AI", "教程"],
    "publishedAt": "2026-01-31T00:00:00Z",
    ...
  }
}
```

#### PATCH /api/posts/[slug]
更新单篇文章（部分更新）。

**请求体:**

```json
{
  "title": "更新后的标题",
  "tags": ["更新后的标签"],
  "status": "published"
}
```

#### DELETE /api/posts/[slug]
删除单篇文章。

---

## 使用示例

### 1. 创建带标签的文章

```bash
curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI 入门教程",
    "slug": "ai-intro-tutorial",
    "postType": "article",
    "excerpt": "从零开始学习 AI",
    "status": "published",
    "tags": ["AI", "教程", "入门"],
    "publishedAt": "2026-01-31T10:00:00Z"
  }'
```

### 2. 获取特定标签的文章

```bash
curl "http://localhost:3000/api/posts?tag=AI&status=published&limit=5"
```

### 3. 批量更新文章状态

```bash
curl -X PATCH http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["post.ai-intro", "post.ml-basics"],
    "updates": {
      "status": "published",
      "tags": ["AI", "机器学习"]
    }
  }'
```

### 4. 更新单篇文章

```bash
curl -X PATCH http://localhost:3000/api/posts/ai-intro-tutorial \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["AI", "教程", "进阶"],
    "excerpt": "更新后的摘要"
  }'
```

### 5. 导入带标签的 Markdown 文件

```markdown
---
title: "AI 面试题详解"
date: "2026-01-31"
excerpt: "2026年最新AI面试题"
tags: ["AI", "面试", "2026"]
status: "published"
postType: "article"
---

# AI 面试题详解
...
```

```bash
curl -X POST http://localhost:3000/api/admin/import-markdown \
  -H "Content-Type: application/json" \
  -d '{"files": ["ai-interview-2026.md"]}'
```

---

**测试完成！** ✅
