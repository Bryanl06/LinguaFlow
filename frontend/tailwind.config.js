/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        /* ── Paleta principal — azul eléctrico ── */
        brand: {
          50: '#eef4ff',
          100: '#dce9ff',
          200: '#b8d2ff',
          300: '#7ab0ff',
          400: '#4d96ff',
          500: '#2979ff',
          600: '#1a5fd4',
          700: '#1449a8',
          800: '#0f3480',
          900: '#0a2260',
          950: '#06133a',
        },
        /* ── Violeta / púrpura — acento futurista ── */
        violet: {
          50: '#f3f0ff',
          100: '#e8e0ff',
          200: '#d0c2ff',
          300: '#ae96ff',
          400: '#8b65ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b1272',
          950: '#1e0a4a',
        },
        /* ── Cian — detalle tech ── */
        cyber: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        /* ── Fondos modo normal — slate-azul profundo ── */
        surface: {
          50: '#0f1117',   /* fondo body */
          100: '#131620',   /* fondo section alt */
          200: '#161b27',   /* fondo card */
          300: '#1c2333',   /* fondo section */
          400: '#232d42',   /* hover */
          card: '#161b27',  /* fondo card */
        },
        /* ── Fondos dark — negro profundo ── */
        abyss: {
          50: '#16142b',   /* sidebar */
          100: '#0f0e20',   /* panel */
          200: '#0a0919',   /* body */
          300: '#07060f',   /* negro puro */
          border: 'rgba(124,58,237,0.25)',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        card: '0 2px 20px rgba(41,121,255,0.10)',
        'card-hover': '0 8px 36px rgba(124,58,237,0.22)',
        glow: '0 0 32px rgba(41,121,255,0.50)',
        brand: '0 4px 20px rgba(41,121,255,0.45)',
        violet: '0 4px 20px rgba(124,58,237,0.45)',
        cyan: '0 4px 20px rgba(6,182,212,0.45)',
        glass: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)',
        'inner-sm': 'inset 0 1px 3px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'hero-light': 'linear-gradient(135deg, #0f1117 0%, #131620 40%, #161b27 100%)',
        'hero-dark': 'linear-gradient(135deg, #07060f 0%, #0a0919 40%, #0f0e20 70%, #07060f 100%)',
        'text-brand': 'linear-gradient(135deg, #2979ff 0%, #7c3aed 50%, #2979ff 100%)',
        'text-aurora': 'linear-gradient(135deg, #4d96ff 0%, #7c3aed 33%, #22d3ee 66%, #4d96ff 100%)',
        'card-dark': 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(41,121,255,0.04) 100%)',
        'border-glow': 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(41,121,255,0.3))',
        'btn-primary': 'linear-gradient(135deg, #2979ff 0%, #7c3aed 100%)',
        'btn-primary-h': 'linear-gradient(135deg, #4d96ff 0%, #8b65ff 100%)',
      },
      animation: {
        'bounce-short': 'bounce 0.5s ease-in-out 3',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'bounce-gentle': 'bounceGentle 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-in': 'slideInUp 0.25s ease-out',
        'aurora': 'aurora 12s ease infinite',
      },
      keyframes: {
        slideUp: { '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(36px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown: { '0%': { opacity: '0', transform: 'translateY(-36px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-18px)' } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        bounceGentle: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.7)' } },
        slideInUp: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        aurora: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '33%': { backgroundPosition: '100% 0%' },
          '66%': { backgroundPosition: '50% 100%' },
        },
      },
    },
  },
  plugins: [],
}