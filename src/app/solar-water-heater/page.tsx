import type { Metadata } from 'next'
import { SERVICES } from '@/content/services'
import { SITE } from '@/content/site'
import ServicePage, { ServiceSchema } from '@/components/layout/ServicePage'

const s = SERVICES.solarWaterHeater

export const metadata: Metadata = {
  title: s.name,
  description: s.description,
  keywords: s.keywords,
  openGraph: { url: `${SITE.siteUrl}/solar-water-heater` },
}

export default function SolarWaterHeaterPage() {
  return (
    <>
      <ServiceSchema service={s} siteUrl={SITE.siteUrl} />
      <ServicePage service={s} />
    </>
  )
}
