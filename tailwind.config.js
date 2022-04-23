module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      maha: {
        100: '#F9D4EB',
        200: '#F4ABDE',
        300: '#DE7BC9',
        400: '#BE54B0',
        500: '#93268F',
        600: '#791B7E',
        700: '#5D1369',
        800: '#440C55',
        900: '#320746',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
