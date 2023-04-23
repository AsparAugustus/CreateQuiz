/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      body: ['Open Sans', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
};
