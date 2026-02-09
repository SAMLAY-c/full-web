# Netlify 部署指南

## ✅ 部署前准备

### 1. 环境变量配置

在 Netlify Dashboard → Site settings → Environment variables 中添加以下变量：

```bash
# Sanity CMS 配置（必需）
NEXT_PUBLIC_SANITY_PROJECT_ID=h8272qgq
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=skQZKSLPu2ko2UeEcwUWxiC8GsSns67F5FNqKP8hTKMJzCbcEgQqbbYcN5GLSv0H19IPNde8fR8DkGYpJfRSubOwcDGATb9w3erXg8fcBN3rKZq5VrPBEWUroHHoUavWJMkIx7aLJBz53oHguFDv5dfZzqIqcqWPogJWsYo0tIQzYnWN0p4z

# NextAuth 配置（必需）
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# AI API 配置（可选）
SILICONFLOW_API_KEY=sk-itnytfacpeobkvireovadmsrbonrgemrsnfgsqvhesjtyppz
AI_DEFAULT_PROVIDER=siliconflow
AI_DEFAULT_MODEL=deepseek-ai/DeepSeek-V3.2
AI_BASE_URL=https://api.siliconflow.cn/v1
```

### 2. 生成新的 NEXTAUTH_SECRET

```bash
# 在终端运行
openssl rand -base64 32
```

将生成的字符串作为 `NEXTAUTH_SECRET` 的值。

---

## 🚀 部署步骤

### 方法一：通过 Git 连接部署（推荐）

1. **将代码推送到 GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deploy"
   git push origin main
   ```

2. **在 Netlify 创建站点**
   - 登录 [Netlify](https://app.netlify.com/)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub → 选择你的仓库

3. **配置构建设置**
   - **Build command**: `pnpm install && cd apps/blog && pnpm build`
   - **Publish directory**: `apps/blog/.next`
   - **Node version**: 20

4. **添加环境变量**
   - 在部署设置中添加所有必需的环境变量

5. **点击 Deploy**

### 方法二：手动上传部署

1. **本地构建**
   ```bash
   cd apps/blog
   pnpm build
   ```

2. **上传部署**
   - 在 Netlify Dashboard 点击 "Add new site" → "Deploy manually"
   - 拖拽 `apps/blog/.next` 文件夹上传

---

## 📁 项目文件说明

### 已创建/修改的配置文件

| 文件 | 说明 |
|------|------|
| `netlify.toml` | Netlify 构建设置 |
| `apps/blog/next.config.mjs` | Next.js 配置（SSR 模式） |
| `apps/blog/app/course/[slug]/page.tsx` | 修复为支持静态生成 |
| `apps/blog/app/course/[slug]/CourseContent.tsx` | 分离的客户端组件 |

### 构建输出

- **输出目录**: `apps/blog/.next`
- **构建命令**: `pnpm install && cd apps/blog && pnpm build`
- **Node 版本**: 20

---

## 🔧 故障排查

### 常见问题

**1. 构建失败："Cannot find module"**
```bash
# 解决方案：确保 pnpm 安装依赖
rm -rf node_modules
pnpm install
```

**2. API 路由 404**
- 确保没有使用 `output: 'export'`（已修复）
- Netlify 支持 Next.js API 路由

**3. 图片加载失败**
- 已配置 `images.unoptimized: true`
- Sanity 图片域名已添加到配置

**4. 环境变量不生效**
- 检查变量名拼写
- 重新部署以应用新环境变量

---

## 📋 部署后检查清单

- [ ] 首页正常显示
- [ ] 文章列表正常加载
- [ ] 文章详情页可访问
- [ ] Sanity 数据正常获取
- [ ] 搜索功能正常
- [ ] 管理后台可访问（需登录）

---

## 🔗 部署后的 URL

- **主站**: `https://your-site.netlify.app`
- **管理后台**: `https://your-site.netlify.app/admin`
- **API**: `https://your-site.netlify.app/api/...`

---

## 💡 提示

1. **自定义域名**: 在 Netlify 设置中添加自定义域名
2. **HTTPS**: Netlify 自动提供 HTTPS
3. **预览部署**: 每个 Pull Request 自动生成预览链接
4. **回滚**: 可在部署历史中选择回滚到任意版本
