import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "作品项目",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "项目名称",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "mainImage",
      title: "封面图",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "简介",
      type: "text",
    }),
    defineField({
      name: "techStack",
      title: "技术栈",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "demoUrl",
      title: "演示链接",
      type: "url",
    }),
  ],
});
