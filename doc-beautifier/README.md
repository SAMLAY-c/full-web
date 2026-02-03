# 智能文档美化系统 (Smart Document Beautifier)

一个将普通文档自动转换为精美HTML页面的系统。

## 项目结构

```
doc-beautifier/
├── bin/                          # CLI 入口
│   └── doc-beautify.js           # 命令行工具主入口
├── src/
│   ├── core/                     # 核心引擎
│   │   ├── index.js              # 主控制器
│   │   ├── pipeline.js           # 处理流程编排
│   │   └── config.js             # 配置管理
│   │
│   ├── parser/                   # 内容解析模块
│   │   ├── index.js              # 解析器入口
│   │   ├── markdown.js           # Markdown解析
│   │   ├── plain-text.js         # 纯文本解析
│   │   ├── docx.js               # Word文档解析
│   │   └── extractor.js          # 内容提取器（标题、摘要、关键词）
│   │
│   ├── analyzer/                 # 内容分析模块
│   │   ├── index.js              # 分析器入口
│   │   ├── structure.js          # 结构分析（章节层级）
│   │   ├── sentiment.js          # 情感/语气分析
│   │   ├── keywords.js           # 关键词提取
│   │   └── type-classifier.js    # 文章类型分类器
│   │
│   ├── search/                   # 智能搜索模块
│   │   ├── index.js              # 搜索管理器
│   │   ├── images/               # 图片搜索
│   │   │   ├── unsplash.js       # Unsplash API
│   │   │   ├── pexels.js         # Pexels API
│   │   │   └── ai-generator.js   # AI图片生成
│   │   ├── data/                 # 数据搜索
│   │   │   ├── wikipedia.js      # 维基百科引用
│   │   │   └── quotes.js         # 名言搜索
│   │   └── enricher.js           # 内容增强器
│   │
│   ├── templates/                # 模板系统
│   │   ├── index.js              # 模板管理器
│   │   ├── registry.js           # 模板注册表
│   │   ├── base/                 # 基础模板
│   │   │   ├── layout.js         # 布局基础类
│   │   │   └── styles.js         # 样式基础类
│   │   ├── themes/               # 主题配置
│   │   │   ├── light.js          # 浅色主题
│   │   │   ├── dark.js           # 深色主题
│   │   │   └── warm.js           # 暖色主题
│   │   └── presets/              # 预设模板
│   │       ├── magazine/         # 杂志风格
│   │       ├── minimal/          # 极简风格
│   │       ├── tech/             # 科技风格
│   │       └── literary/         # 文艺风格
│   │
│   ├── renderer/                 # 渲染引擎
│   │   ├── index.js              # 渲染器入口
│   │   ├── html.js               # HTML生成
│   │   ├── css.js                # CSS生成
│   │   ├── components/           # UI组件
│   │   │   ├── Hero.js           # 首屏组件
│   │   │   ├── Article.js        # 文章组件
│   │   │   ├── Section.js        # 章节组件
│   │   │   ├── Quote.js          # 引用组件
│   │   │   ├── ImageGallery.js   # 图库组件
│   │   │   ├── DataCard.js       # 数据卡片
│   │   │   └── Navigation.js     # 导航组件
│   │   └── animations/           # 动画效果
│   │       ├── scroll.js         # 滚动动画
│   │       └── interactions.js   # 交互动画
│   │
│   ├── assets/                   # 静态资源
│   │   ├── fonts/                # 字体文件
│   │   ├── icons/                # 图标
│   │   └── placeholders/         # 占位图
│   │
│   └── utils/                    # 工具函数
│       ├── logger.js             # 日志
│       ├── file.js               # 文件操作
│       ├── color.js              # 颜色处理
│       ├── typography.js         # 排版计算
│       └── validator.js          # 数据验证
│
├── config/                       # 配置文件
│   ├── default.json              # 默认配置
│   ├── templates.json            # 模板配置
│   └── api-keys.json             # API密钥（gitignore）
│
├── examples/                     # 示例文档
│   ├── input/                    # 输入示例
│   │   ├── sample-article.md
│   │   └── sample-report.docx
│   └── output/                   # 输出示例
│       └── sample-article.html
│
├── docs/                         # 文档
│   ├── architecture.md           # 架构文档
│   ├── templates.md              # 模板开发指南
│   └── api.md                    # API文档
│
├── tests/                        # 测试
│   ├── unit/                     # 单元测试
│   ├── integration/              # 集成测试
│   └── fixtures/                 # 测试数据
│
├── scripts/                      # 脚本工具
│   ├── setup.js                  # 初始化脚本
│   └── dev-server.js             # 开发服务器
│
├── .env.example                  # 环境变量示例
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## 核心工作流程

```
输入文档
    ↓
[1. 内容解析] → 提取标题、正文、章节
    ↓
[2. 内容分析] → 分析类型、情感、关键词
    ↓
[3. 信息搜索] → 搜索配图、数据、引用
    ↓
[4. 模板匹配] → 根据分析结果选择模板
    ↓
[5. 视觉生成] → 生成配色、字体、布局
    ↓
[6. 页面渲染] → 生成HTML/CSS/JS
    ↓
输出文件
```

## 快速开始

### 安装

```bash
npm install -g doc-beautifier
```

### 使用

```bash
# 基础使用
doc-beautify input.md -o output.html

# 指定模板和主题
doc-beautify input.md --template magazine --theme dark -o output.html

# 完整配置
doc-beautify input.md \
  --template magazine \
  --theme warm \
  --images ai \
  --animations true \
  --output output.html
```

## 配置说明

### 支持的输入格式

- Markdown (.md)
- 纯文本 (.txt)
- Word文档 (.docx)
- HTML (.html) - 重新美化

### 预设模板

1. **magazine** - 杂志风格，适合长文、深度报道
2. **minimal** - 极简风格，适合技术文档、教程
3. **tech** - 科技风格，适合产品发布、技术博客
4. **literary** - 文艺风格，适合散文、随笔
5. **corporate** - 企业风格，适合报告、白皮书

### 主题配色

- **light** - 明亮清爽
- **dark** - 深色沉浸
- **warm** - 温暖舒适
- **cool** - 冷色专业
- **vibrant** - 鲜艳活力

## 开发指南

### 添加新模板

1. 在 `src/templates/presets/` 下创建新文件夹
2. 创建 `index.js` 定义模板配置
3. 创建 `styles.css` 定义样式
4. 在 `src/templates/registry.js` 注册模板

### 添加新解析器

1. 在 `src/parser/` 下创建解析文件
2. 实现解析接口
3. 在 `src/parser/index.js` 添加支持

## 许可证

MIT License
