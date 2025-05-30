const sharedTheme = require('@shared/assets/theme/tailwind-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{jsx,tsx}',
    '../../Libs/components/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      extend: {
        ...sharedTheme,
      },
    },
  },
  plugins: [],
};
