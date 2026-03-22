/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          bg: '#0f1419',
          card: 'rgba(30, 37, 55, 0.8)',
          blurple: '#5865f2',
          secondary: '#7289da',
          text: '#e0e6ed',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
