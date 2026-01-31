const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '../.env.local' });

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function testImport() {
  try {
    // 创建一个测试文档
    const doc = {
      _id: 'post.test-import-001',
      _type: 'post',
      title: '测试导入文章',
      slug: { _type: 'slug', current: 'test-import-001' },
      postType: 'article',
      excerpt: '这是一个测试文章',
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: [],
      tags: ['测试'],
    };

    console.log('📝 创建测试文档...');
    const result = await client.createOrReplace(doc);
    console.log('✅ 创建成功:', result.title);
    console.log('   ID:', result._id);
    console.log('   Status:', result.status);
    console.log('   PostType:', result.postType);
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

testImport();
