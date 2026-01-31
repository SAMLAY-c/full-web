import type { Config } from "tailwindcss";

/**
 * 极简模板的 Tailwind Typography 配置
 *
 * 设计原则：
 * - 减少装饰元素
 * - 使用中性色调
 * - 更紧凑的间距
 */
export const typographyTheme: any = ({ theme }: any) => ({
  DEFAULT: {
    css: {
      // 使用中性色调
      '--tw-prose-body': theme('colors.gray.700'),
      '--tw-prose-headings': theme('colors.gray.900'),
      '--tw-prose-links': theme('colors.gray.700'),
      '--tw-prose-links-hover': theme('colors.gray.900'),
      '--tw-prose-bold': theme('colors.gray.900'),
      '--tw-prose-code': theme('colors.gray.800'),
      '--tw-prose-hr': theme('colors.gray.200'),
      '--tw-prose-quote-borders': theme('colors.gray.300'),

      // Max width for readability
      maxWidth: '65ch',

      // Headings - 更简洁的样式
      h1: {
        fontWeight: '600',
        fontSize: theme('fontSize.3xl')[0],
        lineHeight: theme('fontSize.3xl')[1].lineHeight,
        marginTop: '2rem',
        marginBottom: '1rem',
      },
      h2: {
        fontWeight: '600',
        fontSize: theme('fontSize.2xl')[0],
        lineHeight: theme('fontSize.2xl')[1].lineHeight,
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
      },
      h3: {
        fontWeight: '500',
        fontSize: theme('fontSize.xl')[0],
        lineHeight: theme('fontSize.xl')[1].lineHeight,
        marginTop: '1.25rem',
        marginBottom: '0.5rem',
      },
      h4: {
        fontWeight: '500',
        fontSize: theme('fontSize.lg')[0],
        marginTop: '1rem',
        marginBottom: '0.5rem',
      },

      // Paragraphs
      p: {
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
        lineHeight: '1.7',
      },

      // Links - 无下划线，更简洁
      a: {
        textDecoration: 'underline',
        textDecorationThickness: '1px',
        textDecorationColor: theme('colors.gray.300'),
        transition: 'all 150ms ease',
        '&:hover': {
          textDecorationColor: theme('colors.gray.400'),
        },
      },

      // Lists - 更紧凑的间距
      ul: {
        paddingLeft: '1.25rem',
        listStyleType: 'disc',
      },
      ol: {
        paddingLeft: '1.25rem',
        listStyleType: 'decimal',
      },
      li: {
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        paddingLeft: '0.25rem',
      },

      // Blockquotes - 更细的边框
      blockquote: {
        fontWeight: '400',
        color: theme('colors.gray.600'),
        borderLeftWidth: '2px',
        borderLeftColor: theme('colors.gray.300'),
        paddingLeft: '1rem',
        marginLeft: '0',
        marginRight: '0',
      },

      // Inline code - 更简单的样式
      code: {
        color: theme('colors.gray.800'),
        fontWeight: '400',
        backgroundColor: theme('colors.gray.100'),
        padding: '0.2rem 0.3rem',
        borderRadius: '0.2rem',
        fontSize: '0.875em',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      },

      // Code blocks
      'pre code': {
        backgroundColor: 'transparent',
        padding: '0',
        color: 'inherit',
      },

      // Horizontal rules
      hr: {
        borderColor: theme('colors.gray.200'),
        marginTop: '2rem',
        marginBottom: '2rem',
      },

      // Images - 更小的阴影
      img: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '0.3rem',
        boxShadow: theme('boxShadow.md'),
      },

      // Tables
      table: {
        width: '100%',
        tableLayout: 'auto',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderWidth: '1px',
        borderColor: theme('colors.gray.200'),
      },
      thead: {
        borderBottomWidth: '1px',
        borderColor: theme('colors.gray.300'),
      },
      'th, td': {
        padding: '0.5rem 0.75rem',
        textAlign: 'left',
        borderWidth: '1px',
        borderColor: theme('colors.gray.200'),
      },
      th: {
        fontWeight: '500',
        backgroundColor: theme('colors.gray.50'),
      },
      'tbody tr': {
        '&:hover': {
          backgroundColor: theme('colors.gray.50'),
        },
      },
    },
  },
  lg: {
    css: {
      fontSize: theme('fontSize.lg')[0],
      h1: { fontSize: theme('fontSize.4xl')[0] },
      h2: { fontSize: theme('fontSize.3xl')[0] },
      h3: { fontSize: theme('fontSize.2xl')[0] },
    },
  },
});
