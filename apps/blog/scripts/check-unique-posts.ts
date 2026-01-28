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

// 查询所有文章，包括 _id
const allPostsQuery = `*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  status,
  "type": postType,
  _createdAt
}`;

async function main() {
  console.log("🔍 检查 Sanity 中的所有文章...\n");

  const allPosts = await client.fetch(allPostsQuery);

  console.log(`📊 总文章数: ${allPosts.length}\n`);

  console.log("📝 文章列表:");
  allPosts.forEach((post: any, index: number) => {
    const statusIcon = post.status === "published" ? "✅" : "📝";
    console.log(`  ${index + 1}. ${statusIcon} ${post.title}`);
    console.log(`     ID: ${post._id}`);
    console.log(`     Slug: ${post.slug}`);
    console.log(`     Status: ${post.status}`);
    console.log("");
  });

  // 检查重复的 slug
  const slugs = allPosts.map((p: any) => p.slug);
  const uniqueSlugs = [...new Set(slugs)];
  console.log(`\n📊 统计:`);
  console.log(`  - 总记录数: ${allPosts.length}`);
  console.log(`  - 唯一 slug 数: ${uniqueSlugs.length}`);
  console.log(`  - 已发布: ${allPosts.filter((p: any) => p.status === "published").length}`);
  console.log(`  - 草稿: ${allPosts.filter((p: any) => p.status === "draft").length}`);

  if (allPosts.length !== uniqueSlugs.length) {
    console.log(`  ⚠️  检测到重复的 slug！`);
  }
}

main().catch(console.error);
