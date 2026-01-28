# 后端 API 接口清单

## 服务地址（本地开发）
- Blog: `http://localhost:3456`
- Portfolio: `http://localhost:3457`
- Platform: `http://localhost:3458`

> 当前只有 Blog 应用包含后端 API（`/api/*`）。

---

## 1) 发布文章（Sanity 写入）
- 路径：`POST /api/publish`
- 位置：`apps/blog/app/api/publish/route.ts`
- 说明：通过后端写入/覆盖 Sanity 中的 `post` 文档。
- 依赖环境变量：
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_WRITE_TOKEN`

请求体（JSON）：
```json
{
  "title": "string",
  "slug": "string",
  "postType": "article" | "video",
  "excerpt": "string (optional)",
  "status": "draft" | "published" (optional, default: published),
  "videoUrl": "string (optional)",
  "content": [] (optional, Portable Text blocks)
}
```

成功响应：
```json
{
  "ok": true,
  "result": { "_id": "post.<slug>", "_type": "post", ... }
}
```

错误响应：
- `500`：Sanity client 未配置
- `400`：缺少必填字段（title / slug / postType）

---

## 2) 自动写草稿（Sanity 写入 Draft）
- 路径：`POST /api/draft`
- 位置：`apps/blog/app/api/draft/route.ts`
- 说明：自动写入草稿，`status` 固定为 `draft`，用于人工审核后再发布。
- 依赖环境变量：
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_WRITE_TOKEN`

请求体（JSON）：
```json
{
  "title": "string",
  "slug": "string",
  "postType": "article" | "video",
  "excerpt": "string (optional)",
  "videoUrl": "string (optional)",
  "content": [] (optional, Portable Text blocks)
}
```

成功响应：
```json
{
  "ok": true,
  "result": { "_id": "post.<slug>", "_type": "post", ... }
}
```

错误响应：
- `500`：Sanity client 未配置
- `400`：缺少必填字段（title / slug / postType）

---

## 3) 读取 AI 日志
- 路径：`GET /api/ai-logs`
- 位置：`apps/blog/app/api/ai-logs/route.ts`
- 说明：读取本地 `.ai/worklog.jsonl`，返回日志列表（倒序）。
- 依赖：本地文件 `../../.ai/worklog.jsonl`

成功响应：
```json
{ "logs": [ ... ] }
```

失败响应：
- 文件不存在或解析失败时仍返回 `200`，但 `logs: []`

---

## 说明
- 当前仅有以上三个后端接口。
- Sanity Studio 不是 API 接口，它是独立后台应用（`apps/studio`）。
