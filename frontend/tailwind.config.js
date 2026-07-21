/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: "#0B1F1E", light: "#0F2624" },
        surface: { DEFAULT: "#122E2C", hover: "#173A37" },
        marigold: { DEFAULT: "#E8A33D", soft: "#F0BC6B", dim: "#B67E2C" },
        mint: { DEFAULT: "#4FD1C5", soft: "#7FE0D6" },
        coral: { DEFAULT: "#E85D5D", soft: "#F08A8A" },
        cream: "#EDE7D9",
        "cream-dim": "#B8B2A3",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        flow: { "0%": { strokeDashoffset: "1000" }, "100%": { strokeDashoffset: "0" } },
        pulse_dot: {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        rise: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        flow: "flow 3.5s linear infinite",
        pulse_dot: "pulse_dot 2.4s ease-in-out infinite",
        rise: "rise 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
}
