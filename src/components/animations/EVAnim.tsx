'use client'
import { useReducedMotion } from 'framer-motion'

export default function EVAnim() {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg viewBox="0 0 360 240" className="w-full h-full" aria-label="EV charging animation">

        {/* Ground */}
        <line x1="0" y1="200" x2="360" y2="200" stroke="#2A1C05" strokeWidth="2"/>

        {/* Charging station */}
        <g transform="translate(40,80)">
          <rect width="48" height="120" rx="5" fill="#221608" stroke="#FBB034" strokeWidth="1"/>
          <rect x="8" y="12" width="32" height="20" rx="2" fill="#1A1105" stroke="#D4920A" strokeWidth="0.7"/>
          {/* Screen */}
          <rect x="9" y="13" width="30" height="18" rx="1" fill="#FBB034" opacity="0.15">
            {animated && (
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/>
            )}
          </rect>
          <text x="24" y="25" textAnchor="middle" fill="#FBB034" fontSize="7" fontFamily="monospace" fontWeight="bold">
            {animated ? '' : '47kW'}
          </text>
          {animated && (
            <text x="24" y="25" textAnchor="middle" fill="#FBB034" fontSize="7" fontFamily="monospace" fontWeight="bold">
              47kW
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
            </text>
          )}
          {/* Plug socket */}
          <circle cx="24" cy="80" r="10" fill="#2A1C05" stroke="#D4920A" strokeWidth="1"/>
          <circle cx="24" cy="80" r="5" fill="#1A1105" stroke="#FBB034" strokeWidth="0.8"/>
          {/* Status light */}
          <circle cx="24" cy="105" r="4" fill="#FBB034">
            {animated && (
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
            )}
          </circle>
          {/* SKILLTECH label */}
          <text x="24" y="118" textAnchor="middle" fill="#9A8870" fontSize="5" fontFamily="monospace">SKILLTECH</text>
        </g>

        {/* Charging cable */}
        <path d="M88 160 Q110 165 120 160" stroke="#D4920A" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* Flow dots along cable */}
        {animated && [0,1,2].map(i => (
          <circle key={i} r="3" fill="#FBB034">
            <animateMotion dur="1.2s" begin={`${i*0.4}s`} repeatCount="indefinite"
              path="M88 160 Q110 165 120 160"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin={`${i*0.4}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* EV Car silhouette */}
        <g transform="translate(115,120)">
          {/* Body */}
          <path d="M0,60 Q0,40 20,35 L40,18 Q55,10 90,10 Q130,10 150,18 L175,35 Q195,40 195,60 L195,75 Q195,80 190,80 L5,80 Q0,80 0,75 Z"
            fill="#221608" stroke="#FBB034" strokeWidth="1"/>
          {/* Windscreen + roof */}
          <path d="M45,35 Q58,15 85,12 Q110,10 130,12 L155,35 Z"
            fill="#1A1105" stroke="#D4920A" strokeWidth="0.7" opacity="0.8"/>
          {/* Wheels */}
          <circle cx="45" cy="80" r="18" fill="#1A1105" stroke="#7A5008" strokeWidth="1.2"/>
          <circle cx="45" cy="80" r="9"  fill="#221608" stroke="#D4920A" strokeWidth="0.8"/>
          <circle cx="155" cy="80" r="18" fill="#1A1105" stroke="#7A5008" strokeWidth="1.2"/>
          <circle cx="155" cy="80" r="9"  fill="#221608" stroke="#D4920A" strokeWidth="0.8"/>
          {/* Charge port */}
          <rect x="0" y="52" width="8" height="10" rx="2" fill="#D4920A" stroke="#FBB034" strokeWidth="0.7"/>
          {/* Battery indicator strip */}
          <rect x="60" y="42" width="80" height="8" rx="2" fill="#1A1105" stroke="#FBB034" strokeWidth="0.6"/>
          <rect x="61" y="43" width="52" height="6" rx="1" fill="url(#evBatt)">
            {animated && (
              <animate attributeName="width" values="20;52;20" dur="3s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4,0,0.6,1;0.4,0,0.6,1"/>
            )}
          </rect>
          <text x="100" y="48" textAnchor="middle" fill="#FBB034" fontSize="5" fontFamily="monospace">
            {animated ? '' : '65%'}
          </text>
          {animated && (
            <text x="100" y="48" textAnchor="middle" fill="#FBB034" fontSize="5" fontFamily="monospace">65%</text>
          )}
          {/* Charging bolt on car */}
          {animated && (
            <path d="M90,55 L82,70 H88 L80,88 L100,68 H93 L101,55 Z" fill="#FBB034" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.5s" repeatCount="indefinite"/>
            </path>
          )}
        </g>

        {/* Charging bolt icon (static near station) */}
        <path d="M72,130 L66,148 H72 L64,166 L84,143 H77 L85,130 Z"
          fill="#FBB034" opacity="0.8">
          {animated && (
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite"/>
          )}
        </path>

        {/* Stats overlay */}
        <g transform="translate(14,12)">
          <rect width="90" height="44" rx="6" fill="#221608" stroke="#FBB034" strokeWidth="0.7" opacity="0.95"/>
          <text x="8" y="18" fill="#9A8870" fontSize="7" fontFamily="monospace">EV CHARGER</text>
          <text x="8" y="30" fill="#FBB034" fontSize="11" fontFamily="monospace" fontWeight="bold">7 – 22kW</text>
          <text x="8" y="40" fill="#D4920A" fontSize="7" fontFamily="monospace">AC / DC READY</text>
        </g>

        <defs>
          <linearGradient id="evBatt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#FBB034"/>
            <stop offset="100%" stopColor="#D4920A"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
