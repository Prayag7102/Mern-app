/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xxs': '320px',
      'xs': '540px',
      'sm': '640px', // Small devices
      'md': '768px', // Medium devices
      'lg': '1024px', // Large devices
      'xl': '1280px', // Extra large devices
      '2xl': '1536px', // Extra extra large devices
      'xxl': '1920px', // Custom breakpoint
    },
  },
  plugins: [],
}

