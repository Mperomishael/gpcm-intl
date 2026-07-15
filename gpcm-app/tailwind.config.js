/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Text', 'serif'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        gpcm: {
          cream: '#F6E4CF',
          dark: '#321C04',
          light: '#FFF9F2',
          muted: '#D9C4AA',
          mutedHover: '#CEBA9E',
          darkHover: '#1F1003',
          violet: '#7c3aed',
          amber: '#d97706',
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out forwards',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
