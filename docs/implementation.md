# 当前代码实现功能清单

- Monorepo 架构：使用 Turborepo 组织三个独立网站（portfolio、blog、platform）与共享包（ui、utils、config）。
- 共享 UI 组件：在 `packages/ui` 内提供 Button、Card、Hero、ProductCard 等通用组件，三站可复用。
- Portfolio 站点：极简英文简历首页，含项目列表、思考列表、右上角简历下载按钮，并提供中英文切换按钮。
- Blog 站点首页：数据驱动渲染（全局配置、路线图分类、最新文章），支持从 Sanity 读取并在无 Sanity 时回退本地数据。
- Blog 详情页：从 Sanity 按 slug 查询文章，支持文章/视频两种类型并动态渲染。
- 视频内容展示：当 postType 为 video 时显示视频播放器（iframe/embed）。
- 文章内容展示：当 postType 为 article 时使用 PortableText 渲染富文本内容。
- Sanity Studio 后台：内置 `apps/studio`，包含 siteConfig、category、post 三套 schema，支持二维码、封面图、文章类型等字段。
- Sanity 数据结构：实现全局配置（Hero/Hook）、分类（路线图）、文章（含 type、封面、摘要、视频/正文）的数据模型。
- 图片处理：前端通过 `@sanity/image-url` 将 Sanity 图片对象转为 URL 渲染。
- 环境变量配置：支持在 `apps/blog/.env.local` 与 `apps/studio/.env` 中配置 Sanity projectId/dataset。
- 安装与包管理：使用 pnpm + workspace 结构，支持国内镜像与二进制加速下载配置。
- 开发运行：支持独立启动 blog 前台与 studio 后台（端口 3001 / 3333）。
