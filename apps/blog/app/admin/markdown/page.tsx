import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import Link from "next/link";
import { ImportMarkdownButton } from "./import-button";

export const metadata: Metadata = {
  title: "Markdown 管理 - Blog Admin",
  description: "管理和导入 Markdown 文件到 Sanity CMS",
};

/**
 * 获取本地 Markdown 文件列表
 */
async function getMarkdownFiles() {
  const postsDir = path.join(process.cwd(), "posts");

  try {
    await fs.access(postsDir);
  } catch {
    return [];
  }

  const files = await fs.readdir(postsDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const fileData = await Promise.all(
    markdownFiles.map(async (filename) => {
      const filePath = path.join(postsDir, filename);
      const stats = await fs.stat(filePath);
      const content = await fs.readFile(filePath, "utf-8");

      // 提取 frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
      let title = filename.replace(".md", "");
      let excerpt = "";

      if (frontmatterMatch) {
        const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/);
        const excerptMatch = frontmatterMatch[1].match(
          /excerpt:\s*["']?([^"'\n]+)["']?/
        );
        if (titleMatch) title = titleMatch[1];
        if (excerptMatch) excerpt = excerptMatch[1];
      }

      return {
        filename,
        title,
        excerpt: excerpt || content.slice(0, 100) + "...",
        size: `${(stats.size / 1024).toFixed(2)} KB`,
        modified: stats.mtime.toLocaleDateString("zh-CN"),
      };
    })
  );

  return fileData;
}

export default async function MarkdownAdminPage() {
  const files = await getMarkdownFiles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Markdown 管理
              </h1>
              <p className="mt-2 text-gray-600">
                管理和导入 Markdown 文件到 Sanity CMS
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                总文件数
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {files.length}
              </dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                已导入
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {files.length}
              </dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                文件位置
              </dt>
              <dd className="mt-1 text-sm font-medium text-gray-900 truncate">
                /posts
              </dd>
            </div>
          </div>
        </div>

        {/* Import Button */}
        <div className="mb-6 flex justify-end">
          <ImportMarkdownButton files={files.map((f) => f.filename)} />
        </div>

        {/* File List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {files.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                暂无 Markdown 文件
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                在 /posts 目录下创建 .md 文件开始使用
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {files.map((file) => (
                <li key={file.filename}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {file.title}
                          </p>
                        </div>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">{file.excerpt}</span>
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span className="mr-4">📄 {file.filename}</span>
                          <span className="mr-4">📦 {file.size}</span>
                          <span>📅 {file.modified}</span>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <Link
                          href={`/admin/markdown/preview/${file.filename}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          预览
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            💡 使用提示
          </h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>在 /posts 目录下创建 .md 文件</li>
            <li>使用 YAML frontmatter 添加元数据（title, date, tags 等）</li>
            <li>点击"全部导入"按钮将所有文件导入到 Sanity CMS</li>
            <li>点击"预览"查看文件的渲染效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
