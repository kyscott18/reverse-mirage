/** @type {import('tailwindcss').Config} */

const gray = {
  100: "#EFEFEF",
  200: "#dfdfdf",
  300: "#cfcfcf",
  500: "#8f8f8f",
  700: "#505050",
  800: "#4f4f4f",
  900: "#303030",
  1000: "#242424",
};

const textColor = {
  default: "#000",
  DEFAULT: "000",
  secondary: "#707070",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray,
        brand: "#0E76FD",
        secondary: "#30e000",
      },
      textColor,
    },
  },
};
