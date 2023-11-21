/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4cb050",
        "danger-red": "#f04433",
        "light-white": "#f2f1f6",
        "dark-text": "#202020",
      },
    },
  },
  plugins: [],
};
