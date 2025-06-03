/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#000000',
          800: '#111111',
          700: '#1A1A1A',
          400: '#9CA3AF',
          300: '#D1D5DB',
          100: '#F3F4F6',
        },
        primary: {
          500: '#FFD700',
          600: '#FFC000',
          700: '#E6B800',
        },
      },
    },
  },
  plugins: [],
};