"use client";

import type { PortableTextComponents } from "@portabletext/react";
import CodeBlock from "../../../components/CodeBlock";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * 极简模板的 PortableText 组件配置
 *
 * 设计原则：
 * - 简洁、清爽
 * - 减少装饰元素
 * - 专注于内容本身
 */
export const components: PortableTextComponents = {
  marks: {
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800 before:content-none after:content-none dark:bg-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    mark: ({ children }) => (
      <mark className="rounded bg-yellow-100 px-1 py-0.5 before:content-none after:content-none dark:bg-yellow-900/30">
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
          className="text-gray-700 underline underline-offset-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {children}
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
      <h1 className="mb-4 mt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-gray-300 py-2 pl-4 text-gray-600 dark:border-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5">
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
        showLineNumbers={false}
        theme="light"
      />
    ),

    image: ({ value }) => {
      const imageUrl = value?.asset?._ref
        ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
        : value?.url;

      if (!imageUrl) return null;

      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={value?.alt || "Image"}
            className="w-full rounded"
            loading="lazy"
          />
          {value?.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
