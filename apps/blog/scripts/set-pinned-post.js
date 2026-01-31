const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '../.env.local' });

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function setPinnedPost(slug, isPinned = true, pinOrder = 1) {
  try {
    console.log(`📌 正在设置文章置顶状态...`);
    console.log(`   Slug: ${slug}`);
    console.log(`   置顶: ${isPinned}`);
    console.log(`   顺序: ${pinOrder}`);

    // 先找到文章
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug
    }`, { slug });

    if (!post) {
      console.error(`\n❌ 未找到文章: ${slug}`);
      return;
    }

    // 更新置顶状态
    const result = await client.patch(post._id)
      .set({
        isPinned: isPinned,
        pinOrder: pinOrder
      })
      .commit();

    console.log(`\n✅ 成功设置置顶！`);
    console.log(`   标题: ${result.title}`);
    console.log(`   置顶: ${result.isPinned ? '是' : '否'}`);
    console.log(`   顺序: ${result.pinOrder}`);
    console.log(`\n💡 访问 http://localhost:3002/blog 查看效果`);
  } catch (error) {
    console.error('\n❌ 设置失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// 从命令行参数获取
const args = process.argv.slice(2);
const slug = args[0];
const isPinned = args[1] !== 'false';  // 默认为true
const pinOrder = parseInt(args[2]) || 1;

if (!slug) {
  console.log('\n使用方法:');
  console.log('  node set-pinned-post.js <article-slug> [isPinned] [pinOrder]');
  console.log('\n示例:');
  console.log('  node set-pinned-post.js vibecoding-2026          # 置顶，顺序1');
  console.log('  node set-pinned-post.js vibecoding-2026 true 2  # 置顶，顺序2');
  console.log('  node set-pinned-post.js vibecoding-2026 false   # 取消置顶');
  process.exit(0);
}

setPinnedPost(slug, isPinned, pinOrder);
