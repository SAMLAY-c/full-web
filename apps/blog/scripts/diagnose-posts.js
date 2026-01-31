const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '../.env.local' });

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function diagnosePosts() {
  try {
    // 不使用任何过滤条件，获取所有文档
    const datasets = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      status,
      postType,
      publishedAt,
      _createdAt
    } | order(_createdAt desc)`);

    console.log(`\n📊 Sanity数据库中的文章: ${datasets.length}篇\n`);

    datasets.forEach((post, i) => {
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   ID: ${post._id}`);
      console.log(`   Status: ${JSON.stringify(post.status)}`);
      console.log(`   PostType: ${JSON.stringify(post.postType)}`);
      console.log(`   Created: ${post._createdAt}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

diagnosePosts();
