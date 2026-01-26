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
      }
    }
  },
  plugins: []
} satisfies Config;
