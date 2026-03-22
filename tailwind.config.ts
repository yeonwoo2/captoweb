import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5865f2',
        success: '#43b581',
        warning: '#faa61a',
        danger: '#ed4245',
        'bg-dark': '#202225',
        'bg-medium': '#2f3136',
        'bg-light': '#36393f',
        'text-primary': '#ffffff',
        'text-secondary': '#dcddde',
        'text-tertiary': '#8e9297',
      },
      fontFamily: {
        en: ['Inter', 'sans-serif'],
        kr: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'hero': '64px',
        'h1': '36px',
        'h2': '28px',
        'h3': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 20px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
