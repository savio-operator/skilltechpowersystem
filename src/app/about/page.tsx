import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'About Skilltech Power System',
  description: 'Skilltech Power System — Kerala\'s trusted solar company since 2016. MNRE channel partner, KSEB empanelled, serving all of Ernakulam district.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-6 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          About Us
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-warm-grey leading-relaxed mb-5">
            Skilltech Power System was founded in {SITE.established} in Ernakulam, Kerala, with one goal: make rooftop solar accessible, reliable, and headache-free for Kerala homeowners. We handle everything from the first site survey to the KSEB net-meter commissioning — one team, one phone number, full accountability.
          </p>
          <p className="text-warm-grey leading-relaxed mb-5">
            We are an MNRE-approved channel partner and KSEB-empanelled contractor. Every installation includes proper lightning protection and surge protection — because Ernakulam&apos;s monsoon is not optional.
          </p>
          <p className="text-warm-grey leading-relaxed mb-10">
            {/* TODO: confirm-with-client — add team bios, office photo, specific certifications */}
            More details about the team and our story coming soon.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {SITE.certifications.map((cert) => (
            <div key={cert} className="border border-white/6 rounded-lg p-4 text-sm text-warm-grey">{cert}</div>
          ))}
        </div>

        <a href={`https://wa.me/${SITE.whatsapp.number}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity">
          Talk to us on WhatsApp
        </a>
      </div>
    </main>
  )
}
