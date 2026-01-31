# 模块：配置

## 作用
- 管理构建、运行、类型检查、样式与工作区配置。

## 根目录配置
- 工作区配置：`pnpm-workspace.yaml`
- 包管理锁文件：`pnpm-lock.yaml`
- 任务编排：`turbo.json`
- 根包配置：`package.json`
- 环境变量：`.env.local`
- npm 配置：`.npmrc`
- Git 忽略：`.gitignore`

## 各应用配置
- 博客：`apps/blog/next.config.mjs`、`apps/blog/tailwind.config.ts`、`apps/blog/postcss.config.js`、`apps/blog/tsconfig.json`、`apps/blog/next-env.d.ts`
- 平台：`apps/platform/next.config.mjs`、`apps/platform/tailwind.config.ts`、`apps/platform/postcss.config.js`、`apps/platform/tsconfig.json`、`apps/platform/next-env.d.ts`
- 作品集：`apps/portfolio/next.config.mjs`、`apps/portfolio/tailwind.config.ts`、`apps/portfolio/postcss.config.js`、`apps/portfolio/tsconfig.json`、`apps/portfolio/next-env.d.ts`
- Studio：`apps/studio/sanity.config.ts`、`apps/studio/tsconfig.json`、`apps/studio/.env`

## 共享配置
- TS 基础配置：`packages/config/tsconfig.base.json`

## 关联模块
- 直接影响前端构建、后端 API 运行与脚本执行方式。
