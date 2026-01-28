import { sanityWriteClient } from "../lib/sanity/script-client";

async function debugQuery() {
  console.log("🔍 Debugging Sanity query...\n");

  if (!sanityWriteClient) {
    console.error("❌ Sanity client is not configured");
    process.exit(1);
  }

  console.log("✅ Sanity client configured");
  console.log("Config:", {
    projectId: sanityWriteClient.config().projectId,
    dataset: sanityWriteClient.config().dataset,
    useCdn: sanityWriteClient.config().useCdn,
  });

  // 测试查询
  const slug = "welcome-to-markdown";
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    postType,
    videoUrl,
    coverImage,
    publishedAt,
    body,
    content
  }`;

  console.log(`\n📝 Querying for slug: "${slug}"`);
  console.log(`Query: ${query}\n`);

  const post = await sanityWriteClient!.fetch(query, { slug });

  if (post) {
    console.log("✅ Post found!");
    console.log(JSON.stringify(post, null, 2));
  } else {
    console.error("❌ Post NOT found");
    console.log("\nTrying to fetch all posts to debug...");

    const allPosts = await sanityWriteClient!.fetch(
      '*[_type == "post"]{_id, title, slug, status}'
    );
    console.log(`\n📝 All posts (${allPosts.length}):`);
    allPosts.forEach((p: any) => {
      console.log(
        `- ${p.title} (${p.slug?.current}) - status: ${p.status}`
      );
    });
  }
}

debugQuery().catch(console.error);
