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
          300: '#6bab8a',
          400: '#6bab8a',
          500: '#6bab8a',
          600: '#6bab8a',
          900: '#6bab8a',
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
      keyframes: {
        'open-badge-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 14px rgba(201, 182, 148, 0.4), 0 0 28px rgba(201, 182, 148, 0.18), inset 0 0 12px rgba(201, 182, 148, 0.08)',
            opacity: '1',
          },
          '50%': {
            boxShadow:
              '0 0 22px rgba(201, 182, 148, 0.65), 0 0 48px rgba(201, 182, 148, 0.32), inset 0 0 16px rgba(201, 182, 148, 0.12)',
            opacity: '0.96',
          },
        },
      },
      animation: {
        'open-badge-glow': 'open-badge-glow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};