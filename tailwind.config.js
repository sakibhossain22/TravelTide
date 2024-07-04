/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
      'screen-120': 'calc(100vh - 120px)',
    },},
  },
  plugins: [require('daisyui'),],
}