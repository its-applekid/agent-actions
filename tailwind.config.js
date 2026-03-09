/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Menlo', 'Consolas', 'monospace'],
        display: ['VT323', 'monospace'],
      },
      colors: {
        red: '#FF0621',
        orange: '#fe8019',
        yellow: '#fabd2f',
        green: '#b8bb26',
        aqua: '#8ec07c',
        blue: '#83a598',
        purple: '#d3869b',
        terminal: {
          bg: '#1d2021',
          code: '#282828',
          border: '#504945',
          text: '#ebdbb2',
          cream: '#F5F5DC',
          muted: '#928374',
          accent: '#FF0621',
          error: '#fb4933',
          success: '#b8bb26',
        },
      },
      animation: {
        'cursor-blink': 'blink 1s infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glow: {
          '0%': { 'text-shadow': '0 0 5px #FF0621' },
          '100%': { 'text-shadow': '0 0 20px #FF0621, 0 0 30px #FF0621' },
        },
      },
    },
  },
  plugins: [],
}
