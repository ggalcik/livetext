/** @type {import('tailwindcss').Config} */
const textStroke = require('@designbycode/tailwindcss-text-stroke');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [textStroke],
};