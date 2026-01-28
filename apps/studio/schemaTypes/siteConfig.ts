import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "全局配置 (Site Config)",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "首页大标题 (Hero Title)",
      type: "string"
    }),
    defineField({
      name: "heroSubtitle",
      title: "副标题",
      type: "text"
    }),
    defineField({
      name: "heroCtaText",
      title: "按钮文字",
      type: "string"
    }),
    defineField({
      name: "hookTitle",
      title: "底部引流标题",
      type: "string"
    }),
    defineField({
      name: "hookDescription",
      title: "底部说明",
      type: "text"
    }),
    defineField({
      name: "hookQrCode",
      title: "二维码",
      type: "image",
      options: {
        hotspot: true
      }
    })
  ]
});
