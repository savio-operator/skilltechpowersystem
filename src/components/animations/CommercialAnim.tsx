'use client'
import { useReducedMotion } from 'framer-motion'

export default function CommercialAnim() {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg viewBox="0 0 360 280" className="w-full h-full" aria-label="Commercial solar array animation">

        {/* Sun */}
        <g transform="translate(300,45)">
          {[0,36,72,108,144,180,216,252,288,324].map((angle, i) => (
            <line key={i} x1="0" y1="-28" x2="0" y2="-38"
              stroke="#FBB034" strokeWidth="1.8" strokeLinecap="round"
              transform={`rotate(${angle})`} opacity="0.7">
              {animated && (
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s"
                  begin={`${i*0.2}s`} repeatCount="indefinite"/>
              )}
            </line>
          ))}
          <circle r="22" fill="#FBB034" opacity="0.9"/>
        </g>

        {/* Factory / commercial building */}
        <g transform="translate(20,140)">
          <rect width="300" height="100" fill="#221608" stroke="#7A5008" strokeWidth="1"/>
          {/* Sawtooth factory roof */}
          <polygon points="0,0 0,-15 30,-30 60,-15 60,0"    fill="#2A1C05" stroke="#7A5008" strokeWidth="0.6"/>
          <polygon points="60,0 60,-15 90,-30 120,-15 120,0"  fill="#2A1C05" stroke="#7A5008" strokeWidth="0.6"/>
          <polygon points="120,0 120,-15 150,-30 180,-15 180,0" fill="#2A1C05" stroke="#7A5008" strokeWidth="0.6"/>
          <polygon points="180,0 180,-15 210,-30 240,-15 240,0" fill="#2A1C05" stroke="#7A5008" strokeWidth="0.6"/>
          <polygon points="240,0 240,-15 270,-30 300,-15 300,0" fill="#2A1C05" stroke="#7A5008" strokeWidth="0.6"/>
          {/* Windows */}
          {[20,80,140,200,260].map(x => (
            <rect key={x} x={x} y="20" width="30" height="25" rx="1"
              fill="#1A1105" stroke="#7A5008" strokeWidth="0.5"/>
          ))}
          {/* Lit windows */}
          {[20,140,260].map((x, i) => (
            <rect key={x} x={x+2} y="22" width="26" height="21" rx="1" fill="#FBB034" opacity="0.3">
              {animated && (
                <animate attributeName="opacity" values="0.2;0.5;0.2"
                  dur={`${2 + i*0.7}s`} repeatCount="indefinite"/>
              )}
            </rect>
          ))}
          {/* Door */}
          <rect x="125" y="55" width="50" height="45" rx="2"
            fill="#1A1105" stroke="#D4920A" strokeWidth="0.6"/>
          {/* Chimney/vent */}
          <rect x="270" y="-40" width="14" height="40" fill="#1A1105" stroke="#7A5008" strokeWidth="0.5"/>
        </g>

        {/* Large solar array on roof */}
        {[0,1,2,3,4].map((col) => (
          [0,1,2].map((row) => {
            const x = 30 + col * 58
            const y = 60 + row * 26
            return (
              <g key={`${col}-${row}`} transform={`translate(${x},${y})`}>
                <rect width="50" height="22" rx="2" fill="#1a2a05" stroke="#FBB034" strokeWidth="0.7"/>
                {/* Cell grid */}
                {[0,1,2].map(r => (
                  <line key={r} x1="0" y1={5 + r*5} x2="50" y2={5 + r*5}
                    stroke="#D4920A" strokeWidth="0.4" opacity="0.5"/>
                ))}
                {[0,1,2,3].map(c => (
                  <line key={c} x1={10 + c*10} y1="0" x2={10 + c*10} y2="22"
                    stroke="#D4920A" strokeWidth="0.4" opacity="0.5"/>
                ))}
                {/* Glint */}
                {animated && (
                  <rect x="4" y="3" width="8" height="4" rx="2"
                    fill="#FBB034" opacity="0">
                    <animate attributeName="opacity"
                      values="0;0.6;0" dur="4s"
                      begin={`${(col * 3 + row) * 0.4}s`}
                      repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate"
                      values="0,0;34,14" dur="4s"
                      begin={`${(col * 3 + row) * 0.4}s`}
                      repeatCount="indefinite"/>
                  </rect>
                )}
              </g>
            )
          })
        ))}

        {/* Energy flow lines down to building */}
        {[60,120,180,240].map((x, i) => (
          <g key={x}>
            <line x1={x+25} y1="140" x2={x+25} y2="150"
              stroke="#D4920A" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5"/>
            {animated && (
              <circle r="2.5" fill="#FBB034">
                <animateMotion dur="0.8s" begin={`${i*0.2}s`} repeatCount="indefinite"
                  path={`M${x+25} 138 L${x+25} 150`}/>
                <animate attributeName="opacity" values="0;1;1;0" dur="0.8s"
                  begin={`${i*0.2}s`} repeatCount="indefinite"/>
              </circle>
            )}
          </g>
        ))}

        {/* Grid tie meter */}
        <g transform="translate(290,175)">
          <rect width="52" height="34" rx="4" fill="#221608" stroke="#FBB034" strokeWidth="0.7"/>
          <text x="26" y="13" textAnchor="middle" fill="#9A8870" fontSize="6" fontFamily="monospace">GRID-TIE</text>
          <text x="26" y="25" textAnchor="middle" fill="#FBB034" fontSize="10" fontFamily="monospace" fontWeight="bold">25kW</text>
        </g>

        {/* Stats overlay */}
        <g transform="translate(14,14)">
          <rect width="106" height="52" rx="6" fill="#221608" stroke="#FBB034" strokeWidth="0.7" opacity="0.95"/>
          <text x="8" y="18" fill="#9A8870" fontSize="7" fontFamily="monospace">COMMERCIAL</text>
          <text x="8" y="32" fill="#FBB034" fontSize="12" fontFamily="monospace" fontWeight="bold">15 PANELS</text>
          <text x="8" y="44" fill="#D4920A" fontSize="7" fontFamily="monospace">OUTPUT: 6.0kW peak</text>
        </g>

      </svg>
    </div>
  )
}
