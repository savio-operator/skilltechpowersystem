'use client'
import { useReducedMotion } from 'framer-motion'

export default function WaterHeaterAnim() {
  const shouldReduce = useReducedMotion()
  const animated = !shouldReduce

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">
      <svg viewBox="0 0 360 280" className="w-full h-full" aria-label="Solar water heater animation">

        {/* Sun */}
        <g transform="translate(280,55)">
          {[0,40,80,120,160,200,240,280,320].map((angle, i) => (
            <line key={i} x1="0" y1="-26" x2="0" y2="-36"
              stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
              transform={`rotate(${angle})`}
              opacity="0.7">
              {animated && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i*0.22}s`} repeatCount="indefinite"/>
              )}
            </line>
          ))}
          <circle r="20" fill="#FFFFFF" opacity="0.9"/>
        </g>

        {/* Evacuated tube collector */}
        <g transform="translate(60,70)">
          {/* Frame */}
          <rect width="180" height="110" rx="4" fill="#221608" stroke="#FFFFFF" strokeWidth="0.8"/>
          {/* Tubes */}
          {[0,1,2,3,4,5].map(i => {
            const cx = 20 + i * 28
            return (
              <g key={i}>
                <ellipse cx={cx} cy="12" rx="10" ry="6" fill="#2A1C05" stroke="#D4920A" strokeWidth="0.6"/>
                <rect x={cx - 8} y="12" width="16" height="85" rx="8" fill="#2A1C05" stroke="#D4920A" strokeWidth="0.6"/>
                {/* Heated water glow */}
                <rect x={cx - 6} y="60" width="12" height="37" rx="6" fill="url(#heatGrad)" opacity="0.6">
                  {animated && (
                    <animate attributeName="y" values="80;55;80" dur={`${2 + i*0.3}s`} repeatCount="indefinite"
                      calcMode="spline" keySplines="0.4,0,0.6,1;0.4,0,0.6,1"/>
                  )}
                </rect>
                {/* Steam */}
                {animated && (
                  <text x={cx} y="8" textAnchor="middle" fill="#FFFFFF" fontSize="8" opacity="0">
                    〜
                    <animate attributeName="y" values="8;-5" dur={`${1.5 + i*0.2}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.7;0" dur={`${1.5 + i*0.2}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
                  </text>
                )}
              </g>
            )
          })}
          <text x="90" y="126" textAnchor="middle" fill="#9A8870" fontSize="7" fontFamily="monospace">EVACUATED TUBE COLLECTOR</text>
        </g>

        {/* Insulated tank */}
        <g transform="translate(260,90)">
          <ellipse cx="36" cy="10" rx="30" ry="8" fill="#221608" stroke="#FFFFFF" strokeWidth="0.8"/>
          <rect x="6" y="10" width="60" height="100" fill="#221608" stroke="#FFFFFF" strokeWidth="0.8"/>
          <ellipse cx="36" cy="110" rx="30" ry="8" fill="#221608" stroke="#FFFFFF" strokeWidth="0.8"/>
          {/* Water level */}
          <clipPath id="tankClip">
            <rect x="8" y="12" width="56" height="96"/>
          </clipPath>
          <rect x="8" y="55" width="56" height="53" fill="url(#waterGrad)" opacity="0.8" clipPath="url(#tankClip)">
            {animated && (
              <animate attributeName="y" values="80;52;80" dur="4s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4,0,0.6,1;0.4,0,0.6,1"/>
            )}
          </rect>
          {/* Temp readout */}
          <text x="36" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">62°C</text>
          {/* Pipe */}
          <line x1="6" y1="80" x2="-20" y2="80" stroke="#D4920A" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="-20" cy="80" r="4" fill="#FFFFFF" opacity="0.8"/>
        </g>

        {/* Pipe connecting collector to tank */}
        <path d="M240 130 C250 130 255 130 260 130" stroke="#D4920A" strokeWidth="3" strokeLinecap="round"/>
        {animated && (
          <circle r="3" fill="#FFFFFF" opacity="0.9">
            <animateMotion dur="1s" repeatCount="indefinite"
              path="M240 130 C250 130 255 130 260 130"/>
          </circle>
        )}

        {/* Hot water tap icon */}
        <g transform="translate(20,200)">
          <rect x="0" y="0" width="70" height="40" rx="6" fill="#221608" stroke="#FFFFFF" strokeWidth="0.7"/>
          <text x="35" y="15" textAnchor="middle" fill="#9A8870" fontSize="7" fontFamily="monospace">HOT WATER</text>
          <text x="35" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">24/7 ☀</text>
        </g>

        <defs>
          <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#D4920A" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7A5008" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
