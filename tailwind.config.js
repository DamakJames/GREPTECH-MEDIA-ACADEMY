/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111820',
          dark: '#161E28',
          card: '#1A222C',
          border: '#2A3441',
          orange: '#F56B0A',
          'orange-hover': '#D95A00',
          'orange-light': 'rgba(245, 107, 10, 0.1)',
          light: '#F3F5F6',
          white: '#FFFFFF',
          muted: '#94A3B8',
          subtle: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand-card': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'brand-glow': '0 0 25px -5px rgba(245, 107, 10, 0.3)',
        'brand-light': '0 4px 20px -2px rgba(17, 24, 32, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

