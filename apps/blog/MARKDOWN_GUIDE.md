# Markdown 集成指南

本项目已成功集成 Markdown 功能，可以直接从本地 Markdown 文件导入内容到 Sanity CMS。

## 功能特性

✅ **Markdown 到 PortableText 转换** - 自动转换 Markdown 格式到 Sanity 的 PortableText
✅ **批量导入** - 一键导入多个 Markdown 文件
✅ **Web 管理界面** - 可视化管理 Markdown 文件
✅ **实时预览** - 在浏览器中预览 Markdown 渲染效果
✅ **YAML Frontmatter 支持** - 支持元数据定义

## 快速开始

### 1. 创建 Markdown 文件

在 `/apps/blog/posts` 目录下创建 `.md` 文件，例如：

```markdown
---
title: "我的第一篇文章"
date: "2025-01-28"
excerpt: "这是文章摘要"
tags: ["nextjs", "markdown"]
status: "published"
postType: "article"
---

# 标题

这是文章内容...
```

### 2. 访问管理页面

打开浏览器访问：`http://localhost:3001/admin/markdown`

### 3. 导入到 Sanity

点击"全部导入"按钮，将所有 Markdown 文件导入到 Sanity CMS

### 4. 预览文件

点击任意文件的"预览"按钮，查看渲染效果

## 命令行工具

### 批量导入

使用 CLI 脚本批量导入 Markdown 文件：

```bash
# 导入 posts 目录下的所有文件
pnpm exec tsx scripts/import-markdown.ts posts

# 导入指定目录下的文件
pnpm exec tsx scripts/import-markdown.ts content "**/*.md"
```

### 创建测试文章

```bash
node scripts/create-post.js
```

## 支持的 Markdown 语法

- 标题（H1-H6）
- 段落
- 列表（有序/无序）
- 代码块（带语言标记）
- 引用块
- 粗体/斜体
- 链接
- 图片

## Frontmatter 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 否 | 文章标题（默认从文件名提取） |
| date | string | 否 | 发布日期（ISO 格式） |
| excerpt | string | 否 | 文章摘要 |
| tags | array | 否 | 标签列表 |
| status | string | 否 | 状态：draft 或 published |
| postType | string | 否 | 类型：article, note, snippet |

## 文件命名规范

### 标准格式
```
my-post.md
```

### 带日期格式（推荐）
```
2025-01-28-my-post.md
```

从带日期的文件名中会自动提取 slug（去除日期部分）

## 目录结构

```
apps/blog/
├── posts/                          # Markdown 文件目录
│   ├── welcome.md
│   └── 2025-01-28-my-post.md
├── lib/
│   └── markdown/
│       └── portable-text.ts        # Markdown 转换工具
├── scripts/
│   ├── import-markdown.ts          # 导入脚本
│   └── create-post.js              # 创建测试文章
└── app/
    └── admin/
        └── markdown/
            ├── page.tsx            # 管理页面
            ├── import-button.tsx   # 导入按钮组件
            └── preview/
                └── [filename]/
                    └── page.tsx    # 预览页面
```

## API 端点

### POST /api/admin/import-markdown

导入 Markdown 文件到 Sanity

**请求体：**
```json
{
  "files": ["welcome.md", "my-post.md"]
}
```

**响应：**
```json
{
  "successCount": 2,
  "failCount": 0,
  "errors": [],
  "message": "导入完成：成功 2，失败 0"
}
```

## 技术栈

- **Next.js 14** - React 框架
- **Sanity CMS** - 无头 CMS
- **PortableText** - Sanity 的块内容格式
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架

## 开发建议

1. **使用 VSCode** - 推荐安装 Markdown Preview Enhanced 插件
2. **本地预览** - 保存文件后访问管理页面查看效果
3. **版本控制** - Markdown 文件可以纳入 Git 管理
4. **备份重要** - 定期备份 posts 目录

## 故障排除

### 导入失败
- 检查 `.env.local` 中的 Sanity 凭证
- 确认 `SANITY_WRITE_TOKEN` 已配置
- 查看控制台错误日志

### 文件未显示
- 确认文件在 `/posts` 目录下
- 检查文件扩展名是否为 `.md`
- 刷新管理页面

### 编译错误
- 运行 `pnpm build` 检查类型错误
- 确保 TypeScript 配置正确

## 下一步

- [ ] 添加图片上传功能
- [ ] 支持更多 Markdown 扩展语法
- [ ] 添加草稿预览模式
- [ ] 实现 Markdown 文件的版本对比

## 贡献

欢迎提交 Issue 和 Pull Request！
