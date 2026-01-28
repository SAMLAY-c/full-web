import { Metadata } from "next";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { markdownToPortableText, extractTitleAndSlug } from "@/lib/markdown/portable-text";
import PostBody from "../../../../../components/post-body";

interface PreviewPageProps {
  params: {
    filename: string;
  };
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const filename = decodeURIComponent(params.filename);
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, filename);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const { title } = extractTitleAndSlug(filename);

    // 提取 frontmatter 中的标题
    const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
    let metaTitle = title;
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/);
      if (titleMatch) metaTitle = titleMatch[1];
    }

    return {
      title: `${metaTitle} - 预览`,
    };
  } catch {
    return {
      title: "文件未找到",
    };
  }
}

export default async function MarkdownPreviewPage({
  params,
}: PreviewPageProps) {
  const filename = decodeURIComponent(params.filename);
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, filename);

  let content: string;
  let stats: Awaited<ReturnType<typeof fs.stat>>;

  try {
    content = await fs.readFile(filePath, "utf-8");
    stats = await fs.stat(filePath);
  } catch {
    notFound();
  }

  // 提取 frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  let markdownContent = content;
  const metadata: Record<string, any> = {};

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    markdownContent = frontmatterMatch[2];

    // 解析 frontmatter
    const lines = frontmatter.split("\n");
    for (const line of lines) {
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();
      if (key && value) {
        metadata[key.trim()] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  // 获取标题
  const { title } = extractTitleAndSlug(filename);
  const displayTitle = metadata.title || title;

  // 转换为 PortableText
  const portableTextContent = markdownToPortableText(markdownContent);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/markdown"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回列表
          </Link>
        </div>

        {/* Preview Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Preview Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-blue-200 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <h1 className="text-xl font-bold text-white">预览模式</h1>
              </div>
              <div className="text-blue-200 text-sm">
                {filename}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {displayTitle}
            </h1>

            {/* Metadata */}
            {Object.keys(metadata).length > 0 && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {metadata.date && (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {metadata.date}
                    </div>
                  )}
                  {metadata.tags && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {metadata.tags}
                    </div>
                  )}
                  {metadata.status && (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {metadata.status}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Excerpt */}
            {metadata.excerpt && (
              <div className="mb-6 p-4 bg-gray-50 border-l-4 border-blue-500 rounded">
                <p className="text-gray-700 italic">{metadata.excerpt}</p>
              </div>
            )}

            {/* Body */}
            <PostBody content={portableTextContent} />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                文件大小: {((stats.size / 1024).toFixed(2))} KB
              </div>
              <div>
                最后修改: {stats.mtime.toLocaleDateString("zh-CN")}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            href={`/admin/markdown`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            返回列表
          </Link>
        </div>
      </div>
    </div>
  );
}
