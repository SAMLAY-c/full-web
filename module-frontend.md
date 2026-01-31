# 模块：前端

## 作用
- 负责站点与平台的页面渲染、交互与样式展示（Next.js App Router + React + Tailwind）。

## 目录与边界
- `apps/blog/app/`：博客前台与管理前台页面（含课程、博客、AI 工作日志）。
- `apps/blog/components/`：博客站点的 UI 组件与模板。
- `apps/platform/app/`：平台站点页面与路由。
- `apps/platform/components/`：平台 UI 组件。
- `apps/portfolio/app/`：作品集站点页面与路由。
- `packages/ui/src/`：跨应用复用的 UI 组件库。
- `apps/*/app/globals.css`：全局样式入口。

## 关键路由与页面
- 博客主页面：`apps/blog/app/page.tsx`
- 博客列表：`apps/blog/app/blog/page.tsx`
- 博客详情：`apps/blog/app/blog/[slug]/page.tsx`
- 课程详情：`apps/blog/app/course/[slug]/page.tsx`
- 管理入口：`apps/blog/app/admin/markdown/page.tsx`
- AI 工作日志：`apps/blog/app/ai-worklog/page.tsx`
- 平台首页：`apps/platform/app/page.tsx`
- 平台仪表盘：`apps/platform/app/dashboard/page.tsx`
- 平台 SOP：`apps/platform/app/sops/page.tsx`
- 平台资源页：`apps/platform/app/resources/page.tsx`
- 作品集首页：`apps/portfolio/app/page.tsx`

## 代表性组件
- 博客模板：`apps/blog/components/templates/ArticlePostTemplate.tsx`
- 视频模板：`apps/blog/components/templates/VideoPostTemplate.tsx`
- 业务组件：`apps/blog/components/business/VideoPlayer.tsx`
- 公共 UI：`packages/ui/src/button.tsx`

## 样式与主题
- 博客：`apps/blog/app/globals.css`
- 平台：`apps/platform/app/globals.css`
- 作品集：`apps/portfolio/app/globals.css`

## 关联模块
- 依赖配置模块的构建与 TypeScript/Tailwind 配置。
- 依赖后端模块提供 API/数据。
