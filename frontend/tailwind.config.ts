import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "var(--dark-bg)",
        darkCard: "var(--dark-card)",
        darkSoft: "var(--dark-soft)",

        gold: "var(--gold)",
        goldSoft: "var(--gold-soft)",

        textLight: "var(--text-light)",
        textMuted: "var(--text-muted)",
      }
    }
  },
  plugins: [],
};

export default config;
