import type { Metadata } from 'next'
import { SERVICES } from '@/content/services'
import { SITE } from '@/content/site'
import ServicePage, { ServiceSchema } from '@/components/layout/ServicePage'
import BatteryAnim from '@/components/animations/BatteryAnim'

const s = SERVICES.offGridHybrid

export const metadata: Metadata = {
  title: s.name,
  description: s.description,
  keywords: s.keywords,
  openGraph: { url: `${SITE.siteUrl}/off-grid-hybrid` },
}

export default function OffGridHybridPage() {
  return (
    <>
      <ServiceSchema service={s} siteUrl={SITE.siteUrl} />
      <ServicePage service={s} animation={<BatteryAnim showSolar />} />
    </>
  )
}
