'use client'
import { useReducedMotion } from 'framer-motion'

export default function EarthingAnim() {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg
        viewBox="0 0 360 300"
        className="w-full h-full"
        aria-label="Earthing system animation"
      >
        {/* Ground layers */}
        <rect x="0" y="220" width="360" height="20" fill="#2A1C05" opacity="0.7"/>
        <rect x="0" y="238" width="360" height="22" fill="#221608" opacity="0.8"/>
        <rect x="0" y="258" width="360" height="42" fill="#1A1105"/>
        {/* Ground texture lines */}
        {[0,1,2,3,4].map((i) => (
          <line key={i} x1={20 + i*70} y1="240" x2={50 + i*70} y2="260"
            stroke="#FBB034" strokeWidth="0.4" opacity="0.2"/>
        ))}

        {/* Building base */}
        <rect x="120" y="110" width="120" height="112" fill="#221608" stroke="#7A5008" strokeWidth="1"/>
        {/* Roof */}
        <polygon points="110,112 180,60 250,112" fill="#2A1C05" stroke="#FBB034" strokeWidth="0.8"/>
        {/* Window */}
        <rect x="155" y="145" width="50" height="40" rx="2" fill="#1A1105" stroke="#7A5008" strokeWidth="0.8"/>
        {/* Solar panel on roof */}
        <rect x="150" y="68" width="60" height="36" rx="2" fill="#1a2a05" stroke="#FBB034" strokeWidth="0.8" opacity="0.9"/>
        {[0,1,2].map(i => (
          <line key={i} x1="150" y1={74 + i*10} x2="210" y2={74 + i*10} stroke="#D4920A" strokeWidth="0.5" opacity="0.6"/>
        ))}
        {[0,1,2,3].map(i => (
          <line key={i} x1={157 + i*14} y1="68" x2={157 + i*14} y2="104" stroke="#D4920A" strokeWidth="0.5" opacity="0.6"/>
        ))}

        {/* Copper earthing rod */}
        <rect x="174" y="113" width="12" height="140" rx="3"
          fill="url(#copperGrad)" stroke="#D4920A" strokeWidth="0.5"/>

        {/* Earthing plate at bottom */}
        <rect x="148" y="250" width="64" height="8" rx="2"
          fill="#D4920A" opacity="0.9"/>
        <rect x="138" y="272" width="84" height="6" rx="2"
          fill="#D4920A" opacity="0.7"/>

        {/* Current flow dots — animated along the rod */}
        {animated && [0,1,2,3].map((i) => (
          <circle key={i} cx="180" cy="120" r="3" fill="#FBB034" opacity="0.9">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,140; 0,140"
              dur="2s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 0.9; 0.9; 0"
              dur="2s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Current spread at plate */}
        {animated && (
          <>
            <path d="M148 258 Q120 270 100 280" stroke="#FBB034" strokeWidth="1.2" fill="none" opacity="0" strokeDasharray="4,3">
              <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin="1.2s" repeatCount="indefinite"/>
            </path>
            <path d="M212 258 Q240 270 260 280" stroke="#FBB034" strokeWidth="1.2" fill="none" opacity="0" strokeDasharray="4,3">
              <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin="1.4s" repeatCount="indefinite"/>
            </path>
            <path d="M180 264 Q180 275 180 285" stroke="#FBB034" strokeWidth="1.5" fill="none" opacity="0" strokeDasharray="4,3">
              <animate attributeName="opacity" values="0;0.9;0" dur="2s" begin="1.0s" repeatCount="indefinite"/>
            </path>
          </>
        )}

        {/* IS 3043 label */}
        <rect x="220" y="155" width="90" height="38" rx="4" fill="#221608" stroke="#FBB034" strokeWidth="0.7" opacity="0.9"/>
        <text x="265" y="172" textAnchor="middle" fill="#FBB034" fontSize="7" fontFamily="monospace">IS 3043</text>
        <text x="265" y="184" textAnchor="middle" fill="#9A8870" fontSize="6" fontFamily="monospace">COMPLIANT</text>

        <defs>
          <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7A4A05"/>
            <stop offset="40%"  stopColor="#D4920A"/>
            <stop offset="60%"  stopColor="#FBB034"/>
            <stop offset="100%" stopColor="#7A4A05"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
