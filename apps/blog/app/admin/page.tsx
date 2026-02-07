import { Metadata } from "next";
import Link from "next/link";
import { postService } from "@/lib/service/posts";

export const metadata: Metadata = {
  title: "管理后台 - Blog Admin",
  description: "博客管理后台",
};

export default async function AdminPage() {
  // 获取文章统计
  const posts = await postService.getAllPosts();
  const publishedCount = posts.filter(p => p.status === "published").length;
  const draftCount = posts.filter(p => p.status === "draft").length;

  const quickActions = [
    {
      title: "写文章",
      description: "创建新的博客文章",
      icon: "✍️",
      href: "/admin/write",
      color: "bg-neutral-900 text-white",
    },
    {
      title: "文章管理",
      description: "管理现有文章",
      icon: "📝",
      href: "/blog",
      color: "bg-white border border-neutral-200",
    },
    {
      title: "Markdown 导入",
      description: "从本地导入 Markdown",
      icon: "📄",
      href: "/admin/markdown",
      color: "bg-white border border-neutral-200",
    },
    {
      title: "返回首页",
      description: "查看博客首页",
      icon: "🏠",
      href: "/",
      color: "bg-white border border-neutral-200",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">管理后台</h1>
          <p className="mt-2 text-neutral-500">管理你的博客内容和文章</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200">
            <div className="text-sm text-neutral-500 mb-1">总文章数</div>
            <div className="text-3xl font-bold text-neutral-900">{posts.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200">
            <div className="text-sm text-neutral-500 mb-1">已发布</div>
            <div className="text-3xl font-bold text-green-600">{publishedCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200">
            <div className="text-sm text-neutral-500 mb-1">草稿</div>
            <div className="text-3xl font-bold text-orange-500">{draftCount}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`${action.color} rounded-2xl p-6 hover:shadow-lg transition-shadow group`}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className={`text-sm ${action.color.includes("bg-neutral-900") ? "text-neutral-300" : "text-neutral-500"}`}>
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">最近文章</h2>
            <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-900">
              查看全部 →
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {posts.slice(0, 5).map((post) => (
              <div key={post.slug} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-neutral-900 truncate">{post.title}</h3>
                    {post.status === "draft" && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                        草稿
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <span>{new Date(post.publishedAt).toLocaleDateString('zh-CN')}</span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="truncate">{post.tags.slice(0, 3).join(" · ")}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/admin/write?edit=${post.slug}`}
                    className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    编辑
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    查看
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-medium text-blue-900 mb-2">💡 写作提示</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>文章会自动保存为 Markdown 文件到 /posts 目录</li>
            <li>如果配置了 Sanity，会同时同步到 CMS</li>
            <li>使用标签分类，便于读者筛选内容</li>
            <li>添加摘要可以提高文章的点击率</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
