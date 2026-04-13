import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFD700",
          50: "#FFF9E0", 100: "#FFF3C2", 200: "#FFE785",
          300: "#FFDB47", 400: "#FFD700", 500: "#C7A800",
        },
        dark: {
          DEFAULT: "#0a0a0a", 50: "#1a1a1a", 100: "#141414",
          200: "#111111", 300: "#0d0d0d", 400: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
