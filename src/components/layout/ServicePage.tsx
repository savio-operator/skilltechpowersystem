import type { Service } from '@/content/services'
import { SITE } from '@/content/site'
import Link from 'next/link'

interface Props {
  service: Service
}

export default function ServicePage({ service: s }: Props) {
  const waHref = SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(s.shortName)}.`
    : `mailto:${SITE.email}`

  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Back</Link>
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-warm-grey uppercase mb-4">Service</p>
        <h1
          className="font-display font-black text-paper mb-4 leading-none"
          style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}
        >
          {s.name}
        </h1>
        <p className="text-amber font-medium text-lg mb-6">{s.tagline}</p>
        <p className="text-warm-grey leading-relaxed mb-10">{s.description}</p>

        {s.pricing && (
          <div className="rounded-lg border border-amber/20 bg-amber/[0.05] px-5 py-4 mb-10">
            <p className="font-mono text-[0.68rem] tracking-wider text-amber uppercase mb-1">Indicative pricing</p>
            <p className="text-paper text-sm">{s.pricing}</p>
          </div>
        )}

        <h2 className="font-display font-bold text-xl text-paper mb-4">What&apos;s included</h2>
        <ul className="space-y-2 mb-12">
          {s.features.map((f) => (
            <li key={f} className="flex gap-3 text-warm-grey text-sm">
              <span className="text-amber mt-0.5 shrink-0">—</span>{f}
            </li>
          ))}
        </ul>

        {s.faq.length > 0 && (
          <>
            <h2 className="font-display font-bold text-xl text-paper mb-4">FAQ</h2>
            <div className="space-y-6 mb-12">
              {s.faq.map((item) => (
                <div key={item.q}>
                  <p className="text-paper font-semibold mb-1">{item.q}</p>
                  <p className="text-warm-grey text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <a
          href={waHref}
          target="_blank" rel="noopener noreferrer"
          data-event="whatsapp-click"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Get a free quote
        </a>
      </div>
    </main>
  )
}

// JSON-LD Service schema for individual service pages
export function ServiceSchema({ service: s, siteUrl }: { service: Service; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Skilltech Power System',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'State',
      name: 'Kerala, India',
    },
    ...(s.faq.length > 0 && {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: s.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
