"use client";

import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
  coverUrl?: string | null;
  readTime?: number; // 阅读时间（分钟）
  difficulty?: "beginner" | "intermediate" | "advanced"; // 难度等级
  category?: string; // 分类
  isPinned?: boolean;
}

const difficultyLabels = {
  beginner: { text: "入门", color: "bg-green-100 text-green-700" },
  intermediate: { text: "进阶", color: "bg-blue-100 text-blue-700" },
  advanced: { text: "高级", color: "bg-purple-100 text-purple-700" },
};

// 根据标题生成占位图片的渐变背景
function getPlaceholderGradient(title: string): string {
  const gradients = [
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-red-500",
    "from-purple-400 to-pink-500",
    "from-cyan-400 to-blue-500",
    "from-rose-400 to-orange-500",
  ];
  const index = title.length % gradients.length;
  return gradients[index];
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  tags,
  coverUrl,
  isPinned,
  readTime = 8,
  difficulty = "intermediate",
  category,
}: BlogCardProps) {
  const diffLabel = difficultyLabels[difficulty];

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image - 必须使用真实图片 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {isPinned && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            置顶
          </div>
        )}
        
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // 没有封面图时使用主题相关的渐变占位
          <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderGradient(title)} flex items-start justify-start p-5`}>
            <div className="text-left text-white/90">
              <div className="text-3xl font-bold">{title.charAt(0)}</div>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content - 统一左上角对齐 */}
      <div className="flex flex-col flex-1 p-5 items-start text-left">
        {/* Meta Row: Category & Difficulty */}
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded">
              {category}
            </span>
          )}
          <span className={`px-2 py-0.5 text-xs font-medium rounded ${diffLabel.color}`}>
            {diffLabel.text}
          </span>
        </div>

        {/* Title - 左上角对齐 */}
        <h3 className="w-full text-lg font-semibold text-neutral-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 text-left">
          {title}
        </h3>

        {/* Excerpt - 左上角对齐 */}
        {excerpt && (
          <p className="w-full text-sm text-neutral-500 line-clamp-2 mb-4 flex-1 text-left">
            {excerpt}
          </p>
        )}

        {/* Footer: Date & Read Time */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            {publishedAt && (
              <time className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(new Date(publishedAt), "MM/dd", { locale: zhCN })}
              </time>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}分钟
            </span>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <span className="text-neutral-400">
              #{tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
