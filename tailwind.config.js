/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#4A4A4A",
        secondary: "#c1ae8d",
      }
    },
  },
  plugins: [],
}

