"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchTriggerProps {
  onSearchOpen: () => void;
  ctaText: string;
  onCtaClick: () => void;
}

export default function SearchTrigger({ onSearchOpen, ctaText, onCtaClick }: SearchTriggerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSearchOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-1 cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-4 transition-all hover:border-blue-300 hover:shadow-md"
      >
        <Search className="h-5 w-5 text-slate-400" />
        <span className="text-sm text-slate-400">
          搜索教程、工具或路线图
        </span>
        <kbd className="ml-auto hidden rounded border border-slate-300 px-2 py-0.5 text-xs text-slate-500 sm:block">
          ⌘K
        </kbd>
      </button>
      <button
        onClick={onCtaClick}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        {ctaText}
      </button>
    </div>
  );
}
