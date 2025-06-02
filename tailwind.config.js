/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#006073',
      accent: '#E6EFF1',
      neutral: '#6F6F6F',
      neutralLight: '#999999',
      neutralDark: '#070707',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
