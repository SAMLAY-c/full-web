"use client";

import { useState } from "react";

type CommentableBlockProps = {
  id: string;
  children: React.ReactNode;
};

export function CommentableBlock({ id, children }: CommentableBlockProps) {
  const [isActive, setIsActive] = useState(false);
  const commentCount = 2;

  return (
    <div className="group relative mb-6" data-block={id}>
      <div
        className={`cursor-pointer rounded border-l-2 p-1 transition-colors ${
          isActive
            ? "border-yellow-400 bg-yellow-50"
            : "border-transparent hover:bg-brand-50"
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        {children}
        {!isActive ? (
          <span className="absolute right-0 top-0 ml-2 translate-x-full text-xs text-brand-300 opacity-0 transition group-hover:opacity-100">
            💬 {commentCount}
          </span>
        ) : null}
      </div>

      {isActive ? (
        <aside className="absolute left-full top-0 z-10 ml-8 hidden w-64 xl:block">
          <div className="rounded-lg border border-brand-100 bg-white p-4 text-sm shadow-xl">
            <div className="mb-3 flex items-center justify-between border-b pb-2">
              <span className="font-semibold text-brand-800">针对此段的讨论</span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsActive(false);
                }}
                className="text-brand-300 hover:text-brand-500"
              >
                ✕
              </button>
            </div>

            <div className="mb-3 max-h-60 space-y-3 overflow-y-auto">
              <div className="rounded bg-brand-50 p-2">
                <p className="text-xs font-semibold text-brand-600">林老师</p>
                <p className="mt-1 text-brand-700">
                  这句话是核心！Remotion 是声明式的。
                </p>
              </div>
            </div>

            <textarea
              className="w-full rounded border border-brand-200 p-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              placeholder="发表你的看法..."
              rows={2}
            />
          </div>
        </aside>
      ) : null}
    </div>
  );
}
