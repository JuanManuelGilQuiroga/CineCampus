/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./views/**/*.{html}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray-272727': '#272727',
        'custom-black-232323': '#232323',
        'custom-red': '#FE0000',
      }
    },
  },
  plugins: [],
}

