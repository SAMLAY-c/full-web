const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function fixPostStatus() {
  try {
    console.log('🔍 正在检查文章...\n');

    // 获取所有文章
    const posts = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      status,
      postType,
      slug
    }`);

    console.log(`📊 找到 ${posts.length} 篇文章\n`);

    let fixedCount = 0;
    const fixedPosts = [];

    for (const post of posts) {
      let needsFix = false;
      const updates = {};

      // 检查并修复 status 字段
      if (post.status === '"published"' || post.status === '"draft"') {
        const correctStatus = post.status.replace(/"/g, '');
        updates.status = correctStatus;
        needsFix = true;
        console.log(`🔧 修复 ${post.title}`);
        console.log(`   status: "${post.status}" → "${correctStatus}"`);
      }

      // 检查并修复 postType 字段
      if (post.postType === '"article"' || post.postType === '"video"') {
        const correctPostType = post.postType.replace(/"/g, '');
        updates.postType = correctPostType;
        needsFix = true;
        console.log(`   postType: "${post.postType}" → "${correctPostType}"`);
      }

      if (needsFix) {
        await client.patch(post._id).set(updates).commit();
        fixedCount++;
        fixedPosts.push(post.title);
        console.log(`   ✅ 已修复\n`);
      }
    }

    console.log(`${'='.repeat(50)}`);
    console.log(`✅ 成功修复 ${fixedCount} 篇文章`);

    if (fixedCount > 0) {
      console.log('\n修复的文章:');
      fixedPosts.forEach((title, i) => {
        console.log(`  ${i + 1}. ${title}`);
      });
      console.log('\n💡 提示:');
      console.log('   - 请刷新浏览器查看效果');
      console.log('   - 访问 http://localhost:3002 查看博客列表');
    } else {
      console.log('\n✨ 所有文章状态都正常，无需修复');
    }
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixPostStatus();
