/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9fb',
          100: '#d7f1f5',
          500: '#2aa1b3',
          600: '#1f8190',
          700: '#17626f'
        },
        slate: {
          900: '#0b1f2a'
        }
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
