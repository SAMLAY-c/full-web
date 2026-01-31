import { defineField, defineType } from "sanity";

export default defineType({
  name: "resource",
  title: "资源库",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "资源名称",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
    }),
    defineField({
      name: "file",
      title: "文件",
      type: "file",
    }),
    defineField({
      name: "link",
      title: "外部链接 (可选)",
      type: "url",
      description: "如果文件太大，可以放网盘链接",
    }),
  ],
});
