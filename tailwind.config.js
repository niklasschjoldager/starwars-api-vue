/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#ffe81f',
        secondary: '#394A59'
      },
      fontFamily: {
        display: 'Star Jedi, ui-serif' // Adds a new `font-display` class
      }
    }
  },
  plugins: []
}
