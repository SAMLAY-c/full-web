# 置顶文章功能使用指南

## ✨ 功能说明

已为Blog系统添加置顶文章功能，支持：
- ✅ 文章置顶开关
- ✅ 置顶顺序控制
- ✅ 置顶标记显示
- ✅ 智能排序（置顶文章优先，然后按时间倒序）

## 🎯 使用方法

### 方法1：通过Sanity Studio设置（推荐）

1. **访问Sanity Studio**
   ```
   http://localhost:3333
   ```

2. **打开文章编辑**
   - 点击左侧"文章/视频 (Post)"
   - 选择要置顶的文章
   - 进入编辑页面

3. **设置置顶**
   - 找到"是否置顶"字段
   - 切换开关为 **ON**
   - 设置"置顶顺序"（数字越小越靠前，如：1, 2, 3）
   - 点击右上角"Publish"保存

### 方法2：通过本地API设置

使用提供的脚本：

```bash
# 设置文章为置顶（顺序1）
cd apps/blog
node scripts/set-pinned-post.js <article-slug> true 1

# 示例：设置Vibe Coding文章为置顶
node scripts/set-pinned-post.js vibecoding-2026 true 1

# 取消置顶
node scripts/set-pinned-post.js vibecoding-2026 false
```

### 方法3：通过PATCH API

```bash
curl -X PATCH http://localhost:3002/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["post-id-1", "post-id-2"],
    "updates": {
      "isPinned": true,
      "pinOrder": 1
    }
  }'
```

## 📊 排序规则

文章显示顺序：
1. **置顶文章**（isPinned = true）
   - 按 `pinOrder` 升序（1, 2, 3...）
2. **普通文章**（isPinned = false或不设置）
   - 按 `publishedAt` 降序（最新的在前）

## 🎨 前端显示

### 置顶标记
置顶的文章卡片左上角会显示：
- 📌 橙色圆角徽章
- 图钉图标 + "置顶"文字

### 卡片样式
- 置顶文章与普通文章样式相同
- 只是多了置顶标记
- 鼠标悬停效果一致

## 🔧 技术实现

### Sanity Schema
文件：`apps/studio/schemaTypes/post.ts`

添加了两个新字段：
```typescript
{
  name: "isPinned",
  title: "是否置顶",
  type: "boolean",
  initialValue: false
},
{
  name: "pinOrder",
  title: "置顶顺序",
  type: "number",
  hidden: ({ document }) => !document?.isPinned,
  initialValue: 99
}
```

### GROQ查询
文件：`apps/blog/lib/service/posts.ts`

排序逻辑：
```javascript
order(isPinned desc, pinOrder asc, publishedAt desc)
```

解释：
- `isPinned desc`：置顶的在前（true > false）
- `pinOrder asc`：顺序号小的在前
- `publishedAt desc`：发布时间新的在前

### UI组件
- **BlogCard**：显示置顶徽章
- **BlogList**：传递isPinned属性
- **API路由**：支持置顶字段查询和排序

## 📝 使用示例

### 示例1：置顶3篇重要文章

1. 在Studio中设置：
   - "Vibe Coding" → 置顶=ON, 顺序=1
   - "Next.js最佳实践" → 置顶=ON, 顺序=2
   - "AI产品经理面试题" → 置顶=ON, 顺序=3

2. 显示效果：
   ```
   📌 Vibe Coding
   📌 Next.js最佳实践
   📌 AI产品经理面试题
   从零开始做独立开发者
   API Test Post 002
   ...
   ```

### 示例2：取消置顶

在Studio中：
- 将"是否置顶"切换为 **OFF**
- 点击"Publish"保存

文章会自动回到正常排序（按时间倒序）。

## 🛠️ 故障排除

### 问题：置顶文章没有显示在最前面

**解决方案**：
1. 检查 `isPinned` 是否为 `true`
2. 检查 `pinOrder` 值（应该是最小的）
3. 刷新浏览器（清除缓存）
4. 重新构建：`pnpm build --filter=@apps/blog`

### 问题：看不到置顶字段

**解决方案**：
1. 确保Studio正在运行：`http://localhost:3333`
2. 重启Studio服务
3. 检查schema是否正确更新

### 问题：API返回的文章没有isPinned字段

**解决方案**：
1. 检查GROQ查询是否包含 `isPinned` 和 `pinOrder`
2. 确认文章已经重新保存（Publish）
3. 查看API响应：`http://localhost:3002/api/posts`

## 📚 相关文件

- `apps/studio/schemaTypes/post.ts` - Schema定义
- `apps/blog/lib/service/posts.ts` - 数据服务
- `apps/blog/components/business/BlogCard.tsx` - 卡片组件
- `apps/blog/components/business/BlogList.tsx` - 列表组件
- `apps/blog/app/api/posts/route.ts` - API路由
- `apps/blog/scripts/set-pinned-post.js` - 设置脚本

## 🎉 总结

置顶功能已完全集成到Blog系统中！

**核心特性**：
- ✅ 简单易用的Studio界面
- ✅ 灵活的排序规则
- ✅ 清晰的视觉标记
- ✅ 完整的API支持

现在你可以突出显示重要文章，提升用户阅读体验！
