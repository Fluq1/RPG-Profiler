/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'rpg-primary': '#2a2438',
        'rpg-secondary': '#352f44',
        'rpg-accent': '#5c5470',
        'rpg-light': '#dbd8e3',
        'rpg-gold': '#ffd700',
        'rpg-silver': '#c0c0c0',
        'rpg-bronze': '#cd7f32',
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'],
        fantasy: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}