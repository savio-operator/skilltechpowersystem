// Brands / sources Skilltech Power System procures from — researched from each
// manufacturer's own website (July 2026). Search "TODO: confirm-with-client" for
// claims that rest on manufacturer marketing and should be verified (datasheets /
// certificates) before publishing prominently.

export interface BrandProduct {
  name: string
  description: string
  specs: string[]
}

export interface Brand {
  slug: string
  name: string
  shortName: string
  origin: string   // country / HQ, client-facing
  category: string
  website: string
  blurb: string   // 1–2 sentence brand-card copy
  summary: string   // longer copy for a brand detail block
  whyItMatters: string   // Kerala trust angle
  certifications: string[]
  products: BrandProduct[]
  serviceSlugs: string[] // maps to SERVICES slugs in services.ts
  keywords: string[]
}

export const BRANDS: Record<string, Brand> = {

  eceSolar: {
    slug: 'ece-solar',
    name: 'ECE Solar (ECE India Pvt. Ltd.)',
    shortName: 'ECE Solar',
    origin: 'India — Amravati, Maharashtra',
    category: 'Solar Modules',
    website: 'https://ecesolar.in/products/topcon/',
    blurb:
      'Made-in-India N-Type TOPCon solar modules (565–650 Wp) from a 2 GW facility in Maharashtra, carrying BIS and ALMM marks — panels that degrade slower and keep performing through decades of Kerala monsoons and coastal humidity.',
    summary:
      'ECE India is an Indian solar panel manufacturer based in Amravati, Maharashtra, with a stated 2 GW production capacity across Mono PERC and TOPCon technologies. Its TOPCon range covers high-wattage N-Type modules from 565 Wp to 650 Wp for rooftop, commercial and utility-scale installations.',
    whyItMatters:
      "Kerala's heavy monsoons, salty coastal air and high humidity are tough on solar panels — panel quality decides whether a rooftop system still performs well after 20+ years. ECE's N-Type TOPCon modules degrade more slowly than conventional panels, and sourcing from an Indian manufacturer means easier warranty support and spare availability than grey-market imports.",
    // TODO: confirm-with-client — ALMM listing shown only as a logo on product pages;
    // verify against the official MNRE ALMM list before claiming PM Surya Ghar eligibility.
    certifications: ['BIS', 'ALMM', 'IEC', 'ISO', 'CE'],
    products: [
      {
        name: 'TOPCon 600–650 Wp series',
        description:
          'High-output N-Type TOPCon panels for large rooftops, commercial buildings and solar farms. Fewer panels for the same power — saves roof space and mounting cost.',
        specs: [
          '600–650 Wp wattage options',
          // TODO: confirm-with-client — efficiency & 30-yr claim apply only to the top 650 Wp model (ECE156T650)
          'Up to 22.94% module efficiency (top 650 Wp model)',
          'N-Type TOPCon half-cut cells, 16BB/MBB, M10 gallium-doped wafers',
          'Operating temperature −40°C to +85°C',
        ],
      },
      {
        name: 'TOPCon 565–595 Wp series',
        description:
          'Slightly smaller N-Type TOPCon panels well suited to Kerala home and small-business rooftops. N-Type cells lose less output over time, so they keep generating strongly for decades.',
        specs: ['565–595 Wp wattage options', 'Lower degradation than conventional P-Type panels'],
      },
    ],
    serviceSlugs: ['solar-installation', 'off-grid-hybrid', 'commercial'],
    keywords: [
      'TOPCon solar panels Kerala',
      'N-Type solar module',
      'ALMM approved solar panels',
      'BIS certified solar modules',
      'high efficiency solar panels India',
      'Made in India solar panels',
    ],
  },

  adaniSolar: {
    slug: 'adani-solar',
    name: 'Adani Solar',
    shortName: 'Adani',
    origin: 'India — Mundra, Gujarat',
    category: 'Solar Modules',
    website: 'https://www.adanisolar.com/',
    blurb:
      'India’s leading Tier-1 solar manufacturer. Adani Solar produces high-efficiency N-Type TOPCon and Mono PERC modules in its massive Mundra facility. Recognized globally as a PVEL Top Performer, these panels are engineered specifically to withstand India’s diverse and harsh climates.',
    summary:
      'Adani Solar is the solar manufacturing arm of the Adani Group and one of the largest vertically integrated solar companies in India. Operating out of a state-of-the-art gigawatt-scale hub in Mundra, Gujarat, they produce everything from polysilicon to finished modules. They are consistently ranked as a Tier-1 manufacturer by BloombergNEF and a Top Performer by Kiwa PVEL.',
    whyItMatters:
      'When investing in a rooftop system designed to last 25 years, the financial stability and manufacturing quality of the panel brand is paramount. Adani Solar offers proven Tier-1 bankability, ALMM/BIS certifications for government subsidies, and a robust warranty backed by one of India’s largest conglomerates.',
    certifications: ['Tier-1 (BloombergNEF)', 'PVEL Top Performer', 'BIS', 'ALMM', 'IEC', 'UL', 'ISO'],
    products: [
      {
        name: 'N-Type TOPCon Modules',
        description:
          'Next-generation high-efficiency panels (often exceeding 22%) that degrade slower and perform better in high temperatures compared to standard P-Type panels. Ideal for maximizing output on limited Kerala roof space.',
        specs: ['M10 / G12 Wafers', 'Multi-Busbar (MBB) & Half-Cut Cells', 'Excellent anti-PID performance'],
      },
      {
        name: 'Mono PERC Bifacial & Monofacial',
        description:
          'Highly reliable and battle-tested solar modules that offer excellent cost-to-performance ratios for residential and commercial installations.',
        specs: ['Strong performance in low-light conditions', 'High resistance to salt mist and ammonia'],
      },
    ],
    serviceSlugs: ['solar-installation', 'commercial'],
    keywords: [
      'Adani solar panels Kerala',
      'Tier 1 solar modules',
      'ALMM approved Adani panels',
      'Adani TOPCon solar',
      'Best solar panels in India',
    ],
  },

  utlSolar: {
    slug: 'utl-solar',
    name: 'UTL Solar',
    shortName: 'UTL',
    origin: 'India — Noida, Uttar Pradesh',
    category: 'Solar Modules',
    website: 'https://www.upsinverter.com/utl/solar-panel/',
    blurb:
      'A value-focused Indian solar manufacturer under Fujiyama Power Systems, producing Mono PERC and N-Type TOPCon modules from its Noida facility. UTL modules are engineered for Indian climate extremes, operating stably between –40°C and +85°C, with a wide range built for both residential and off-grid rooftop use.',
    summary:
      'UTL Solar is the solar manufacturing division of Fujiyama Power Systems Ltd., a Delhi-headquartered company expanding into a 10 GW facility in Ratlam, Madhya Pradesh. They cover the full residential range — from compact 165–275W panels for small rooftops and off-grid setups, up to 555–590W+ bifacial TOPCon modules for larger systems. Positioned as an affordable, DCR-compliant alternative to Tier-1 conglomerate brands.',
    whyItMatters:
      'UTL offers DCR-compliant modules eligible for up to ₹78,000 under the PM Surya Ghar: Muft Bijli Yojana subsidy scheme, plus a 27-year performance and 10-year product warranty. It is not positioned or verified as a BloombergNEF Tier-1 / PVEL Top Performer brand — its edge is price-to-performance and subsidy eligibility, not conglomerate-grade bankability.',
    certifications: ['BIS', 'ALMM', 'DCR-Compliant'],
    products: [
      {
        name: 'N-Type TOPCon Modules',
        description:
          'High-efficiency panels ranging from 275W to 590W+, with lower light-induced degradation, better thermal performance, and longer lifespan than standard P-Type panels. Includes bifacial variants for higher energy yield.',
        specs: ['Up to 21–22% efficiency', 'Bifacial gain on reflective surfaces', '25-year linear power warranty'],
      },
      {
        name: 'Mono PERC (Monofacial & Bifacial)',
        description:
          'Core residential lineup spanning 165W–555W, using 5BB and half-cut cell technology. Includes a 555W dual-glass bifacial DCR module built with 144 half-cut cells for subsidy-eligible installations.',
        specs: ['Up to 21.51% efficiency (555W dual-glass)', 'PID-resistant', 'Positive power tolerance 0~+3%'],
      },
    ],
    serviceSlugs: ['solar-installation', 'off-grid-hybrid', 'commercial'],
    keywords: [
      'UTL solar panels Kerala',
      'UTL TOPCon solar modules',
      'DCR compliant solar panels',
      'affordable solar panels India',
    ],
  },

  escoltrix: {
    slug: 'escoltrix',
    name: 'Escoltrix',
    shortName: 'Escoltrix',
    origin: 'USA (Escoltrix LLC) · India operations, Delhi',
    category: 'Earthing, Lightning & Surge Protection',
    website: 'https://escoltrix.com',
    blurb:
      'A complete IEC 62305-based protection chain — ESE and Franklin air terminals, copper-bonded earth rods, backfill compound and coordinated SPDs — plus Ardo exothermic welding that fuses every earthing joint into a permanent molecular bond that can never loosen or corrode underground.',
    summary:
      'Escoltrix supplies the full lightning-protection chain — ESE and Franklin air terminals, copper-bonded earth rods, grounding backfill compounds, Ardo exothermic welding and surge protection devices — designed around the IEC 62305 lightning protection standard, with operations across India, Nepal, Bangladesh and Vietnam.',
    whyItMatters:
      "The weakest point in any earthing or lightning protection system is the joints. With Escoltrix Ardo exothermic welding instead of ordinary clamps or bolts, every underground connection becomes a permanent molecular weld that cannot loosen or corrode in Kerala's heavy monsoon soil — the protection you pay for today still works decades later, with no maintenance.",
    // TODO: confirm-with-client — IEEE 837 / UL statements are manufacturer claims from the
    // Ardo Weld brochure; no third-party certificates published. Confirm warranty terms
    // with Escoltrix before quoting to clients.
    certifications: ['Designed to IEC 62305', 'ESE terminals per NF C 17-102', 'Ardo Weld referenced to IEEE Std 837'],
    products: [
      {
        name: 'Ardo Weld — Exothermic Welding',
        description:
          'Permanently fuses earthing conductors (copper-to-copper or copper-to-steel) using a chemical reaction in a graphite mould — no electricity or gas needed on site. The joint becomes part of the conductor itself: it never loosens, rusts or needs maintenance.',
        specs: [
          'Current-carrying capacity equal to or greater than the conductor itself',
          'Withstands repeated fault currents and lightning surges',
          'Joins copper, copper-clad steel, GI, stainless steel, brass and more',
          'Weld quality verifiable visually on site',
        ],
      },
      {
        name: 'Ardo Weld SAFE — Electronic Ignition',
        description:
          'Sealed tamper-proof weld charge ignited electronically from up to 6 feet away — safer for the installer, with a smoke-filter mould for minimal sparks and fumes even in confined spaces.',
        specs: ['Remote electronic ignition, no flint igniter', '~20% faster installation (per manufacturer)'],
      },
      {
        name: 'ARDO CB Copper Bonded Earth Rods & ARDO FILL Backfill',
        description:
          'Copper-bonded steel earth rods plus conductive backfill compound — the backbone of a reliable earthing system that stays effective through Kerala’s dry and wet seasons.',
        specs: [],
      },
      {
        name: 'NEXO ESE Air Terminals & RIPO SHIELD SPDs',
        description:
          'Early streamer emission lightning arrestors (NF C 17-102) covering a wide protection radius, and Type 1/2/3 coordinated surge protection devices for panels and signal lines.',
        specs: [],
      },
    ],
    serviceSlugs: ['earthing-system', 'lightning-arrester'],
    keywords: [
      'exothermic welding Kerala',
      'Ardo Weld',
      'copper bonded earth rod Kerala',
      'ESE lightning arrestor NF C 17-102',
      'IEC 62305 lightning protection',
      'chemical earthing electrode',
    ],
  },

  waaree: {
    slug: 'waaree',
    name: 'Waaree Energies',
    shortName: 'Waaree',
    origin: 'India — Mumbai, Maharashtra',
    category: 'Solar Modules',
    website: 'https://www.waaree.com/',
    blurb:
      'India\u2019s largest solar PV module manufacturer, with 13.3 GW of operational capacity across five Indian facilities plus a new Texas plant. Waaree has held Tier-1 Bloomberg NEF status for 35 consecutive quarters, backed by a top-ranking PV Evolution Labs (PVEL) reliability score.',
    summary:
      'Waaree Energies is a Mumbai-headquartered, three-decade-old solar manufacturer and India\u2019s market leader by shipped volume, accounting for over 10% of modules delivered in India in 2024. It runs five manufacturing facilities in India and a 3.2 GW assembly plant in Brookshire, Texas, giving it a genuine global supply footprint beyond most domestic peers.',
    whyItMatters:
      'Waaree combines the two things that matter most for a 25-year rooftop investment: manufacturing scale and sustained Tier-1 bankability. Every module is ALMM-approved and passes through an in-house testing lab with over 50 compliance checks, making it a safe default recommendation where financing or government subsidy eligibility is part of the decision.',
    certifications: ['Tier-1 (BloombergNEF, 35 consecutive quarters)', 'PVEL Top Performer', 'BIS', 'ALMM', 'IEC', 'UL'],
    products: [
      {
        name: 'N-Type TOPCon Modules',
        description:
          'High-wattage modules up to 700W+, including bifacial and dual-glass variants. Lower temperature coefficient and slower year-on-year degradation than Mono PERC, with strong low-light performance.',
        specs: ['Up to 21%+ efficiency', '-0.4% YoY degradation vs -0.55% for Mono PERC', '30-year power output warranty', '12-year product warranty'],
      },
      {
        name: 'Mono PERC (Arka Series)',
        description:
          'Established monocrystalline PERC line with half-cut cell variants, covering residential to utility-scale deployments. Positioned as the reliable, higher-volume workhorse range beneath the TOPCon lineup.',
        specs: ['25-year performance warranty', 'Half-cut cell configurations available', 'Bifacial and monofacial options'],
      },
    ],
    serviceSlugs: ['solar-installation', 'commercial'],
    keywords: [
      'Waaree solar panels Kerala',
      'Waaree TOPCon modules',
      'Tier 1 solar modules India',
      'ALMM approved solar panels',
    ],
  },

  luminousSolar: {
    slug: 'luminous-solar',
    name: 'Luminous Power Technologies',
    shortName: 'Luminous',
    origin: 'India — Rudrapur, Uttarakhand',
    category: 'Solar Modules',
    website: 'https://www.luminousindia.com/',
    blurb:
      'A well-established Indian electricals brand that entered TOPCon manufacturing early, running a fully automated 250 MW plant in Rudrapur (expandable to 1 GW). Luminous is one of only 10 ALMM-listed manufacturers in India currently producing TOPCon modules, alongside its established Mono PERC half-cut range.',
    summary:
      'Luminous is better known in India as a power/inverter and battery brand, which gives it strong existing retail and dealer distribution — a different route to market than pure-play module manufacturers. Its Rudrapur facility produces polycrystalline, monocrystalline, N-type, and TOPCon panels in both monofacial and bifacial formats, positioning it as a fast-follower on next-gen cell technology rather than a first-mover.',
    whyItMatters:
      'Luminous\u2019s brand recognition and dealer network in India are stronger than most pure solar manufacturers\u2019, which matters for residential trust and after-sales service. But it lacks the Tier-1 BloombergNEF / PVEL Top Performer distinctions that Adani and Waaree carry — its credibility rests on brand familiarity and BIS/IS-IEC certification rather than independent bankability rankings.',
    certifications: ['BIS (IS/IEC standards)', 'ALMM', 'PID Resistance Certified'],
    products: [
      {
        name: 'N-Type TOPCon Half-Cut Modules',
        description:
          'Bifacial TOPCon panels up to 585W/24V with half-cut cell design, anti-reflective coating, and back surface field (BSF) for improved light absorption. Built for high-temperature performance and low-light conditions.',
        specs: ['585W / 24V', '25-year performance warranty', 'PID-resistant', 'Advanced EVA encapsulation'],
      },
      {
        name: 'Mono PERC Half-Cut Modules',
        description:
          'Core residential range (370W–445W+) using half-cut mono PERC cells to reduce resistive losses and improve durability. Positioned as the value-for-reliability tier beneath Luminous\u2019s TOPCon lineup.',
        specs: ['High torsion-resistant aluminum frame', 'PID resistance', 'Suited to standard rooftop installs'],
      },
    ],
    serviceSlugs: ['solar-installation', 'off-grid-hybrid'],
    keywords: [
      'Luminous solar panels Kerala',
      'Luminous TOPCon modules',
      'Luminous solar rooftop panels',
      'ALMM approved solar panels',
    ],
  },

  premierEnergies: {
    slug: 'premier-energies',
    name: 'Premier Energies',
    shortName: 'Premier Energies',
    origin: 'India — Hyderabad, Telangana',
    category: 'Solar Modules',
    website: 'https://www.premierenergies.com/',
    blurb:
      'Hyderabad-headquartered, integrated cell-and-module manufacturer and the first Indian company to produce TOPCon cells. India\u2019s first LEED Gold-certified solar manufacturing facility, with 2 GW cell and 4 GW module capacity, and Tier-1 status under BloombergNEF.',
    summary:
      'Founded in 1995, Premier Energies went public via IPO and is now scaling aggressively — adding 4 GW of TOPCon cell and module capacity at its Hyderabad site. It was the first Indian company to indigenously manufacture both bifacial Mono PERC cells (2022) and N-type TOPCon cells, giving it a genuine technology-leadership claim rather than a fast-follower one.',
    whyItMatters:
      'Premier Energies sits in the same Tier-1, PLI-scheme cohort as Adani and Waaree — it\u2019s bankable for institutional and lender-backed projects, not just residential retail. Its TOPCon line offers some of the highest efficiencies and longest warranties on the Indian market, making it a strong technical peer to Adani where the buyer cares about hard specs over brand conglomerate weight.',
    certifications: ['Tier-1 (BloombergNEF)', 'BIS', 'ALMM', 'IEC', 'LEED Gold Facility'],
    products: [
      {
        name: 'N-Type TOPCon Bifacial Modules',
        description:
          '10-busbar, 182mm and 210mm (G12R) half-cut cell TOPCon modules ranging 555W–630W, in DCR and non-DCR variants, with 3.2mm tempered glass and transparent or dual-glass backsheet options.',
        specs: ['Up to 22.83% efficiency', '30-year performance warranty', '12-year product warranty', '-0.29 to -0.30%/\u00b0C temp coefficient'],
      },
      {
        name: 'Mono PERC (M10) Modules',
        description:
          'Monofacial and bifacial (transparent backsheet or dual-glass) M10 Mono PERC modules with cell efficiency up to 23.2%, manufactured on one of the industry\u2019s most automated PERC lines.',
        specs: ['Up to 23% cell efficiency', 'Monofacial & bifacial configurations', 'Handles M10/M12/multi-busbar cells'],
      },
    ],
    serviceSlugs: ['solar-installation', 'commercial'],
    keywords: [
      'Premier Energies solar panels Kerala',
      'Premier TOPCon modules',
      'Tier 1 solar modules India',
      'high efficiency solar panels India',
    ],
  },

  emmvee: {
    slug: 'emmvee',
    name: 'Emmvee Photovoltaic Power',
    shortName: 'Emmvee',
    origin: 'India — Bengaluru, Karnataka',
    category: 'Solar Modules',
    website: 'https://www.emmveepv.com/',
    blurb:
      'Bengaluru-based, second-largest pure-play integrated solar cell-and-module manufacturer in India by capacity (10.3 GW modules, 2.94 GW cells). One of the first Indian companies to adopt TOPCon cell manufacturing, and the only Indian company to pass all seven Kiwa PVEL 2024 Reliability Scorecard categories.',
    summary:
      'Founded in 1992, Emmvee has 30+ years of operating history and runs four manufacturing units across Karnataka, with R&D ties to Fraunhofer ISE and a US sales office. TOPCon already makes up the majority of revenue (~69% in FY2025 vs ~30% Mono PERC), showing the company has fully shifted its core business toward next-gen cell technology rather than treating it as a side line.',
    whyItMatters:
      'Emmvee\u2019s PVEL clean sweep is a genuinely rare reliability signal — most Tier-1 Indian brands pass some, not all, PVEL categories. Combined with a 5.36 GW order backlog and ALMM enlistment, it\u2019s bankable for both DCR government schemes (PM-KUSUM, rooftop subsidy) and larger commercial orders, positioning it as a credible alternative to Adani/Waaree on technical merit rather than conglomerate size.',
    certifications: ['ALMM', 'Kiwa PVEL 2024 Reliability Scorecard (all 7 categories)', 'BIS', 'IEC'],
    products: [
      {
        name: 'N-Type TOPCon Modules (Bifacial & Monofacial)',
        description:
          'High-efficiency TOPCon modules on M10 wafers, 560W-580W+ (roadmap to 650W), with 16-busbar half-cut cell designs. Bifacial variants use transparent backsheets for up to 30% extra yield from reflected light.',
        specs: ['Up to 23.42% conversion efficiency (bifacial)', 'Up to 22.45% (monofacial)', 'Rated to 5,400 Pa mechanical load', '108/120/132/144 cell configurations'],
      },
      {
        name: 'Mono PERC Modules',
        description:
          'Bifacial and monofacial Mono PERC cut-cell modules from the Unit II 867 MW line, covering the 395W\u2013550W range for standard residential and commercial rooftop use.',
        specs: ['395\u2013550 Wp range', 'Bifacial & monofacial formats', 'ALMM-enlisted'],
      },
    ],
    serviceSlugs: ['solar-installation', 'commercial'],
    keywords: [
      'Emmvee solar panels Kerala',
      'Emmvee TOPCon modules',
      'PVEL reliable solar panels',
      'ALMM approved solar panels',
    ],
  },

  citel: {
    slug: 'citel',
    name: 'CITEL',
    shortName: 'CITEL',
    origin: 'France — est. 1937',
    category: 'Surge Protection Devices',
    website: 'https://citel.in/en',
    blurb:
      'A French specialist that has done nothing but surge protection since 1937 — even manufacturing its own gas discharge tubes — with IEC 61643, UL 1449 and TUV-certified SPDs for mains panels and dedicated DC protection that shields solar inverters from lightning-induced surges.',
    summary:
      'CITEL is a French surge-protection specialist founded in 1937 — one of the oldest names in the field, building its first surge arrester in 1944. The group engineers SPDs for AC power, solar PV, telecom, dataline and radio equipment, and operates in India through CITEL India (New Delhi).',
    whyItMatters:
      'A single lightning surge can destroy a solar inverter or a building’s electronics in milliseconds. CITEL devices come from a company that has specialised exclusively in surge protection for nearly 90 years and manufactures its own gas discharge tubes — the protector itself is engineered, not a commodity component.',
    // TODO: confirm-with-client — certifications are range-specific (e.g. UL 1449 on
    // US-market SPDs, IEC 61643-31 on PV SPDs), not blanket company certifications.
    certifications: ['IEC/EN 61643-31 (PV SPDs)', 'UL 1449 ed. 5', 'TUV (PV SPD range)', 'EN 50539-11'],
    products: [
      {
        name: 'AC Power Surge Protectors (VG Technology)',
        description:
          'Protects the mains electrical panel from voltage spikes caused by lightning and grid switching. CITEL’s patented VG technology combines a gas discharge tube with varistors for long service life with no leakage current.',
        specs: ['Type 1, Type 2 and Type 1+2 ranges'],
      },
      {
        name: 'Solar PV Surge Protectors (DS50PV / DPVN)',
        description:
          'DC-side surge protection made specifically for rooftop solar — stops lightning-induced surges travelling from the panels into your inverter, one of the most common causes of inverter failure.',
        specs: ['500 / 600 / 1000 / 1500 Vdc models', 'Type 2 and Type 1+2 versions', 'Up to 40 kA Imax discharge'],
      },
      {
        name: 'Dataline, Telecom & Coaxial Protection',
        description:
          'Guards internet, LAN, CCTV, telephone, signal and antenna lines — so a nearby strike doesn’t fry routers, cameras or control systems.',
        specs: [],
      },
    ],
    serviceSlugs: ['lightning-arrester', 'solar-installation', 'commercial'],
    keywords: [
      'CITEL surge protection Kerala',
      'solar PV surge protector',
      'DC SPD for solar inverter',
      'Type 2 SPD installation',
      'IEC 61643 surge arrester',
      'inverter surge protection',
    ],
  },

  gravin: {
    slug: 'gravin-earthing',
    name: 'Gravin Earthing & Lightning Protection System (P) Ltd.',
    shortName: 'Gravin Earthing',
    origin: 'India — Chennai, Tamil Nadu',
    category: 'Earthing & Lightning Protection',
    website: 'https://gravinearthing.com',
    blurb:
      'An ISO 9001:2015-certified Chennai manufacturer of copper-bonded earth rods, ESE lightning arresters and earth-enhancing backfill compound — proven, branded earthing hardware built for the parts of your protection system you’ll never see again after installation.',
    summary:
      'Gravin Earthing is a Chennai-based Indian manufacturer of earthing and lightning protection products — copper-bonded earth rods, GI electrodes, ESE and conventional lightning arresters, surge protection devices and earth-enhancing backfill compound — supplied across India. ISO 9001:2015 certified with TrustSEAL verification on IndiaMART.',
    whyItMatters:
      'An earthing system is only as good as the rod and compound buried in the ground — parts you never see again after installation. Gravin products come from an established, ISO-certified Indian manufacturer with a verified track record, rather than unbranded bazaar-grade rods that corrode within a few years.',
    // TODO: confirm-with-client — founding year conflicts across sources (2004 vs 2014/15);
    // '99.9% EC copper' and '25+ yr life' are self-reported listings — request datasheets
    // before publishing hard specs.
    certifications: ['ISO 9001:2015', 'IndiaMART TrustSEAL verified', 'MSME registered'],
    products: [
      {
        name: 'Copper Bonded Earth Rods / Electrodes',
        description:
          'Steel earth rods bonded with high-purity copper, driven into the ground for a safe, low-resistance path for fault currents and lightning energy. Copper bonding resists rust far longer than plain GI pipes.',
        specs: [],
      },
      {
        name: 'Earth Rite Backfill Compound',
        description:
          'Ground-enhancing compound poured around the earth electrode. Keeps the surrounding soil moist and conductive — vital in Kerala’s laterite and rocky soils where plain earth pits dry out and lose effectiveness.',
        specs: [],
      },
      {
        name: 'ESE & Conventional Lightning Arresters',
        description:
          'Modern ESE arresters that protect a wide radius — one unit can cover an entire house, apartment block or factory roof — plus traditional Franklin-type spike arresters and accessories.',
        specs: [],
      },
    ],
    serviceSlugs: ['earthing-system', 'lightning-arrester'],
    keywords: [
      'chemical earthing Kerala',
      'copper bonded earthing electrode',
      'backfill compound earthing',
      'ESE lightning arrester',
      'IS 3043 earthing',
      'Gravin Earthing',
    ],
  },

  dehn: {
    slug: 'dehn',
    name: 'DEHN',
    shortName: 'DEHN',
    origin: 'Germany — est. 1910',
    category: 'Lightning & Surge Protection, Earthing',
    website: 'https://www.dehn.in/en-in',
    blurb:
      'The German company that invented the surge protection device in 1954 and remains the global benchmark — every DEHN arrester and SPD is tested with real lightning currents up to 400 kA in its own laboratories, to IEC 62305 and IEC 61643 standards, with VDE, KEMA and UL approvals.',
    summary:
      'DEHN is a fourth-generation family-owned German company, founded in 1910 in Neumarkt, Bavaria — widely regarded as the world’s leading specialist in lightning protection, surge protection and electrical safety. It invented the world’s first SPD (the J250, 1954), holds 900+ patents, operates in 70+ countries and runs its own high-current test laboratories simulating real lightning strikes up to 400 kA. DEHN India is based in Manesar, Gurugram.',
    whyItMatters:
      'A lightning protection system is only as good as its components. DEHN products come from the company that literally invented the surge protection device and has been the global benchmark for over a century — every device is torture-tested with real lightning currents in DEHN’s own German laboratories, so the arrestor on your roof will actually perform when a strike happens.',
    // TODO: confirm-with-client — approvals apply to product ranges generally; confirm on the
    // specific SKUs installed. Do NOT word as an official DEHN partnership / "authorized
    // installer" unless Skilltech holds that status with DEHN India.
    certifications: ['IEC/EN 61643-11 (Type 1 & 2 SPDs)', 'IEC 62305 / IEC 62561 tested', 'VDE · KEMA · UL approvals'],
    products: [
      {
        name: 'External Lightning Protection & Earthing',
        description:
          'Air terminals, down conductors, earthing components and connectors that catch a strike and carry it safely into the ground — designed to IEC 62305, components tested per IEC 62561.',
        specs: [],
      },
      {
        name: 'Red/Line Surge Protection (Power)',
        description:
          'Type 1 + Type 2 SPDs for the main electrical panel that stop voltage spikes before they reach appliances, inverters and machinery. VDE, KEMA and UL approvals on SPD ranges.',
        specs: [],
      },
      {
        name: 'Yellow/Line (Data & IT) + Solar PV Surge Protection',
        description:
          'Protection for signal, data and communication lines (CCTV, networking, control systems), plus DC- and AC-side SPDs built specifically for rooftop solar plants.',
        specs: [],
      },
    ],
    serviceSlugs: ['lightning-arrester', 'earthing-system', 'solar-installation', 'commercial'],
    keywords: [
      'DEHN lightning arrester Kerala',
      'DEHN surge protection India',
      'German surge protection devices',
      'Type 1 Type 2 SPD Kerala',
      'IEC 62305 lightning protection',
      'solar surge protection device Kerala',
    ],
  },
}

export const BRANDS_SECTION = {
  eyebrow: 'SOURCES / THE BRANDS WE BUILD WITH',
  headline: 'We don’t compromise on what goes into your installation.',
  intro:
    "Kerala's climate is unforgiving on electrical systems — some of the highest lightning activity in India, months of monsoon rain, and salty coastal air that corrodes cheap hardware within a few years. That's why every panel, earth rod, arrester and surge protector we install comes from manufacturers we've vetted — from century-old German and French specialists to ISO-certified, ALMM-listed Indian makers — all engineered to international standards like IEC 62305 and IEC 61643.",
} as const

export const BRAND_LIST: Brand[] = Object.values(BRANDS)

/** Brands relevant to a given service slug (for service detail pages). */
export function brandsForService(serviceSlug: string): Brand[] {
  return BRAND_LIST.filter(b => b.serviceSlugs.includes(serviceSlug))
}
