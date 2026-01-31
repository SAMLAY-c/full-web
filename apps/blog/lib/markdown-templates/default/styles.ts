/**
 * 默认模板的全局CSS样式
 *
 * 包含markdown渲染相关的所有CSS：
 * - 深色模式支持
 * - Prose元素字体优化
 * - 动画定义
 * - 选择颜色
 * - 过渡效果
 */
export const globalStyles = `
/* Dark mode support */
.dark {
  color-scheme: dark;
}

/* Custom prose enhancements */
.prose {
  /* Ensure prose elements use custom fonts */
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

/* Code block copy button animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Table of contents (if needed) */
.toc-link {
  scroll-margin-top: 2rem;
}

/* Smooth transitions for dark mode */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Prevent transitions on page load */
.no-transition {
  transition: none !important;
}

/* Improved selection colors */
::selection {
  background-color: rgb(49 130 206 / 0.3);
  color: inherit;
}

.dark ::selection {
  background-color: rgb(49 130 206 / 0.5);
  color: inherit;
}
`;
