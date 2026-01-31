# 模块：共享包

## 作用
- 为多个应用提供可复用 UI 与工具能力。

## 包清单
- UI 组件库：`packages/ui/`
  - 入口：`packages/ui/src/index.ts`
  - 组件：`packages/ui/src/button.tsx`、`packages/ui/src/card.tsx`、`packages/ui/src/hero.tsx`、`packages/ui/src/product-card.tsx`、`packages/ui/src/project-grid.tsx`、`packages/ui/src/resume-button.tsx`
- 工具包：`packages/utils/`
  - 入口：`packages/utils/src/index.ts`
- 配置包：`packages/config/`
  - TS 基础配置：`packages/config/tsconfig.base.json`

## 关联模块
- 前端模块直接使用 UI 包。
- 配置模块复用 TS 基础配置。
