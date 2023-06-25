/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.tsx",
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      spacing: {
        '95%': '95%'
      },
      colors: {
        'light-beige': '#F9F5ED',
        'beige': '#EEE3CB',
        'brown': '#D7C0AE',
        'skyblue': '#BED8F0'
      },
      fontFamily: {
        NotoSans: ['"Noto Sans JP"']
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

