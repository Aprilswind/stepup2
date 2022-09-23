module.exports = {
  mode: "jit",
  important : true,
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'hero-image': "url('/background.webp')",
      },
      colors: {
        primary: '#1600ff',
        secondary: '#9a00ff',
        blacc: '#36393f'
      }, 
      fontFamily: {
        'Roboto': ['Roboto', 'ui-serif'],
        'Oswald': ['Oswald', 'ui-serif'],
      },
      maxWidth: {
        'screen-3xl': '1920px',
      },
      screens: {
        '3xl': '1920px',
        // => @media (min-width: 992px) { ... }
      }
    },
  }
}