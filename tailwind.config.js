/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  
   // These paths are just examples, customize them to match your project structure
  
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}

