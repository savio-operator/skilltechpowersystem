'use client'
import { useReducedMotion } from 'framer-motion'

export default function AMCAnim() {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-label="Solar panel maintenance animation">

        {/* Roof */}
        <rect x="40" y="160" width="280" height="80" rx="4" fill="#221608" stroke="#7A5008" strokeWidth="0.8" opacity="0.6"/>

        {/* Solar array (4 panels) */}
        {[0,1,2,3].map((i) => {
          const x = 50 + i * 68
          return (
            <g key={i} transform={`translate(${x}, 60)`}>
              <rect width="60" height="96" rx="3" fill="#1a2a05" stroke="#FBB034" strokeWidth="0.8"/>
              {/* Cell grid */}
              {[0,1,2,3].map(r => (
                <line key={r} x1="0" y1={16 + r*22} x2="60" y2={16 + r*22} stroke="#D4920A" strokeWidth="0.5" opacity="0.5"/>
              ))}
              {[0,1,2].map(c => (
                <line key={c} x1={16 + c*16} y1="0" x2={16 + c*16} y2="96" stroke="#D4920A" strokeWidth="0.5" opacity="0.5"/>
              ))}
              {/* Sun reflection glint */}
              {animated && (
                <ellipse cx="12" cy="12" rx="6" ry="3" fill="#FBB034" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" dur="3s" begin={`${i*0.7}s`} repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="translate" values="0,0;42,70;42,70" dur="3s" begin={`${i*0.7}s`} repeatCount="indefinite"/>
                </ellipse>
              )}
            </g>
          )
        })}

        {/* Scan beam across all panels */}
        {animated && (
          <rect x="50" y="60" width="272" height="6" rx="3"
            fill="url(#scanGrad)" opacity="0.8">
            <animateTransform attributeName="transform" type="translate"
              values="0,0;0,90;0,90;0,0"
              dur="3s" repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4,0,0.6,1;0,0,1,1;0.4,0,0.6,1"/>
          </rect>
        )}

        {/* Technician figure */}
        <g transform="translate(290,100)">
          {/* Body */}
          <circle cx="15" cy="10" r="8" fill="#2A1C05" stroke="#FBB034" strokeWidth="0.8"/>
          <rect x="8" y="18" width="14" height="22" rx="3" fill="#2A1C05" stroke="#7A5008" strokeWidth="0.7"/>
          {/* Arm holding tool */}
          <line x1="22" y1="24" x2="34" y2="18" stroke="#2A1C05" strokeWidth="4" strokeLinecap="round"/>
          {/* Tablet/meter */}
          <rect x="32" y="13" width="14" height="10" rx="2" fill="#221608" stroke="#FBB034" strokeWidth="0.8"/>
          <rect x="34" y="15" width="10" height="6" rx="1" fill="#FBB034" opacity="0.4"/>
          {/* Legs */}
          <line x1="12" y1="40" x2="10" y2="58" stroke="#2A1C05" strokeWidth="4" strokeLinecap="round"/>
          <line x1="20" y1="40" x2="22" y2="58" stroke="#2A1C05" strokeWidth="4" strokeLinecap="round"/>
        </g>

        {/* Performance readout */}
        <g transform="translate(14,12)">
          <rect width="90" height="44" rx="6" fill="#221608" stroke="#FBB034" strokeWidth="0.7" opacity="0.95"/>
          <text x="8" y="18" fill="#9A8870" fontSize="7" fontFamily="monospace">PERFORMANCE</text>
          <text x="8" y="30" fill="#FBB034" fontSize="11" fontFamily="monospace" fontWeight="bold">94.2%</text>
          <text x="8" y="40" fill="#D4920A" fontSize="7" fontFamily="monospace">OUTPUT ▲ 11%</text>
        </g>

        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FBB034" stopOpacity="0"/>
            <stop offset="50%"  stopColor="#FBB034" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#FBB034" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
