# 模块：工具与 CMS

## 作用
- 提供内容管理后台（Sanity Studio）与运行产物、日志等辅助工具。

## Sanity Studio
- 入口配置：`apps/studio/sanity.config.ts`
- Schema 定义：`apps/studio/schemaTypes/`
  - 项目：`apps/studio/schemaTypes/project.ts`
  - 分类：`apps/studio/schemaTypes/category.ts`
  - 资源：`apps/studio/schemaTypes/resource.ts`
  - SOP：`apps/studio/schemaTypes/sop.ts`
  - 站点配置：`apps/studio/schemaTypes/siteConfig.ts`
  - 文章：`apps/studio/schemaTypes/post.ts`
  - 汇总：`apps/studio/schemaTypes/index.ts`
- Studio 环境变量：`apps/studio/.env`

## 日志与工作流产物
- Claude 日志：`.claude-logs/`
- AI 工作日志：`.ai/worklog.jsonl`

## 关联模块
- 与后端模块的 Sanity 数据层对接。
- 与脚本模块协同完成导入、发布与校验。
