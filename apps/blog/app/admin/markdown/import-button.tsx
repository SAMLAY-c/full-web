"use client";

import { useState, useTransition } from "react";

interface ImportMarkdownButtonProps {
  files: string[];
}

export function ImportMarkdownButton({ files }: ImportMarkdownButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleImport = async () => {
    setStatus({ type: null, message: "" });

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/import-markdown", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus({
            type: "success",
            message: `成功导入 ${data.successCount} 个文件，失败 ${data.failCount} 个`,
          });
        } else {
          setStatus({
            type: "error",
            message: data.error || "导入失败",
          });
        }
      } catch (error) {
        setStatus({
          type: "error",
          message: error instanceof Error ? error.message : "导入失败",
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      {status.type && (
        <div
          className={`text-sm ${
            status.type === "success"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {status.message}
        </div>
      )}
      <button
        onClick={handleImport}
        disabled={isPending || files.length === 0}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            导入中...
          </>
        ) : (
          <>
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            全部导入
          </>
        )}
      </button>
    </div>
  );
}
