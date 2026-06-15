'use client'
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import LightningCanvas from '@/components/ui/LightningCanvas'

export default function LightningAnim() {
  const flashRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-[#080600] border border-amber/10">
      {/* Flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-amber/5 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Storm cloud BG */}
      <div className="absolute inset-0 bg-cinematic-storm opacity-80" />

      {/* Lightning canvas */}
      {!shouldReduce && (
        <div className="absolute inset-0">
          <LightningCanvas flashRef={flashRef} />
        </div>
      )}

      {/* House silhouette */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-60"
        width="180" height="80" viewBox="0 0 180 80" fill="none"
        aria-hidden="true"
      >
        <polygon points="90,5 10,45 170,45" fill="#1A1105" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5"/>
        <rect x="30" y="45" width="120" height="35" fill="#1A1105" stroke="#7A5008" strokeWidth="0.6"/>
        <rect x="75" y="55" width="30" height="25" fill="#221608"/>
        {/* Arrester rod */}
        <line x1="90" y1="5" x2="90" y2="-8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="90" cy="-8" r="2.5" fill="#FFFFFF"/>
      </svg>

      {/* ESE label */}
      <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm border border-amber/20 rounded-lg px-3 py-2">
        <span className="font-mono text-[0.6rem] tracking-widest text-amber uppercase block">ESE Lightning Arrester</span>
        <span className="font-mono text-xs text-warm-grey">Active protection</span>
      </div>

      {/* Reduced-motion fallback */}
      {shouldReduce && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="60" height="100" viewBox="0 0 60 100" fill="none" aria-label="Lightning bolt">
            <path d="M38 5 L18 50 H32 L22 95 L52 42 H38 L48 5 Z" fill="#FFFFFF" opacity="0.9"/>
          </svg>
        </div>
      )}
    </div>
  )
}
