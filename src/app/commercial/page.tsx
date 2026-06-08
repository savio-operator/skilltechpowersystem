import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/content/services'
import { SITE } from '@/content/site'

const s = SERVICES.commercial

export const metadata: Metadata = { title: s.name, description: s.description, keywords: s.keywords }

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Back</Link>
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-warm-grey uppercase mb-4">Service</p>
        <h1 className="font-display font-black text-paper mb-4 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>{s.name}</h1>
        <p className="text-amber font-medium text-lg mb-6">{s.tagline}</p>
        <p className="text-warm-grey leading-relaxed mb-10">{s.description}</p>
        <ul className="space-y-2 mb-12">{s.features.map((f) => (<li key={f} className="flex gap-3 text-warm-grey text-sm"><span className="text-amber mt-0.5">—</span>{f}</li>))}</ul>
        <h2 className="font-display font-bold text-xl text-paper mb-4">FAQ</h2>
        <div className="space-y-6 mb-12">{s.faq.map((item) => (<div key={item.q}><p className="text-paper font-semibold mb-1">{item.q}</p><p className="text-warm-grey text-sm leading-relaxed">{item.a}</p></div>))}</div>
        <a href={`https://wa.me/${SITE.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity">Discuss your project</a>
      </div>
    </main>
  )
}
