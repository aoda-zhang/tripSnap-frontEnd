/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    '../../Libs/components/**/*.{js,ts,jsx,tsx}', // Components in the Libs directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
