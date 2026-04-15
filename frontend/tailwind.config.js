/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          background: '#ffffff',
          surface: '#f9f9f9',
          text: '#1a1a1a',
          'text-secondary': '#666666',
          border: '#e0e0e0',
        },
        dark: {
          50: '#1a1a1a',
          100: '#2a2a2a',
          200: '#3a3a3a',
          background: '#0a0a0a',
          surface: '#1a1a1a',
          text: '#ffffff',
          'text-secondary': '#b3b3b3',
          border: '#333333',
        },
      },
      backgroundColor: {
        'light-primary': 'rgb(var(--color-light-bg) / <alpha-value>)',
        'dark-primary': 'rgb(var(--color-dark-bg) / <alpha-value>)',
      },
      textColor: {
        'light-primary': 'rgb(var(--color-light-text) / <alpha-value>)',
        'dark-primary': 'rgb(var(--color-dark-text) / <alpha-value>)',
      },
      animation: {
        'theme-transition': 'theme-transition 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}
