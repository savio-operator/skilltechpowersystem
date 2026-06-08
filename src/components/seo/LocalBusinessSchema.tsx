import { SITE } from '@/content/site'
import { AREAS } from '@/content/areas'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricalContractor'],
    name: SITE.name,
    description:
      'Rooftop solar installation, lightning protection and KSEB net-metering services across Ernakulam district, Kerala.',
    url: SITE.siteUrl,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: SITE.established,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ernakulam',
      addressRegion: 'Kerala',
      postalCode: '682000',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude:  SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: AREAS.map((a) => ({
      '@type': 'City',
      name: `${a.name}, ${a.district}, Kerala`,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens:  '09:00',
      closes: '18:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Solar Energy Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rooftop Solar Installation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lightning Arrester Installation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'KSEB Net-Metering' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Annual Maintenance Contract' } },
      ],
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
