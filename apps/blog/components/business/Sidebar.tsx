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
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm">
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setActiveTab("transcript")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "transcript"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-brand-500 hover:bg-brand-50"
          }`}
        >
          📝 逐字稿
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("files")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "files"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-brand-500 hover:bg-brand-50"
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
                className="rounded-lg p-2 transition hover:bg-brand-50"
              >
                <span className="mb-1 block text-xs font-semibold text-brand-500">
                  {item.time}
                </span>
                <p className="text-sm text-brand-900/80">{item.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <a
              href={pdfUrl}
              className="group flex items-center gap-3 rounded-lg border border-brand-100 p-3 transition hover:border-brand-400 hover:bg-brand-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 font-semibold text-red-600">
                PDF
              </div>
              <div>
                <p className="font-medium text-brand-900 group-hover:text-brand-700">
                  本课核心课件
                </p>
                <p className="text-xs text-brand-500">2.4 MB</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
