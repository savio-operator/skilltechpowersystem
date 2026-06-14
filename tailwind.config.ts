import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Light brand palette ──────────────────────────────────────────────
      // 50% #FFFFFF (canvas) · 30% #1A2B43 navy (ink) · 20% #F7B538 gold (accent)
      // Token NAMES are kept stable so existing components don't break; only the
      // VALUES are flipped from the old dark theme to the new light theme:
      //   bg-navy-deep  → white page background
      //   text-paper    → navy primary text (readable on white)
      //   text-warm-grey→ cool muted grey
      //   text-amber    → gold accent
      colors: {
        amber:       '#F7B538',    // gold accent (CTAs, highlights, numbers)
        navy: {
          DEFAULT: '#1A2B43',      // brand navy — ink, dark elements
          deep:    '#FFFFFF',      // page background (flipped to white)
          mid:     '#F4F6F9',      // light section background
        },
        'blue-word':  '#1A2B43',   // navy accent
        'sky-blue':   '#F7B538',   // gold accent (replaces old sky blue)
        paper:        '#1A2B43',   // primary text — navy on white
        'warm-grey':  '#5C6B7F',   // muted cool grey
      },
      fontFamily: {
        display: ['var(--font-sora)',           'sans-serif'],
        body:    ['var(--font-archivo)',         'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)',  'monospace'],
      },
      animation: {
        'spotlight':    'spotlight 2s ease .75s 1 forwards',
        'arrow-bounce': 'arrowBounce 2s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
        'sun-spin':     'sunSpin 12s linear infinite',
        'ray-pulse':    'rayPulse 2s ease-in-out infinite',
        'bolt-flash':   'boltFlash 1.8s ease-in-out infinite',
        'fill-rise':    'fillRise 2s ease-out forwards',
        'scan-beam':    'scanBeam 2.5s ease-in-out infinite',
        'heat-wave':    'heatWave 2s ease-in-out infinite',
        'charge-flow':  'chargeFlow 1.5s linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%':   { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
        arrowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(251,176,52,0.3)' },
          '50%':      { boxShadow: '0 0 24px rgba(251,176,52,0.65)' },
        },
        sunSpin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rayPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(0.8)' },
          '50%':      { opacity: '1',   transform: 'scaleY(1.2)' },
        },
        boltFlash: {
          '0%, 80%, 100%': { opacity: '0.15', filter: 'brightness(0.8)' },
          '85%':            { opacity: '1',    filter: 'brightness(2)' },
        },
        fillRise: {
          '0%':   { transform: 'scaleY(0)', opacity: '0.4' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        scanBeam: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '10%':  { opacity: '0.8' },
          '90%':  { opacity: '0.8' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        heatWave: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)',   opacity: '0.6' },
          '50%':       { transform: 'translateY(-8px) scaleX(1.1)', opacity: '1' },
        },
        chargeFlow: {
          '0%':   { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
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
