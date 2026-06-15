'use client'
import { useReducedMotion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const STATS = [
  { label: 'Output',  val: '4.8 kW'  },
  { label: 'Panels',  val: '16 pcs'  },
  { label: 'Savings', val: '₹0 bill' },
]

export default function SolarAnim() {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return (
      <div className="w-full h-72 rounded-2xl bg-navy-deep border border-amber/10 flex items-center justify-center">
        <span className="font-mono text-amber text-sm tracking-widest">3D Solar Panel</span>
      </div>
    )
  }

  return (
    <Card className="w-full h-[420px] relative overflow-hidden bg-navy-deep/95">
      {/* Mouse-tracking spotlight */}
      <Spotlight size={350} />

      {/* Ambient sun glow */}
      <div
        className="pointer-events-none absolute top-6 right-10 w-28 h-28 rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}
      />

      {/* Spline 3D interactive scene */}
      <div className="relative w-full h-full z-10">
        <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 pointer-events-none z-20">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex-1 bg-navy/80 backdrop-blur-sm border border-amber/15 rounded-lg px-3 py-2"
          >
            <span className="block font-mono text-[0.55rem] tracking-widest text-warm-grey uppercase">{s.label}</span>
            <span className="block font-mono text-sm font-bold text-amber">{s.val}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
