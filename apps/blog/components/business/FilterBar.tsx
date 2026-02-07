"use client";

import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  categories: FilterOption[];
  tags: FilterOption[];
  selectedCategory: string | null;
  selectedTag: string | null;
  sortBy: "latest" | "popular" | "difficulty";
  onCategoryChange: (category: string | null) => void;
  onTagChange: (tag: string | null) => void;
  onSortChange: (sort: "latest" | "popular" | "difficulty") => void;
}

export default function FilterBar({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  sortBy,
  onCategoryChange,
  onTagChange,
  onSortChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value === selectedCategory ? null : cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {cat.label}
              {cat.count !== undefined && (
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="ml-auto flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-2 rounded-lg text-sm bg-white border border-neutral-200 text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            <option value="latest">最新发布</option>
            <option value="popular">最热阅读</option>
            <option value="difficulty">难度等级</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              showFilters || selectedTag
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            筛选
            {selectedTag && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 animate-fade-in">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              标签筛选
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => onTagChange(tag.value === selectedTag ? null : tag.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedTag === tag.value
                      ? "bg-orange-500 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {tag.label}
                  {tag.count !== undefined && (
                    <span className="ml-1 text-xs opacity-60">{tag.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(selectedCategory || selectedTag) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-400">已筛选:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-lg text-neutral-700">
              {categories.find(c => c.value === selectedCategory)?.label}
              <button 
                onClick={() => onCategoryChange(null)}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-lg text-orange-700">
              {tags.find(t => t.value === selectedTag)?.label}
              <button 
                onClick={() => onTagChange(null)}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              onCategoryChange(null);
              onTagChange(null);
            }}
            className="text-neutral-400 hover:text-neutral-600 underline"
          >
            清除全部
          </button>
        </div>
      )}
    </div>
  );
}
