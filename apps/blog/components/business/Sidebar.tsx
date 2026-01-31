"use client";

import { useState } from "react";

type TranscriptItem = {
  time: string;
  text: string;
};

type ResourceSidebarProps = {
  transcript: TranscriptItem[];
  pdfUrl: string;
};

export function ResourceSidebar({ transcript, pdfUrl }: ResourceSidebarProps) {
  const [activeTab, setActiveTab] = useState<"transcript" | "files">("transcript");

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="flex border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("transcript")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "transcript"
              ? "border-b-2 border-orange-400 text-orange-200"
              : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
          }`}
        >
          📝 逐字稿
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("files")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "files"
              ? "border-b-2 border-orange-400 text-orange-200"
              : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
          }`}
        >
          💾 课件资料
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "transcript" ? (
          <div className="space-y-4">
            {transcript.map((item) => (
              <div
                key={`${item.time}-${item.text}`}
                className="rounded-lg p-3 transition hover:bg-white/5"
              >
                <span className="mb-1 block text-xs font-semibold text-orange-300">
                  {item.time}
                </span>
                <p className="text-sm text-neutral-200/80">{item.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <a
              href={pdfUrl}
              className="group flex items-center gap-3 rounded-xl border border-white/10 p-3 transition hover:border-orange-500/50 hover:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15 font-semibold text-orange-300">
                PDF
              </div>
              <div>
                <p className="font-medium text-neutral-100 group-hover:text-white">
                  本课核心课件
                </p>
                <p className="text-xs text-neutral-400">2.4 MB</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
