'use client'
import { useReducedMotion } from 'framer-motion'

export default function EVAnim() {
  const shouldReduce = useReducedMotion()

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-navy-deep border border-amber/10 flex items-center justify-center">

      {/* Ambient glow behind the chip */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(251,176,52,0.07) 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 200 100"
        width="100%"
        height="100%"
        className="text-amber/25"
        aria-label="EV charging circuit animation"
      >

        {/* ── Paths (circuit traces) ── */}
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.3"
          strokeDasharray="100 100"
          pathLength="100"
          markerStart="url(#ev-circle-marker)"
        >
          <path strokeDasharray="100 100" pathLength="100" d="M 10 20 h 79.5 q 5 0 5 5 v 30" />
          <path strokeDasharray="100 100" pathLength="100" d="M 180 10 h -69.7 q -5 0 -5 5 v 30" />
          <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10" />
          <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50" />
          <path strokeDasharray="100 100" pathLength="100" d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20" />
          <path d="M 94.8 95 v -36" />
          <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14" />
          <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20" />

          {!shouldReduce && (
            <animate
              attributeName="stroke-dashoffset"
              from="100" to="0" dur="1s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          )}
        </g>

        {/* ── Particle lights (masked to their own path) ── */}
        {!shouldReduce && (
          <>
            <g mask="url(#ev-mask-1)">
              <circle className="cpu-architecture cpu-line-1" cx="0" cy="0" r="8" fill="url(#ev-grad-amber)" />
            </g>
            <g mask="url(#ev-mask-2)">
              <circle className="cpu-architecture cpu-line-2" cx="0" cy="0" r="8" fill="url(#ev-grad-gold)" />
            </g>
            <g mask="url(#ev-mask-3)">
              <circle className="cpu-architecture cpu-line-3" cx="0" cy="0" r="8" fill="url(#ev-grad-white)" />
            </g>
            <g mask="url(#ev-mask-4)">
              <circle className="cpu-architecture cpu-line-4" cx="0" cy="0" r="8" fill="url(#ev-grad-amber)" />
            </g>
            <g mask="url(#ev-mask-5)">
              <circle className="cpu-architecture cpu-line-5" cx="0" cy="0" r="8" fill="url(#ev-grad-gold)" />
            </g>
            <g mask="url(#ev-mask-6)">
              <circle className="cpu-architecture cpu-line-6" cx="0" cy="0" r="8" fill="url(#ev-grad-copper)" />
            </g>
            <g mask="url(#ev-mask-7)">
              <circle className="cpu-architecture cpu-line-7" cx="0" cy="0" r="8" fill="url(#ev-grad-white)" />
            </g>
            <g mask="url(#ev-mask-8)">
              <circle className="cpu-architecture cpu-line-8" cx="0" cy="0" r="8" fill="url(#ev-grad-amber)" />
            </g>
          </>
        )}

        {/* ── Central charging unit ── */}
        <g>
          {/* Connector pins */}
          <g fill="url(#ev-pin-gradient)">
            <rect x="93"   y="37"  width="2.5" height="5" rx="0.7" />
            <rect x="104"  y="37"  width="2.5" height="5" rx="0.7" />
            <rect x="116.3" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="122.8" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="104"  y="16"  width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="114.5" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="80"   y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
            <rect x="87"   y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
          </g>

          {/* Main chip body */}
          <rect x="85" y="40" width="30" height="20" rx="2" fill="#1A1105" filter="url(#ev-shadow)" />

          {/* Charging bolt icon inside chip */}
          <path
            d="M 101 44 L 98 51 H 101 L 98 56 L 106 49 H 102 L 105 44 Z"
            fill="none"
            stroke="url(#ev-bolt-grad)"
            strokeWidth="0.4"
          />

          {/* "EV" text */}
          <text
            x="93" y="52.5"
            fontSize="5"
            fill="url(#ev-text-gradient)"
            fontWeight="600"
            letterSpacing="0.05em"
            fontFamily="monospace"
          >
            CHARGE
          </text>
        </g>

        {/* ── Output stats overlay ── */}
        <g>
          <rect x="2" y="2" width="42" height="20" rx="2" fill="#1A1105" stroke="#FBB034" strokeWidth="0.3" opacity="0.9"/>
          <text x="6" y="10"  fill="#9A8870" fontSize="4" fontFamily="monospace">OUTPUT</text>
          <text x="6" y="18" fill="#FBB034" fontSize="7" fontFamily="monospace" fontWeight="bold">47 kW</text>
        </g>

        {/* ── Defs ── */}
        <defs>
          {/* Path masks */}
          <mask id="ev-mask-1">
            <path d="M 10 20 h 79.5 q 5 0 5 5 v 24" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-2">
            <path d="M 180 10 h -69.7 q -5 0 -5 5 v 24" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-3">
            <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-4">
            <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-5">
            <path d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-6">
            <path d="M 94.8 95 v -46" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-7">
            <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>
          <mask id="ev-mask-8">
            <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20" strokeWidth="0.5" stroke="white" fill="none"/>
          </mask>

          {/* Particle gradients — amber/gold palette */}
          <radialGradient id="ev-grad-amber" fx="1">
            <stop offset="0%"   stopColor="#FBB034" />
            <stop offset="50%"  stopColor="#FBB034" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ev-grad-gold" fx="1">
            <stop offset="0%"   stopColor="#FFD700" />
            <stop offset="50%"  stopColor="#D4920A" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ev-grad-white" fx="1">
            <stop offset="0%"   stopColor="white" />
            <stop offset="50%"  stopColor="rgba(251,176,52,0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ev-grad-copper" fx="1">
            <stop offset="0%"   stopColor="#D4920A" />
            <stop offset="50%"  stopColor="#7A5008" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Chip text shimmer */}
          <linearGradient id="ev-text-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7A5008">
              <animate attributeName="offset" values="-2;-1;0" dur="4s" repeatCount="indefinite"
                calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
            </stop>
            <stop offset="25%"  stopColor="#FBB034">
              <animate attributeName="offset" values="-1;0;1" dur="4s" repeatCount="indefinite"
                calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
            </stop>
            <stop offset="50%"  stopColor="#D4920A">
              <animate attributeName="offset" values="0;1;2" dur="4s" repeatCount="indefinite"
                calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
            </stop>
          </linearGradient>

          {/* Bolt fill gradient */}
          <linearGradient id="ev-bolt-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FBB034"/>
            <stop offset="100%" stopColor="#D4920A"/>
          </linearGradient>

          {/* Connector pin gradient */}
          <linearGradient id="ev-pin-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FBB034" stopOpacity="0.6"/>
            <stop offset="60%"  stopColor="#1A1105"/>
          </linearGradient>

          {/* Chip shadow */}
          <filter id="ev-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FBB034" floodOpacity="0.15"/>
          </filter>

          {/* Path-start dot marker */}
          <marker id="ev-circle-marker" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="18" markerHeight="18">
            <circle cx="5" cy="5" r="2" fill="#1A1105" stroke="#FBB034" strokeWidth="0.5">
              <animate attributeName="r" values="0;3;2" dur="0.5s"/>
            </circle>
          </marker>
        </defs>
      </svg>
    </div>
  )
}
