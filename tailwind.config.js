/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--color-white)',
        sand: 'var(--color-sand)',
        midnight: 'var(--color-midnight)',
        ocean: 'var(--color-ocean)',
        coral: 'var(--color-coral)',
        sage: 'var(--color-sage)',
        gold: 'var(--color-gold)',
        fog: 'var(--color-fog)',
        savanna: {
          gold: 'var(--savanna-gold)',
          'gold-light': 'var(--savanna-gold-light)',
          'gold-dark': 'var(--savanna-gold-dark)',
          green: 'var(--savanna-green)',
          'green-mid': 'var(--savanna-green-mid)',
          'green-light': 'var(--savanna-green-light)',
          dark: 'var(--savanna-dark)',
          darker: 'var(--savanna-darker)',
          cream: 'var(--savanna-cream)',
          'cream-dark': 'var(--savanna-cream-dark)',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'Inter', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2.5rem',
        'xl': '4rem',
        '2xl': '6rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '10px',
        'lg': '20px',
        'xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(26,35,50,0.07), 0 1px 4px rgba(26,35,50,0.05)',
        'hover': '0 8px 40px rgba(26,35,50,0.12), 0 2px 8px rgba(26,35,50,0.08)',
        'cta': '0 4px 20px rgba(44,110,138,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
