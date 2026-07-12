export interface Service {
  slug:        string
  name:        string
  shortName:   string
  tagline:     string
  description: string
  keywords:    string[]
  features:    string[]
  pricing?:    string        // indicative only; remove if client doesn't want it public
  image:       string        // TODO: confirm-with-client — real installation photo
  imageAlt:    string
  faq:         { q: string; a: string }[]
}

export const SERVICES: Record<string, Service> = {

  solarInstallation: {
    slug:      'solar-installation',
    name:      'Rooftop Solar Installation',
    shortName: 'Solar',
    tagline:   'End-to-end solar — survey, supply, installation, KSEB net-meter commissioning.',
    description:
      'Skilltech Power System designs, supplies, and installs on-grid, off-grid, and hybrid rooftop solar systems across Ernakulam, Kottayam, and Idukki. We handle KSEB approval, MNRE subsidy filing, and net-meter commissioning — one team, one accountability.',
    keywords: [
      'solar installation Ernakulam',
      'rooftop solar Kerala',
      'KSEB net metering',
      'solar panels Kochi',
      'MNRE subsidy Kerala',
      'solar installation Kottayam',
      'solar installation Idukki',
    ],
    features: [
      'Free roof & shading assessment',
      'Adani / Waaree / UTL / Luminous panels — 25-yr warranty',
      'Luminous / Deye / Growatt / UTL inverters — MNRE approved',
      'KSEB net-meter application & commissioning',
      '30% MNRE central subsidy filing',
      '5-year installation warranty',
      'Remote app monitoring included',
    ],
    pricing: 'Typical 5 kW residential system from ₹5 lakh (post-subsidy)',
    image:    '/images/cinematic/service-solar-rooftop.png',  // TODO: confirm-with-client
    imageAlt: 'Rooftop solar panel installation Kerala',
    faq: [
      {
        q: 'How long does installation take?',
        a: 'Typically 1–2 days for residential systems up to 10 kW. KSEB net-meter commissioning takes 2–4 additional weeks.',
      },
      {
        q: 'What subsidy can I get in 2025?',
        a: '30% MNRE central subsidy on the first 3 kW, 15% on capacity up to 10 kW. We prepare and submit all subsidy paperwork.',
      },
      {
        q: 'Which panel and inverter brands do you use?',
        a: 'We install Adani, Waaree, UTL, and Luminous panels — all Tier-1 with 25-year performance guarantees. Inverters are Luminous, Deye, Growatt, or UTL depending on system type.',
      },
      {
        q: 'Will my roof hold the panels?',
        a: 'Our free survey checks load-bearing capacity, tilt angle, and shading. Most Kerala concrete flat and tiled roofs qualify easily.',
      },
    ],
  },

  lightningArrester: {
    slug:      'lightning-arrester',
    name:      'Lightning Arrester & Surge Protection',
    shortName: 'Lightning Protection',
    tagline:   'Your ₹5 lakh solar system deserves more than hope during a monsoon.',
    description:
      'Kerala\'s monsoon delivers some of the highest lightning strike densities in India. Skilltech installs ESE lightning arresters, IS 3043-compliant earthing systems, and DC/AC surge protection devices that safeguard your entire power system — solar and grid. Peak demand: April–June (pre-monsoon).',
    keywords: [
      'lightning arrester Kerala',
      'solar surge protection Ernakulam',
      'ESE lightning conductor Kerala',
      'solar earthing system',
      'lightning arrester Kottayam',
      'lightning protection Idukki',
      'monsoon solar protection',
    ],
    features: [
      'ESE (Early Streamer Emission) lightning arrester',
      'IS 3043-compliant GI/copper earthing system',
      'DC-side surge protection device (SPD)',
      'AC-side surge protection device',
      'Surge-protected MC4 connectors',
      'Annual inspection in first year',
    ],
    pricing: 'From ₹80,000 for a complete residential lightning & earthing system',
    image:    '/images/cinematic/service-lightning-arrester.png',   // TODO: confirm-with-client
    imageAlt: 'ESE lightning arrester installation Kerala rooftop',
    faq: [
      {
        q: 'Is lightning protection mandatory for solar?',
        a: 'Not legally mandatory for residential systems, but strongly recommended in Kerala\'s high-strike zones. Many insurance claims for lightning damage are rejected without proper protection.',
      },
      {
        q: 'Can you add protection to an existing solar system?',
        a: 'Yes. We retrofit ESE arresters and SPDs to any brand of solar system.',
      },
      {
        q: 'When should I install before monsoon?',
        a: 'April is ideal — before the pre-monsoon lightning activity picks up in May and June.',
      },
    ],
  },

  earthing: {
    slug:      'earthing-system',
    name:      'Earthing & Grounding Systems',
    shortName: 'Earthing',
    tagline:   'Proper earthing — the foundation every electrical system needs.',
    description:
      'A correctly installed earthing system protects people, equipment, and buildings from dangerous fault currents. Skilltech supplies and installs GI and copper earthing electrodes, plates, and enhancement compounds to IS 3043 standards — for solar systems, homes, commercial buildings, and industrial premises.',
    keywords: [
      'earthing system Kerala',
      'electrical earthing Ernakulam',
      'copper earthing rod Kerala',
      'GI earthing installation',
      'IS 3043 earthing',
      'solar earthing Kottayam',
    ],
    features: [
      'GI and copper earthing electrodes',
      'Earthing plates and enhancement compounds',
      'IS 3043 compliant installation',
      'Earth resistance testing (certificate provided)',
      'Solar system earthing — panel frames, inverter, mounting structure',
      'Building earthing for homes and commercial premises',
    ],
    image:    '/images/cinematic/service-earthing-materials.png',   // TODO: confirm-with-client
    imageAlt: 'Earthing rod installation Kerala',
    faq: [
      {
        q: 'What is the difference between earthing and lightning protection?',
        a: 'Earthing provides a safe fault-current path for electrical systems. Lightning protection (arrester) intercepts a direct strike. Both work together — a lightning arrester without proper earthing is ineffective.',
      },
      {
        q: 'Do you supply earthing materials?',
        a: 'Yes. We supply GI rods, copper bonded rods, earthing plates, enhancement compounds, and all associated hardware — and install everything to IS 3043.',
      },
    ],
  },

  offGridHybrid: {
    slug:      'off-grid-hybrid',
    name:      'Off-Grid & Hybrid Solar Systems',
    shortName: 'Off-Grid / Hybrid',
    tagline:   'Power through grid failures — day and night.',
    description:
      'For homes with frequent outages or no grid access, Skilltech designs hybrid solar systems with lithium battery backup using Luminous, Deye, and Growatt hybrid inverters. Your panels charge the batteries during the day; batteries power your home at night or during a grid failure.',
    keywords: [
      'hybrid solar system Kerala',
      'solar battery backup Ernakulam',
      'off grid solar Kerala',
      'lithium solar battery Kochi',
      'Deye hybrid inverter Kerala',
      'Growatt hybrid solar Kerala',
    ],
    features: [
      'Lithium Iron Phosphate (LiFePO4) battery banks',
      'Luminous / Deye / Growatt hybrid inverter',
      'Automatic changeover — zero downtime on outage',
      'Remote state-of-charge monitoring',
      'Expandable battery capacity',
    ],
    image:    '/images/service-offgrid.jpg',   // TODO: confirm-with-client
    imageAlt: 'Hybrid solar battery system Kerala',
    faq: [
      {
        q: 'How many hours of backup can I get?',
        a: 'Depends on battery size and load. A 10 kWh system typically covers 8–12 hours of a standard Kerala home.',
      },
      {
        q: 'Can I add battery backup to my existing grid-tie system?',
        a: 'Yes. We can retrofit a hybrid inverter and battery bank to most grid-tie systems.',
      },
    ],
  },

  batteryInverter: {
    slug:      'battery-inverter',
    name:      'Battery & Inverter Systems',
    shortName: 'Battery + Inverter',
    tagline:   'Reliable backup power — with or without solar.',
    description:
      'Not ready for full solar yet? Or need a standalone backup system? Skilltech supplies and installs Luminous, UTL, and Deye inverter-battery systems for homes and small businesses. We size the system to your actual load and install it properly — no guesswork.',
    keywords: [
      'inverter battery Kerala',
      'home UPS Ernakulam',
      'Luminous inverter Kerala',
      'battery backup system Kochi',
      'solar inverter Kerala',
    ],
    features: [
      'Luminous / UTL / Deye inverters',
      'Tubular and lithium battery options',
      'Load sizing and system design',
      'Professional installation with safety checks',
      'AMC support available',
    ],
    image:    '/images/cinematic/service-battery-inverter.png',   // TODO: confirm-with-client
    imageAlt: 'Home inverter battery installation Kerala',
    faq: [
      {
        q: 'What inverter brands do you carry?',
        a: 'We stock and install Luminous, UTL, Deye, and Growatt inverters for both solar and standalone backup applications.',
      },
    ],
  },

  amcService: {
    slug:      'amc-service',
    name:      'Annual Maintenance Contract (AMC)',
    shortName: 'AMC',
    tagline:   'Keep your system at peak output, every year.',
    description:
      'Skilltech\'s stated differentiator: anytime servicing, community listening. Solar panels lose 2–3% output per year without maintenance. Our AMC includes two scheduled visits, panel cleaning, electrical inspection, inverter health check, and priority WhatsApp support. Most customers see 10–15% output recovery after the first clean.',
    keywords: [
      'solar AMC Kerala',
      'solar maintenance Ernakulam',
      'solar panel cleaning Kerala',
      'solar system service Kochi',
      'solar AMC Kottayam',
    ],
    features: [
      '2 scheduled service visits per year',
      'Panel cleaning & inspection',
      'Electrical termination check',
      'Inverter software update & health report',
      'Performance data review',
      'Priority WhatsApp support — anytime',
    ],
    pricing: 'From ₹3,000/year for residential systems', // TODO: confirm-with-client — final pricing
    image:    '/images/cinematic/service-panel-maintenance.png',   // TODO: confirm-with-client
    imageAlt: 'Solar panel maintenance and cleaning Kerala',
    faq: [
      {
        q: 'Do you service other brands\' installations?',
        a: 'Yes. We service any brand of solar system — you don\'t need to have been our original installation customer.',
      },
      {
        q: 'How quickly do you respond to issues?',
        a: 'AMC customers get priority WhatsApp support. We aim to respond same-day and schedule a visit within 48 hours.',
      },
    ],
  },

  solarWaterHeater: {
    slug:      'solar-water-heater',
    name:      'Solar Water Heater',
    shortName: 'Solar Water Heater',
    tagline:   'Hot water from the sun — year-round in Kerala.',
    description:
      'A solar water heater is the fastest-payback solar product for most Kerala homes — typical payback in 2–3 years. Skilltech supplies and installs flat-plate and evacuated-tube collectors for domestic and commercial hot water needs.',
    keywords: [
      'solar water heater Kerala',
      'solar geyser Ernakulam',
      'solar water heater Kochi',
      'solar water heater Kottayam',
    ],
    features: [
      'Flat-plate and evacuated-tube options',
      'Domestic (100–500 LPD) and commercial capacity',
      'Insulated storage tank',
      'Backup electric element for overcast days',
      'Roof or ground mounting',
    ],
    image:    '/images/cinematic/service-solar-water-heater.png',   // TODO: confirm-with-client
    imageAlt: 'Solar water heater installation Kerala rooftop',
    faq: [
      {
        q: 'Does it work during the monsoon?',
        a: 'Evacuated-tube collectors perform better in diffuse/cloudy light. A backup electric element handles fully overcast days.',
      },
    ],
  },

  evCharger: {
    slug:      'ev-charger',
    name:      'EV Charger Installation',
    shortName: 'EV Charger',
    tagline:   'Charge your car with the sun.',
    description:
      'Pair your solar system with a home EV charger and drive on sunlight. Skilltech installs AC home chargers (Type 2 / CCS) and advises on solar-EV system sizing — so your car charges from the panels rather than the grid.',
    keywords: [
      'EV charger installation Kerala',
      'home EV charger Ernakulam',
      'electric vehicle charger Kochi',
      'solar EV charging Kerala',
    ],
    features: [
      'AC home charger (Type 2 / CCS)',
      'Solar-EV system sizing',
      'Dedicated circuit and earthing',
      'Smart charger options with app control',
    ],
    image:    '/images/cinematic/service-ev-charger.png',   // TODO: confirm-with-client
    imageAlt: 'Home EV charger installation Kerala',
    faq: [
      {
        q: 'Do I need solar to install an EV charger?',
        a: 'No — we install standalone home chargers. But pairing with solar lets you charge from free sunlight rather than grid power.',
      },
    ],
  },

  commercial: {
    slug:      'commercial',
    name:      'Commercial Solar Solutions',
    shortName: 'Commercial',
    tagline:   'Industrial-scale solar — designed for maximum ROI.',
    description:
      'From factories and warehouses to apartment buildings and institutions, Skilltech designs and installs commercial solar systems. Largest completed project: 25 kW. We handle structural analysis, single-line diagrams, KSEB HT/LT metering, and MNRE subsidy filing.',
    keywords: [
      'commercial solar Ernakulam',
      'industrial solar Kerala',
      'rooftop solar factory Kerala',
      'KSEB HT solar connection',
      'commercial solar Kottayam',
    ],
    features: [
      'Structural feasibility & shadow analysis',
      'Adani / Waaree / UTL high-capacity string inverters',
      'KSEB HT/LT metering and approval',
      'SCADA or app-based monitoring',
      'Performance-linked contracts available',
    ],
    pricing: 'Typical commercial system from ₹10 lakh',
    image:    '/images/cinematic/service-solar-rooftop-alt.png',   // TODO: confirm-with-client
    imageAlt: 'Commercial rooftop solar installation Kerala',
    faq: [
      {
        q: 'What is the minimum system size?',
        a: 'We design commercial systems from 10 kW upward. Our largest completed project is 25 kW.',
      },
      {
        q: 'Do you handle KSEB approval for commercial systems?',
        a: 'Yes — KSEB HT/LT approval, net-metering application, and commissioning are all handled by us.',
      },
    ],
  },
}

// Ordered list for nav, footer, service-area pages
export const SERVICE_LIST = [
  SERVICES.solarInstallation,
  SERVICES.lightningArrester,
  SERVICES.earthing,
  SERVICES.offGridHybrid,
  SERVICES.batteryInverter,
  SERVICES.amcService,
  SERVICES.solarWaterHeater,
  SERVICES.evCharger,
  SERVICES.commercial,
] as const
