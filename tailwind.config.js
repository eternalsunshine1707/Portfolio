/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          950: '#0A2A2A',
          900: '#0B3131',
          800: '#0C3838',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        dark: {
          950: '#050505',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-fade': 'linear-gradient(to right, rgba(5, 5, 5, 0) 0%, rgba(5, 5, 5, 1) 100%)',
        'portrait-vignette': 'radial-gradient(circle at center, transparent 30%, rgba(5, 5, 5, 0.3) 60%, rgba(5, 5, 5, 0.8) 100%)',
      },
    },
  },
  plugins: [],
};