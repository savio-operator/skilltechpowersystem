export interface Area {
  slug:        string
  name:        string
  district:    string
  description: string
  keywords:    string[]
  mapDot?: { cx: number; cy: number }  // SVG coordinates (Ernakulam map only)
}

// Ernakulam areas
export const ERNAKULAM_AREAS: Area[] = [
  {
    slug:        'kochi',
    name:        'Kochi',
    district:    'Ernakulam',
    description: 'Solar installation, lightning protection, and AMC services across Kochi — Edappally, Kakkanad, Tripunithura, Kalamassery and surrounding areas.',
    keywords:    ['solar installation Kochi', 'rooftop solar Kochi', 'solar panels Kochi Kerala', 'lightning arrester Kochi'],
    mapDot:      { cx: 155, cy: 235 },
  },
  {
    slug:        'aluva',
    name:        'Aluva',
    district:    'Ernakulam',
    description: 'Rooftop solar, hybrid systems, and surge protection services in Aluva and surrounding taluks.',
    keywords:    ['solar installation Aluva', 'solar panels Aluva Ernakulam', 'solar AMC Aluva'],
    mapDot:      { cx: 242, cy: 92 },
  },
  {
    slug:        'angamaly',
    name:        'Angamaly',
    district:    'Ernakulam',
    description: 'Solar installation and annual maintenance services in Angamaly and North Ernakulam.',
    keywords:    ['solar installation Angamaly', 'rooftop solar Angamaly'],
    mapDot:      { cx: 192, cy: 62 },
  },
  {
    slug:        'perumbavoor',
    name:        'Perumbavoor',
    district:    'Ernakulam',
    description: 'Grid-tie and hybrid solar systems serving Perumbavoor, Kothamangalam road, and East Ernakulam.',
    keywords:    ['solar installation Perumbavoor', 'solar panels Perumbavoor'],
    mapDot:      { cx: 292, cy: 132 },
  },
  {
    slug:        'muvattupuzha',
    name:        'Muvattupuzha',
    district:    'Ernakulam',
    description: 'Rooftop solar installation, lightning protection, and earthing systems for Muvattupuzha and South-East Ernakulam.',
    keywords:    ['solar installation Muvattupuzha', 'solar panels Muvattupuzha Kerala', 'lightning arrester Muvattupuzha'],
    mapDot:      { cx: 272, cy: 382 },
  },
  {
    slug:        'kothamangalam',
    name:        'Kothamangalam',
    district:    'Ernakulam',
    description: 'Solar design and installation in Kothamangalam taluk, East Ernakulam — gateway to Idukki.',
    keywords:    ['solar installation Kothamangalam', 'solar Kerala Kothamangalam'],
    mapDot:      { cx: 315, cy: 412 },
  },
  {
    slug:        'kakkanad',
    name:        'Kakkanad',
    district:    'Ernakulam',
    description: 'Rooftop solar for homes and IT parks in Kakkanad, Ernakulam.',
    keywords:    ['solar installation Kakkanad', 'solar panels Kakkanad Kochi'],
    mapDot:      { cx: 222, cy: 192 },
  },
  {
    slug:        'tripunithura',
    name:        'Tripunithura',
    district:    'Ernakulam',
    description: 'Solar installation and AMC services for Tripunithura and South Ernakulam.',
    keywords:    ['solar installation Tripunithura', 'rooftop solar Tripunithura'],
    mapDot:      { cx: 208, cy: 268 },
  },
]

// Kottayam areas — TODO: confirm-with-client which specific towns to add
export const KOTTAYAM_AREAS: Area[] = [
  {
    slug:        'kottayam',
    name:        'Kottayam',
    district:    'Kottayam',
    description: 'Rooftop solar installation, lightning protection, and AMC services across Kottayam city and district.',
    keywords:    ['solar installation Kottayam', 'rooftop solar Kottayam', 'solar panels Kottayam Kerala', 'lightning arrester Kottayam'],
  },
  {
    slug:        'pala',
    name:        'Pala',
    district:    'Kottayam',
    description: 'Rooftop solar and lightning protection services in Pala and Central Kottayam.',
    keywords:    ['solar installation Pala', 'rooftop solar Pala Kottayam'],
  },
  {
    slug:        'changanacherry',
    name:        'Changanacherry',
    district:    'Kottayam',
    description: 'Grid-tie solar systems, earthing, and AMC for Changanacherry and South Kottayam.',
    keywords:    ['solar installation Changanacherry', 'solar panels Changanacherry Kerala'],
  },
]

// Idukki areas — TODO: confirm-with-client which specific towns to add
export const IDUKKI_AREAS: Area[] = [
  {
    slug:        'thodupuzha',
    name:        'Thodupuzha',
    district:    'Idukki',
    description: 'Rooftop solar and off-grid hybrid systems for Thodupuzha and West Idukki.',
    keywords:    ['solar installation Thodupuzha', 'rooftop solar Thodupuzha', 'solar panels Idukki'],
  },
  {
    slug:        'munnar',
    name:        'Munnar',
    district:    'Idukki',
    description: 'Off-grid and hybrid solar systems for Munnar — ideal for homes with unreliable grid supply at elevation.',
    keywords:    ['solar installation Munnar', 'off-grid solar Munnar', 'solar panels Munnar Idukki'],
  },
]

// Combined list used for sitemap, area pages, and JSON-LD areaServed
export const AREAS: Area[] = [
  ...ERNAKULAM_AREAS,
  ...KOTTAYAM_AREAS,
  ...IDUKKI_AREAS,
]

export function getAreaBySlug(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug)
}
