import type { Metadata } from 'next'
import { SERVICES } from '@/content/services'
import { SITE } from '@/content/site'
import ServicePage, { ServiceSchema } from '@/components/layout/ServicePage'
import EarthingAnim from '@/components/animations/EarthingAnim'

const s = SERVICES.earthing

export const metadata: Metadata = {
  title: s.name,
  description: s.description,
  keywords: s.keywords,
  openGraph: { url: `${SITE.siteUrl}/earthing-system` },
}

export default function EarthingSystemPage() {
  return (
    <>
      <ServiceSchema service={s} siteUrl={SITE.siteUrl} />
      <ServicePage service={s} animation={<EarthingAnim />} />
    </>
  )
}
