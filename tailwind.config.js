/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./packages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#343434",
          foreground: "#fbfbfb",
        },
        secondary: {
          DEFAULT: "#f7f7f7",
          foreground: "#343434",
        },
        destructive: {
          DEFAULT: "#e13636",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f4f4f4",
          foreground: "#343434",
        },
        background: "#ffffff",
        foreground: "#343434",
        input: "#ebebeb",
        dark: {
          primary: {
            DEFAULT: "#fbfbfb",
            foreground: "#343434",
          },
          secondary: {
            DEFAULT: "#444444",
            foreground: "#fbfbfb",
          },
          destructive: {
            DEFAULT: "#9e2626",
            foreground: "#f85d5d",
          },
          accent: {
            DEFAULT: "#333333",
            foreground: "#fbfbfb",
          },
          background: "#1a1a1a",
          foreground: "#fbfbfb",
          input: "#444444",
        },
      },
    },
  },
  plugins: [],
}; 