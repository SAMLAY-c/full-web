# Full Web Monorepo

一个多平台数字化展示系统，采用现代化的monorepo架构设计。

## 项目概述

这是一个基于 **Turborepo** 的 monorepo 项目，包含多个专门化的 Web 应用程序：

- **Blog** (`apps/blog/`) - SEO优化的博客平台
- **Portfolio** (`apps/portfolio/`) - 专业作品集展示
- **Platform** (`apps/platform/`) - 私有内容交付平台
- **Studio** (`apps/studio/`) - Sanity CMS 管理后台

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

### 核心技术
- **构建工具**: Turborepo + pnpm workspaces
- **框架**: Next.js 14.2.5 (所有应用)
- **语言**: TypeScript 5.5.4
- **样式**: Tailwind CSS 3.4.10

### 各应用技术栈

#### Blog App (`apps/blog/`)
- Next.js 14.2.5 with App Router
- Sanity CMS 内容管理
- Markdown 渲染 (marked.js, unified)
- React Syntax Highlighter 代码高亮
- NextAuth.js 身份认证
- AI 集成 (OpenAI, Anthropic)

#### Portfolio App (`apps/portfolio/`)
- Next.js 14.2.5 with TypeScript
- Tailwind CSS 样式
- 客户端 React 应用

#### Platform App (`apps/platform/`)
- Next.js 14.2.5 with TypeScript
- Tailwind CSS 样式
- 私有内容交付系统

#### Studio App (`apps/studio/`)
- Sanity Studio CMS
- Styled-components UI

## 📂 项目结构

```
full-web/
├── apps/                    # 应用程序
│   ├── blog/               # 博客平台
│   ├── portfolio/          # 专业作品集
│   ├── platform/           # 私有内容平台
│   └── studio/             # Sanity CMS 管理后台
├── packages/               # 共享包
│   ├── ui/                 # 共享 UI 组件
│   ├── utils/              # 共享工具函数
│   └── config/             # TypeScript 配置
├── docs/                   # 项目文档
├── scripts/               # 自动化脚本
├── server.js              # Node.js 图片处理服务器
└── html/                  # 静态 HTML 文件
```

## ✨ 核心功能

### Blog 平台
- ✅ **双数据源支持** (Sanity CMS + 本地 Markdown)
- ✅ **可配置的 Markdown 渲染主题**
  - 默认主题：专业、完整功能
  - 极简主题：简洁、清爽
- ✅ **AI 驱动的内容生成和增强** (OpenAI, Anthropic)
- ✅ **代码语法高亮和复制功能**
- ✅ **ISR (增量静态再生成) 缓存策略** - 30分钟自动同步
- ✅ **搜索和过滤功能**
- ✅ **多语言支持**
- ✅ **深色模式**: 完整的明暗主题支持

### Portfolio 平台
- ✅ 双语内容支持 (中文/英文)
- ✅ 项目展示和案例研究
- ✅ 专业简历下载
- ✅ 响应式设计

### Platform 平台
- ✅ 高级内容交付
- ✅ 基于会员的访问控制
- ✅ 资源库 (SOP、工作流)

### 内容管理
- ✅ Sanity Studio 内容管理
- ✅ Markdown 模板系统
- ✅ 富文本内容 (图片、标签、分类)

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 开发服务器

当前运行的开发服务器：

| 应用 | 端口 | URL | 说明 |
|------|------|-----|------|
| **Platform** | 3000 | http://localhost:3000 | 私有交付平台 |
| **Blog** | 3001 | http://localhost:3001 | 公共SEO内容（博客） |
| **Portfolio** | 3002 | http://localhost:3002 | 面试/作品集 |
| **Sanity Studio** | 3333 | http://localhost:3333 | CMS后台管理 |

### 启动命令

```bash
# 启动所有应用
pnpm dev

# 启动单个应用
pnpm --filter blog dev
pnpm --filter portfolio dev
pnpm --filter platform dev
pnpm --filter studio dev
```

### 构建生产版本

```bash
# 构建所有应用
pnpm build

# 构建单个应用
pnpm --filter blog build
```

### 代码检查和格式化

```bash
# 运行 linter
pnpm lint

# 格式化代码
pnpm format
```

## 📦 主要依赖

### 核心依赖
- React 18.3.1
- Next.js 14.2.5
- TypeScript 5.5.4
- Tailwind CSS 3.4.10

### Blog 专用
- @sanity/client
- marked (Markdown 解析器)
- react-syntax-highlighter
- next-auth
- openai
- @anthropic-ai/sdk

### 构建工具
- turbo (monorepo 编排)
- pnpm (包管理)

## ⚙️ 主要配置文件

| 文件 | 用途 |
|------|------|
| `turbo.json` | Turborepo 构建编排配置 |
| `vercel.json` | Blog 部署配置 |
| `vercel-studio.json` | Studio 部署配置 |
| `pnpm-workspace.yaml` | PNPM workspace 配置 |

## 📄 核心文件说明

### Blog 应用
- `apps/blog/app/page.tsx` - 首页 (ISR 缓存)
- `apps/blog/app/blog/[slug]/page.tsx` - 博客文章页
- `apps/blog/lib/service/posts.ts` - 统一文章服务
- `apps/blog/lib/markdown-templates/` - Markdown 渲染主题
- `apps/blog/lib/ai/` - AI 集成提供商

### Studio 应用
- `apps/studio/sanity.config.js` - Sanity 配置

## 🔄 开发工作流

1. **内容管理**: 使用 Sanity Studio (`apps/studio/`) 管理博客内容
2. **开发**: 运行 `pnpm dev` 启动所有应用
3. **构建**: 运行 `pnpm build` 构建所有应用
4. **部署**: 部署到 Vercel (分别配置 blog 和 studio)

## 🚀 部署

项目配置了 Vercel 部署：

- Blog: 使用 `vercel.json` 配置
- Studio: 使用 `vercel-studio.json` 配置

## 🎯 特色功能

1. **双内容源**: 同时支持 Sanity CMS 和本地 Markdown 文件
2. **Markdown 主题**: 可配置的渲染主题 (default/minimal)
3. **AI 集成**: 内置 AI 功能用于内容生成
4. **性能优化**: ISR 缓存策略优化加载速度
5. **可扩展性**: Monorepo 结构配合共享包提升可维护性

## 📚 相关文档

- [文档索引](docs/README.md)
- [Markdown模板系统文档](apps/blog/lib/markdown-templates/README.md)
- [快速开始指南](apps/blog/lib/markdown-templates/QUICK_START.md)

## 📝 许可证

MIT
