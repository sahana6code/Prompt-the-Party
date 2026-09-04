import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#23201B", // warm dark base, not pure black
          light: "#2E2A23",
          dark: "#1A1712",
        },
        paper: {
          DEFAULT: "#EFE7D8", // ticket paper, used for result cards only
          bright: "#F7F2E7",
        },
        amber: {
          DEFAULT: "#D98B2B", // the pass / cooking accent
          dim: "#9C6620",
        },
        teal: {
          DEFAULT: "#4C7A73", // assistant / informational accent
          light: "#6E9990",
        },
        rust: {
          DEFAULT: "#B4472B", // emphasis / price
        },
        ink: "#1A1712",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        ticket: "2px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        riseIn: "riseIn 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
