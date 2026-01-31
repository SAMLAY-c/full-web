import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "文章/视频 (Post)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string"
    }),
    defineField({
      name: "slug",
      title: "链接后缀 (Slug)",
      type: "slug",
      options: { source: "title" }
    }),
    defineField({
      name: "excerpt",
      title: "简短描述",
      type: "text"
    }),
    defineField({
      name: "coverImage",
      title: "封面图",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "status",
      title: "发布状态",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" }
        ]
      },
      initialValue: "draft"
    }),
    defineField({
      name: "category",
      title: "关联分类",
      type: "reference",
      to: [{ type: "category" }]
    }),
    defineField({
      name: "postType",
      title: "内容类型",
      type: "string",
      options: {
        list: [
          { title: "普通文章 (Article)", value: "article" },
          { title: "视频教程 (Video)", value: "video" }
        ],
        layout: "radio"
      },
      initialValue: "article"
    }),
    defineField({
      name: "videoUrl",
      title: "视频链接",
      type: "url",
      hidden: ({ document }) => document?.postType !== "video"
    }),
    defineField({
      name: "transcript",
      title: "逐字稿",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "time", title: "时间", type: "string" },
            { name: "text", title: "内容", type: "text" }
          ]
        }
      ],
      hidden: ({ document }) => document?.postType !== "video"
    }),
    defineField({
      name: "pdfFile",
      title: "课件 PDF",
      type: "file",
      hidden: ({ document }) => document?.postType !== "video"
    }),
    defineField({
      name: "content",
      title: "文章正文",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => document?.postType !== "article"
    }),
    defineField({
      name: "tags",
      title: "标签 (Tags)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "isPinned",
      title: "📌 是否置顶",
      type: "boolean",
      initialValue: false,
      description: "开启后，该文章将显示在列表顶部",
      options: {
        layout: "switch"
      }
    }),
    defineField({
      name: "pinOrder",
      title: "置顶顺序",
      type: "number",
      hidden: ({ document }) => !document?.isPinned,
      description: "数字越小越靠前，例如：1, 2, 3...",
      initialValue: 99
    }),
    defineField({
      name: "markdownTheme",
      title: "Markdown样式主题",
      type: "string",
      description: "选择文章使用的Markdown渲染样式主题",
      options: {
        list: [
          { title: "默认主题", value: "default" },
          { title: "极简主题", value: "minimal" },
        ],
        layout: "dropdown",
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("请选择一个Markdown主题"),
    })
  ]
});
