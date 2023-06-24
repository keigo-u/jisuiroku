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
        'beige': '#F9F5ED',
        'brown': '#D7C0AE'
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

