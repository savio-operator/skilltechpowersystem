// Central config. All client-visible values are safe here.
// Server-only secrets (API keys) live in .env.local only.

export const SITE = {
  name:        'Skilltech Power System',
  tagline:     'Sun above. Savings below.',
  established: '2016',
  email:       'saviojossy0509@gmail.com',
  phone:       '+91 98950 00000',          // TODO: confirm-with-client
  address:     'Ernakulam District, Kerala — 682 000',
  geo: {
    lat:  9.9312,
    lng:  76.2673,
    region: 'Ernakulam, Kerala, India',
  },
  whatsapp: {
    number:  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  ?? '919895000000',
    message: process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE
               ?? 'Hi%2C%20I%27m%20interested%20in%20a%20solar%20installation%20quote.',
  },
  siteUrl:  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skilltechpowersystem.com',
  social: {
    // TODO: confirm-with-client
    facebook:  '',
    instagram: '',
    youtube:   '',
  },
  certifications: [
    'MNRE Channel Partner',
    'KSEB Empanelled Contractor',
    'ISO 9001:2015',          // TODO: confirm-with-client
  ],
  hours: 'Mon–Sat, 9 am – 6 pm IST',
} as const

export type Site = typeof SITE
