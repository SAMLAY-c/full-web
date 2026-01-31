# 模块：后端

## 作用
- 处理服务端 API、数据访问与服务逻辑（主要为 Next.js Route Handlers + 脚本客户端）。

## 目录与边界
- `apps/blog/app/api/`：博客站点的服务端 API 路由。
- `apps/blog/lib/`：数据访问、类型、Sanity 客户端与查询定义。
- `server.js`：根目录 Node 服务器入口（若用于自定义服务或开发代理）。

## API 路由
- 发布草稿：`apps/blog/app/api/draft/route.ts`
- 拉取 AI 日志：`apps/blog/app/api/ai-logs/route.ts`
- 发布内容：`apps/blog/app/api/publish/route.ts`

## 数据与服务层
- Sanity 客户端：`apps/blog/lib/sanity/client.ts`
- 脚本用客户端：`apps/blog/lib/sanity/script-client.ts`
- 查询定义：`apps/blog/lib/sanity.queries.ts`
- 图片处理：`apps/blog/lib/sanity.image.ts`
- 文章服务：`apps/blog/lib/service/posts.ts`
- 类型定义：`apps/blog/lib/types.ts`
- 环境变量封装：`apps/blog/lib/env.ts`

## 关联模块
- 与“内容模块”共享文章/MDX 资源。
- 与“脚本模块”共享脚本级数据操作能力。
