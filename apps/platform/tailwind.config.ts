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
        ink: "#0c1016",
        mist: "#eef1f5",
        accent: "#2b7a78",
        ember: "#d96c06"
      }
    }
  },
  plugins: []
} satisfies Config;
