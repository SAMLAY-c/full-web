# 本地历史版本管理系统

## 功能特性

✅ **永久保存** - 不依赖 Sanity 30 天限制，本地永久存储  
✅ **行级对比** - 精确到每一行的增删改对比  
✅ **自动记录** - 每次保存文章自动创建版本  
✅ **一键恢复** - 可恢复到任意历史版本  
✅ **备份导出** - 支持完整备份所有历史  

## 文件结构

```
.history/
  ├── article-slug-1.jsonl    # 文章1的所有版本（JSON Lines格式）
  ├── article-slug-2.jsonl    # 文章2的所有版本
  └── ...

.backups/
  ├── history-backup-2024-01-15T10-30-00-000Z.json
  └── ...
```

## 使用方式

### 1. 自动记录（已集成）

每次在管理后台保存文章时，系统会自动记录历史版本：
- 路径：`/admin/write` → 保存文章
- 自动保存到：`.history/{slug}.jsonl`

### 2. 查看历史

访问：`http://localhost:3000/admin/history`

功能：
- 输入文章 slug 查看所有版本
- 选择两个版本进行对比
- 查看每行的具体变更（新增/删除/修改）
- 恢复任意版本

### 3. 手动创建版本（API）

```bash
# 保存新版本
curl -X POST http://localhost:3000/api/history \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-article",
    "title": "文章标题",
    "content": "文章内容...",
    "excerpt": "摘要",
    "tags": ["AI", "教程"],
    "status": "draft",
    "author": "admin",
    "changeSummary": "修改了第三节内容"
  }'

# 获取历史版本
curl "http://localhost:3000/api/history?slug=my-article"

# 对比两个版本
curl -X PATCH http://localhost:3000/api/history \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-article",
    "oldVersionId": "my-article_1705312800000_a1b2c3",
    "newVersionId": "my-article_1705316400000_d4e5f6"
  }'

# 创建完整备份
curl -X POST http://localhost:3000/api/history/backup
```

## 数据格式

### 版本记录（JSON Lines）

每行是一个 JSON 对象：

```json
{
  "id": "my-article_1705312800000_a1b2c3",
  "timestamp": 1705312800000,
  "date": "2024-01-15T10:00:00.000Z",
  "slug": "my-article",
  "title": "文章标题",
  "excerpt": "文章摘要",
  "content": "完整文章内容...",
  "tags": ["AI", "教程"],
  "status": "draft",
  "author": "admin",
  "changeSummary": "修改了第三节内容"
}
```

### 差异对比结果

```typescript
{
  lineNumber: 42,        // 行号
  type: "modified",      // 类型：added/removed/modified
  oldContent: "旧文本",   // 修改前的内容
  newContent: "新文本"    // 修改后的内容
}
```

## 长期项目建议

### 1. 定期备份

```bash
# 手动触发备份
curl -X POST http://localhost:3000/api/history/backup

# 或使用脚本
cd apps/blog
node scripts/backup-history.js
```

### 2. Git 忽略

`.gitignore` 已配置：
```
.history/
.backups/
```

**建议**：将备份文件单独 Git 管理：
```bash
# 创建专门的备份仓库
git init blog-history-backup
cp .backups/* blog-history-backup/
cd blog-history-backup && git add . && git commit -m "Backup"
```

### 3. 清理旧版本（可选）

如果单个文章版本过多（>1000）：

```typescript
import { cleanupOldVersions } from "@/lib/versioning/history";

// 只保留最近 100 个版本
await cleanupOldVersions("article-slug", 100);
```

## 与 Sanity 历史版本的对比

| 特性 | Sanity 历史 | 本地方案 |
|------|-------------|----------|
| 保存时长 | 30 天（免费版） | 永久 |
| 对比粒度 | 字段级 | 行级 |
| 存储位置 | 云端 | 本地 |
| 离线访问 | ❌ | ✅ |
| 自动备份 | ❌ | ✅ |
| 导出备份 | 困难 | 一键导出 |

## 故障排查

**问题1：历史记录没有保存**
- 检查 `.history/` 目录权限
- 查看控制台是否有错误日志

**问题2：对比功能报错**
- 确保选择了两个不同的版本
- 检查版本 ID 是否正确

**问题3：备份文件太大**
- 定期清理旧版本
- 只备份重要文章的完整历史
