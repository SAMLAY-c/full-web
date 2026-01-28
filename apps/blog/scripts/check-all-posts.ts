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

// 查询所有文章（包括草稿）
const allPostsQuery = `*[_type == "post"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  status,
  "type": postType,
  publishedAt,
  _createdAt
}`;

// 查询已发布文章
const publishedPostsQuery = `*[_type == "post" && status == "published"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  status
}`;

async function main() {
  console.log("🔍 检查所有文章...\n");

  const allPosts = await client.fetch(allPostsQuery);
  const publishedPosts = await client.fetch(publishedPostsQuery);

  console.log(`📊 总文章数: ${allPosts.length}`);
  console.log(`✅ 已发布文章数: ${publishedPosts.length}\n`);

  console.log("📝 所有文章列表:");
  allPosts.forEach((post: any, index: number) => {
    const statusIcon = post.status === "published" ? "✅" : "📝";
    console.log(`  ${index + 1}. ${statusIcon} ${post.title}`);
    console.log(`     Slug: ${post.slug}`);
    console.log(`     Status: ${post.status}`);
    console.log(`     Type: ${post.type}`);
    console.log(`     Created: ${post._createdAt}`);
    console.log("");
  });

  console.log("\n" + "=".repeat(50));
  console.log("可能的问题:");
  const draftPosts = allPosts.filter((p: any) => p.status !== "published");
  if (draftPosts.length > 0) {
    console.log(`📝 有 ${draftPosts.length} 篇文章未发布 (status != "published")`);
  } else {
    console.log("✅ 所有文章都已发布");
  }
}

main().catch(console.error);
