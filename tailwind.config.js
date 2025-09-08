/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        press: ['"Press Start 2P"', "cursive"],
      },
      colors: {
        gb: {
          50:  "#F2F5F7",
          100: "#E6EEF1",
          200: "#CFE0E6",
          300: "#A9C9D4",
          400: "#6DA3B6",
          500: "#3F7F98",
          600: "#2F6176",
          700: "#234A5C",
          800: "#1C3B4A",
          900: "#142A36",
        },
        poke: {
          panel: "#F8F8F0",
          border: "#1C3B4A",
          accent: "#2F6176",
          highlight: "#6DA3B6",
        },
      },
      boxShadow: {
        pixel: "0 0 0 2px #1C3B4A, 0 0 0 4px #F8F8F0, 0 0 0 6px #1C3B4A",
      },
      borderRadius: {
        pixel: "0.25rem",
      },
    },
  },
  plugins: [],
};
