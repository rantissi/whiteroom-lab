import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        s: "#111113",
        b: "#1c1c1f",
        p: "#8b5cf6",
        c: "#06b6d4",
      },
    },
  },
  plugins: [],
};
export default config;