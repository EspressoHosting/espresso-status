/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A1512',
        accent: {
          DEFAULT: '#8B4513', // Coffee brown
          hover: '#A0522D', // Darker coffee brown
          light: '#D2691E', // Lighter coffee brown
          dark: '#654321' // Deep coffee brown
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          muted: '#BBA89F'
        },
        status: {
          online: '#4ADE80',
          offline: '#8B4513',
          warning: '#D2691E',
          degraded: '#A0522D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};