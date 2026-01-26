import type { ReactNode } from "react";
import { CommentableBlock } from "../components/business/CommentableBlock";

type VideoPost = {
  type: "video";
  title: string;
  videoUrl: string;
  transcript: Array<{ time: string; text: string }>;
  pdfUrl?: string;
};

type ArticlePost = {
  type: "article";
  title: string;
  date: string;
  content: ReactNode;
};

type Post = VideoPost | ArticlePost;

const posts: Record<string, Post> = {
  "remotion-video": {
    type: "video",
    title: "Remotion 视频生成实战",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    transcript: [
      { time: "00:01", text: "Hello World" },
      { time: "00:18", text: "从安装依赖开始配置环境。" },
      { time: "01:02", text: "核心概念：视频即代码。" }
    ],
    pdfUrl: "/downloads/course-notes.pdf"
  },
  "product-thinking": {
    type: "article",
    title: "产品经理的 AI 转型之路",
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
  }
};

export function getPost(slug: string): Post | null {
  return posts[slug] ?? null;
}

export function getPostSlugs() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
