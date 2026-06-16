'use client'
import { useState, useCallback, useId } from 'react'
import { motion } from 'framer-motion'
import { HOME } from '@/content/home'
import { SITE } from '@/content/site'

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN') }

function calculate(bill: number) {
  const { tariff, peakHours, costPerKw, subsidy } = HOME.math.calc
  const units  = bill / tariff
  const kw     = Math.max(1, (units / (peakHours * 30)) * 1.15)
  const cost   = kw * costPerKw * (1 - subsidy)
  const annual = bill * 12
  const pb     = cost / annual
  return { kw: Math.round(kw * 10) / 10, annual, payback: Math.round(pb * 10) / 10 }
}

function buildWhatsAppMessage(bill: number, result: ReturnType<typeof calculate>) {
  const msg = [
    'Hi Skilltech, I used your savings calculator:',
    `My monthly bill: ₹${fmt(bill)}`,
    `Suggested system: ${result.kw.toFixed(1)} kW`,
    `Annual savings: ₹${fmt(result.annual)}`,
    `Estimated payback: ${result.payback.toFixed(1)} years`,
    "Can I get a free site assessment?",
  ].join('%0A')
  return `https://wa.me/${SITE.whatsapp.number}?text=${msg}`
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(5000)
  const result   = calculate(bill)
  const sliderId = useId()

  const pct = ((bill - 1000) / (20000 - 1000)) * 100

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(Number(e.target.value))
  }, [])

  return (
    <div className="rounded-xl border border-white/7 bg-white/[0.03] p-6 md:p-8">
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-3">
          <label htmlFor={sliderId} className="text-sm text-warm-grey">Monthly electricity bill</label>
          <motion.span
            key={bill}
            initial={{ opacity: 0.6, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xl text-amber"
          >
            ₹{fmt(bill)}
          </motion.span>
        </div>

        <div className="relative h-1 bg-white/10 rounded-full mb-1.5">
          <div
            className="absolute left-0 top-0 h-full bg-amber rounded-full pointer-events-none transition-all"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-amber rounded-full shadow-md pointer-events-none transition-all"
            style={{ left: `calc(${pct}% - 7px)` }}
          />
          <input
            id={sliderId}
            type="range"
            min={1000} max={20000} step={500}
            value={bill}
            onChange={handleChange}
            // Lenis hijacks touchmove for smooth scroll, which blocks dragging
            // the slider on touch devices — opt this control out.
            data-lenis-prevent
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-11 -top-5 touch-none"
            aria-valuetext={`₹${fmt(bill)} per month`}
          />
        </div>
        <div className="flex justify-between font-mono text-[0.65rem] text-warm-grey/60">
          <span>₹1,000</span><span>₹20,000</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <ResultCard label="System size"    value={result.kw.toFixed(1)}        unit="kW"  sub="Panels on your roof"   />
        <ResultCard label="Annual savings" value={`₹${fmt(result.annual)}`}              sub="vs current bill"       highlight />
        <ResultCard label="Payback period" value={result.payback.toFixed(1)}   unit="yrs" sub="Then 20+ years free"  />
      </div>

      {/* WhatsApp CTA */}
      {SITE.whatsapp.number && (
        <a
          href={buildWhatsAppMessage(bill, result)}
          target="_blank"
          rel="noopener noreferrer"
          data-event="calculator-whatsapp"
          className="flex items-center justify-center gap-2 w-full mt-2 mb-4 py-3 bg-[#25D366] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          <WhatsAppIcon />
          WhatsApp me this estimate — get a free assessment
        </a>
      )}

      <p className="font-mono text-[0.62rem] text-warm-grey/50 leading-relaxed">
        {HOME.math.disclaimer}
      </p>
    </div>
  )
}

function ResultCard({
  label, value, unit, sub, highlight,
}: {
  label: string; value: string; unit?: string; sub: string; highlight?: boolean
}) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? 'border-amber/20 bg-amber/[0.07]' : 'border-white/6 bg-white/[0.02]'}`}>
      <span className="block font-mono text-[0.65rem] tracking-widest text-warm-grey uppercase mb-1">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`font-display font-black text-2xl leading-none ${highlight ? 'text-amber' : 'text-paper'}`}>
          {value}
        </span>
        {unit && <span className="font-mono text-xs text-warm-grey">{unit}</span>}
      </div>
      <span className="block text-[0.72rem] text-warm-grey mt-1">{sub}</span>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
