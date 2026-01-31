"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import CodeBlock from "../../../components/CodeBlock";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * 默认模板的 PortableText 组件配置
 *
 * 包含所有自定义的渲染器：
 * - Marks: code, link, strong, em, mark
 * - Blocks: h1-h4, paragraphs, blockquotes
 * - Lists: bullet, number
 * - Types: code blocks, images, callouts, details
 */
export const components: PortableTextComponents = {
  marks: {
    code: ({ children }) => (
      <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-brand-600 before:content-none after:content-none dark:bg-gray-800 dark:text-brand-400">
        {children}
      </code>
    ),
    mark: ({ children }) => (
      <mark className="rounded-md bg-yellow-200 px-1.5 py-0.5 before:content-none after:content-none dark:bg-yellow-600/30">
        {children}
      </mark>
    ),
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const isExternal = href && (href.startsWith("http") || href.startsWith("//"));
      const rel = isExternal ? "noreferrer noopener" : undefined;
      const target = isExternal ? "_blank" : undefined;

      return (
        <a
          href={href}
          rel={rel}
          target={target}
          className="text-brand-600 underline decoration-2 underline-offset-2 decoration-brand-200 transition-all hover:text-brand-700 hover:decoration-brand-600 dark:text-brand-400 dark:decoration-brand-700 dark:hover:decoration-brand-400"
        >
          {children}
          {isExternal && (
            <span className="ml-0.5 inline-block align-super text-[0.7em] opacity-70">
              ↗
            </span>
          )}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">
        {children}
      </em>
    ),
  },

  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 border-b-2 border-gray-200 pb-2 text-3xl font-bold leading-tight text-gray-900 dark:border-gray-700 dark:text-gray-100 sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-300 bg-brand-50/50 py-3 pl-4 italic text-gray-700 dark:border-brand-700 dark:bg-brand-950/20 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-brand-600 dark:marker:text-brand-400">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-gray-900 dark:marker:text-gray-100">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 dark:text-gray-300">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 dark:text-gray-300">{children}</li>
    ),
  },

  hardBreak: () => <br className="my-4" />,

  types: {
    code: ({ value }) => (
      <CodeBlock
        language={value?.language || "text"}
        code={value?.code || ""}
        filename={value?.filename}
        showLineNumbers={value?.lineNumbers !== false}
      />
    ),

    image: ({ value }) => {
      const imageUrl = value?.asset?._ref
        ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
        : value?.url;

      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={imageUrl}
              alt={value?.alt || "Image"}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Custom callout block
    callout: ({ value }) => {
      const { type = "info", title } = value || {};
      const typeStyles = {
        info: {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "ℹ️",
          title: "Note",
        },
        warning: {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-200 dark:border-yellow-800",
          icon: "⚠️",
          title: "Warning",
        },
        error: {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          icon: "❌",
          title: "Error",
        },
        success: {
          bg: "bg-green-50 dark:bg-green-950/20",
          border: "border-green-200 dark:border-green-800",
          icon: "✅",
          title: "Success",
        },
      };

      const style = typeStyles[type as keyof typeof typeStyles] || typeStyles.info;

      return (
        <div className={`my-6 rounded-lg border-l-4 p-4 ${style.border} ${style.bg}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl" role="img" aria-label={style.title}>
              {style.icon}
            </span>
            <div className="flex-1">
              {title && (
                <p className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </p>
              )}
              <div className="text-gray-700 dark:text-gray-300">
                <PortableText value={value?.content} components={components} />
              </div>
            </div>
          </div>
        </div>
      );
    },

    // Details/Summary component
    details: ({ value }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <details
          className="my-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          open={isOpen}
          onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {value?.summary || "Details"}
            </div>
          </summary>
          <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
            <PortableText value={value?.content} components={components} />
          </div>
        </details>
      );
    },
  },
};
