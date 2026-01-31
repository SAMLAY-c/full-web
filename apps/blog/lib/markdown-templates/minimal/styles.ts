/**
 * 极简模板的全局CSS样式
 *
 * 设计原则：
 * - 最小化样式
 * - 减少动画和过渡效果
 * - 专注于内容可读性
 */
export const globalStyles = `
/* Minimal theme - basic dark mode support */
.dark {
  color-scheme: dark;
}

/* Custom prose enhancements - minimal version */
.prose {
  font-family: var(--font-body);
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  font-family: var(--font-display);
}

/* Simplified selection colors */
::selection {
  background-color: rgb(0 0 0 / 0.1);
  color: inherit;
}

.dark ::selection {
  background-color: rgb(255 255 255 / 0.2);
  color: inherit;
}
`;
