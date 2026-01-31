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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      {/* Search Input */}
      <button
        onClick={onSearchOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-1 cursor-pointer items-center gap-3 rounded-[32px] border border-warm-peach bg-white px-6 py-4 transition-all duration-300 hover:border-brand-300 hover:shadow-soft"
      >
        <Search className="h-5 w-5 text-text-light" />
        <span className="text-sm text-text-light">
          搜索教程、文章或主题
        </span>
        <kbd className="ml-auto hidden rounded-lg border border-warm-peach px-3 py-1 text-xs text-text-light sm:block">
          ⌘K
        </kbd>
      </button>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className="flex items-center justify-center gap-2 rounded-[32px] bg-gradient-to-r from-brand-500 to-brand-400 px-8 py-4 text-sm font-semibold text-white shadow-medium hover:shadow-strong hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
      >
        {ctaText}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
