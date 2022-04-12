module.exports = {
  content: [ 'index.html', './src/**/*.jsx', "./node_modules/flowbite/**/*.js" ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin.js')
  ],
}
