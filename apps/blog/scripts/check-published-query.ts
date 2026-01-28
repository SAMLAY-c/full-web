import "dotenv/config";
import path from "path";
import { createClient } from "@sanity/client";

const envPath = path.join(__dirname, "../.env.local");
require("dotenv").config({ path: envPath });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// 使用和前台完全相同的查询
const allPostsQuery = `*[_type == "post" && status == "published"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  "type": postType,
  publishedAt,
  tags
}`;

async function main() {
  console.log("🔍 执行和前台完全相同的查询...\n");

  const posts = await client.fetch(allPostsQuery);

  console.log(`📊 查询返回 ${posts.length} 篇文章\n`);

  posts.forEach((post: any, index: number) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Type: ${post.type}`);
    console.log(`   Tags: ${post.tags ? post.tags.join(", ") : "none"}`);
    console.log("");
  });

  // 检查是否有重复的 slug
  const slugs = posts.map((p: any) => p.slug);
  const uniqueSlugs = [...new Set(slugs)];

  if (slugs.length !== uniqueSlugs.length) {
    console.log("⚠️  查询结果中有重复的 slug！");
    console.log(`   总数: ${slugs.length}, 唯一: ${uniqueSlugs.length}`);
  } else {
    console.log("✅ 查询结果中没有重复");
  }
}

main().catch(console.error);
