/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4cb050",
        "dark-green": "#168b44",
        "light-green": "#88b942",
        "danger-red": "#f04433",
        "light-white": "#f2f1f6",
        "dark-text": "#202020",
        "grey-text": "#6d6d6d",
      },
    },
  },
  plugins: [],
};
