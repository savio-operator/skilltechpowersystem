import { SITE } from '@/content/site'
import { AREAS } from '@/content/areas'
import { SERVICE_LIST } from '@/content/services'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricalContractor'],
    name:          SITE.name,
    description:   'Complete power-systems company — rooftop solar installation, lightning protection, earthing, battery backup, AMC and EV chargers across Ernakulam, Kottayam, and Idukki districts, Kerala. Est. 2015.',
    url:           SITE.siteUrl,
    email:         SITE.email,
    telephone:     SITE.phone || undefined,
    foundingDate:  SITE.established,
    numberOfEmployees: SITE.teamSize,
    address: {
      '@type':           'PostalAddress',
      streetAddress:     SITE.address.line1 || undefined,
      addressLocality:   'Muvattupuzha',
      addressRegion:     'Kerala',
      postalCode:        SITE.address.pin   || undefined,
      addressCountry:    'IN',
    },
    geo: {
      '@type':    'GeoCoordinates',
      latitude:   SITE.geo.lat,
      longitude:  SITE.geo.lng,
    },
    areaServed: AREAS.map((a) => ({
      '@type': 'City',
      name:    `${a.name}, ${a.district}, Kerala`,
    })),
    openingHoursSpecification: {
      '@type':      'OpeningHoursSpecification',
      dayOfWeek:    ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens:        '09:00',
      closes:       '18:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Power System Services',
      itemListElement: SERVICE_LIST.map((s) => ({
        '@type':     'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.tagline },
      })),
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
