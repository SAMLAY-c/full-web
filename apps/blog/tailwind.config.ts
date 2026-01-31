import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d7ecff",
          200: "#b0d9ff",
          300: "#7ec0ff",
          400: "#49a4ff",
          500: "#1c86ff",
          600: "#0a6de6",
          700: "#0955b3",
          800: "#0b478f",
          900: "#0d3d73"
        }
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            // Base colors matching existing design
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.brand.600'),
            '--tw-prose-links-hover': theme('colors.brand.700'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-code': theme('colors.brand.600'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quote-borders': theme('colors.brand.200'),

            // Max width for readability
            maxWidth: '65ch',

            // Headings
            h1: {
              fontWeight: '700',
              fontSize: theme('fontSize.4xl')[0],
              lineHeight: theme('fontSize.4xl')[1].lineHeight,
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              fontWeight: '700',
              fontSize: theme('fontSize.3xl')[0],
              lineHeight: theme('fontSize.3xl')[1].lineHeight,
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
              paddingBottom: '0.5rem',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            h3: {
              fontWeight: '600',
              fontSize: theme('fontSize.2xl')[0],
              lineHeight: theme('fontSize.2xl')[1].lineHeight,
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            h4: {
              fontWeight: '600',
              fontSize: theme('fontSize.xl')[0],
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },

            // Paragraphs
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },

            // Links
            a: {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textDecorationColor: theme('colors.brand.200'),
              transition: 'all 150ms ease',
              '&:hover': {
                textDecorationColor: theme('colors.brand.600'),
              },
            },

            // Lists
            ul: {
              paddingLeft: '1.5rem',
              listStyleType: 'disc',
            },
            ol: {
              paddingLeft: '1.5rem',
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingLeft: '0.5rem',
            },

            // Blockquotes
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: theme('colors.gray.600'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.brand.300'),
              paddingLeft: '1rem',
              marginLeft: '0',
              marginRight: '0',
            },

            // Inline code
            code: {
              color: theme('colors.brand.600'),
              fontWeight: '500',
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },

            // Code blocks (custom styling, handled by syntax highlighter)
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },

            // Horizontal rules
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '3rem',
              marginBottom: '3rem',
            },

            // Images
            img: {
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
              boxShadow: theme('boxShadow.lg'),
            },

            // Tables (from GFM)
            table: {
              width: '100%',
              tableLayout: 'auto',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
            },
            thead: {
              borderBottomWidth: '2px',
              borderColor: theme('colors.gray.300'),
            },
            'th, td': {
              padding: '0.75rem 1rem',
              textAlign: 'left',
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
            },
            th: {
              fontWeight: '600',
              backgroundColor: theme('colors.gray.50'),
            },
            'tbody tr': {
              transition: 'background-color 150ms ease',
              '&:hover': {
                backgroundColor: theme('colors.gray.50'),
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: theme('fontSize.lg')[0],
            h1: { fontSize: theme('fontSize.5xl')[0] },
            h2: { fontSize: theme('fontSize.4xl')[0] },
            h3: { fontSize: theme('fontSize.3xl')[0] },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ] as any,
} satisfies Config;
