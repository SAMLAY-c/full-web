import { defineField, defineType } from "sanity";

export default defineType({
  name: "sop",
  title: "SOP 标准作业程序",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "链接标识 (Slug)",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "string",
      options: {
        list: [
          { title: "写作", value: "writing" },
          { title: "开发", value: "dev" },
          { title: "运营", value: "marketing" },
        ],
      },
    }),
    defineField({
      name: "content",
      title: "内容",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "isPremium",
      title: "会员专享",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
