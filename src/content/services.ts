export interface Service {
  slug:        string
  name:        string
  shortName:   string
  tagline:     string
  description: string
  keywords:    string[]
  features:    string[]
  image:       string      // TODO: confirm-with-client
  imageAlt:    string
  faq:         { q: string; a: string }[]
}

export const SERVICES: Record<string, Service> = {
  solarInstallation: {
    slug:      'solar-installation',
    name:      'Rooftop Solar Installation',
    shortName: 'Solar Installation',
    tagline:   'End-to-end solar — from survey to KSEB net-meter connection.',
    description:
      'Skilltech Power System designs, supplies and installs grid-tie rooftop solar systems across Ernakulam district. We handle KSEB approval, MNRE subsidy filing, and net-meter commissioning so you get to zero bill without the paperwork headache.',
    keywords: [
      'solar installation Ernakulam',
      'rooftop solar Kerala',
      'KSEB net metering',
      'solar panels Kochi',
      'MNRE subsidy Kerala',
    ],
    features: [
      'Free roof & shading assessment',
      'Tier-1 monocrystalline panels (25-yr warranty)',
      'MNRE-approved Solis / Growatt inverters',
      'KSEB net-meter application & commissioning',
      '30% MNRE subsidy filing',
      '5-year installation warranty',
      'Remote app monitoring included',
    ],
    image:    '/images/service-solar-installation.jpg',  // TODO: confirm-with-client
    imageAlt: 'Solar installation on Kerala rooftop',
    faq: [
      {
        q: 'How long does installation take?',
        a: 'Typically 1–2 days for residential systems up to 10 kW. KSEB net-meter commissioning takes 2–4 weeks.',
      },
      {
        q: 'What subsidy can I get?',
        a: '30% MNRE central subsidy on the first 3 kW, 15% on capacity up to 10 kW. We file the paperwork for you.',
      },
      {
        q: 'Will my roof hold the panels?',
        a: 'Our free survey checks load-bearing capacity, angle, and shading. Most Kerala homes qualify easily.',
      },
    ],
  },

  lightningArrester: {
    slug:      'lightning-arrester',
    name:      'Lightning Arrester & Surge Protection',
    shortName: 'Lightning Protection',
    tagline:   'Your ₹3 lakh solar system deserves more than hope during a monsoon.',
    description:
      'Kerala\'s monsoon season delivers some of the highest lightning strike densities in India. Skilltech installs ESE lightning arresters, DC/AC surge protection devices, and proper earthing systems that safeguard your solar investment.',
    keywords: [
      'lightning arrester Kerala',
      'solar surge protection Ernakulam',
      'ESE lightning conductor Kerala',
      'solar earthing system',
      'monsoon solar protection',
    ],
    features: [
      'ESE (Early Streamer Emission) lightning arrester',
      'DC-side surge protection (SPD)',
      'AC-side surge protection',
      'IS 3043-compliant earthing system',
      'Surge-protected MC4 connectors',
      'Annual inspection included in first year',
    ],
    image:    '/images/service-lightning.jpg',   // TODO: confirm-with-client
    imageAlt: 'Lightning arrester installation Kerala',
    faq: [
      {
        q: 'Is lightning protection mandatory?',
        a: 'Not legally mandatory for residential systems, but strongly recommended in Ernakulam\'s high-strike zones. Insurance claims for lightning damage are frequently rejected without it.',
      },
      {
        q: 'Can you add protection to an existing system?',
        a: 'Yes. We retrofit arresters and SPDs to any brand of solar system.',
      },
    ],
  },

  offGridHybrid: {
    slug:      'off-grid-hybrid',
    name:      'Off-Grid & Hybrid Solar Systems',
    shortName: 'Off-Grid / Hybrid',
    tagline:   'Power through grid failures — day and night.',
    description:
      'For homes with frequent outages or no grid access, Skilltech designs hybrid systems with lithium battery backup. Your panels charge the batteries during the day; the batteries power your home at night or during grid failure.',
    keywords: [
      'hybrid solar system Kerala',
      'solar battery backup Ernakulam',
      'off grid solar Kerala',
      'lithium solar battery Kochi',
    ],
    features: [
      'Lithium Iron Phosphate (LiFePO4) battery banks',
      'Hybrid inverter (solar + grid + battery)',
      'Automatic changeover — zero downtime on outage',
      'Remote SOC monitoring',
      'Expandable battery capacity',
    ],
    image:    '/images/service-offgrid.jpg',   // TODO: confirm-with-client
    imageAlt: 'Hybrid solar battery system',
    faq: [
      {
        q: 'How many hours of backup can I get?',
        a: 'Depends on battery size and load. A 10 kWh system typically covers 8–12 hours of a standard Kerala home.',
      },
    ],
  },

  amcService: {
    slug:      'amc-service',
    name:      'Annual Maintenance Contract (AMC)',
    shortName: 'AMC Service',
    tagline:   'Keep your system at peak output every year.',
    description:
      'Solar panels lose 2–3% output per year without maintenance. Our AMC includes two scheduled visits, panel cleaning, electrical inspection, performance report, and priority support. Most customers see a 10–15% output recovery after the first clean.',
    keywords: [
      'solar AMC Kerala',
      'solar maintenance Ernakulam',
      'solar panel cleaning Kerala',
      'solar system service Kochi',
    ],
    features: [
      '2 scheduled service visits per year',
      'Panel cleaning & inspection',
      'Electrical termination check',
      'Inverter software update',
      'Detailed performance report',
      'Priority WhatsApp support',
    ],
    image:    '/images/service-amc.jpg',   // TODO: confirm-with-client
    imageAlt: 'Solar panel maintenance crew Kerala',
    faq: [
      {
        q: 'How much does an AMC cost?',
        a: 'Starting from ₹3,000/year for residential systems. Contact us for a quote based on system size.',  // TODO: confirm-with-client
      },
    ],
  },

  commercial: {
    slug:      'commercial',
    name:      'Commercial Solar Solutions',
    shortName: 'Commercial',
    tagline:   'Industrial-scale solar — designed for maximum ROI.',
    description:
      'From factories and warehouses to apartment buildings and institutions, Skilltech designs and installs commercial solar systems from 10 kW to 500 kW. We handle structural analysis, single-line diagrams, KSEB HT metering, and MNRE subsidy filing.',
    keywords: [
      'commercial solar Ernakulam',
      'industrial solar Kerala',
      'rooftop solar factory Kerala',
      'KSEB HT solar connection',
    ],
    features: [
      'Structural feasibility & shadow analysis',
      'High-capacity string / central inverters',
      'KSEB HT/LT metering and approval',
      'SCADA monitoring dashboard',
      'Performance guarantee contracts',
    ],
    image:    '/images/service-commercial.jpg',  // TODO: confirm-with-client
    imageAlt: 'Commercial solar installation Kerala',
    faq: [
      {
        q: 'What is the minimum system size for commercial?',
        a: 'We design commercial systems from 10 kW upward. For systems above 100 kW, an energy audit is included at no cost.',
      },
    ],
  },
}
