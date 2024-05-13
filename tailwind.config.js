/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#334e30',
        secondary: '#ad7d37',
        tertiary: '#2e557c',
        quaternary: '#381010'
      },
      fontFamily: {
        display: 'Star Jedi, ui-serif' // Adds a new `font-display` class
      }
    }
  },
  plugins: []
}
