'use client'
import { useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SolarPanel3DFallback } from '@/components/ui/SolarPanel3D'

const SolarPanel3D = dynamic(() => import('@/components/ui/SolarPanel3D'), {
  ssr: false,
  loading: () => <SolarPanel3DFallback />,
})

export default function SolarAnim() {
  const shouldReduce = useReducedMotion()
  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10">
      {/* Ambient sun glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-4 right-8 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,176,52,0.35) 0%, transparent 70%)',
            animation: shouldReduce ? 'none' : 'pulseGlow 3s ease-in-out infinite',
          }}
        />
      </div>
      {/* 3D Panel */}
      <SolarPanel3D />
      {/* Stats overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 pointer-events-none">
        {[
          { label: 'Output',   val: '4.8 kW' },
          { label: 'Panels',   val: '16 pcs'  },
          { label: 'Savings',  val: '₹0 bill' },
        ].map((s) => (
          <div key={s.label} className="flex-1 bg-navy/80 backdrop-blur-sm border border-amber/15 rounded-lg px-3 py-2">
            <span className="block font-mono text-[0.55rem] tracking-widest text-warm-grey uppercase">{s.label}</span>
            <span className="block font-mono text-sm font-bold text-amber">{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
