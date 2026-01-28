import "dotenv/config";
import path from "path";

// 明确指定 .env.local 的路径（apps/blog/.env.local）
const envPath = path.join(__dirname, "../.env.local");
require("dotenv").config({ path: envPath });

// 先加载环境变量
const env = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  writeToken: process.env.SANITY_WRITE_TOKEN,
};

console.log("🔧 Environment check:");
console.log("- Project ID:", env.projectId ? "✅" : "❌");
console.log("- Dataset:", env.dataset ? "✅" : "❌");
console.log("- Write Token:", env.writeToken ? "✅" : "❌");

if (!env.projectId || !env.dataset) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: env.writeToken,
});

const homeQuery = `{
  "siteConfig": *[_type == "siteConfig"][0]{
    heroTitle,
    heroSubtitle,
    heroCtaText,
    hookTitle,
    hookDescription,
    hookQrCode
  },
  "categories": *[_type == "category"] | order(order asc) {
    name,
    skillsList,
    "slug": slug.current,
    order
  },
  "posts": *[_type == "post" && status == "published"] | order(_createdAt desc)[0...3] {
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    "type": postType
  }
}`;

async function main() {
  console.log("\n🔍 Testing Sanity query...\n");

  try {
    const result = await client.fetch(homeQuery);
    console.log("✅ Query result:");
    console.log(JSON.stringify(result, null, 2));

    console.log("\n📊 Summary:");
    console.log("- Site Config:", result.siteConfig ? "✅" : "❌");
    console.log("- Categories:", result.categories?.length || 0);
    console.log("- Posts:", result.posts?.length || 0);

    if (result.posts && result.posts.length > 0) {
      console.log("\n📝 Posts:");
      result.posts.forEach((post: any, index: number) => {
        console.log(`  ${index + 1}. ${post.title} (${post.slug})`);
      });
    }
  } catch (error) {
    console.error("❌ Query failed:", error);
  }
}

main();
