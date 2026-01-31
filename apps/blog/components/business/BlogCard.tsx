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
  isPinned?: boolean;
  pinOrder?: number;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  tags,
  coverUrl,
  isPinned,
}: BlogCardProps) {

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Cover Image or Gradient Placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        {isPinned && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 shadow-lg">
            <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" transform="rotate(180 10 10)" />
            </svg>
            <span className="text-xs font-semibold text-white">置顶</span>
          </div>
        )}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-bold text-blue-200/50">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        {publishedAt && (
          <time className="mb-2 text-xs text-gray-500">
            {format(new Date(publishedAt), "yyyy年MM月dd日", { locale: zhCN })}
          </time>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* CTA */}
        <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
          阅读全文 →
        </span>
      </div>
    </Link>
  );
}
