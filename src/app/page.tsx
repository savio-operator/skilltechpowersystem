import type { Metadata } from 'next'
import ChSky        from '@/components/home/ChSky'
import ChPromise    from '@/components/home/ChPromise'
import ChMachine    from '@/components/home/ChMachine'
import ChServices   from '@/components/home/ChServices'
import ChMath       from '@/components/home/ChMath'
import ChStorm      from '@/components/home/ChStorm'
import ChBrands     from '@/components/home/ChBrands'
import ChProof      from '@/components/home/ChProof'
import ChFAQ        from '@/components/home/ChFAQ'
import ChInvitation from '@/components/home/ChInvitation'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'Skilltech Power System — Solar Energy Kerala',
  description:
    'From Sky to Switch — Kerala\'s cinematic solar story. Rooftop solar installation, lightning protection, KSEB net-metering across Ernakulam district.',
  openGraph: {
    url: SITE.siteUrl,
    images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],  // TODO: confirm-with-client
  },
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <main>
        <ChSky />
        <ChPromise />
        <ChMachine />
        <ChServices />
        <ChMath />
        <ChStorm />
        <ChBrands />
        <ChProof />
        <ChFAQ />
        <ChInvitation />
      </main>
    </>
  )
}
