"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  status: "draft" | "published";
  coverImage?: string;
}

const ALL_TAGS = [
  "AI", "PM", "编程", "工具", "思考", 
  "Claude", "Cursor", "ChatGPT", "Prompt", 
  "React", "Next.js", "产品方法论", "转型"
];

// 主页面组件包装在 Suspense 中
export default function WritePageWrapper() {
  return (
    <Suspense fallback={<LoadingState />}>
      <WritePage />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto"></div>
        <p className="mt-4 text-neutral-500">加载中...</p>
      </div>
    </div>
  );
}

function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");

  const [post, setPost] = useState<Post>({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    tags: [],
    publishedAt: new Date().toISOString().split("T")[0],
    status: "draft",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "settings">("write");

  // 加载已有文章（如果是编辑模式）
  useEffect(() => {
    if (editSlug) {
      fetchPost(editSlug);
    }
  }, [editSlug]);

  const fetchPost = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost({
          ...data,
          tags: data.tags || [],
          publishedAt: data.publishedAt?.split("T")[0] || new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
    setIsLoading(false);
  };

  // 自动生成 slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const saveData = {
        ...post,
        status: publish ? "published" : "draft",
      };

      const res = await fetch("/api/admin/save-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveData),
      });

      if (res.ok) {
        setSaveMessage(publish ? "已发布！" : "已保存为草稿");
        if (publish) {
          setTimeout(() => {
            router.push(`/blog/${post.slug}`);
          }, 1000);
        }
      } else {
        const error = await res.text();
        setSaveMessage(`保存失败: ${error}`);
      }
    } catch (error) {
      setSaveMessage("保存失败，请重试");
    }

    setIsSaving(false);
  };

  const toggleTag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  // 插入 Markdown 语法
  const insertMarkdown = (syntax: string, placeholder: string = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = post.content;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const selected = text.substring(start, end);

    const insertion = selected || placeholder;
    const newContent = before + syntax.replace("$1", insertion) + after;

    setPost(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + syntax.indexOf("$1") + insertion.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto"></div>
          <p className="mt-4 text-neutral-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!session?.user?.isAdmin) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">需要管理员权限</p>
          <Link href="/" className="text-neutral-900 underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-neutral-500 hover:text-neutral-900">
                ← 返回
              </Link>
              <h1 className="text-lg font-semibold text-neutral-900">
                {editSlug ? "编辑文章" : "写文章"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.includes("失败") ? "text-red-500" : "text-green-600"}`}>
                  {saveMessage}
                </span>
              )}
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
              >
                {isSaving ? "保存中..." : "保存草稿"}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving || !post.title}
                className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 disabled:opacity-50"
              >
                {isSaving ? "发布中..." : "发布"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Editor */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-neutral-200 w-fit">
              <button
                onClick={() => setActiveTab("write")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "write"
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                写作
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "settings"
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                设置
              </button>
            </div>

            {activeTab === "write" ? (
              <>
                {/* Title Input */}
                <input
                  type="text"
                  placeholder="文章标题"
                  value={post.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full text-3xl font-bold placeholder-neutral-300 border-0 border-b border-neutral-200 pb-4 focus:outline-none focus:border-neutral-400 bg-transparent"
                />

                {/* Excerpt */}
                <textarea
                  placeholder="文章摘要（会显示在卡片上）"
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full text-neutral-600 placeholder-neutral-400 border-0 resize-none focus:outline-none focus:ring-0 bg-transparent"
                />

                {/* Toolbar */}
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-neutral-200">
                  <ToolbarButton onClick={() => insertMarkdown("**$1**", "粗体")} title="粗体">
                    <b>B</b>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => insertMarkdown("*$1*", "斜体")} title="斜体">
                    <i>I</i>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => insertMarkdown("# $1", "标题")} title="标题">
                    H
                  </ToolbarButton>
                  <div className="w-px h-6 bg-neutral-200 mx-1" />
                  <ToolbarButton onClick={() => insertMarkdown("- $1", "列表项")} title="列表">
                    •
                  </ToolbarButton>
                  <ToolbarButton onClick={() => insertMarkdown("1. $1", "列表项")} title="数字列表">
                    1.
                  </ToolbarButton>
                  <div className="w-px h-6 bg-neutral-200 mx-1" />
                  <ToolbarButton onClick={() => insertMarkdown("```\n$1\n```", "代码")} title="代码块">
                    {"</>"}
                  </ToolbarButton>
                  <ToolbarButton onClick={() => insertMarkdown("[$1](url)", "链接文字")} title="链接">
                    🔗
                  </ToolbarButton>
                  <ToolbarButton onClick={() => insertMarkdown("> $1", "引用")} title="引用">
                    "
                  </ToolbarButton>
                  <div className="flex-1" />
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      showPreview ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {showPreview ? "隐藏预览" : "实时预览"}
                  </button>
                </div>

                {/* Content Editor */}
                <div className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                  <textarea
                    id="content"
                    placeholder="开始写作..."
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full min-h-[500px] p-4 bg-white rounded-lg border border-neutral-200 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  />
                  {showPreview && (
                    <div className="w-full min-h-[500px] p-4 bg-white rounded-lg border border-neutral-200 overflow-auto prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: renderMarkdown(post.content) 
                      }} />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    URL 别名 (slug)
                  </label>
                  <input
                    type="text"
                    value={post.slug}
                    onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="article-url-slug"
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    访问路径: /blog/{post.slug || "your-article"}
                  </p>
                </div>

                {/* Published Date */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    发布日期
                  </label>
                  <input
                    type="date"
                    value={post.publishedAt}
                    onChange={(e) => setPost(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    封面图片 URL
                  </label>
                  <input
                    type="text"
                    value={post.coverImage || ""}
                    onChange={(e) => setPost(prev => ({ ...prev, coverImage: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-medium text-neutral-900 mb-4">标签</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      post.tags.includes(tag)
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {post.tags.length === 0 && (
                <p className="text-sm text-neutral-400 mt-4">
                  点击上方标签添加分类
                </p>
              )}
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-medium text-neutral-900 mb-4">文章状态</h3>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={post.status === "draft"}
                    onChange={() => setPost(prev => ({ ...prev, status: "draft" }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">草稿</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={post.status === "published"}
                    onChange={() => setPost(prev => ({ ...prev, status: "published" }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">已发布</span>
                </label>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-medium text-neutral-900 mb-4">统计</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">字数</span>
                  <span className="font-medium">{post.content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">预估阅读</span>
                  <span className="font-medium">{Math.max(1, Math.round(post.content.length / 300))} 分钟</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 工具栏按钮组件
function ToolbarButton({ 
  onClick, 
  children, 
  title 
}: { 
  onClick: () => void; 
  children: React.ReactNode; 
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
    >
      {children}
    </button>
  );
}

// 简易 Markdown 渲染
function renderMarkdown(content: string): string {
  if (!content) return "";
  
  let html = content
    // 代码块
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code class="bg-neutral-100 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // 标题
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // 粗体斜体
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
    // 引用
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-neutral-300 pl-4 italic text-neutral-600 my-4">$1</blockquote>')
    // 列表
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // 段落
    .replace(/\n\n/g, '</p><p class="my-4">')
    // 换行
    .replace(/\n/g, '<br>');

  return `<p class="my-4">${html}</p>`;
}
