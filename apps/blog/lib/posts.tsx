import type { ReactNode } from "react";
import { CommentableBlock } from "../components/business/CommentableBlock";

export type PostStatus = "draft" | "published";
export type PostType = "video" | "article";

type PostBase = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  status: PostStatus;
  category: string;
  type: PostType;
};

type VideoPost = PostBase & {
  type: "video";
  videoUrl: string;
  transcript: Array<{ time: string; text: string }>;
  pdfUrl?: string;
};

type ArticlePost = PostBase & {
  type: "article";
  date: string;
  content: ReactNode;
};

type Post = VideoPost | ArticlePost;

const posts: Post[] = [
  {
    slug: "remotion-video",
    type: "video",
    title: "Remotion 视频生成实战",
    excerpt: "从环境搭建到首支视频生成的完整路径。",
    coverImage: null,
    status: "published",
    category: "projects",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    transcript: [
      { time: "00:01", text: "Hello World" },
      { time: "00:18", text: "从安装依赖开始配置环境。" },
      { time: "01:02", text: "核心概念：视频即代码。" }
    ],
    pdfUrl: "/downloads/course-notes.pdf"
  },
  {
    slug: "product-thinking",
    type: "article",
    title: "产品经理的 AI 转型之路",
    excerpt: "从方法论到工具栈的完整迁移框架。",
    coverImage: null,
    status: "published",
    category: "ai-intro",
    date: "2025-01-26",
    content: (
      <>
        <p>这是普通段落。</p>
        <CommentableBlock id="block-1">
          <p>这是可以被划线评论的重点段落。</p>
        </CommentableBlock>
        <p>结尾段落。</p>
      </>
    )
  },
  {
    slug: "tooling-notes",
    type: "article",
    title: "推荐 3 个好用的 VS Code 插件",
    excerpt: "让开发体验更顺滑的配置清单。",
    coverImage: null,
    status: "draft",
    category: "basic-tools",
    date: "2025-02-01",
    content: (
      <>
        <p>这是普通段落。</p>
        <p>后续会补充更多插件说明。</p>
      </>
    )
  }
];

export function getPost(slug: string): Post | null {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostSlugs() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function getLatestPosts(limit: number) {
  return posts
    .filter((post) => post.status === "published")
    .slice(0, limit);
}
