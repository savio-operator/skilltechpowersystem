'use client'
import { useState, useCallback, useId } from 'react'
import { motion } from 'framer-motion'
import { HOME } from '@/content/home'

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

export default function SavingsCalculator() {
  const [bill,   setBill]   = useState(5000)
  const result = calculate(bill)
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

        {/* Custom range track */}
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
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-7 -top-3"
            aria-valuetext={`₹${fmt(bill)} per month`}
          />
        </div>
        <div className="flex justify-between font-mono text-[0.65rem] text-warm-grey/60">
          <span>₹1,000</span><span>₹20,000</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <ResultCard label="System size" value={result.kw.toFixed(1)} unit="kW" sub="Panels on your roof" />
        <ResultCard label="Annual savings" value={`₹${fmt(result.annual)}`} sub="vs current bill" highlight />
        <ResultCard label="Payback period" value={result.payback.toFixed(1)} unit="yrs" sub="Then 20+ years free" />
      </div>

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
