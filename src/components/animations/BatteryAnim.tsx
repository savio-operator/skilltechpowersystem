'use client'
import { useReducedMotion } from 'framer-motion'

interface Props {
  showSolar?: boolean   // true for hybrid/off-grid, false for standalone battery
}

export default function BatteryAnim({ showSolar = true }: Props) {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg viewBox="0 0 360 280" className="w-full h-full" aria-label="Battery system animation">

        {/* Sun (shown for hybrid) */}
        {showSolar && (
          <g transform="translate(60,55)">
            {/* Rays */}
            {[0,45,90,135,180,225,270,315].map((angle, i) => (
              <line
                key={i}
                x1="0" y1="-22" x2="0" y2="-30"
                stroke="#FBB034"
                strokeWidth="1.8"
                strokeLinecap="round"
                transform={`rotate(${angle})`}
                opacity={animated ? undefined : '0.6'}
              >
                {animated && (
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s"
                    begin={`${i * 0.25}s`} repeatCount="indefinite"/>
                )}
              </line>
            ))}
            {/* Sun circle */}
            <circle r="16" fill="#FBB034" opacity="0.9">
              {animated && (
                <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite"/>
              )}
            </circle>
          </g>
        )}

        {/* Solar panel (shown for hybrid) */}
        {showSolar && (
          <g transform="translate(30,110)">
            <rect width="70" height="44" rx="2" fill="#1a2a05" stroke="#FBB034" strokeWidth="0.8"/>
            {[0,1,2].map(i => (
              <line key={i} x1="0" y1={8 + i*13} x2="70" y2={8 + i*13} stroke="#D4920A" strokeWidth="0.5" opacity="0.6"/>
            ))}
            {[0,1,2,3].map(i => (
              <line key={i} x1={12 + i*16} y1="0" x2={12 + i*16} y2="44" stroke="#D4920A" strokeWidth="0.5" opacity="0.6"/>
            ))}
          </g>
        )}

        {/* Flow line: solar → battery */}
        {showSolar && (
          <g>
            <path d="M100 132 C150 132 150 140 190 140" stroke="#7A5008" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
            {animated && [0,1,2].map(i => (
              <circle key={i} r="3" fill="#FBB034">
                <animateMotion dur="1.5s" begin={`${i*0.5}s`} repeatCount="indefinite"
                  path="M100 132 C150 132 150 140 190 140"/>
                <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${i*0.5}s`} repeatCount="indefinite"/>
              </circle>
            ))}
          </g>
        )}

        {/* Battery body */}
        <g transform="translate(190,100)">
          {/* Terminal */}
          <rect x="32" y="-6" width="16" height="6" rx="2" fill="#D4920A"/>
          {/* Outer case */}
          <rect width="80" height="110" rx="6" fill="#221608" stroke="#FBB034" strokeWidth="1.2"/>
          {/* Fill level — animated */}
          <clipPath id="battClip">
            <rect x="5" y="5" width="70" height="100" rx="4"/>
          </clipPath>
          <rect x="5" y="5" width="70" height="100" rx="4" fill="#2A1C05"/>
          <g clipPath="url(#battClip)">
            <rect
              x="5" y="5" width="70" height="100" rx="4"
              fill="url(#battFill)"
              style={{ transformOrigin: '5px 105px', transform: 'scaleY(0)' }}
            >
              {animated && (
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1,0;1,0.78"
                  dur="2.5s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.25,0.1,0.25,1"
                />
              )}
            </rect>
          </g>
          {/* Percentage label */}
          <text x="40" y="62" textAnchor="middle" fill="#FBB034" fontSize="18" fontFamily="monospace" fontWeight="bold">
            78%
          </text>
          {/* Charge icon */}
          <text x="40" y="82" textAnchor="middle" fill="#D4920A" fontSize="9" fontFamily="monospace">
            CHARGING
          </text>
          {/* Segment lines */}
          {[25, 50, 75].map(y => (
            <line key={y} x1="5" y1={y + 5} x2="75" y2={y + 5} stroke="#1A1105" strokeWidth="1" opacity="0.6"/>
          ))}
        </g>

        {/* Flow line: battery → house */}
        <g>
          <path d="M270 150 C300 150 300 160 310 160" stroke="#7A5008" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
          {animated && [0,1].map(i => (
            <circle key={i} r="3" fill="#FBB034">
              <animateMotion dur="1.2s" begin={`${i*0.6}s`} repeatCount="indefinite"
                path="M270 150 C300 150 300 160 310 160"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin={`${i*0.6}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </g>

        {/* House */}
        <g transform="translate(300,130)">
          <polygon points="25,0 0,22 50,22" fill="#221608" stroke="#FBB034" strokeWidth="0.8"/>
          <rect x="5" y="22" width="40" height="28" fill="#221608" stroke="#7A5008" strokeWidth="0.6"/>
          {/* Lit window */}
          <rect x="14" y="30" width="12" height="10" rx="1" fill="#FBB034" opacity="0.7">
            {animated && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/>}
          </rect>
          <rect x="30" y="30" width="10" height="10" rx="1" fill="#FBB034" opacity="0.5">
            {animated && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>}
          </rect>
        </g>

        <defs>
          <linearGradient id="battFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FBB034" stopOpacity="0.9"/>
            <stop offset="60%"  stopColor="#D4920A" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7A5008" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
