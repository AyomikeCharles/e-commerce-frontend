/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'bmd':'800px',
        // => @media (min-width: 1025px) { ... }
        'print':{'raw':'print'}
      },

      fontFamily:{
        'sans':['Work Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
