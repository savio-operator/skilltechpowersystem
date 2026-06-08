import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/content/site'
import { SERVICE_LIST } from '@/content/services'

export const metadata: Metadata = {
  title: 'About Skilltech Power System',
  description: `Skilltech Power System — Kerala's complete power-systems company since 2015. ${SITE.founderExperience} field experience. MNRE channel partner, KSEB empanelled, serving Ernakulam, Kottayam, and Idukki.`,
  openGraph: { url: `${SITE.siteUrl}/about` },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>

        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-warm-grey uppercase mb-4">Est. {SITE.established}</p>
        <h1 className="font-display font-black text-paper mb-6 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          About Us
        </h1>

        <p className="text-warm-grey leading-relaxed mb-5">
          Skilltech Power System was founded in {SITE.established} with one goal: make rooftop solar and power protection accessible, reliable, and headache-free for Kerala homeowners and businesses. Our founder brings {SITE.founderExperience} of field experience — from residential 3 kW installs to 25 kW commercial rooftops.
        </p>
        <p className="text-warm-grey leading-relaxed mb-5">
          We are more than a solar installer. We are a complete power-systems company — handling solar (on/off/hybrid), lightning arresters, earthing systems, battery and inverter systems, solar water heaters, EV chargers, and annual maintenance contracts. One team, one phone number, full accountability.
        </p>
        <p className="text-warm-grey leading-relaxed mb-5">
          Our stated differentiator: <span className="text-paper font-medium">anytime servicing, community listening.</span> We don't disappear after installation. AMC customers get priority WhatsApp support and same-week service visits — because your ₹5 lakh system should work at peak output, every year.
        </p>
        <p className="text-warm-grey leading-relaxed mb-10">
          We serve all of Kerala with a focus on Ernakulam, Kottayam, and Idukki districts. We are an MNRE-approved channel partner and KSEB-empanelled contractor.
          {/* TODO: confirm-with-client — add team bios, office photo, specific certification numbers */}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { n: '50+',  l: 'Installations' },
            { n: '100kW+', l: 'Commissioned' },
            { n: '11',   l: 'Years in Kerala' },
            { n: '4',    l: 'Team members' },
          ].map(({ n, l }) => (
            <div key={l} className="border border-white/6 rounded-lg p-4 text-center">
              <span className="block font-mono font-bold text-amber text-xl">{n}</span>
              <span className="block text-xs text-warm-grey mt-1">{l}</span>
            </div>
          ))}
        </div>

        {/* Services */}
        <h2 className="font-display font-bold text-lg text-paper mb-4">Our services</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
          {SERVICE_LIST.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="flex items-center gap-2 text-sm text-warm-grey hover:text-amber transition-colors"
              >
                <span className="text-amber">—</span> {s.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Certifications */}
        {SITE.certifications.length > 0 && (
          <>
            <h2 className="font-display font-bold text-lg text-paper mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {SITE.certifications.map((cert) => (
                <span key={cert} className="border border-white/6 rounded-full px-4 py-1.5 text-sm text-warm-grey">{cert}</span>
              ))}
            </div>
          </>
        )}

        {SITE.whatsapp.number && (
          <a
            href={`https://wa.me/${SITE.whatsapp.number}`}
            target="_blank" rel="noopener noreferrer"
            data-event="whatsapp-click"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Talk to us on WhatsApp
          </a>
        )}
      </div>
    </main>
  )
}
