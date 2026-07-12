'use client'
import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { mobileResponsiveSrc } from '@/lib/responsiveImages'

/**
 * Renders the service's cinematic image. If the image is missing or fails to
 * load, it gracefully falls back to the animated illustration so every service
 * page always shows *something* in the hero panel.
 */
export default function ServiceVisual({
  src,
  alt,
  fallback,
}: {
  src?: string
  alt: string
  fallback?: ReactNode
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <>{fallback}</>
  const mobileSrc = mobileResponsiveSrc(src)

  return (
    <picture>
      {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={853}
        priority
        className="h-auto w-full object-cover"
        onError={() => setFailed(true)}
      />
    </picture>
  )
}
