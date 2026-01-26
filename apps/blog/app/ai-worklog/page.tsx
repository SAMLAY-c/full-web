'use client';

import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: string;
  git: {
    branch: string;
    commit: string;
    remote: string;
    user: string;
    email: string;
  };
  data: {
    type: string;
    tool?: string;
    description?: string;
    command?: string;
    [key: string]: any;
  };
}

export default function AIWorklogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'tool_use' | 'session_end' | 'codex_execution'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ai-logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load logs');
        setLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    return log.data.type === filter;
  });

  const getFilterLabel = (type: string) => {
    const labels: Record<string, string> = {
      all: '全部',
      tool_use: '工具调用',
      session_end: '会话结束',
      codex_execution: 'Codex 执行',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      tool_use: 'bg-blue-100 text-blue-800',
      session_end: 'bg-green-100 text-green-800',
      codex_execution: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 pb-24 pt-12 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600">
            AI Work Log
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-brand-900 sm:text-5xl">
            AI 工作日志
          </h1>
          <p className="mt-4 text-lg text-brand-800">
            自动记录 Claude Code 和 Codex 的使用情况
          </p>
        </header>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
              总计
            </p>
            <p className="mt-3 text-2xl font-semibold text-brand-900">
              {logs.length}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
              工具调用
            </p>
            <p className="mt-3 text-2xl font-semibold text-brand-900">
              {logs.filter((l) => l.data.type === 'tool_use').length}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
              会话结束
            </p>
            <p className="mt-3 text-2xl font-semibold text-brand-900">
              {logs.filter((l) => l.data.type === 'session_end').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-x-2">
          {(['all', 'tool_use', 'session_end', 'codex_execution'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === type
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-brand-700 hover:bg-brand-50'
              }`}
            >
              {getFilterLabel(type)}
            </button>
          ))}
        </div>

        {/* Logs */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="rounded-2xl border border-brand-200 bg-white p-8 text-center shadow-sm">
              <p className="text-brand-600">暂无日志记录</p>
            </div>
          ) : (
            filteredLogs.map((log, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="border-b border-brand-100 bg-brand-50 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-600">
                      {new Date(log.timestamp).toLocaleString('zh-CN', {
                        timeZone: 'Asia/Shanghai',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getTypeColor(
                        log.data.type
                      )}`}
                    >
                      {getFilterLabel(log.data.type)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Git Info */}
                  <div className="mb-3 flex flex-wrap gap-4 text-sm text-brand-700">
                    <span className="font-mono">🌿 {log.git.branch}</span>
                    <span className="font-mono">📝 {log.git.commit}</span>
                    {log.git.user && <span>👤 {log.git.user}</span>}
                  </div>

                  {/* Tool or Command */}
                  {log.data.tool && (
                    <div className="mb-2">
                      <span className="mr-2 font-semibold text-brand-900">
                        工具:
                      </span>
                      <span className="font-mono text-sm text-brand-700">
                        {log.data.tool}
                      </span>
                    </div>
                  )}

                  {log.data.command && (
                    <div className="mb-2">
                      <span className="mr-2 font-semibold text-brand-900">
                        命令:
                      </span>
                      <span className="font-mono text-sm text-brand-700">
                        {log.data.command}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {log.data.description && (
                    <div className="text-sm text-brand-800">
                      {log.data.description}
                    </div>
                  )}

                  {/* Raw Data (collapsible) */}
                  {Object.keys(log.data).length > 3 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-brand-600">
                        查看完整数据
                      </summary>
                      <pre className="mt-2 overflow-auto rounded-lg bg-brand-50 p-3 text-xs">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
