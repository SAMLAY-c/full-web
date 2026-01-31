const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '../.env.local' });

const client = createClient({
  projectId: 'h8272qgq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function createVibecodingPost() {
  try {
    const doc = {
      _id: 'post.vibecoding-2026',
      _type: 'post',
      title: 'Vibe Coding：2026年程序员的终极心法',
      slug: { _type: 'slug', current: 'vibecoding-2026' },
      postType: 'article',
      excerpt: '告别996和内卷，用Vibe Coding重新定义编程的乐趣。这不是关于写出最完美的代码，而是关于享受编程的乐趣和团队协作的美好氛围。',
      status: 'published',
      publishedAt: '2026-01-31T12:00:00.000Z',
      tags: ['vibecoding', '编程哲学', '团队协作', '工作方式', '2026'],
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [{ _type: 'span', text: '什么是 Vibe Coding？' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vibe Coding 不是一种技术，而是一种心态。它强调在编程过程中保持轻松、愉快的氛围，享受创造带来的乐趣，而不是被KPI和deadline压垮。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '🎯 Vibe Coding 的核心原则' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '1. 保持 Flow State' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '找到你的心流状态。戴上耳机，播放喜欢的音乐，让代码自然流淌。不要被干扰打断，专心享受编程的节奏。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '2. 好的代码胜于快的代码' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '不要为了赶进度而写垃圾代码。花时间思考架构，写出优雅、可维护的代码。这样的代码会让你和团队都感觉良好——这就是好的 vibe。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '3. 团队氛围 > 个体英雄' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vibe Coding 不是独角戏。它是关于团队协作、互相支持、Code Review时的建设性反馈。一个健康的团队氛围会让每个人都写出更好的代码。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '4. 工具要顺手' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '花时间配置你的开发环境。好的IDE、快捷键、snippet、AI助手——这些工具能让你专注于真正重要的事情：解决问题和创造价值。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '5. 懂得休息' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vibe Coding 不是996。它是关于可持续的开发节奏。累了就休息，灵感来时再全力以赴。保持身心健康才能长期保持高质量的产出。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '💡 实践 Vibe Coding 的小技巧' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '🎵 创建你的编程歌单' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Lo-Fi、Jazz、Synthwave——找到最适合你的音乐类型。好的背景音乐能提升专注力和创造力。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '☕ 珍惜咖啡时间' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '和同事聊天，分享想法，讨论问题。这些看似随意的交流往往能激发最好的创意。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: '🌟 庆祝小胜利' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '修复了一个棘手的bug？重构了一段优雅的代码？学会了一个新工具？庆祝这些小胜利，它们是编程路上的里程碑。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '🚀 为什么 Vibe Coding 重要？' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '技术行业一直在快速变化，但有些东西是不变的：我们需要热爱我们所做的事情，需要和我们一起工作的人，需要在创造中找到意义和乐趣。',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vibe Coding 不是关于躺平或摆烂，而是关于找到可持续的、健康的、高效的工作方式。它提醒我们：编程不仅是职业，更是一种生活方式。',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '📝 总结' }],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vibe Coding = 保持良好的心态 + 使用顺手的工具 + 和优秀的人一起 + 享受创造的过程',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '2026年，让我们一起用更好的 vibe 写出更好的代码。✨',
            },
          ],
        },
      ],
    };

    console.log('📝 正在创建 Vibe Coding 文章...');
    const result = await client.createOrReplace(doc);

    console.log('\n✅ 文章创建成功！');
    console.log(`   标题: ${result.title}`);
    console.log(`   Slug: ${result.slug.current}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   PostType: ${result.postType}`);
    console.log(`   标签: ${result.tags.join(', ')}`);
    console.log('\n🌐 访问地址:');
    console.log(`   http://localhost:3002/blog/${result.slug.current}`);
  } catch (error) {
    console.error('\n❌ 创建失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createVibecodingPost();
