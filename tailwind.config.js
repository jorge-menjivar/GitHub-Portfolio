/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'zoom-pulse-slow': 'zoom-pulse 8s ease infinite',
        'zoom-pulse-fast': 'zoom-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bg-pan-fast': 'bg-pan 7s ease infinite',
        'bg-pan-slow': 'bg-pan 15s ease infinite',
        'tab-hover-normal': 'tab-hover 200ms ease forwards',
        'tab-unhover-normal': 'tab-unhover 1000ms ease forwards',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slide-left 400ms cubic-bezier(0.87, 0, 0.3, 1) forwards',
        'slide-right':
          'slide-right 400ms cubic-bezier(0.87, 0, 0.3, 1) forwards',
        shimmerEffect: 'shimmer 1.5s linear forwards infinite',
      },
      backgroundColor: {
        'theme-dark': '#24292e',
        'theme-light': '#ffffff',
        'theme-activity-bar-dark': '#24292e',
        'theme-activity-bar-light': '#ffffff',
        'theme-navbar-dark': '#24292e',
        'theme-navbar-light': '#ffffff',
        'theme-navbar-hover-dark': '#3f3f3f',
        'theme-navbar-hover-light': '#e2e0e0',
        solar: '#efece6',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '175%': '175%',
        '200%': '200%',
        solar: '#efece6',
      },
      borderColor: {
        'theme-border-dark': '#1b1f23',
        'theme-border-light': '#e7e5e4',
        'theme-button-border-dark': 'rgba(100, 100, 100, 1)',
        'theme-button-border-light': '#bcc5ca',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'theme-button-dark': 'rgb(180, 180, 180)',
        'theme-button-light': 'rgb(90, 90, 90)',
        'theme-button-hover-dark': 'rgb(245, 245, 245)',
        'theme-button-hover-light': 'rgb(40, 40, 40)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fill: {
        'theme-tooltip-dark': '#24292e',
        'theme-tooltip-light': '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'bg-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'tab-hover': {
          '0%': { backgroundPosition: '100% 50%', opacity: 0.7 },
          '100%': { backgroundPosition: '0% 50%', opacity: 1 },
        },
        'tab-unhover': {
          '0%': { backgroundPosition: '0% 50%', opacity: 1 },
          '100%': { backgroundPosition: '100% 50%', opacity: 0.7 },
        },
        'zoom-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-150%)' },
        },
        'slide-right': {
          from: { transform: 'translateX(-150%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '100% 0',
          },
          '100%': {
            backgroundPosition: '-100% 0',
          },
        },
      },
      textColor: {
        'theme-dark': '#383850',
        'theme-light': '#24292e',
        'theme-activity-bar-tab-dark': 'rgb(230 230 245 / 1)',
        'theme-activity-bar-tab-light': 'rgb(40 40 40 / 1)',
        'theme-activity-bar-tab-hover-dark': 'rgb(220 220 235 / 1)',
        'theme-activity-bar-tab-hover-light': 'rgb(65 65 65 / 1)',
        'theme-button-icon-dark': 'rgb(180, 180, 180)',
        'theme-button-icon-light': 'rgb(90, 90, 90)',
        'theme-button-icon-hover-dark': 'rgb(245, 245, 245)',
        'theme-button-icon-hover-light': 'rgb(40, 40, 40)',
        'theme-danger-dark': '#e5534b',
        'theme-danger-light': '#e5534b',
        'theme-secondary-light': '#505463',
        'theme-secondary-dark': '#7b8092',
        'theme-tag-panel-light': '#353e4e',
        'theme-tag-panel-dark': '#353e4e',
      },
      maxHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '9/10': '90%',
        full: '100%',
      },
      minWidth: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '2/3': '66%',
        '3/4': '75%',
        full: '100%',
      },
    },
    fontSize: {
      '2xs': '0.75rem',
      xs: '0.8125rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.75rem',
      '4xl': '2.5rem',
      '5xl': '3.5rem',
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('tailwindcss-animate')],
  plugins: [require('@tailwindcss/typography')],
  plugins: ['prettier-plugin-tailwindcss'],
};
