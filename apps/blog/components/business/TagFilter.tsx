"use client";

interface TagFilterProps {
  allTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  postsCountByTag: Record<string, number>;
}

export default function TagFilter({
  allTags,
  selectedTag,
  onTagSelect,
  postsCountByTag,
}: TagFilterProps) {
  const totalCount = Object.values(postsCountByTag).reduce((a, b) => a + b, 0);

  return (
    <div className="mb-12">
      {/* Mobile: Horizontal scroll; Desktop: Grid layout */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-flow-col md:auto-cols-max">
        <button
          onClick={() => onTagSelect(null)}
          className={`flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            selectedTag === null
              ? "bg-slate-900 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          全部
          <span className="ml-2 text-xs opacity-70">
            {totalCount}
          </span>
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
            className={`flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedTag === tag
                ? "bg-slate-900 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
            <span className="ml-2 text-xs opacity-70">
              {postsCountByTag[tag] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
