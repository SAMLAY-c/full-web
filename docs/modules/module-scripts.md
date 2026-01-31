# 模块：脚本

## 作用
- 提供内容导入、检查、发布、调试等离线任务脚本。

## 目录与边界
- `apps/blog/scripts/`：博客内容与 Sanity 的脚本工具。
- `scripts/ai-log/`：AI 日志相关脚本。
- `.claude/scripts/`：Claude 辅助脚本（记录提示、失败日志、复盘）。

## 博客脚本清单
- 批量发布草稿：`apps/blog/scripts/publish-all-drafts.ts`
- 导入 Markdown：`apps/blog/scripts/import-markdown.ts`
- 创建文章：`apps/blog/scripts/create-post.js`
- 检查重复与一致性：`apps/blog/scripts/check-unique-posts.ts`
- 检查全部文章：`apps/blog/scripts/check-all-posts.ts`
- 检查文档：`apps/blog/scripts/check-documents.ts`
- 调试查询：`apps/blog/scripts/debug-query.ts`
- 测试查询：`apps/blog/scripts/test-query.ts`
- 删除重复文章：`apps/blog/scripts/delete-duplicate-post.ts`
- 校验发布查询：`apps/blog/scripts/check-published-query.ts`

## AI 日志脚本
- 通用函数：`scripts/ai-log/common.sh`
- Claude 结束回调：`scripts/ai-log/claude_stop.sh`
- Claude 工具调用回调：`scripts/ai-log/claude_posttooluse.sh`
- Codex 工具：`scripts/ai-log/codexw`

## 关联模块
- 依赖后端模块中的 Sanity 客户端与查询。
- 依赖配置模块提供 TS/Node 运行环境。
