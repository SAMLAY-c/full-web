import { sanityWriteClient } from "../lib/sanity/script-client";

async function checkDocuments() {
  if (!sanityWriteClient) {
    console.error("❌ Sanity write client is not configured");
    process.exit(1);
  }

  console.log("🔍 Checking documents in Sanity...\n");

  // 查询所有文章
  const query = '*[_type == "post"]{_id, title, slug, status}';
  const posts = await sanityWriteClient.fetch(query);

  console.log(`📝 Found ${posts.length} posts:\n`);
  posts.forEach((post: any) => {
    console.log(`- _id: ${post._id}`);
    console.log(`  title: ${post.title}`);
    console.log(`  slug: ${post.slug?.current}`);
    console.log(`  status: ${post.status}\n`);
  });

  // 检查特定文档
  const specificPost = await sanityWriteClient.getDocument('post.welcome-to-markdown');
  if (specificPost) {
    console.log("✅ Document 'post.welcome-to-markdown' exists:");
    console.log(JSON.stringify(specificPost, null, 2));
  } else {
    console.log("❌ Document 'post.welcome-to-markdown' NOT found");
  }
}

checkDocuments().catch(console.error);
