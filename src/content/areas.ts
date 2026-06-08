export interface Area {
  slug:        string
  name:        string
  district:    string
  description: string
  keywords:    string[]
  mapDot?: { cx: number; cy: number }  // SVG coordinates in the Ernakulam map
}

export const AREAS: Area[] = [
  {
    slug:     'kochi',
    name:     'Kochi',
    district: 'Ernakulam',
    description: 'Solar installation and lightning protection services across Kochi city — Edappally, Kakkanad, Tripunithura, Kalamassery and surrounding areas.',
    keywords: ['solar installation Kochi', 'rooftop solar Kochi', 'solar panels Kochi Kerala'],
    mapDot: { cx: 155, cy: 235 },
  },
  {
    slug:     'aluva',
    name:     'Aluva',
    district: 'Ernakulam',
    description: 'Rooftop solar and surge protection services in Aluva and surrounding taluks.',
    keywords: ['solar installation Aluva', 'solar panels Aluva Ernakulam'],
    mapDot: { cx: 242, cy: 92 },
  },
  {
    slug:     'angamaly',
    name:     'Angamaly',
    district: 'Ernakulam',
    description: 'Solar installation and AMC services in Angamaly and North Ernakulam.',
    keywords: ['solar installation Angamaly', 'rooftop solar Angamaly'],
    mapDot: { cx: 192, cy: 62 },
  },
  {
    slug:     'perumbavoor',
    name:     'Perumbavoor',
    district: 'Ernakulam',
    description: 'Grid-tie and hybrid solar systems serving Perumbavoor, Kothamangalam road and East Ernakulam.',
    keywords: ['solar installation Perumbavoor', 'solar panels Perumbavoor'],
    mapDot: { cx: 292, cy: 132 },
  },
  {
    slug:     'muvattupuzha',
    name:     'Muvattupuzha',
    district: 'Ernakulam',
    description: 'Rooftop solar installation and lightning protection for Muvattupuzha and South-East Ernakulam.',
    keywords: ['solar installation Muvattupuzha', 'solar panels Muvattupuzha Kerala'],
    mapDot: { cx: 272, cy: 382 },
  },
  {
    slug:     'kothamangalam',
    name:     'Kothamangalam',
    district: 'Ernakulam',
    description: 'Solar design and installation services in Kothamangalam taluk, East Ernakulam.',
    keywords: ['solar installation Kothamangalam', 'solar Kerala Kothamangalam'],
    mapDot: { cx: 315, cy: 412 },
  },
  {
    slug:     'kakkanad',
    name:     'Kakkanad',
    district: 'Ernakulam',
    description: 'Rooftop solar for homes and IT parks in Kakkanad, Ernakulam.',
    keywords: ['solar installation Kakkanad', 'solar panels Kakkanad Kochi'],
    mapDot: { cx: 222, cy: 192 },
  },
  {
    slug:     'tripunithura',
    name:     'Tripunithura',
    district: 'Ernakulam',
    description: 'Solar installation and AMC for Tripunithura and South Ernakulam.',
    keywords: ['solar installation Tripunithura', 'rooftop solar Tripunithura'],
    mapDot: { cx: 208, cy: 268 },
  },
]

export function getAreaBySlug(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug)
}
