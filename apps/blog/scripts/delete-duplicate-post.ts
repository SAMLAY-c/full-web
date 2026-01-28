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
  console.log("🔍 查找重复的文章...\n");

  // 查找所有 Next.js 最佳实践 2025 的版本
  const duplicatePosts = await client.fetch(
    `*[_type == "post" && title == "Next.js 最佳实践 2025"] {
      _id,
      title,
      slug,
      status,
      _createdAt
    }`
  );

  console.log(`找到 ${duplicatePosts.length} 个版本：\n`);
  duplicatePosts.forEach((post: any, index: number) => {
    const isDraft = post._id.startsWith("drafts.");
    console.log(`${index + 1}. ${isDraft ? "📝 草稿版本" : "✅ 已发布版本"}`);
    console.log(`   ID: ${post._id}`);
    console.log(`   Slug: ${post.slug?.current}`);
    console.log(`   Status: ${post.status}`);
    console.log(`   Created: ${post._createdAt}`);
    console.log("");
  });

  // 找出草稿版本（以 drafts. 开头的）
  const draftToDelete = duplicatePosts.find((post: any) => post._id.startsWith("drafts."));

  if (!draftToDelete) {
    console.log("❌ 没有找到需要删除的草稿版本");
    return;
  }

  console.log(`🗑️  准备删除草稿版本: ${draftToDelete._id}`);

  // 删除草稿版本
  try {
    await client.delete(draftToDelete._id);
    console.log("✅ 成功删除草稿版本！");
  } catch (error) {
    console.error("❌ 删除失败:", error);
  }

  // 验证删除结果
  console.log("\n🔍 验证删除结果...");
  const remainingPosts = await client.fetch(
    `*[_type == "post" && title == "Next.js 最佳实践 2025"]{ _id, status }`
  );

  console.log(`\n✅ 现在剩余 ${remainingPosts.length} 个版本：`);
  remainingPosts.forEach((post: any) => {
    console.log(`   - ${post._id} (${post.status})`);
  });

  console.log("\n✨ 完成！现在只保留了已发布的版本。");
}

main().catch(console.error);
