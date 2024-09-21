/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gibson': ['Gibson', 'sans-serif'],
      },
      colors: {
        'custom-rosa': '#FFC3D0',
        'custom-vino': '#4A001F',
        'custom-guinda': '#6A0F49',
        'custom-gris': '#6D807F',
      },
      boxShadow: {
        'custom1': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
