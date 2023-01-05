/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./dist/*.html'],
  content: ['./dist/*.html'],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      }
    },
  },
  plugins: [],
}
