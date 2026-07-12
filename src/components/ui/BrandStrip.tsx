import { brandsForService } from '@/content/brands'
import ServiceReveal from '@/components/ui/ServiceReveal'

// "Brands we source from" strip on service detail pages — static (server-rendered),
// pulls only the brands mapped to this service via serviceSlugs in content/brands.ts.
export default function BrandStrip({ serviceSlug }: { serviceSlug: string }) {
  const brands = brandsForService(serviceSlug)
  if (brands.length === 0) return null

  return (
    <>
      <ServiceReveal delay={0.46}>
        <h2 className="font-display font-bold text-xl text-paper mb-1">Brands we source from</h2>
        <p className="text-warm-grey text-sm mb-4">
          Vetted manufacturers, international standards — no unbranded bazaar-grade hardware.
        </p>
      </ServiceReveal>
      <div className="space-y-3 mb-12">
        {brands.map((b, i) => (
          <ServiceReveal key={b.slug} delay={0.5 + i * 0.05}>
            <a
              href={b.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-black/10 bg-black/[0.03] px-5 py-4 transition-colors duration-300 hover:border-black/40"
            >
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-semibold text-paper">
                  {b.shortName}
                  <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm-grey">
                    {b.origin}
                  </span>
                </p>
                <span className="rounded-full border border-black/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-paper">
                  {b.category}
                </span>
              </div>
              <p className="text-warm-grey text-sm leading-relaxed">{b.blurb}</p>
            </a>
          </ServiceReveal>
        ))}
      </div>
    </>
  )
}
