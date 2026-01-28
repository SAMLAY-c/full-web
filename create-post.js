const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require(
  path.join(
    __dirname,
    "node_modules/.pnpm/@sanity+client@7.14.1_debug@4.4.3/node_modules/@sanity/client/dist/index.cjs"
  )
);

dotenv.config({ path: path.join(__dirname, "apps/blog/.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false
});

async function main() {
  const doc = {
    _id: "post.api-test-002",
    _type: "post",
    title: "API Test Post 002",
    slug: { _type: "slug", current: "api-test-002" },
    postType: "article",
    excerpt: "Created via create-post.js for connectivity testing.",
    status: "published",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "This post was created via the Sanity API to verify end-to-end connectivity."
          }
        ]
      }
    ]
  };

  const result = await client.createOrReplace(doc);
  console.log("✅ 文章发布成功！", result._id);
}

main().catch((error) => {
  console.error("❌ 发布失败:", error.message);
  process.exit(1);
});
