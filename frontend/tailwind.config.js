/** @type {import('tailwindcss').Config} */

export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slide:{
          '0%' :{
            transform:'translateX(0)'
          },
          '100%':{
            transform:'translateX(-100%)'
          },
        },
      },
      
      animation:{
        slide: '25s linear infinite slide',
      },
    },
  },
  plugins: [],
}