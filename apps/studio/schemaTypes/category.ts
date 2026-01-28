import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "路线图分类 (Category)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "分类名称",
      type: "string"
    }),
    defineField({
      name: "skillsList",
      title: "技能标签",
      type: "string"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" }
    }),
    defineField({
      name: "order",
      title: "排序权重",
      type: "number"
    })
  ]
});
