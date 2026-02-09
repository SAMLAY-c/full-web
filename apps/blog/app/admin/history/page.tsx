"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Version {
  id: string;
  timestamp: number;
  date: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  status: "draft" | "published";
  changeSummary?: string;
}

interface DiffResult {
  lineNumber: number;
  type: "added" | "removed" | "modified";
  oldContent?: string;
  newContent?: string;
}

export default function HistoryPage() {
  const [slug, setSlug] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [diffResult, setDiffResult] = useState<any>(null);
  const [viewingVersion, setViewingVersion] = useState<Version | null>(null);

  // 加载文章历史
  const loadHistory = async () => {
    if (!slug.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/history?slug=${encodeURIComponent(slug)}`);
      const data = await res.json();
      setVersions(data.versions || []);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
    setLoading(false);
  };

  // 对比版本
  const compareVersions = async () => {
    if (selectedVersions.length !== 2) return;
    
    try {
      const res = await fetch("/api/history", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          oldVersionId: selectedVersions[0],
          newVersionId: selectedVersions[1],
        }),
      });
      const data = await res.json();
      setDiffResult(data);
    } catch (error) {
      console.error("Failed to compare:", error);
    }
  };

  // 选择版本
  const toggleVersion = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      }
      if (prev.length >= 2) {
        return [prev[1], versionId];
      }
      return [...prev, versionId];
    });
  };

  // 恢复版本
  const restoreVersion = async (version: Version) => {
    if (!confirm(`确定要恢复到 "${version.title}" 的这个版本吗？`)) return;
    
    try {
      const res = await fetch("/api/admin/save-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: version.slug,
          title: version.title,
          excerpt: version.excerpt,
          content: "", // 需要从完整版本获取
          tags: version.tags,
          status: version.status,
        }),
      });
      
      if (res.ok) {
        alert("版本恢复成功！");
      }
    } catch (error) {
      alert("恢复失败");
    }
  };

  // 创建备份
  const createBackup = async () => {
    try {
      const res = await fetch("/api/history/backup", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`备份创建成功！\n路径: ${data.backupPath}`);
      }
    } catch (error) {
      alert("备份失败");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-neutral-500 hover:text-neutral-900">
                ← 返回
              </Link>
              <h1 className="text-xl font-semibold text-neutral-900">版本历史管理</h1>
            </div>
            <button
              onClick={createBackup}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm hover:bg-neutral-800"
            >
              创建备份
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            文章 Slug
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="输入文章 slug，例如：ai-pm-guide"
              className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200"
              onKeyDown={(e) => e.key === "Enter" && loadHistory()}
            />
            <button
              onClick={loadHistory}
              disabled={loading}
              className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "加载中..." : "查看历史"}
            </button>
          </div>
        </div>

        {versions.length > 0 && (
          <>
            {/* Compare Actions */}
            {selectedVersions.length === 2 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  已选择 2 个版本进行对比
                </span>
                <button
                  onClick={compareVersions}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  对比差异
                </button>
              </div>
            )}

            {/* Versions List */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-900">
                  历史版本 ({versions.length} 个)
                </h2>
              </div>
              <div className="divide-y divide-neutral-100">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    className={`px-6 py-4 hover:bg-neutral-50 transition-colors ${
                      selectedVersions.includes(version.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedVersions.includes(version.id)}
                        onChange={() => toggleVersion(version.id)}
                        className="mt-1 w-4 h-4 rounded border-neutral-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-mono text-neutral-400">
                            #{versions.length - index}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {new Date(version.date).toLocaleString("zh-CN")}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              version.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {version.status === "published" ? "已发布" : "草稿"}
                          </span>
                        </div>
                        <h3 className="font-medium text-neutral-900">{version.title}</h3>
                        {version.changeSummary && (
                          <p className="text-sm text-neutral-500 mt-1">
                            {version.changeSummary}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setViewingVersion(version)}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            查看内容
                          </button>
                          <button
                            onClick={() => restoreVersion(version)}
                            className="text-sm text-neutral-600 hover:text-neutral-900"
                          >
                            恢复此版本
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Diff Result */}
        {diffResult && (
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100">
              <h2 className="font-semibold text-neutral-900">版本对比</h2>
              <p className="text-sm text-neutral-500 mt-1">
                共 {diffResult.totalChanges} 处变更：
                <span className="text-green-600">+{diffResult.addedLines} 新增</span>，
                <span className="text-red-600">-{diffResult.removedLines} 删除</span>，
                <span className="text-blue-600">~{diffResult.modifiedLines} 修改</span>
              </p>
            </div>
            <div className="max-h-[600px] overflow-auto">
              {diffResult.diff.map((item: DiffResult, idx: number) => (
                <div
                  key={idx}
                  className={`px-6 py-2 text-sm font-mono border-b border-neutral-50 ${
                    item.type === "added"
                      ? "bg-green-50 text-green-800"
                      : item.type === "removed"
                      ? "bg-red-50 text-red-800"
                      : "bg-blue-50 text-blue-800"
                  }`}
                >
                  <div className="flex gap-4">
                    <span className="text-neutral-400 w-12">{item.lineNumber}</span>
                    <span className="w-16 font-medium">
                      {item.type === "added" && "[+ 新增]"}
                      {item.type === "removed" && "[- 删除]"}
                      {item.type === "modified" && "[~ 修改]"}
                    </span>
                    <div className="flex-1">
                      {item.type === "modified" ? (
                        <>
                          <div className="line-through opacity-60">{item.oldContent}</div>
                          <div>{item.newContent}</div>
                        </>
                      ) : (
                        <div>{item.newContent || item.oldContent}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Version Modal */}
        {viewingVersion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-900">{viewingVersion.title}</h3>
                  <p className="text-sm text-neutral-500">
                    {new Date(viewingVersion.date).toLocaleString("zh-CN")}
                  </p>
                </div>
                <button
                  onClick={() => setViewingVersion(null)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-auto flex-1">
                <pre className="text-sm text-neutral-700 whitespace-pre-wrap">
                  {viewingVersion.excerpt}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
