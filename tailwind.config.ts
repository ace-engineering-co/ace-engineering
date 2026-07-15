import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* dark scenes */
        ink: "#070D1A",
        navy: "#0C1830",
        linedark: "#1B2C4E",
        steel: "#94A3BC",
        haze: "#C7D2E4",
        paper: "#F4F7FC",
        /* light scenes */
        cloud: "#F6F7F9",
        hairline: "#E4E8EF",
        slate: "#35404F",
        deep: "#0B1526",
        /* accent */
        amp: "#F58220",
        ampdeep: "#D96A0B"
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      maxWidth: { wrap: "76rem" }
    }
  },
  plugins: []
};
export default config;
