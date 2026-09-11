import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#163c58",
          hover: "#0f2c41",
          light: "#23557a",
          dark: "#0a1f2e",
        },
        offwhite: {
          DEFAULT: "#f5f7fa",
          surface: "#f8f9fb",
          subtle: "#eef2f6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
