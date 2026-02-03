# The Insider Library - 设计系统

## 设计理念

**风格**: 现代编辑风格 + 新粗野主义 (Modern Editorial + Neo-Brutalism)
- 深色主题配合鲜艳强调色
- 强烈的边框和阴影处理
- 清晰的视觉层次
- 专业但有记忆点

---

## 颜色系统

### 核心色板

| 变量 | 色值 | 用途 |
|------|------|------|
| `--slate-950` | `#0a0e1a` | 主背景色 |
| `--slate-900` | `#111827` | 卡片背景 |
| `--slate-800` | `#1e293b` | 悬浮背景 |
| `--slate-400` | `#94a3b8` | 次要文字 |
| `--slate-100` | `#f1f5f9` | 主要文字 |

### 强调色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--coral-500` | `#ff6b6b` | 主要强调色、CTA按钮 |
| `--coral-400` | `#ff8585` | Hover状态 |
| `--mint-500` | `#00d9a3` | 次要强调色、成功状态 |

### 边框

| 变量 | 值 | 用途 |
|------|-----|------|
| `--border-subtle` | `rgba(255,255,255,0.08)` | 分隔线 |
| `--border-standard` | `rgba(255,255,255,0.15)` | 卡片边框 |
| `--border-strong` | `rgba(255,255,255,0.25)` | Hover边框 |

---

## 字体系统

### 字体族

- **标题字体**: Chakra Petch (Google Fonts)
  - 几何感强，有科技未来感
  - 适用于所有标题和按钮

- **正文字体**: Outfit (Google Fonts)
  - 几何、现代、易读
  - 适用于正文和描述

### 字号层级

| 元素 | 大小 | 字重 |
|------|------|------|
| H1 | 3rem / 48px | 700 |
| H2 | 2rem / 32px | 600 |
| H3 | 1.5rem / 24px | 600 |
| 正文 | 1rem / 16px | 400 |
| 小字 | 0.75rem / 12px | 600 |

---

## 组件样式

### 按钮 (.btn)

```
.btn-primary    - 珊瑚色实心按钮，用于主要CTA
.btn-secondary  - 透明边框按钮，用于次要操作
.btn-ghost      - 透明无框按钮，用于链接
```

### 卡片 (.card)

- 背景: `--surface`
- 边框: 2px solid `--border-standard`
- 圆角: 16px
- Hover: 边框变亮 + 上移2px + 阴影

### 标签 (.tag)

```
.tag-primary   - 珊瑚色边框，用于主要标签
.tag-secondary - 薄荷色边框，用于次要标签
.tag-neutral   - 灰色边框，用于通用标签
```

### 状态指示 (.status)

```
.status-locked   - 红色发光点 (🔒 Locked)
.status-unlocked - 绿色发光点 (✓ Available)
```

---

## 使用示例

### 页面头部

```tsx
<header className="page-header">
  <p className="text-label text-coral-500">Section Label</p>
  <h1 className="font-display mt-4">Page Title</h1>
  <p className="mt-3 max-w-2xl">Description text...</p>
</header>
```

### 统计卡片

```tsx
<div className="stat-card">
  <p className="stat-label">Label</p>
  <p className="stat-value text-coral-500">15+</p>
</div>
```

### 资源卡片 (锁定状态)

```tsx
<div className="resource-card locked">
  {/* 内容 */}
</div>
```

---

## 间距系统

- **页面内边距**: `py-12 md:py-16`
- **容器最大宽度**: `max-w-5xl` (1024px)
- **卡片内边距**: `p-6`
- **网格间距**: `gap-6`
- **区块间距**: `mt-16`

---

## 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 文件结构

```
app/
├── globals.css          # 全局样式 + CSS变量
├── layout.tsx           # 字体配置
├── page.tsx             # 首页
├── dashboard/
│   └── page.tsx         # Dashboard
├── sops/
│   └── page.tsx         # SOP文档
├── resources/
│   └── page.tsx         # 资源下载
└── components/
    └── PricingCard.tsx  # 付费卡片组件
```

---

## 更新日志

### 2024-01
- ✅ 建立完整的颜色系统
- ✅ 配置 Chakra Petch + Outfit 字体
- ✅ 重写所有页面组件
- ✅ 统一深色主题风格
- ✅ 添加 hover 动效和微交互
