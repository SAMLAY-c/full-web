import "dotenv/config";
import path from "path";
import { createClient } from "@sanity/client";

// 加载环境变量
const envPath = path.join(__dirname, "../.env.local");
require("dotenv").config({ path: envPath });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("🔍 查找所有草稿文章...\n");

  // 查找所有草稿文章
  const draftPosts = await client.fetch(
    `*[_type == "post" && status == "draft"]{
      _id,
      title,
      slug,
      status
    }`
  );

  console.log(`找到 ${draftPosts.length} 篇草稿文章：\n`);

  if (draftPosts.length === 0) {
    console.log("✅ 没有草稿文章，所有文章都已发布！");
    return;
  }

  draftPosts.forEach((post: any, index: number) => {
    console.log(`${index + 1}. 📝 ${post.title}`);
    console.log(`   ID: ${post._id}`);
    console.log(`   Slug: ${post.slug?.current || post.slug}`);
    console.log("");
  });

  // 发布所有草稿
  console.log("🚀 开始发布所有草稿文章...\n");

  for (const post of draftPosts) {
    try {
      const updated = await client
        .patch(post._id)
        .set({ status: "published" })
        .commit();

      console.log(`✅ 已发布: ${updated.title}`);
    } catch (error) {
      console.error(`❌ 发布失败: ${post.title}`, error);
    }
  }

  // 验证结果
  console.log("\n🔍 验证发布结果...");
  const allPublished = await client.fetch(
    `*[_type == "post" && status == "published"]{ title, status }`
  );

  console.log(`\n✅ 现在共有 ${allPublished.length} 篇已发布文章：`);
  allPublished.forEach((post: any, index: number) => {
    console.log(`  ${index + 1}. ${post.title}`);
  });

  console.log("\n✨ 完成！刷新浏览器页面，应该能看到所有文章了。");
}

main().catch(console.error);
