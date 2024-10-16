/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',  
    './styles.css',   
    './**/*.js',    
    ],
  theme: {
    extend: {
      screens: {
        'mobile': { max: '768px' }, //@media max-width 768px
      },
      fontFamily: {
        'sans': ['"Public Sans"'],
      },
    },
  },
  plugins: [
    
  ],
}
