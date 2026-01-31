# My Product Matrix

Monorepo scaffolding for three independent Next.js apps:

- `apps/portfolio` for interview/portfolio
- `apps/blog` for public SEO content
- `apps/platform` for private delivery

Shared packages live in `packages/ui`, `packages/utils`, and `packages/config`.

## 🚀 Development Servers

当前运行的开发服务器：

| 应用 | 端口 | URL | 说明 |
|------|------|-----|------|
| **Platform** | 3000 | http://localhost:3000 | 私有交付平台 |
| **Blog** | 3001 | http://localhost:3001 | 公共SEO内容（博客） |
| **Portfolio** | 3002 | http://localhost:3002 | 面试/作品集 |
| **Sanity Studio** | 3333 | http://localhost:3333 | CMS后台管理 |

### 快速启动

```bash
# 启动所有应用
pnpm dev

# 访问各个应用
# Blog: http://localhost:3001
# Portfolio: http://localhost:3002
# Platform: http://localhost:3000
# Sanity Studio: http://localhost:3333
```

## 📝 功能特性

### 博客系统
- ✅ **Markdown渲染美化**: 专业的排版样式，支持代码语法高亮
- ✅ **深色模式**: 完整的明暗主题支持
- ✅ **代码高亮**: Prism.js语法高亮，支持复制功能
- ✅ **GitHub风格Markdown**: 表格、任务列表、删除线
- ✅ **动态主题切换**: 每篇文章可选择不同的markdown样式主题
  - 默认主题：专业、完整功能
  - 极简主题：简洁、清爽
- ✅ **后台主题选择**: 在Sanity Studio中为每篇文章选择主题
- ✅ **ISR缓存**: 30分钟自动同步更新

### 内容管理
- **CMS**: Sanity CMS
- **双数据源**: Sanity + 本地数据
- **实时预览**: 支持内容预览
- **SEO优化**: 静态生成，ISR缓存

## 🛠️ 技术栈

- **框架**: Next.js 14.2.5
- **样式**: Tailwind CSS 3.4.10
- **类型**: TypeScript 5.5.4
- **包管理**: pnpm + Turbo
- **内容**: Sanity CMS
- **部署**: Vercel

## 📚 相关文档

- [文档索引](docs/README.md)
- [Markdown模板系统文档](apps/blog/lib/markdown-templates/README.md)
- [快速开始指南](apps/blog/lib/markdown-templates/QUICK_START.md)
