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
          50: "#FFF8F3",
          100: "#FFE8DC",
          200: "#FFD4C4",
          300: "#FF9F7F",
          400: "#FF8C42",
          500: "#FF6B35",
          600: "#E85D04",
          700: "#D44A00",
          800: "#A33A04",
          900: "#7A2E08"
        },
        warm: {
          cream: "#FFF8F3",
          warm: "#FFF0E8",
          peach: "#FFD4C4",
          coral: "#FF9F7F",
          orange: "#FF6B35",
          dark: "#E85D04"
        },
        text: {
          dark: "#2D1B14",
          medium: "#5D4037",
          light: "#8D6E63"
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '20px',
        'lg': '32px',
        'xl': '48px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(255, 107, 53, 0.15)',
        'medium': '0 8px 40px rgba(255, 107, 53, 0.2)',
        'strong': '0 12px 60px rgba(232, 93, 4, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            // Base colors matching existing design
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.brand.500'),
            '--tw-prose-links-hover': theme('colors.brand.600'),
            '--tw-prose-code': theme('colors.brand.500'),
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
