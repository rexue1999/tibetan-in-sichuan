import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          charcoal: '#1F1F1F',
          beige: '#E8E1D9',
          'beige-light': '#F5F2ED',
          red: '#8C3B2E',
          'red-light': '#B85C4E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
