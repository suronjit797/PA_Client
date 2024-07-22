/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["JetBrains Mono"],
      },
      colors: {
        primary: "#2c2c2c",
        secondary: "#303030",
        active: {
          DEFAULT: "#454545",
          hover: "#454f4f",
          
        },
        accent: {
          DEFAULT: "#f3f3f3",
          hover: "#e3e3e3",
        },
      },
    },
  },
  plugins: [],
};
