---
title: "md2wechat-skill"
date: "2026-02-03T05:26:34.428Z"
excerpt: "# md2wechat-skill 完整教程 | 用 Markdown 写公众号像发朋友圈一样简单 ## 项目介绍 去年我就在做公众号排版这件事。做了 Web 端的排版工具，做了 Obsidian 插件，做了飞书转公众号的浏览器插件，还开放了 API 服务。 > 💡 核心思考 > > \"能不能让写"
status: "published"
---
# md2wechat-skill 完整教程 | 用 Markdown 写公众号像发朋友圈一样简单

## 项目介绍

去年我就在做公众号排版这件事。做了 Web 端的排版工具，做了 Obsidian 插件，做了飞书转公众号的浏览器插件，还开放了 API 服务。

> 💡 核心思考
>
> "能不能让写公众号更高效一点？文章本身就够耗时的，写完还要排版、配图、上传、发布……一套流程下来，大量重复性的工作现在已经有解决方案了。"

今年 Claude Agent Skills 热度挺高的，我就在想：能不能把这些工具整合成一个 Skill，在 Claude Code 里一站式搞定？

说干就干。从 v1.0.0 到现在，前前后后迭代了七八个版本。

## md2wechat-skill 是什么？

一句话说明白：**用 Markdown 写公众号文章，一键转换成精美排版，自动发到微信草稿箱。**

🎯 **核心理念**
让写公众号像发朋友圈一样简单

## 六大核心功能

### 排版转换

最基础的功能。你写好 Markdown，它帮你转成微信能用的格式。支持标题、列表、代码块、引用……常用的格式都能处理。

### 多主题样式

内置了好几个主题：**秋日暖光**、**春日清新**、**深海静谧**……根据文章风格选一个就行，排出来还挺好看的。不用自己调 CSS，省心。

### 写作助手

你只需要给一个想法，比如「我觉得自律是个伪命题」，它就能帮你生成一篇完整的文章。目前内置了 **Dan Koe** 风格，那种深刻但不装、犀利但接地气的调调。你也可以自定义风格。

### AI 生图

写完文章还差个封面？它会根据文章内容，自动生成一个匹配的封面提示词。你把提示词扔给 AI 画图工具，就是一个完整的封面了。

### AI 去痕

AI 写的文章有个通病：开头废话多、大词一堆、强行三段式。这个功能专门解决这个问题，识别这些套路，然后重写。让 AI 写的东西听起来更像人写的。

### 一键发草稿箱

转换完直接发到微信草稿箱，不用复制粘贴，不用来回切换，然后进行微调一下就能发布了。

## 怎么用？很简单

### 方式一：Claude Code 插件（推荐）

最简单的方式，适合已经在使用 Claude Code 的用户

**第一步：安装插件**

```bash
# 添加插件市场
/plugin marketplace add geekjourneyx/md2wechat-skill

# 安装插件
/plugin install md2wechat@geekjourneyx-md2wechat-skill
```

**第二步：直接对话使用**

**简单转换：**
「用秋日暖光主题，把 article.md 转成微信格式」

**一键全流程：**
「用 Dan Koe 风格写一篇关于 XX 的文章，然后发到草稿箱」

### 方式二：命令行工具

适合习惯使用终端的高级用户

**选择你的系统：**

**macOS**

Apple Silicon (M1/M2/M3/M4):

```bash
curl -Lo md2wechat https://github.com/geekjourneyx/md2wechat-skill/releases/latest/download/md2wechat-darwin-arm64
chmod +x md2wechat
sudo mv md2wechat /usr/local/bin/
```

Intel 芯片:

```bash
curl -Lo md2wechat https://github.com/geekjourneyx/md2wechat-skill/releases/latest/download/md2wechat-darwin-amd64
chmod +x md2wechat
sudo mv md2wechat /usr/local/bin/
```

**Linux**

Intel/AMD (x86_64):

```bash
curl -Lo md2wechat https://github.com/geekjourneyx/md2wechat-skill/releases/latest/download/md2wechat-linux-amd64
chmod +x md2wechat
sudo mv md2wechat /usr/local/bin/
```

**Windows**

1. 下载 `md2wechat-windows-amd64.exe`
2. 重命名为 `md2wechat.exe`
3. 放到任意文件夹，或复制到 `C:\Windows\System32\`（全局可用）

> ⚠️ 注意
>
> 使用 API 模式前需要先获取 API Key，请访问 [md2wechat.cn/api-docs](https://www.md2wechat.cn/api-docs) 联系获取。AI 模式不需要 API Key。

## 工作流程

整个流程：想法 → 写文章 → 去痕 → 排版 → 发草稿箱

1. **输入想法**
   脑中闪过的观点或要写的主题

2. **AI 写作 / 自己写**
   用写作助手生成或自己写 Markdown

3. **AI 去痕（可选）**
   去除 AI 味，让文章更像人写的

4. **选择主题排版**
   秋日暖光 / 春日清新 / 深海静谧

5. **一键发草稿箱**
   直接发到微信公众平台草稿箱

想停哪步停哪步，想连着用就连着用。

## 使用示例

### 技术博主写文章

```bash
# 写好技术文章
vim my-tech-post.md

# 使用简洁的 API 模式转换预览
md2wechat convert my-tech-post.md --preview

# 满意后发送草稿
md2wechat convert my-tech-post.md --draft --cover cover.jpg
```

### 产品经理发公告

```bash
# AI 生成产品公告内容，然后使用 AI 模式转换
md2wechat convert announcement.md --mode ai --theme ocean-calm --draft --cover product-logo.png
```

### 写作小白用观点生成文章

```bash
# 交互模式：输入观点，AI 生成文章
md2wechat write

# 指定风格生成
md2wechat write --style dan-koe

# 生成封面提示词
md2wechat write --style dan-koe --cover-only
```

## 常见问题

### 必须要有编程基础才能用吗？

不需要！只要会用命令行（终端）就可以。如果是 Claude Code 用户，直接用自然语言对话就行，连命令都不用记。

### AI 模式和 API 模式有什么区别？

| 对比项 | API 模式 | AI 模式 |
|--------|----------|----------|
| 响应速度 | ⚡ 秒级 | 🐢 10-30秒 |
| 排版质量 | 👍 标准规范 | 🌟 精美多样 |
| 样式选择 | 2-3 种 | 无限可能 |

### 如何添加自己喜欢的作家风格？

在 `writers/` 目录下创建 YAML 文件：

```bash
# 参考内置风格
cat writers/dan-koe.yaml

# 创建自己的风格
vim writers/my-style.yaml
```

## 最后

说实话，这个项目最开始先想解决自己的问题。用着用着发现对别人可能也有用，就**开源**出来了。

写公众号，应该把时间花在内容上，而不是排版上。

**Skills 实战系列预告**
这是 Skills 实战系列的第二篇。后面还会有更多实战案例，敬请期待。

---

**作者：极客杰尼**
持续分享 AI 工具和实战案例，对新手友好

觉得有用？ 👍 点赞 👀 在看 🔄 转发
