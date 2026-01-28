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
    })
  ]
});
