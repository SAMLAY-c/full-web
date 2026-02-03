# 🎨 时尚杂志模板 - 快速使用指南

## 核心特性

✅ **左侧固定目录** - 所有章节一目了然  
✅ **划线评论系统** - 选中文本即可评论  
✅ **奢华黑金配色** - 高端时尚杂志风格  
✅ **丰富动效** - 渐入、滚动进度条、旋转装饰  
✅ **响应式设计** - 桌面端/移动端完美适配  

## 🚀 使用方法

### 方法1: 使用演示脚本（推荐）

```bash
# 进入项目目录
cd doc-beautifier

# 运行演示脚本（自动生成HTML）
node scripts/demo-fashion.js

# 查看生成的页面
open examples/output/fashion-magazine.html
```

### 方法2: 创建你自己的转换脚本

```javascript
// convert.js
const FashionMagazineTemplate = require('./src/templates/presets/magazine');
const fs = require('fs');

// 1. 读取你的Markdown文件
const markdown = fs.readFileSync('your-article.md', 'utf-8');

// 2. 解析内容（这里需要你自己解析或复用解析器）
const content = {
  title: '文章标题',
  summary: '文章摘要',
  author: '作者名',
  wordCount: 5000,
  structure: {
    sections: [
      { id: 'section-0', level: 2, title: '第一章', tokens: [...] },
      { id: 'section-1', level: 2, title: '第二章', tokens: [...] },
    ]
  },
  images: [
    { url: 'https://example.com/image1.jpg', description: '图片描述' }
  ]
};

// 3. 生成HTML
async function generate() {
  const template = new FashionMagazineTemplate();
  template.applyTheme('luxury'); // 或 'editorial' 浅色主题
  
  const html = await template.generateHTML(content, { theme: 'luxury' });
  fs.writeFileSync('output.html', html);
  console.log('✓ 生成完成!');
}

generate();
```

### 方法3: 集成到完整系统

```bash
# 安装依赖（未来完整版）
npm install

# 使用CLI工具
doc-beautify your-article.md --template fashion-magazine --output article.html
```

## 📁 项目结构（可复用部分）

```
doc-beautifier/
├── src/
│   └── templates/
│       └── presets/
│           └── magazine/
│               └── index.js  ⭐ 核心模板文件
├── examples/
│   ├── input/
│   │   └── sample-article.md  📄 Markdown示例
│   └── output/
│       └── fashion-magazine.html  🎨 生成的页面
└── scripts/
    └── demo-fashion.js  🔧 演示脚本
```

**你只需要复用这个文件：**
- `src/templates/presets/magazine/index.js` - 完整的模板逻辑

## 🎯 模板参数说明

### 主题选项

```javascript
template.applyTheme('luxury');  // 奢华黑金（深色）
template.applyTheme('editorial');  // 编辑浅色（浅色背景）
```

### 内容数据结构

```javascript
const content = {
  title: '文章标题',           // 必填：显示在首屏
  summary: '文章摘要',         // 可选：副标题
  author: '作者名',           // 可选：显示在元信息
  wordCount: 3000,            // 可选：计算阅读时间
  
  structure: {
    sections: [
      {
        id: 'section-0',      // 唯一标识
        level: 2,             // 标题层级 (h2=2, h3=3)
        title: '章节标题',    // 显示标题
        tokens: [             // 段落内容数组
          { type: 'inline', content: '段落文字' }
        ]
      }
    ]
  },
  
  images: [                   // 配图数组（可选）
    {
      url: '图片URL',
      description: '图片描述'
    }
  ]
};
```

## 💡 进阶使用

### 自定义配色

在 `generateCSS` 方法中修改颜色变量：

```css
:root {
  --bg: #0a0a0a;          /* 背景色 */
  --surface: #141414;     /* 卡片背景 */
  --text: #ffffff;        /* 主文字 */
  --text-muted: #888888;  /* 次要文字 */
  --primary: #d4af37;     /* 金色主色 */
  --accent: #ff3366;      /* 玫红强调 */
  --secondary: #00d4aa;   /* 青绿点缀 */
}
```

### 添加更多动效

在 `generateJS` 中添加自定义动画：

```javascript
// 自定义滚动效果
function customScrollEffect() {
  window.addEventListener('scroll', () => {
    // 你的动画逻辑
  });
}
```

### 修改首屏样式

在 `generateHTML` 中修改 Hero Section：

```javascript
<header class="hero">
  <!-- 修改背景、标题样式等 -->
</header>
```

## 🔧 集成到你的项目

### 方案A: 直接复制模板文件

1. 复制 `src/templates/presets/magazine/index.js` 到你的项目
2. 安装依赖：`npm install`（如果使用了fs-extra等包）
3. 创建转换脚本调用模板

### 方案B: 使用子目录

```bash
# 在你的项目中创建子目录
mkdir -p my-project/markdown-to-html

# 复制整个模板文件夹
cp -r doc-beautifier/src/templates/presets/magazine my-project/markdown-to-html/

# 创建入口文件
cat > my-project/convert.js << 'EOF'
const Template = require('./markdown-to-html/magazine');
// ... 你的代码
EOF
```

## 📝 Markdown 格式建议

为了获得最佳效果，你的Markdown应该包含：

```markdown
# 主标题（必需）

## 第一章标题
正文段落...

### 小节标题
更多内容...

## 第二章标题
...
```

**最佳实践：**
- 使用 `##` 作为主要章节
- 使用 `###` 作为小节
- 添加适当的段落和列表
- 可以包含图片引用（模板会自动处理）

## 🎨 效果预览

生成的页面包含：

1. **顶部进度条** - 金色渐变显示阅读进度
2. **左侧目录** - 固定显示，当前章节高亮
3. **全屏首屏** - 大标题 + 旋转装饰 + 渐入动画
4. **章节内容** - 优雅排版，首字下沉
5. **划线评论** - 选中文本弹出评论面板
6. **评论汇总** - 所有评论集中展示
7. **响应式** - 移动端目录自动隐藏

## 🤔 常见问题

### Q: 如何修改字体？
A: 在CSS中修改 `font-family`，已内置 Noto Serif SC（中文衬线）和 Inter（英文无衬线）

### Q: 评论数据存储在哪里？
A: 使用浏览器 localStorage，数据保存在用户本地

### Q: 如何在移动端显示目录？
A: 点击左上角的菜单按钮（需要添加移动端菜单按钮）

### Q: 可以支持更多Markdown语法吗？
A: 可以！在 `tokensToHTML` 方法中添加更多解析规则

## 🎉 开始创作

现在你只需要：

1. 写一篇Markdown格式的文章
2. 运行 `node scripts/demo-fashion.js`
3. 打开生成的HTML文件
4. 享受你的高端时尚杂志风格页面！

---

**Happy Creating!** ✨
