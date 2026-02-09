# AGENTS.md - AI Coding Agent Guide

> 本文件供 AI Coding Agent 阅读，用于快速理解项目架构和开发规范。
> This file is intended for AI coding agents to understand the project architecture and conventions.

---

## 项目概述 (Project Overview)

**My Product Matrix** 是一个基于 pnpm + Turbo 的 Monorepo 项目，包含三个独立的 Next.js 应用：

| 应用 | 路径 | 端口 | 用途 |
|------|------|------|------|
| **Blog** | `apps/blog` | 3001 | 公共 SEO 内容博客，支持 Markdown 渲染、深色模式 |
| **Platform** | `apps/platform` | 3000 | 私有交付平台 |
| **Portfolio** | `apps/portfolio` | 3002 | 面试/作品集展示 |
| **Sanity Studio** | `apps/studio` | 3333 | CMS 后台管理（内容管理系统）|

### 技术栈 (Tech Stack)

- **框架**: Next.js 14.2.5 (App Router)
- **语言**: TypeScript 5.5.4
- **样式**: Tailwind CSS 3.4.10 + @tailwindcss/typography
- **包管理**: pnpm 10.28.1
- **构建工具**: Turbo 2.0
- **CMS**: Sanity CMS (Headless CMS)
- **部署**: Vercel

---

## 项目结构 (Project Structure)

```
my-product-matrix/
├── apps/
│   ├── blog/           # 博客应用（主要）
│   ├── platform/       # 私有平台
│   ├── portfolio/      # 作品集
│   └── studio/         # Sanity Studio CMS
├── packages/
│   ├── ui/             # 共享 UI 组件库 (@repo/ui)
│   ├── utils/          # 共享工具函数 (@repo/utils)
│   └── config/         # 共享配置（tsconfig.base.json）
├── docs/               # 项目文档
├── scripts/            # 自动化脚本
├── .ai/                # AI 工作日志
├── package.json        # 根 package.json
├── pnpm-workspace.yaml # pnpm 工作区配置
└── turbo.json          # Turbo 任务配置
```

### 工作区包名 (Workspace Package Names)

- 应用使用 `@apps/*` 命名空间（如 `@apps/blog`）
- 共享包使用 `@repo/*` 命名空间（如 `@repo/ui`, `@repo/utils`）

---

## 开发命令 (Development Commands)

所有命令都在项目根目录执行：

```bash
# 安装依赖
pnpm install

# 启动所有应用开发服务器
pnpm dev

# 构建所有应用
pnpm build

# 运行所有应用的 lint
pnpm lint

# 格式化所有代码
pnpm format

# AI 日志相关命令
pnpm ai-log:show      # 显示最近 20 条日志
pnpm ai-log:json      # 以 JSON 格式查看日志
pnpm ai-log:md        # 查看 Markdown 格式日志
pnpm ai-log:clear     # 清空日志
pnpm ai-log:stats     # 统计日志类型
pnpm ai-log:tools     # 统计工具使用情况
```

### 单个应用开发

```bash
# 只启动博客应用
cd apps/blog && pnpm dev

# 只启动 Studio
cd apps/studio && pnpm dev
```

---

## Blog 应用详解 (Blog App Details)

### 核心功能

- **Markdown 渲染**: 支持专业排版、代码语法高亮（Prism.js）
- **多主题支持**: 默认主题和极简主题可选
- **深色模式**: 完整的 dark/light 主题切换
- **双数据源**: Sanity CMS + 本地 Markdown 文件
- **ISR 缓存**: 30 分钟自动同步更新
- **搜索功能**: Fuse.js 实现的本地搜索
- **AI 内容生成**: 集成 OpenAI/Anthropic API

### 关键目录结构

```
apps/blog/
├── app/                     # Next.js App Router
│   ├── page.tsx            # 首页
│   ├── blog/               # 博客列表和详情
│   ├── course/             # 课程页面
│   ├── admin/              # 管理后台
│   ├── api/                # API 路由
│   └── globals.css         # 全局样式
├── components/             # React 组件
│   ├── blog-layout/        # 博客布局组件
│   ├── templates/          # 文章/视频模板
│   └── ui/                 # 本地 UI 组件
├── lib/                    # 工具库和配置
│   ├── sanity/             # Sanity 客户端和查询
│   ├── markdown-templates/ # Markdown 渲染主题
│   ├── ai/                 # AI 生成相关
│   └── auth/               # 认证相关
├── posts/                  # 本地 Markdown 文章
└── types/                  # TypeScript 类型定义
```

### API 路由清单

| 路径 | 方法 | 功能 |
|------|------|------|
| `/api/publish` | POST | 发布文章到 Sanity |
| `/api/draft` | POST | 创建草稿到 Sanity |
| `/api/posts` | GET | 获取文章列表 |
| `/api/search` | GET | 搜索文章 |
| `/api/ai-logs` | GET | 获取 AI 工作日志 |
| `/api/auth/*` | - | NextAuth 认证路由 |

---

## 共享包详解 (Shared Packages)

### @repo/ui

统一设计系统组件库，位于 `packages/ui/src/`：

```typescript
// 基础组件
export { Button } from "./button";
export { Card, CardHeader, CardTitle, ... } from "./card";
export { Input, Textarea, Label, InputGroup } from "./input";
export { Badge, Tag, TagGroup, StatusBadge } from "./badge";

// 设计令牌（颜色、间距等）
export * from "./tokens";
```

### @repo/utils

共享工具函数：

```typescript
// 类名合并（类似 clsx）
export function cn(...parts: Array<string | false | null | undefined>): string;

// 日期格式化
export function formatDate(value: string | number | Date): string;
```

---

## 代码风格指南 (Code Style Guidelines)

### TypeScript 规范

- 所有代码使用 TypeScript，开启 `strict` 模式
- 类型定义放在 `types/` 目录或文件顶部
- 优先使用 `interface` 定义对象类型
- 组件 Props 类型命名为 `XXXProps`

### 组件规范

```typescript
// 文件命名：kebab-case.tsx
// 组件命名：PascalCase

// 示例：button.tsx
import { cn } from "@repo/utils";

export interface ButtonProps {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = "default", 
  size = "md", 
  children,
  className 
}: ButtonProps) {
  return (
    <button className={cn("base-classes", className)}>
      {children}
    </button>
  );
}
```

### Tailwind CSS 规范

- 使用 `cn()` 工具函数合并类名
- 优先使用设计系统令牌（如 `primary-500`, `neutral-100`）
- 响应式前缀：`sm:`, `md:`, `lg:`, `xl:`
- 深色模式：使用 `dark:` 前缀

### 导入顺序

1. React/Next.js 内置
2. 第三方库
3. 工作区包 (`@repo/ui`, `@repo/utils`)
4. 绝对路径导入 (`@/components`)
5. 相对路径导入

---

## 环境变量 (Environment Variables)

### 必需的环境变量

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=xxx          # 仅服务器端使用
SANITY_STUDIO_PROJECT_ID=xxx
SANITY_STUDIO_DATASET=production

# NextAuth（如使用认证）
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3001
```

### 环境变量文件

- `.env.local` - 本地开发（不提交到 Git）
- `apps/studio/.env` - Studio 特定配置

---

## Sanity CMS 内容模型

### Post（文章/视频）

```typescript
{
  title: string;           // 标题
  slug: slug;              // 链接后缀
  excerpt: text;           // 简短描述
  coverImage: image;       // 封面图
  status: "draft" | "published";
  category: reference;     // 关联分类
  postType: "article" | "video";
  videoUrl: url;           // 视频链接（视频类型）
  transcript: array;       // 逐字稿（视频类型）
  pdfFile: file;           // 课件 PDF（视频类型）
  content: array;          // 文章正文（文章类型）
  tags: array<string>;     // 标签
  publishedAt: datetime;   // 发布时间
  isPinned: boolean;       // 是否置顶
  pinOrder: number;        // 置顶顺序
  markdownTheme: "default" | "minimal";  // Markdown 主题
}
```

### 其他类型

- **Category**: 文章分类
- **Project**: 项目信息
- **Resource**: 资源管理
- **SOP**: 标准操作流程
- **SiteConfig**: 站点配置

---

## 部署说明 (Deployment)

### Vercel 部署

项目配置在 `vercel.json`：

```json
{
  "buildCommand": "pnpm build --filter=@apps/blog",
  "outputDirectory": "apps/blog/.next",
  "framework": "nextjs",
  "regions": ["hkg1", "sin1"]
}
```

### Docker 部署（Studio）

Studio 应用支持 Docker 部署，配置在 `apps/studio/Dockerfile`。

---

## 重要文件索引 (Important Files)

| 文件 | 说明 |
|------|------|
| `README.md` | 项目主文档（中文）|
| `docs/README.md` | 文档索引 |
| `docs/api.md` | API 接口文档 |
| `docs/implementation.md` | 实现记录 |
| `CHANGELOG.ai.md` | AI 工作日志 |
| `apps/blog/MARKDOWN_GUIDE.md` | Markdown 写作指南 |
| `apps/blog/lib/markdown-templates/README.md` | Markdown 模板系统 |

---

## 开发注意事项 (Development Notes)

1. **Monorepo 依赖**: 使用 `workspace:*` 引用工作区包
2. **TypeScript 配置**: 应用继承 `packages/config/tsconfig.base.json`
3. **Tailwind 配置**: 每个应用有自己的配置，需包含 `../../packages/ui/src/**/*`
4. **环境变量**: 敏感信息不要提交到 Git，使用 `.env.local`
5. **AI 日志**: 修改代码后日志会自动记录到 `.ai/worklog.jsonl`
6. **Sanity 图片**: 需配置 `next.config.mjs` 中的 `remotePatterns`

---

## 故障排除 (Troubleshooting)

### 常见问题

1. **依赖安装失败**: 确保使用 pnpm，而不是 npm/yarn
2. **类型错误**: 检查是否继承了正确的 tsconfig
3. **样式不生效**: 确认 Tailwind content 配置包含对应文件路径
4. **Sanity 连接失败**: 检查环境变量是否正确配置
5. **AI 日志不记录**: 确保 `.ai/` 目录存在且有写入权限

### 清理缓存

```bash
# 清理所有缓存
rm -rf apps/*/.next apps/*/.turbo node_modules/.cache

# 重新安装依赖
pnpm install
```
