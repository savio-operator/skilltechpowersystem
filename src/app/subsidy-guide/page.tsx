import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'KSEB Solar Subsidy Guide Kerala 2024',
  description: 'Complete guide to MNRE central subsidy and KSEB net-metering for rooftop solar in Kerala. How to apply, eligibility, amounts, and timeline.',
  keywords: ['KSEB solar subsidy', 'MNRE subsidy Kerala 2024', 'rooftop solar subsidy Ernakulam', 'solar net metering Kerala'],
}

const STEPS = [
  { n: '01', title: 'Site survey', body: 'Our team visits your roof, checks orientation, shading and structural capacity. Free of charge.' },
  { n: '02', title: 'System design & quotation', body: 'We design the system, specify equipment and give you a detailed quote including subsidy deduction.' },
  { n: '03', title: 'KSEB application', body: 'We file the net-metering application with KSEB on your behalf. Approval typically takes 2–4 weeks.' },
  { n: '04', title: 'Installation', body: 'Our certified crew installs panels, inverter, and protection systems in 1–2 days.' },
  { n: '05', title: 'MNRE subsidy filing', body: 'We submit subsidy documents to the nodal agency. 30% central subsidy on first 3 kW, 15% up to 10 kW.' },
  { n: '06', title: 'Net-meter commissioning', body: 'KSEB installs the bi-directional meter. You start generating and selling excess power to the grid.' },
]

export default function SubsidyGuidePage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-4 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          KSEB Solar Subsidy Guide
        </h1>
        <p className="text-amber font-medium mb-8">How to get 30% MNRE subsidy and KSEB net-metering in Ernakulam.</p>

        <div className="bg-amber/8 border border-amber/20 rounded-lg p-5 mb-10">
          <p className="font-semibold text-paper mb-1">Current subsidy (2024)</p>
          <p className="text-warm-grey text-sm">₹18,000/kW on first 3 kW · ₹9,000/kW on capacity between 3–10 kW · Maximum ₹78,000 per household · Only for residential grid-tie systems.</p>
        </div>

        <h2 className="font-display font-bold text-xl text-paper mb-6">The 6-step process</h2>
        <div className="space-y-6 mb-12">
          {STEPS.map((step) => (
            <div key={step.n} className="flex gap-4">
              <span className="font-mono text-amber text-sm shrink-0 pt-0.5">{step.n}</span>
              <div>
                <p className="text-paper font-semibold mb-1">{step.title}</p>
                <p className="text-warm-grey text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <a href={`https://wa.me/${SITE.whatsapp.number}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20KSEB%20solar%20subsidy.`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex bg-[#25D366] text-white font-bold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity">
          Ask us on WhatsApp
        </a>
      </div>
    </main>
  )
}
