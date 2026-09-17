/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE4E8',
          200: '#F6C9D1',
          300: '#ED9FB0',
          400: '#DF6984',
          500: '#C93B5F',
          DEFAULT: '#7A1C30',
          dark: '#591121',
          deep: '#3B0914',
        },
        rosegold: {
          light: '#ECC6C9',
          DEFAULT: '#B76E79',
          dark: '#93545E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-disc': 'spin 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'flame': 'flame 1s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.4), 0 0 40px rgba(225, 29, 72, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(244, 63, 94, 0.7), 0 0 60px rgba(225, 29, 72, 0.4)' },
        },
        flame: {
          '0%': { transform: 'scale(1) skewX(-2deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1.15) skewX(2deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
