import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* dark scenes — anchored to the brand navy #05162D */
        ink: "#040E1C",
        navy: "#05162D",
        linedark: "#1B2C4E",
        steel: "#94A3BC",
        haze: "#C7D2E4",
        paper: "#F4F7FC",
        /* light scenes */
        cloud: "#F6F7F9",
        hairline: "#E4E8EF",
        slate: "#35404F",
        deep: "#05162D",
        /* accent — steel/ice blue drawn from the navy brand mark */
        amp: "#7FA6D9",
        ampdeep: "#54749E"
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
