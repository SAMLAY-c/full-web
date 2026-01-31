# Markdown 样式模板系统

一个灵活的、可切换的markdown渲染样式系统，让你的博客可以轻松拥有不同的视觉风格。

## 📁 目录结构

```
lib/markdown-templates/
├── types.ts              # TypeScript 类型定义
├── registry.ts           # 模板注册表
├── config.ts             # 当前使用的模板配置
├── index.ts              # 统一导出
├── README.md             # 本文档
└── default/              # 默认模板
    ├── index.ts          # 模板入口
    ├── components.tsx    # PortableText组件配置
    ├── typography.ts     # Tailwind Typography配置
    └── styles.ts         # 全局CSS样式
```

## 🎨 使用方法

### 1. 切换模板

编辑 `config.ts` 文件：

```typescript
// 切换到不同的模板
export const CURRENT_TEMPLATE_ID = "minimal";
```

### 2. 在组件中使用模板

```typescript
import { getCurrentTemplate } from "@/lib/markdown-templates/config";

const template = getCurrentTemplate();

// 使用模板的组件配置
<PortableText value={content} components={template.components} />

// 使用模板的样式
<div className="prose prose-lg">
  {/* 内容 */}
</div>
```

## 📝 创建新模板

### 步骤1: 创建模板目录

```bash
mkdir lib/markdown-templates/minimal
```

### 步骤2: 创建模板文件

创建 `minimal/index.ts`:

```typescript
import type { MarkdownTemplate } from "../types";
import { components } from "./components";
import { typographyTheme } from "./typography";
import { globalStyles } from "./styles";

export const minimalTemplate: MarkdownTemplate = {
  id: "minimal",
  name: "极简主题",
  description: "简洁清爽的博客样式",
  version: "1.0.0",
  category: "minimal",

  typographyTheme,
  components,
  globalStyles,
};
```

### 步骤3: 实现组件配置

创建 `minimal/components.tsx` 并实现你的 PortableText 组件。

### 步骤4: 实现样式配置

创建 `minimal/typography.ts` 和 `minimal/styles.ts`。

### 步骤5: 注册模板

在 `registry.ts` 中注册：

```typescript
import { minimalTemplate } from "./minimal";

export const templateRegistry: TemplateRegistry = {
  default: defaultTemplate,
  minimal: minimalTemplate,  // 添加这行
};
```

## 🎯 模板配置项

每个模板包含以下配置：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `id` | `string` | 唯一标识符 |
| `name` | `string` | 显示名称 |
| `description` | `string` | 模板描述 |
| `version` | `string` | 版本号 |
| `typographyTheme` | `object` | Tailwind Typography配置 |
| `components` | `object` | PortableText组件配置 |
| `globalStyles` | `string` | 全局CSS样式 |
| `codeBlockConfig` | `object` | 代码块配置 |
| `colors` | `object` | 主题颜色 |

## 🌈 主题定制

### 自定义颜色

在模板配置中定义颜色：

```typescript
colors: {
  primary: "#007acc",
  secondary: "#6c757d",
  accent: "#28a745",
  // ...
}
```

### 自定义字体

在 `typography.ts` 中配置：

```typescript
h1: {
  fontFamily: 'var(--font-display)',
  fontWeight: '700',
  // ...
}
```

### 自定义组件样式

在 `components.tsx` 中配置：

```typescript
code: ({ children }) => (
  <code className="your-custom-classes">
    {children}
  </code>
)
```

## 📚 内置模板

### Default（默认主题）

- **特点**: 专业、现代、功能完整
- **适用**: 技术博客、文档网站
- **特性**: 代码高亮、深色模式、响应式

### Minimal（极简主题）

- **特点**: 简洁、清爽、快速加载
- **适用**: 个人博客、随笔
- **特性**: 基础样式、极简设计

## 🔧 高级用法

### 动态切换模板

```typescript
import { getTemplate } from "@/lib/markdown-templates";

function MyComponent({ templateId }) {
  const template = getTemplate(templateId);
  return <PostBody template={template} content={content} />;
}
```

### 扩展现有模板

```typescript
import { defaultTemplate } from "./default";

export const myCustomTemplate = {
  ...defaultTemplate,
  id: "my-custom",
  name: "我的自定义模板",
  // 覆盖特定配置
  colors: {
    ...defaultTemplate.colors,
    primary: "#ff6b6b",
  },
};
```

## 📖 相关资源

- [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 🤝 贡献

欢迎创建新的模板并分享给社区！

## 📄 许可

MIT
