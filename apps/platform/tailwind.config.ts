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
        // Core Slate Scale
        slate: {
          950: "#0a0e1a",
          900: "#111827",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          400: "#94a3b8",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc"
        },
        // Primary Accent - Vibrant Coral
        coral: {
          600: "#f15a5a",
          500: "#ff6b6b",
          400: "#ff8585",
          300: "#ffb3b3"
        },
        // Secondary Accent - Electric Mint
        mint: {
          600: "#00b386",
          500: "#00d9a3",
          400: "#33e0b5"
        },
        // Semantic Colors
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          highlight: "var(--surface-highlight)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)"
        },
        border: {
          subtle: "var(--border-subtle)",
          standard: "var(--border-standard)",
          strong: "var(--border-strong)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        coral: "var(--shadow-coral)",
        mint: "var(--shadow-mint)",
        glow: "0 0 40px rgba(255, 107, 107, 0.2)"
      },
      borderRadius: {
        xl: "var(--radius-xl)"
      }
    }
  },
  plugins: []
} satisfies Config;
