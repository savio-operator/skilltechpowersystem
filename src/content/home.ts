// Home page content — all copy, numbers, and image paths in one place.
// Search "TODO: confirm-with-client" to find everything still needing real data.

export const HOME = {
  hero: {
    eyebrow:  'Ernakulam · Kottayam · Idukki · Kerala',
    badge:    'EST. 2015',
    headline: ['The power', 'comes from', 'above.'],
    sub:      'Complete power-systems company — solar, lightning protection, earthing, battery backup & AMC',
    image:    '',  // intentionally no photo — hero uses the cinematic gradient only
    imageAlt: 'Rooftop solar installation at golden hour, Ernakulam Kerala',
  },

  promise: [
    { word: 'Greener.', bg: '#0D0A01', color: '#FBF8F0' },
    { word: 'Cleaner.', bg: '#120D02', color: '#FBF8F0' },
    { word: 'Better.',  bg: '#1A1105', color: '#FBB034' },
  ],

  machine: {
    eyebrow: 'CH.03 / THE MACHINE',
    callouts: [
      {
        num:   '01',
        title: 'Monocrystalline Solar Panels',
        desc:  'Adani · Waaree · UTL · Luminous — 25-yr performance warranty',
      },
      {
        num:   '02',
        title: 'Hybrid / Grid-tie Inverter',
        desc:  'Luminous · Deye · Growatt · UTL — MNRE approved, app monitoring',
      },
      {
        num:   '03',
        title: 'Bi-directional Meter',
        desc:  'KSEB net-metering — sell excess power back to the grid',
      },
      {
        num:   '04',
        title: '₹0 electricity bill',
        desc:  'Typical 5 kW home system · payback in 4–5 years',
      },
    ],
  },

  math: {
    eyebrow:    'CH.04 / THE MATH',
    headline:   'Your bill. Our math.',
    sub:        'Move the slider — see what solar does to your electricity bill.',
    disclaimer: 'Based on Ernakulam avg. tariff ₹4.50/unit · 5.5 peak sun hours · ₹45,000/kW installed cost · 30% MNRE subsidy applied.',
    calc: {
      tariff:     4.50,   // ₹/unit — Ernakulam LT domestic rate
      peakHours:  5.5,    // hours/day Ernakulam avg
      costPerKw:  45000,  // ₹ installed, typical post-subsidy residential
      subsidy:    0.30,   // 30% MNRE central subsidy
    },
    typicalSystem: {
      kw:    5,
      cost:  500000,  // ~₹5 lakh residential
    },
  },

  storm: {
    eyebrow:   'CH.05 / THE STORM',
    headline:  "Kerala's skies are beautiful. And unforgiving.",
    body:      "Every monsoon, unprotected systems take direct hits. Skilltech designs for the weather you actually live in — ESE lightning arresters, IS 3043-compliant earthing, DC/AC surge protection. Because a ₹5 lakh system deserves more than hope.",
    features:  ['ESE Lightning Arrester', 'DC + AC Surge Protection', 'IS 3043-Compliant Earthing'],
    cta:       'April–June is peak lightning season — get protected before the monsoon.',
    image:     '/images/cinematic/storm-lightning-desktop.png',   // TODO: confirm-with-client — real monsoon/storm photo
    imageAlt:  'Kerala monsoon storm clouds',
  },

  proof: {
    eyebrow:  'CH.06 / THE PROOF',
    headline: "Numbers don't install themselves.",
    counters: [
      { id: 'installs', target: 50,  label: 'Rooftop Installations',   suffix: '+' },
      { id: 'kw',       target: 100, label: 'kW Commissioned',          suffix: 'kW+' },
      { id: 'years',    target: 11,  label: 'Years in Kerala',           suffix: ''  },
      { id: 'kw_max',   target: 25,  label: 'kW Largest Single Project', suffix: 'kW' },
    ],
    mapCaption: 'Every dot is a household powered by the sun. Ernakulam, Kottayam, Idukki.',
  },

  footer: {
    promise: 'Sun above. Savings below.',
    image:    '',   // intentionally no photo — footer uses the cinematic gradient only
    imageAlt: 'Kerala rooftop at dusk with solar panels',
  },
} as const
