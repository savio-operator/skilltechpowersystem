// Home page content — all copy, numbers, and image paths in one place.
// Search for "TODO: confirm-with-client" to find everything needing real data.

export const HOME = {
  hero: {
    eyebrow:   'Ernakulam · Kerala',
    badge:     'EST. 2016',
    headline:  ['The power', 'comes from', 'above.'],
    sub:       'Kerala\'s leading rooftop solar company — design, supply, installation & service',
    // TODO: confirm-with-client — swap gradient placeholder for real golden-hour roof photo
    image:     '/images/hero-golden-hour.jpg',
    imageAlt:  'Rooftop solar installation at golden hour, Ernakulam Kerala',
  },

  promise: [
    { word: 'Greener.', bg: '#0D1B34', color: '#FBFAF7' },
    { word: 'Cleaner.', bg: '#0A2418', color: '#FBFAF7' },
    { word: 'Better.',  bg: '#1a0f00', color: '#F5A623' },
  ],

  machine: {
    eyebrow: 'CH.03 / THE MACHINE',
    callouts: [
      {
        num:   '01',
        title: '330W Monocrystalline Panel',
        desc:  'Tier-1 · 25-yr performance warranty',
      },
      {
        num:   '02',
        title: 'Grid-tie Inverter',
        desc:  'Solis / Growatt · MNRE approved · app monitoring',
      },
      {
        num:   '03',
        title: 'Bi-directional Meter',
        desc:  'KSEB net-metering · sell excess back to grid',
      },
      {
        num:   '04',
        title: '₹0 electricity bill',
        desc:  '3–5 kW typical home · payback in 5 years',
      },
    ],
  },

  math: {
    eyebrow:    'CH.04 / THE MATH',
    headline:   'Your bill. Our math.',
    sub:        'Move the slider — see what solar does to your electricity bill.',
    disclaimer: 'Based on Ernakulam avg. tariff ₹4.50/unit · 5.5 peak sun hours · ₹45,000/kW installed cost · 30% MNRE subsidy applied.',
    calc: {
      tariff:     4.50,   // ₹/unit
      peakHours:  5.5,    // hours/day Ernakulam avg
      costPerKw:  45000,  // ₹ installed, post-subsidy
      subsidy:    0.30,   // 30% MNRE subsidy
    },
  },

  storm: {
    eyebrow:   'CH.05 / THE STORM',
    headline:  "Kerala's skies are beautiful. And unforgiving.",
    body:      "Every monsoon, unprotected solar systems take direct hits. We design for the weather you actually live in — lightning arresters, surge protection, proper earthing. Because a ₹3 lakh system deserves more than hope.",
    features:  ['Lightning Arrester', 'Surge Protection Device', 'Proper Earthing System'],
    // TODO: confirm-with-client — swap gradient for real monsoon/storm photo
    image:     '/images/storm-kerala.jpg',
    imageAlt:  'Kerala monsoon storm clouds',
  },

  proof: {
    eyebrow:  'CH.06 / THE PROOF',
    headline: "Numbers don't install themselves.",
    counters: [
      { id: 'installs', target: 500,  label: 'Rooftop Installations', suffix: '+' },
      { id: 'kw',       target: 2500, label: 'kW Commissioned',       suffix: '+' },
      { id: 'years',    target: 8,    label: 'Years in Kerala',        suffix: ''  },
      { id: 'cr',       target: 12,   label: 'Crore ₹ Saved',         suffix: '+' },
    ],
    mapCaption: 'Every dot is a household powered by the sun.',
  },

  footer: {
    promise: 'Sun above. Savings below.',
    // TODO: confirm-with-client — swap gradient for real dusk/golden-hour image
    image:    '/images/footer-dusk.jpg',
    imageAlt: 'Kerala rooftop at dusk',
  },
} as const
