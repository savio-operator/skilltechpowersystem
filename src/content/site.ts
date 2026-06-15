// Central config. All client-visible values are safe here.
// Server-only secrets (API keys) live in .env.local only.

export const SITE = {
  name:        'Skilltech Power System',
  tagline:     'Sun above. Savings below.',
  established: '2015',
  founderExperience: '15+ years',
  teamSize:    4,
  legalType:   'Proprietorship' as const,
  email:       'skilltechpowersystem@gmail.com',
  phone:       '+91 9847553200',
  address: {
    line1:    '',                              // TODO: confirm-with-client — exact street address
    city:     'Ernakulam',
    district: 'Ernakulam',
    state:    'Kerala',
    pin:      '',                              // TODO: confirm-with-client — PIN code
    display:  'Ernakulam District, Kerala',   // shown on site until full address confirmed
  },
  geo: {
    lat:    9.9816,   // Muvattupuzha, Ernakulam
    lng:    76.5719,
    region: 'Muvattupuzha, Ernakulam, Kerala, India',
  },
  whatsapp: {
    number:  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  ?? '919847553200',
    message: process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE
               ?? "Hi%2C%20I%27d%20like%20a%20free%20solar%20assessment%20for%20my%20home.",
  },
  siteUrl:  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skilltechpowersystem.in',
  social: {
    facebook:  '', // TODO: confirm-with-client
    instagram: '', // TODO: confirm-with-client
    youtube:   '', // TODO: confirm-with-client
  },
  certifications: [
    'MNRE Channel Partner',
    'KSEB Empanelled Contractor',
    // 'ISO 9001:2015',  // TODO: confirm-with-client before re-enabling
  ],
  hours:    'Mon–Sat, 9 am – 6 pm IST',
  // Seasonal demand note: lightning-arrester enquiries spike April–June (pre-monsoon)
  peakSeason: { service: 'Lightning Arrester', months: 'April–June' },
} as const

export type Site = typeof SITE
