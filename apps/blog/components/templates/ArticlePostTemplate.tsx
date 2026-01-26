import type { ReactNode } from "react";
import { DiscussionArea } from "../business/DiscussionArea";

type ArticlePostTemplateProps = {
  title: string;
  date: string;
  content: ReactNode;
  slug: string;
};

export function ArticlePostTemplate({
  title,
  date,
  content,
  slug
}: ArticlePostTemplateProps) {
  return (
    <article className="min-h-screen px-6 pb-24 pt-10 sm:px-10">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          📄 深度文章
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-brand-900">{title}</h1>
        <p className="mt-2 text-sm text-brand-500">{date}</p>
      </header>

      <div className="prose prose-slate mx-auto max-w-3xl">{content}</div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-brand-100 pt-10">
        <h3 className="mb-6 text-2xl font-semibold text-brand-900">评论区</h3>
        <DiscussionArea topicId={`post-${slug}`} />
      </div>
    </article>
  );
}
