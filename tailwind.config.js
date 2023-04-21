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
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

