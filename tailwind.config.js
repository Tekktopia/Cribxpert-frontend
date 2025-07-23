/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006073',
        accent: '#E6EFF1',
        neutral: '#6F6F6F',
        neutralLight: '#999999',
        neutralDark: '#070707',
        hoverColor: '#C18B3F', // Your color code
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
