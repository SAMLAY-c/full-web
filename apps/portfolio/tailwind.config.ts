import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 主色系统 - 温暖琥珀橙
        primary: {
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
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))"
        },
        // 中性色 - 暖色调灰
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
          950: "rgb(var(--neutral-950))"
        },
        // 语义化颜色
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))"
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))"
        },
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Merriweather", "Georgia", "serif"]
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      }
    }
  },
  plugins: []
} satisfies Config;
