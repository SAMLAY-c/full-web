# Sanity Studio 自托管部署指南

## 🎯 目标
完全自主部署Sanity Studio，不依赖任何第三方托管服务，**零成本**。

## 📦 方案概述

### 架构
```
┌─────────────────┐
│  你的域名       │
│  (自己购买)     │
└────────┬────────┘
         │
    ┌────▼─────┐
    │ Nginx     │
    │ (Docker)  │
    └────┬─────┘
         │
    ┌────▼─────────┐
    │ Sanity Studio│
    │   (静态文件)  │
    └────┬─────────┘
         │
    ┌────▼────────────┐
    │ Sanity CMS API  │
    │  (免费计划)     │
    │  500GB/月      │
    └─────────────────┘
```

### 成本
- **Studio前端**：$0（部署到自己的服务器）
- **Sanity CMS API**：$0（免费计划，足够使用）
- **域名**：自己的域名（约$10/年）
- **服务器**：如果有VPS就用，没有就用免费的

---

## 🚀 部署方案（3选1）

### 方案1：部署到Vercel（最简单）

**优点**：
- 完全免费
- 全球CDN
- 自动HTTPS
- 自动部署

**步骤**：

#### 1. 访问Vercel创建项目
```
https://vercel.com/new
```

#### 2. 导入GitHub仓库
- 选择 `paulafortin445-blip/fullWeb`
- 点击 "Import"

#### 3. 配置项目
在Vercel项目配置页面：

| 设置项 | 值 |
|--------|-----|
| **Project Name** | `full-web-studio` |
| **Framework Preset** | `Other` |
| **Root Directory** | `apps/studio` |
| **Build Command** | `cd apps/studio && pnpm build` |
| **Output Directory** | `apps/studio/dist` |
| **Install Command** | `pnpm install` |

#### 4. 添加环境变量
```
SANITY_STUDIO_PROJECT_ID = h8272qgq
SANITY_STUDIO_DATASET = production
```

#### 5. 部署
- 点击 "Deploy"
- 获得URL：`https://full-web-studio.vercel.app`

#### 6. 绑定自定义域名（可选）
- 项目设置 → Domains → Add Domain
- 输入你的域名，如 `studio.yourdomain.com`
- 配置DNS：`CNAME studio → cname.vercel-dns.com`

**总成本**: $0 ✅

---

### 方案2：使用Docker部署到自己的VPS

**优点**：
- 完全掌控
- 可以部署到任何支持Docker的服务器
- 适合有VPS的用户

#### 前提条件
- 一台VPS服务器（1GB内存以上即可）
- 安装了Docker
- 有一个域名（可选）

#### 步骤1：构建Docker镜像

```bash
# 在项目根目录执行
docker build -t sanity-studio -f apps/studio/Dockerfile .
```

#### 步骤2：运行Docker容器

```bash
docker run -d \
  --name sanity-studio \
  -p 8080:80 \
  sanity-studio
```

#### 步骤3：配置反向代理（如果有域名）

使用Nginx作为反向代理：

```nginx
server {
    listen 80;
    server_name studio.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 步骤4：配置SSL（推荐）

使用Let's Encrypt免费证书：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d studio.yourdomain.com
```

**访问地址**：`http://your-vps-ip:8080` 或 `https://studio.yourdomain.com`

**总成本**: $0（如果已有VPS） ✅

---

### 方案3：部署到GitHub Pages（完全免费）

#### 步骤1：创建构建脚本

```bash
#!/bin/bash
cd apps/studio
pnpm build
cp -r dist ../docs/studio
```

#### 步骤2：推送到GitHub

```bash
git add apps/studio/dist
git commit -m "Build Studio"
git push
```

#### 步骤3：在GitHub设置Pages

1. 仓库 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `/docs/studio`
4. 点击Save

**访问地址**：`https://paulafortin445-blip.github.io/fullWeb/studio`

**总成本**: $0 ✅

---

## 🔧 技术细节

### Studio配置文件

**apps/studio/sanity.config.ts**：
```typescript
export default defineConfig({
  name: "studio",
  title: "Blog Studio",
  projectId: "h8272qgq",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});
```

### 构建产物

构建后生成的文件在 `apps/studio/dist/` 目录：
- HTML文件
- JavaScript bundle
- CSS样式
- 静态资源

这些都是纯静态文件，可以部署到任何Web服务器。

### 连接Sanity CMS

Studio通过API连接到Sanity CMS，使用的是：
- **Project ID**: `h8272qgq`
- **Dataset**: `production`

这些配置在 `apps/studio/.env` 文件中：
```env
SANITY_STUDIO_PROJECT_ID=h8272qgq
SANITY_STUDIO_DATASET=production
```

**重要**：Studio是纯前端应用，所有内容管理操作都通过API调用Sanity CMS，所以：
- ✅ Studio可以部署在任何地方
- ✅ 数据存储在Sanity（免费计划）
- ✅ 你可以完全控制前端部署

---

## 💡 为什么这个方案是免费的？

### Sanity免费计划包含：
- ✅ 无限API请求
- ✅ 500GB/月带宽
- ✅ 无限用户
- ✅ 无限文档
- ✅ 实时协作
- ✅ Webhook支持

对于个人博客或中小型项目，**完全够用**。

### 真正需要付费的情况：
- 月流量超过500GB
- 需要更多高级功能
- 需要优先级支持

---

## 📊 方案对比总结

| 方案 | 适合场景 | 技术要求 | 成本 |
|------|---------|---------|------|
| **Vercel** | 想快速上线 | 无（自动部署） | $0 |
| **Docker+VPS** | 有自己的服务器 | Docker基础 | $0（已有VPS） |
| **GitHub Pages** | 纯静态托管 | Git基础 | $0 |

---

## 🎯 我的推荐

**最简单**：方案1（Vercel）
- 只需点击几次按钮
- 5分钟完成部署
- 自动HTTPS和CDN

**最灵活**：方案2（Docker）
- 完全掌控
- 可以部署到任何服务器
- 适合有VPS的用户

**完全零依赖**：方案3（GitHub Pages）
- 只需GitHub账号
- 完全免费
- 适合测试或个人项目

---

## ❓ 你想选择哪个方案？

1. **Vercel** - 我帮你配置
2. **Docker + VPS** - 我提供详细步骤
3. **GitHub Pages** - 我创建自动化脚本

告诉我你的选择，我来帮你实现！🚀
