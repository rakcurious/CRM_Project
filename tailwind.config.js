/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width : {
        '68' : '17rem',
        '18' : '4.5rem'
        
      },
      height : {
        '68' : '17rem',
        '18' : '4.5rem'
      },
      fontFamily : {
        'poppins' : ['Poppins', 'sans-serif'],
      }, 
    },
  },
  plugins: [],
}


