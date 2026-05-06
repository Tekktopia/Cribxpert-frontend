/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './public/index.html',
    './source/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#006073',     // Deep teal
        secondary: '#C18B3F',   // Warm gold / amber
        accent: '#E6EFF1',      // Light blue / soft gray
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        brand: {
          light: '#E6EFF1',
          DEFAULT: '#006073',
          dark: '#004D5C',
        },
        gold: {
          light: '#D4AF37',
          DEFAULT: '#C18B3F',
          dark: '#A67C00',
        }
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 10px 40px -4px rgba(0, 0, 0, 0.08), 0 4px 15px -3px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
