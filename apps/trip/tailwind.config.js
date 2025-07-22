/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/**/*.{js,ts,jsx,tsx}', // Components in the packages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
