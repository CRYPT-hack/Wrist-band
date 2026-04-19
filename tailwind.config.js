/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070B18",
          900: "#0B1020",
          800: "#121A33",
          700: "#1B2547",
          600: "#2B3A73",
        },
        accent: {
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          pink: "#F472B6",
          lime: "#A3E635",
          amber: "#FBBF24",
          rose: "#FB7185",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["'Space Grotesk'", "Inter", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(139,92,246,0.45)",
        card: "0 10px 30px -12px rgba(2, 6, 23, 0.6)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(1200px 600px at 10% -10%, rgba(139,92,246,0.25), transparent), radial-gradient(900px 500px at 110% 10%, rgba(34,211,238,0.18), transparent)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "80%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
