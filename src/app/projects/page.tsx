import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/content/projects'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'Installation Portfolio',
  description: `Browse ${PROJECTS.length}+ solar installations by Skilltech Power System across Ernakulam, Kerala.`,
  openGraph: { url: `${SITE.siteUrl}/projects` },
}

const TYPE_LABELS: Record<string, string> = {
  'grid-tie': 'Grid-tie', hybrid: 'Hybrid', 'off-grid': 'Off-grid', commercial: 'Commercial',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-2 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          Installation Portfolio
        </h1>
        <p className="text-warm-grey mb-12">Real projects across Ernakulam district.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.id} className="rounded-xl overflow-hidden border border-white/6 bg-white/[0.02]">
              <div
                className="relative h-48"
                style={{ background: `linear-gradient(145deg, hsl(${p.hue},30%,12%), hsl(${p.hue},50%,8%))` }}
              >
                <Image src={p.image} alt={p.imageAlt} fill className="object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div className="p-4">
                <span className="block font-mono text-[0.65rem] tracking-wider text-amber mb-1">
                  {p.capacity} · {TYPE_LABELS[p.type]}
                </span>
                <span className="block text-sm font-semibold text-paper">{p.location}</span>
                <span className="block font-mono text-[0.65rem] text-warm-grey mt-1">{p.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
