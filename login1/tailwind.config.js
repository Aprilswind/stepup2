module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1600ff',
        secondary: '#9a00ff',
        blacc: '#36393f'
      }, 
      maxWidth: {
        'screen-3xl': '1920px',
      },
      screens: {
        '3xl': '1920px',
        // => @media (min-width: 992px) { ... }
      }
    },
    important: '#__next'
  }
}