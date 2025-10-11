/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Work Sans', 'sans-serif'],
      },
      colors: {
        'brand': {
          'white': '#FFFFFF',
          'offwhite': '#D9D9D9',
          'green-light': '#FCFFE4',
          'green-medium': '#DBFFB1',
          'green-lime': '#B6FF02',
          'blue': '#699CFF',
          'gray-light': '#7E7E7E',
          'gray-medium': '#494949',
          'graphite': '#1D1D1D',
        }
      }
    },
  },
  plugins: [],
}

