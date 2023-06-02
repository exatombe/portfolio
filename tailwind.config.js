/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{js,jsx,ts,tsx}' ,
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [..., require('flowbite/plugin')],
  theme: {
    extend: {},
  },
};


