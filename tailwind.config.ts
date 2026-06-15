import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Gold brand palette (two-tone, 50/30/20) ──────────────────────────
      // 50% #FBB034 gold (dominant canvas) · 30% #1A1828 dark (ink) ·
      // 20% #1A1828 dark (accent — the high-contrast pop against gold).
      // Token NAMES are kept stable so existing components don't break; only the
      // VALUES change. Roles on the gold canvas:
      //   bg-navy-deep  → gold page background
      //   bg-navy-mid   → deeper-gold alternating sections (hierarchy)
      //   text-paper    → dark ink (readable on gold)
      //   text-warm-grey→ muted dark (secondary text)
      //   text-amber    → dark accent (CTAs, borders, numbers pop on gold)
      colors: {
        amber:       '#000000',    // accent — pure black, high-contrast on gold
        navy: {
          DEFAULT: '#000000',      // brand dark — pure black ink / dark elements
          deep:    '#FBB034',      // page background (gold canvas)
          mid:     '#F0A81E',      // deeper-gold section background (hierarchy)
        },
        'blue-word':  '#000000',   // dark accent
        'sky-blue':   '#000000',   // dark accent (replaces old sky blue)
        paper:        '#000000',   // primary text — pure black on gold
        'warm-grey':  '#4D4632',   // muted dark warm-grey (secondary text)

        // shadcn-style semantic tokens (used by the MapLibre map + tubelight
        // navbar) mapped to this project's gold / pure-black theme.
        background:  '#000000',
        foreground:  '#FBF8F0',
        primary:    { DEFAULT: '#FBB034', foreground: '#000000' },
        secondary:  { DEFAULT: '#0A0A0A', foreground: '#FBF8F0' },
        muted:      { DEFAULT: '#0A0A0A', foreground: '#B8AE95' },
        accent:     { DEFAULT: '#0A0A0A', foreground: '#FBF8F0' },
        popover:    { DEFAULT: '#000000', foreground: '#FBF8F0' },
        card:       { DEFAULT: '#000000', foreground: '#FBF8F0' },
        border:      '#262626',
        input:       '#262626',
        ring:        '#FBB034',
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
