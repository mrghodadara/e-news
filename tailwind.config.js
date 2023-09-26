/** @type {import('tailwindcss').Config} */
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        Poppins:'Poppins',
        Roboto:'Roboto',
        Inter:'Inter'
      },
      colors: {
        primary: '#8B5CF6',
        lightGray: {
          50: '#ECECF1',
        },
        lightBlue: {
          100: '#4285F4',
        },
      },
    },
  },
  plugins: [lineClamp],
};
