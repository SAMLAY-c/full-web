# Markdown 模板系统 - 快速上手指南

## 🎯 当前模板系统

你的博客现在有两个markdown样式模板：

### 1. **Default（默认主题）** ⭐ 当前使用
- 🎨 专业、现代的博客样式
- ✨ 完整功能：代码高亮、深色模式、响应式
- 🎯 适合：技术博客、教程文章
- 🎭 使用品牌色系（蓝色系）

### 2. **Minimal（极简主题）**
- 🎨 简洁清爽的样式
- ⚡ 快速加载，无多余装饰
- 🎯 适合：个人随笔、简洁风格博客
- 🎭 使用中性色调（灰色系）

---

## 🔄 切换模板

### 方法1：修改配置文件（推荐）

编辑 `lib/markdown-templates/config.ts`:

```typescript
// 切换到极简主题
export const CURRENT_TEMPLATE_ID = "minimal";

// 切换回默认主题
export const CURRENT_TEMPLATE_ID = "default";
```

### 方法2：动态切换（高级）

```typescript
import { getTemplate } from "@/lib/markdown-templates";

// 在组件中动态使用不同模板
const template = getTemplate("minimal");
<PostBody content={content} components={template.components} />
```

---

## 📋 模板对比

| 特性 | Default | Minimal |
|------|---------|---------|
| 标题样式 | 粗体、下划线装饰 | 简洁、无装饰 |
| 代码高亮 | ✅ 深色主题 | ⚪ 浅色主题 |
| 行号显示 | ✅ 默认开启 | ❌ 默认关闭 |
| 引用块 | 品牌色边框+背景 | 灰色细边框 |
| 链接样式 | 彩色下划线+外链标识 | 简洁下划线 |
| 动画效果 | ✅ 平滑过渡 | ⚪ 最小化 |
| 颜色主题 | 蓝色品牌色 | 中性灰色 |

---

## 🎨 创建自己的模板

### 快速创建步骤

1. **复制现有模板**
```bash
cp -r lib/markdown-templates/default lib/markdown-templates/my-theme
```

2. **修改配置**
编辑 `my-theme/index.ts`:
```typescript
export const myThemeTemplate: MarkdownTemplate = {
  id: "my-theme",  // 修改ID
  name: "我的主题",
  description: "自定义主题描述",
  // ... 其他配置
};
```

3. **自定义样式**
- 修改 `components.tsx` - 调整组件样式
- 修改 `typography.ts` - 调整排版样式
- 修改 `styles.ts` - 添加自定义CSS

4. **注册模板**
在 `registry.ts` 中添加:
```typescript
import { myThemeTemplate } from "./my-theme";

export const templateRegistry: TemplateRegistry = {
  default: defaultTemplate,
  minimal: minimalTemplate,
  "my-theme": myThemeTemplate,  // 添加这行
};
```

5. **开始使用**
```typescript
export const CURRENT_TEMPLATE_ID = "my-theme";
```

---

## 💡 使用示例

### 在PostBody组件中使用

```typescript
import { getCurrentTemplate } from "@/lib/markdown-templates/config";

export default function PostBody({ content }: Props) {
  const template = getCurrentTemplate();

  return (
    <div className="prose prose-lg">
      <PortableText
        value={content}
        components={template.components}
      />
    </div>
  );
}
```

### 自定义颜色主题

```typescript
// 在你的模板配置中
export const customTemplate: MarkdownTemplate = {
  // ... 其他配置
  colors: {
    primary: "#ff6b6b",      // 主色调（红色）
    secondary: "#4ecdc4",    // 次要色（青色）
    accent: "#ffe66d",       // 强调色（黄色）
    background: "#ffffff",
    text: "#2d3436",
    code: "#ff6b6b",
    link: "#0984e3",
  },
};
```

---

## 🔧 常见问题

### Q: 切换模板后需要重启开发服务器吗？
A: 不需要！模板切换是即时的。

### Q: 可以混合使用多个模板吗？
A: 可以！在不同的页面或组件中使用不同的模板：
```typescript
// 文章详情页使用默认模板
const articleTemplate = getTemplate("default");

// 首页使用极简模板
const homeTemplate = getTemplate("minimal");
```

### Q: 如何修改默认模板的颜色？
A: 编辑 `default/index.ts` 中的 `colors` 配置：
```typescript
colors: {
  primary: "#your-color",
  // ...
}
```

### Q: 模板会影响网站其他部分吗？
A: 不会！模板只影响markdown内容的渲染，不会影响网站的整体布局和其他组件。

---

## 📚 下一步

- 📖 阅读完整文档：[README.md](./README.md)
- 🎨 查看默认模板源码：`default/` 目录
- 🚀 创建你的第一个模板！

---

## 🎉 开始使用

现在就试试切换到极简主题吧！

1. 打开 `lib/markdown-templates/config.ts`
2. 修改 `CURRENT_TEMPLATE_ID = "minimal"`
3. 刷新浏览器查看效果

享受你的新markdown样式！✨
