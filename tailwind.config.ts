import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        xl: '3rem',
      },
      screens: {
        xl: '1235px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        manrope: ['var(--font-manrope)'],
        'plus-jakarta-sans': ['var(--font-plus-jakarta-sans)'],
      },
      fontSize: {
        '4.5xl': '40px',
      },
      colors: {
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
        'destructive-dark': {
          DEFAULT: 'hsl(var(--destructive-dark))',
          foreground: 'hsl(var(--destructive-dark-foreground))',
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
        hamburger: 'hsl(var(--hamburger))',
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        accent: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        box: '0px 4px 15px 0px rgba(0, 0, 0, 0.07)',
        nav: '0px 3px 8px 0px rgba(0, 0, 0, 0.05)',
        'box-sm': '0px 2px 5px 0px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-left2': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-right2': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-left': 'marquee-left 25s linear infinite',
        'marquee-left2': 'marquee-left2 25s linear infinite',
        'marquee-right': 'marquee-right 25s linear infinite',
        'marquee-right2': 'marquee-right2 25s linear infinite',
      },
      transitionDuration: {
        '7000': '7000ms',
        '10000': '10000ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
