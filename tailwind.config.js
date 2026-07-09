/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#faf7f4', 50: '#fdfcfb', 100: '#faf7f4' },
        blush: { DEFAULT: '#d4908a', light: '#f2e0de', mid: '#e0b4b0', dark: '#b5706a' },
        sage:  { DEFAULT: '#8fa88a', light: '#dde8db', dark: '#607a5c' },
        bark:  { DEFAULT: '#3a2e28', light: '#7a6055', muted: '#9e8a80' },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
