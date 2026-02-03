import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // 颜色系统 - 继承统一设计系统
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "rgb(var(--primary-50))",
          100: "rgb(var(--primary-100))",
          200: "rgb(var(--primary-200))",
          300: "rgb(var(--primary-300))",
          400: "rgb(var(--primary-400))",
          500: "rgb(var(--primary-500))",
          600: "rgb(var(--primary-600))",
          700: "rgb(var(--primary-700))",
          800: "rgb(var(--primary-800))",
          900: "rgb(var(--primary-900))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          0: "rgb(var(--neutral-0))",
          50: "rgb(var(--neutral-50))",
          100: "rgb(var(--neutral-100))",
          200: "rgb(var(--neutral-200))",
          300: "rgb(var(--neutral-300))",
          400: "rgb(var(--neutral-400))",
          500: "rgb(var(--neutral-500))",
          600: "rgb(var(--neutral-600))",
          700: "rgb(var(--neutral-700))",
          800: "rgb(var(--neutral-800))",
          900: "rgb(var(--neutral-900))",
          950: "rgb(var(--neutral-950))",
        },
        // 向后兼容的颜色别名
        brand: {
          50: "rgb(var(--primary-50))",
          100: "rgb(var(--primary-100))",
          200: "rgb(var(--primary-200))",
          300: "rgb(var(--primary-300))",
          400: "rgb(var(--primary-400))",
          500: "rgb(var(--primary-500))",
          600: "rgb(var(--primary-600))",
          700: "rgb(var(--primary-700))",
          800: "rgb(var(--primary-800))",
          900: "rgb(var(--primary-900))",
        },
        warm: {
          cream: "rgb(var(--neutral-50))",
          warm: "rgb(var(--primary-50))",
          peach: "rgb(var(--primary-200))",
          coral: "rgb(var(--primary-400))",
          orange: "rgb(var(--primary-500))",
          dark: "rgb(var(--primary-700))",
        },
        text: {
          dark: "rgb(var(--neutral-800))",
          medium: "rgb(var(--neutral-500))",
          light: "rgb(var(--neutral-400))",
        },
      },

      // 字体系统
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Merriweather", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        // 向后兼容
        display: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-serif)", "Merriweather", "Georgia", "serif"],
      },

      // 圆角系统
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      // 阴影系统
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        // 向后兼容
        soft: "0 4px 20px rgba(249, 115, 22, 0.15)",
        medium: "0 8px 40px rgba(249, 115, 22, 0.2)",
        strong: "0 12px 60px rgba(234, 88, 12, 0.25)",
      },

      // 背景图片
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },

      // 关键帧动画
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -30px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-20px, 20px)" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 8s ease-in-out infinite",
        "float-reverse": "float-reverse 10s ease-in-out infinite",
        "slide-left": "slide-left 1s ease forwards",
        "slide-right": "slide-right 1s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },

      // Typography 配置
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.neutral.700"),
            "--tw-prose-headings": theme("colors.neutral.900"),
            "--tw-prose-links": theme("colors.primary.500"),
            "--tw-prose-links-hover": theme("colors.primary.600"),
            "--tw-prose-code": theme("colors.primary.500"),
            "--tw-prose-quote-borders": theme("colors.primary.200"),
            maxWidth: "65ch",
            fontFamily: `${theme("fontFamily.serif")}`,
            h1: {
              fontFamily: `${theme("fontFamily.sans")}`,
              fontWeight: "700",
              fontSize: theme("fontSize.4xl")[0],
              lineHeight: theme("fontSize.4xl")[1].lineHeight,
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h2: {
              fontFamily: `${theme("fontFamily.sans")}`,
              fontWeight: "700",
              fontSize: theme("fontSize.3xl")[0],
              lineHeight: theme("fontSize.3xl")[1].lineHeight,
              marginTop: "1.75rem",
              marginBottom: "0.75rem",
              paddingBottom: "0.5rem",
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.neutral.200"),
            },
            h3: {
              fontFamily: `${theme("fontFamily.sans")}`,
              fontWeight: "600",
              fontSize: theme("fontSize.2xl")[0],
              lineHeight: theme("fontSize.2xl")[1].lineHeight,
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            },
            h4: {
              fontFamily: `${theme("fontFamily.sans")}`,
              fontWeight: "600",
              fontSize: theme("fontSize.xl")[0],
              marginTop: "1.25rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.75",
            },
            a: {
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textDecorationColor: theme("colors.primary.200"),
              transition: "all 150ms ease",
              "&:hover": {
                textDecorationColor: theme("colors.primary.600"),
              },
            },
            ul: {
              paddingLeft: "1.5rem",
              listStyleType: "disc",
            },
            ol: {
              paddingLeft: "1.5rem",
              listStyleType: "decimal",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              paddingLeft: "0.5rem",
            },
            blockquote: {
              fontWeight: "400",
              fontStyle: "italic",
              color: theme("colors.neutral.600"),
              borderLeftWidth: "4px",
              borderLeftColor: theme("colors.primary.300"),
              paddingLeft: "1rem",
              marginLeft: "0",
              marginRight: "0",
            },
            code: {
              color: theme("colors.primary.600"),
              fontWeight: "500",
              backgroundColor: theme("colors.neutral.100"),
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              color: "inherit",
            },
            hr: {
              borderColor: theme("colors.neutral.200"),
              marginTop: "3rem",
              marginBottom: "3rem",
            },
            img: {
              marginTop: "2rem",
              marginBottom: "2rem",
              borderRadius: "0.5rem",
              boxShadow: theme("boxShadow.lg"),
            },
            table: {
              width: "100%",
              tableLayout: "auto",
              marginTop: "2rem",
              marginBottom: "2rem",
              borderWidth: "1px",
              borderColor: theme("colors.neutral.200"),
            },
            thead: {
              borderBottomWidth: "2px",
              borderColor: theme("colors.neutral.300"),
            },
            "th, td": {
              padding: "0.75rem 1rem",
              textAlign: "left",
              borderWidth: "1px",
              borderColor: theme("colors.neutral.200"),
            },
            th: {
              fontFamily: `${theme("fontFamily.sans")}`,
              fontWeight: "600",
              backgroundColor: theme("colors.neutral.50"),
            },
            "tbody tr": {
              transition: "background-color 150ms ease",
              "&:hover": {
                backgroundColor: theme("colors.neutral.50"),
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: theme("fontSize.lg")[0],
            h1: { fontSize: theme("fontSize.5xl")[0] },
            h2: { fontSize: theme("fontSize.4xl")[0] },
            h3: { fontSize: theme("fontSize.3xl")[0] },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;

export default config;
