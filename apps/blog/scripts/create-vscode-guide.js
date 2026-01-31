const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require("@sanity/client");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false
});

// 读取SVG文件
const svgCode = fs.readFileSync(path.join(__dirname, "vscode-diagram.svg"), "utf8");

async function main() {
  const doc = {
    _id: "post.vscode-getting-started",
    _type: "post",
    title: "VS Code 入门指南",
    slug: { _type: "slug", current: "vscode-getting-started" },
    postType: "article",
    excerpt: "VS Code 是目前最流行的代码编辑器，本文通过图解和实战，带你快速掌握VS Code的核心功能和高效工作流。",
    status: "published",
    tags: ["VS Code", "编辑器", "入门教程", "开发工具"],
    markdownTheme: "default",
    publishedAt: new Date().toISOString(),
    isPinned: false,
    pinOrder: 99,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. 搞懂地盘：界面分布图" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "VS Code 就像你的书桌，我们先把书桌的分区认全。" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "图解说明（小白必看）" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "下面是 VS Code 界面的详细示意图，标注了各个区域的功能说明：" }]
      },
      {
        _type: "block",
        style: "h4",
        children: [{ _type: "span", text: "界面布局说明" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "活动栏（最左边窄条）：像是手机底部的导航栏，用来切换功能的（看文件、搜代码、装插件）。" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "侧边栏：显示你项目里的文件夹和文件。" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "编辑器（最大那块）：这里是你的主战场，写代码用的。" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "面板（底部）：这里是控制台，显示程序运行结果或者报错信息。" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "状态栏（最底下一条蓝色的）：告诉你当前光标在第几行，或者代码是什么格式。" }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. 最重要的起手式：打开文件夹 (Open Folder)" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "新手误区" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "像用 Word 一样，只点打开文件。 ❌ 这是新手最容易犯的错误！" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "正确姿势" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "永远使用打开文件夹！ ✅" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "为什么？" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "VS Code 需要把一个文件夹当成一个项目基地。只有打开整个文件夹，它才知道你的代码配置在哪里，Git 怎么管理，图片路径对不对。" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "操作步骤" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "菜单栏选择：文件 -> 打开文件夹" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "快捷键：Ctrl+K, Ctrl+O (Windows/Linux) 或 Cmd+K, Cmd+O (Mac)" }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. 装装备：扩展 (Extensions)" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "VS Code 本体只是个裸机，强大全靠 APP（插件）。插件生态是 VS Code 最强大的地方！" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "怎么打开扩展面板" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "点击左侧活动栏的方块图标（扩展图标）" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "快捷键：Ctrl+Shift+X (Windows/Linux) 或 Cmd+Shift+X (Mac)" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "装什么插件" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "根据你学习的语言或工作需求来搜索：" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "Python -> Python 插件" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "JavaScript/TypeScript -> JavaScript (ES6) code snippets" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "HTML/CSS -> HTML CSS Support" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "新手必装推荐" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "Chinese (Simplified) Language Pack - 先把界面变成中文，对小白最友好" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "Prettier - Code formatter - 帮你自动把乱糟糟的代码排版整齐" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "Material Icon Theme - 给文件和文件夹加上漂亮的图标" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "Auto Rename Tag - 自动配对 HTML/XML 标签" }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "4. 万能钥匙：命令面板 (Command Palette)" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "核心概念" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "别去菜单栏里一行行找功能了，很多功能根本找不到！命令面板是 VS Code 最强大的功能之一。" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "如何打开" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "快捷键：Ctrl+Shift+P (Windows/Linux) 或 Cmd+Shift+P (Mac)" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "怎么用" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "弹出一个输入框后，直接输入你想做的事情的描述：" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "想格式化代码？输入 Format Document" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "想修改主题？输入 Color Theme，然后选你喜欢的" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "想打开设置？输入 Preferences: Open Settings" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 0,
        children: [{ _type: "span", text: "想创建新文件？输入 File: New File" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "给小白的定心丸" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "只要记住这一个快捷键 Ctrl+Shift+P，你就拥有了 VS Code 的所有功能！不用记忆成百上千个快捷键。" }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "5. 终端 (Terminal)" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "是什么" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "以前写代码需要单独打开一个黑框框（CMD 或 Terminal），现在 VS Code 直接把终端集成到了编辑器里。不用在不同窗口之间切换了！" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "如何打开" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "快捷键：Ctrl+` (波浪号键，在 Esc 键下面，Tab 键上面)" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "或者：菜单栏 -> 终端 -> 新建终端" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "常见用途" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "运行 npm install、npm run dev 等命令" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "使用 git 进行版本控制操作" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "查看测试结果和错误信息" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "运行 Python 脚本、编译代码等" }]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "总结" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "掌握了这五个核心概念，你就可以开始愉快地使用 VS Code 了！" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "快速回顾" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "先打开文件夹，不要只打开单个文件" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "根据需要安装扩展插件" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "遇到问题就按 Ctrl+Shift+P 打开命令面板" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "使用内置终端运行命令" }]
      },
      {
        _type: "block",
        style: "normal",
        listItem: "number",
        level: 0,
        children: [{ _type: "span", text: "熟悉各个区域的功能和用途" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "" }]
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "VS Code 是一个功能非常强大的编辑器，但这些基础功能足够让你开始工作了。随着你的使用深入，你会发现更多方便的功能和快捷键。记住：慢慢来，不要着急一次性掌握所有功能！" }]
      }
    ]
  };

  const result = await client.createOrReplace(doc);
  console.log("✅ 文章《VS Code 入门指南》发布成功！");
  console.log("📄 文章ID:", result._id);
  console.log("🔗 文章链接:", `/blog/${result.slug.current}`);
  console.log("💡 提示: SVG 代码已保存到 scripts/vscode-diagram.svg，你可以手动添加到文章中");
}

main().catch((error) => {
  console.error("❌ 发布失败:", error.message);
  process.exit(1);
});
