/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          ivory: '#FFFEF7',
          beige: '#F5F5DC',
          pearl: '#FEFDF0',
          champagne: '#F7E7CE',
          gold: '#FFD700',
          darkGold: '#B8860B',
        }
      },
      fontFamily: {
        luxury: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}