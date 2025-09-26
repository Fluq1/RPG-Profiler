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
        'claude-bg': '#1A1A1A',
        'claude-card': '#2D2D2D',
        'claude-accent': '#F97316',
        'claude-text': '#FFFFFF',
        'claude-text-secondary': '#A0A0A0',
        // RPG Theme Colors
        'rpg-dark': '#1A1A1A',
        'rpg-light': '#FFFFFF',
        'rpg-accent': '#F97316',
        'rpg-gold': '#FFD700',
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'],
        'sf-ui': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Crimson Text', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}