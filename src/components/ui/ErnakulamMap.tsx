'use client'
import dynamic from 'next/dynamic'

// MapLibre must run client-only — load it after mount.
const LocationMapInner = dynamic(() => import('./LocationMapInner'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-white/5" />,
})

export default function ErnakulamMap() {
  return (
    <div className="h-[360px] w-full overflow-hidden rounded-xl border border-white/10 sm:h-[440px]">
      <LocationMapInner />
    </div>
  )
}
