"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Register languages
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("xml", html);
SyntaxHighlighter.registerLanguage("json", json);

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
  showLineNumbers?: boolean;
  theme?: "dark" | "light";
}

// Map common language aliases
const languageMap: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  tsx: "tsx",
  jsx: "jsx",
  py: "python",
  sh: "bash",
  shell: "bash",
  yml: "yaml",
  yaml: "yaml",
};

export default function CodeBlock({
  language,
  code,
  filename,
  showLineNumbers = true,
  theme = "dark",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const normalizedLanguage = languageMap[language.toLowerCase()] || language;
  const syntaxTheme = theme === "dark" ? vscDarkPlus : vs;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            {normalizedLanguage || "text"}
          </span>
          {filename && (
            <>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {filename}
              </span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={normalizedLanguage}
        style={syntaxTheme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          lineHeight: "1.714",
          background: theme === "dark" ? "#1e1e1e" : "#ffffff",
        }}
        lineNumberStyle={{
          fontSize: "0.75rem",
          color: theme === "dark" ? "#858585" : "#999999",
          paddingRight: "1rem",
          minWidth: "2.5rem",
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
