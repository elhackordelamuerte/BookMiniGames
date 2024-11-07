/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      },
      colors: {
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
};