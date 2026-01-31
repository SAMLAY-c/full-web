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
      className="group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-strong"
    >
      {/* Cover Image or Gradient Placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-warm-cream to-warm-peach">
        {isPinned && (
          <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 shadow-lg">
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-bold text-brand-200/50 font-display">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-7">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold leading-snug text-text-dark group-hover:text-brand-500 transition-colors line-clamp-2 font-display">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="mb-4 flex-1 text-sm text-text-medium line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-500/10">
          {/* Date */}
          {publishedAt && (
            <time className="text-xs text-text-light">
              {format(new Date(publishedAt), "yyyy年MM月dd日", { locale: zhCN })}
            </time>
          )}

          {/* CTA */}
          <span className="text-sm font-semibold text-brand-500 group-hover:text-brand-600 flex items-center gap-1">
            阅读全文
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
