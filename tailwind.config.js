/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#080808',
        surface: '#111111',
        card: '#141414',
        accent: '#e63946',
        accent2: '#f4a261',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease both',
        'spin-slow': 'spin 1s linear infinite',
        'pulse-bar': 'pulseBar 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBar: {
          '0%, 100%': { opacity: '0.3' },
          '50%':       { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}