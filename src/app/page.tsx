import type { Metadata } from 'next'
import ChSky        from '@/components/home/ChSky'
import ChPromise    from '@/components/home/ChPromise'
import ChMachine    from '@/components/home/ChMachine'
import ChMath       from '@/components/home/ChMath'
import ChStorm      from '@/components/home/ChStorm'
import ChProof      from '@/components/home/ChProof'
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
        <ChMath />
        <ChStorm />
        <ChProof />
        <ChInvitation />
      </main>
    </>
  )
}
