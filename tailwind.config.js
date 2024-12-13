
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#1E1F57',
        secondary: '#373879',
        light: '#DAD2E7',
      },
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #3E2FE9, #6A3EEB);',
        gradientGray: 'linear-gradient(90deg, #1E1F57, #373879);',
        textGradient: 'linear-gradient(90deg, #3E2FE9, #6A3EEB);',
      },
    },
  },
  plugins: [],
}

