import type { ReactNode } from 'react'
import type { Service } from '@/content/services'
import { SITE } from '@/content/site'
import Link from 'next/link'
import { Spotlight } from '@/components/ui/spotlight'
import ServiceReveal from '@/components/ui/ServiceReveal'
import ServiceVisual from '@/components/ui/ServiceVisual'

interface Props {
  service: Service
  animation?: ReactNode
}

export default function ServicePage({ service: s, animation }: Props) {
  const waHref = SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(s.shortName)}.`
    : `mailto:${SITE.email}`

  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        {/* Back link */}
        <ServiceReveal delay={0}>
          <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 flex items-center gap-2 group w-fit">
            <span className="inline-block group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back
          </Link>
        </ServiceReveal>

        {/* Eyebrow */}
        <ServiceReveal delay={0.05}>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-amber uppercase mb-4">Service</p>
        </ServiceReveal>

        {/* Headline — clip reveal */}
        <ServiceReveal delay={0.1} clipReveal>
          <h1
            className="font-display font-black text-paper mb-4 leading-none"
            style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}
          >
            {s.name}
          </h1>
        </ServiceReveal>

        {/* Tagline */}
        <ServiceReveal delay={0.18}>
          <p className="text-amber font-medium text-lg mb-8">{s.tagline}</p>
        </ServiceReveal>

        {/* Editorial divider */}
        <ServiceReveal delay={0.22}>
          <div className="h-[1px] bg-gradient-to-r from-amber/40 via-amber/15 to-transparent mb-8" />
        </ServiceReveal>

        {/* Cinematic visual (falls back to the animated illustration) */}
        <ServiceReveal delay={0.26}>
          <div className="mb-10 relative rounded-2xl overflow-hidden border border-amber/10 shadow-[0_0_40px_rgba(26,24,40,0.08)]">
            <Spotlight size={320} />
            <ServiceVisual src={s.image} alt={s.imageAlt} fallback={animation} />
          </div>
        </ServiceReveal>

        {/* Description */}
        <ServiceReveal delay={0.3}>
          <p className="text-warm-grey leading-relaxed mb-10">{s.description}</p>
        </ServiceReveal>

        {/* Pricing */}
        {s.pricing && (
          <ServiceReveal delay={0.34}>
            <div className="rounded-xl border border-amber/20 bg-amber/[0.05] px-5 py-4 mb-10 hover:border-amber/40 transition-colors duration-300">
              <p className="font-mono text-[0.68rem] tracking-wider text-amber uppercase mb-1">Indicative pricing</p>
              <p className="text-paper text-sm">{s.pricing}</p>
            </div>
          </ServiceReveal>
        )}

        {/* Features */}
        <ServiceReveal delay={0.38}>
          <h2 className="font-display font-bold text-xl text-paper mb-4">What&apos;s included</h2>
        </ServiceReveal>
        <ul className="space-y-2 mb-12">
          {s.features.map((f, i) => (
            <ServiceReveal
              key={f}
              as="li"
              delay={0.42 + i * 0.04}
              className="flex gap-3 text-warm-grey text-sm items-start group hover:text-paper transition-colors duration-200"
            >
              <span className="text-amber mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">—</span>
              {f}
            </ServiceReveal>
          ))}
        </ul>

        {/* FAQ */}
        {s.faq.length > 0 && (
          <>
            <ServiceReveal delay={0.5}>
              <h2 className="font-display font-bold text-xl text-paper mb-4">FAQ</h2>
            </ServiceReveal>
            <div className="space-y-6 mb-12">
              {s.faq.map((item, i) => (
                <ServiceReveal key={item.q} delay={0.54 + i * 0.06}>
                  <div className="border-b border-white/5 pb-6">
                    <p className="text-paper font-semibold mb-1">{item.q}</p>
                    <p className="text-warm-grey text-sm leading-relaxed">{item.a}</p>
                  </div>
                </ServiceReveal>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <ServiceReveal delay={0.6}>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-event="whatsapp-click"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-xl px-6 py-3.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Get a free quote
          </a>
        </ServiceReveal>
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
