import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f1e8",
        ink: "#1d1a16",
        sand: "#e8dccb",
        clay: "#b78f68",
        forest: "#415143",
        gold: "#8b6a3d",
        paper: "#fffaf3",
        line: "#d6c8b6",
        muted: "#6e6257",
      },
      boxShadow: {
        panel: "0 18px 50px rgba(58, 40, 22, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
