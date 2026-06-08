import type { Metadata } from 'next'
import { SERVICES } from '@/content/services'
import { SITE } from '@/content/site'
import ServicePage, { ServiceSchema } from '@/components/layout/ServicePage'

const s = SERVICES.lightningArrester

export const metadata: Metadata = {
  title: s.name,
  description: s.description,
  keywords: s.keywords,
  openGraph: { url: `${SITE.siteUrl}/lightning-arrester` },
}

export default function LightningArresterPage() {
  return (
    <>
      <ServiceSchema service={s} siteUrl={SITE.siteUrl} />
      <ServicePage service={s} />
    </>
  )
}
