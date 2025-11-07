/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        morocco: {
          red: "#C1272D",
          green: "#006233",
          sand: "#D1BFA3",
        },
      },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
} satisfies Config;
