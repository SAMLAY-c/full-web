"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, X, FileText } from "lucide-react";
import Fuse from "fuse.js";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 加载搜索数据
  useEffect(() => {
    if (isOpen && searchData.length === 0) {
      setIsLoading(true);
      fetch("/api/search")
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load search data:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, searchData.length]);

  // 初始化 Fuse.js
  const fuse = useMemo(() => {
    if (searchData.length === 0) return null;
    return new Fuse(searchData, {
      keys: [
        { name: "title", weight: 2 }, // 标题权重更高
        { name: "excerpt", weight: 1 },
        { name: "tags", weight: 1.5 },
      ],
      threshold: 0.4, // 容错程度：0.0 = 完全匹配，1.0 = 匹配任何内容
      distance: 100,
      minMatchCharLength: 1,
      includeScore: true,
    });
  }, [searchData]);

  // 执行搜索
  const results = useMemo(() => {
    if (!query.trim() || !fuse) return [];

    const searchResults = fuse.search(query);
    return searchResults.map((result) => result.item);
  }, [query, fuse]);

  // 键盘事件处理
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      // Cmd+K 或 Ctrl+K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // 这里需要父组件来处理打开逻辑
        }
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* 搜索输入框 */}
          <div className="flex items-center gap-3 border-b border-gray-200 p-4">
            <Search className="h-5 w-5 flex-shrink-0 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章、教程或技术栈..."
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
              autoFocus
            />
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-xs text-gray-500">ESC</span>
            </button>
          </div>

          {/* 搜索结果 */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading && (
              <div className="p-8 text-center text-gray-500">
                加载搜索数据...
              </div>
            )}

            {!isLoading && query.trim() === "" && (
              <div className="p-8 text-center text-gray-500">
                <p className="mb-2">输入关键词开始搜索</p>
                <p className="text-sm text-gray-400">
                  支持标题、摘要、标签的模糊搜索
                </p>
              </div>
            )}

            {!isLoading && query.trim() !== "" && results.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                没有找到相关文章
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500">
                  找到 {results.length} 篇文章
                </p>
                {results.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="flex gap-4 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 flex-shrink-0 text-gray-400 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs rounded-full bg-blue-50 px-2 py-0.5 text-blue-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 底部提示 */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>支持模糊搜索，容错匹配</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  导航
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-mono">
                    Enter
                  </kbd>
                  打开
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-mono">
                    ESC
                  </kbd>
                  关闭
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
