/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f4fb',
          100: '#e7e9f7',
          200: '#cfd3ef',
          300: '#aab2e3',
          400: '#8189d3',
          500: '#6366c4',
          600: '#4f4db7',
          700: '#4340a5',
          800: '#373687',
          900: '#31316c',
        },
        secondary: {
          50: '#fdf5ee',
          100: '#fae8d9',
          200: '#f5ceb1',
          300: '#efae82',
          400: '#e78a53',
          500: '#e26f31',
          600: '#d15526',
          700: '#ad4222',
          800: '#8c3720',
          900: '#72301d',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}; 