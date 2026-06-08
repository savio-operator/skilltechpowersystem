import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAreaBySlug, AREAS } from '@/content/areas'
import { SITE } from '@/content/site'

export function generateStaticParams() {
  return AREAS.map((a) => ({ area: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}
  return {
    title: `Solar Installation ${area.name}, Ernakulam`,
    description: area.description,
    keywords: area.keywords,
    openGraph: { url: `${SITE.siteUrl}/service-areas/${area.slug}` },
  }
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) notFound()

  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-warm-grey uppercase mb-4">Service Area</p>
        <h1 className="font-display font-black text-paper mb-4 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          Solar Installation<br />{area.name}
        </h1>
        <p className="text-amber font-medium mb-6">{area.district}, Kerala</p>
        <p className="text-warm-grey leading-relaxed mb-10">{area.description}</p>

        <div className="bg-white/3 border border-white/6 rounded-lg p-6 mb-8">
          <p className="font-semibold text-paper mb-3">Why choose Skilltech in {area.name}?</p>
          <ul className="space-y-2">
            {['Local team — no long-distance travel charges', 'KSEB net-metering experience in ' + area.district, 'Same-day WhatsApp support', 'Monsoon-ready lightning protection included'].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-warm-grey"><span className="text-amber shrink-0">—</span>{item}</li>
            ))}
          </ul>
        </div>

        <a
          href={`https://wa.me/${SITE.whatsapp.number}?text=Hi%2C%20I%27m%20in%20${encodeURIComponent(area.name)}%20and%20interested%20in%20solar%20installation.`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Get a free quote in {area.name}
        </a>
      </div>
    </main>
  )
}
