/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-black-121212': '#121212',
        'custom-gray-272727': '#272727',
        'custom-gray-9CA3AF': '#9CA3AF',
        'custom-black-232323': '#232323',
        'custom-black-323232': '#323232',
        'custom-white-CECECE': '#CECECE',
        'custom-wine-381818': '#381818',
        'custom-red': '#FE0000',
      },
    },
  },
  plugins: [],
}

