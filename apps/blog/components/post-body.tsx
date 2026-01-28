import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  marks: {
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-red-500">
        {children}
      </code>
    ),
    mark: ({ children }) => (
      <mark className="rounded bg-yellow-200 px-1">{children}</mark>
    ),
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const rel = href && !href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a href={href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    }
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 border-b pb-2 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-xl font-bold">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>
  },
  types: {
    image: ({ value }) => (
      <div className="my-6">
        <div className="rounded bg-gray-100 p-4 text-center text-gray-500 italic">
          [图片: {value?.alt || "未命名图片"}]
        </div>
      </div>
    )
  }
};

interface PostBodyProps {
  content: any;
  className?: string;
}

export default function PostBody({ content, className }: PostBodyProps) {
  return (
    <div className={`prose prose-lg mx-auto max-w-none ${className ?? ""}`.trim()}>
      <PortableText value={content} components={components} />
    </div>
  );
}
