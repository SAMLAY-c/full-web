import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  useCdn: false,
});

async function checkPosts() {
  console.log('🔍 检查Sanity中的文章...\n');

  // 获取所有文章（包括draft）
  const allPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    status,
    publishedAt,
    postType
  }`);

  console.log(`📊 总文章数: ${allPosts.length}\n`);

  // 按状态分组
  const published = allPosts.filter((p: any) => p.status === 'published');
  const drafts = allPosts.filter((p: any) => p.status === 'draft');

  console.log(`✅ 已发布 (Published): ${published.length}篇`);
  published.forEach((post: any) => {
    console.log(`   - ${post.title} (${post.slug})`);
  });

  console.log(`\n📝 草稿 (Draft): ${drafts.length}篇`);
  drafts.forEach((post: any) => {
    console.log(`   - ${post.title} (${post.slug})`);
  });

  console.log('\n💡 提示:');
  console.log('   - 前端只会显示 "已发布" 状态的文章');
  console.log('   - 在Sanity Studio中将文章状态从 "Draft" 改为 "Published" 即可在前端显示');
}

checkPosts().catch(console.error);
