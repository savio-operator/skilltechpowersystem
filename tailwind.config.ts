import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber:      '#F5A623',
        navy: {
          DEFAULT: '#1A2B4A',
          deep:    '#0D1B34',
          mid:     '#0F2235',
        },
        'blue-word':  '#2C4A7C',
        'sky-blue':   '#4A90D9',
        paper:        '#FBFAF7',
        'warm-grey':  '#8A93A3',
      },
      fontFamily: {
        display: ['var(--font-sora)',           'sans-serif'],
        body:    ['var(--font-archivo)',         'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)',  'monospace'],
      },
      animation: {
        'arrow-bounce': 'arrowBounce 2s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        arrowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(245,166,35,0.3)' },
          '50%':      { boxShadow: '0 0 20px rgba(245,166,35,0.6)' },
        },
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
}

export default config
