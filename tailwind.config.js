
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#1E1F57',
        secondary: '#3E2FE9',
        light: '#DAD2E7',
        inputBlue: '#3B32AB',
        purple: '#6A3EEB',
      },
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #3E2FE9, #6A3EEB);',
        gradientGray: 'linear-gradient(90deg, #1E1F57, #373879);',
        gradientGrayDown: 'linear-gradient(180deg, #1E1F57, #373879);',
        textGradient: 'linear-gradient(90deg, #3E2FE9, #6A3EEB);',
      },
    },
  },
  plugins: [],
}

