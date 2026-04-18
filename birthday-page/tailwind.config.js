/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#F5F0E1',
          rose: '#E8B4B8',
          sage: '#B5C9A8',
          gold: '#D4A574',
          navy: '#2C3E50'
        }
      },
      fontFamily: {
        vintage: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}