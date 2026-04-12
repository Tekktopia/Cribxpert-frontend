/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './public/index.html',
    './source/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006073',     // Deep teal (blue-green)
        accent: '#E6EFF1',      // Very light blue / soft gray
        neutral: '#6F6F6F',     // Medium gray
        neutralLight: '#999999', // Light gray
        neutralDark: '#070707', // Almost black
        hoverColor: '#C18B3F', // Warm gold / amber
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
