/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        97: '28rem',
        98: '32rem',
        99: '36rem',
        100: '40rem',
        101: '44rem',
        102: '48rem',
        103: '52rem',
        104: '56rem',
      },
    },
  },
  plugins: [],
}
