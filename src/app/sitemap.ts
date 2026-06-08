import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'
import { AREAS } from '@/content/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.siteUrl

  const staticRoutes = [
    { path: '',                    changeFrequency: 'weekly'  as const, priority: 1.0 },
    { path: '/solar-installation', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/lightning-arrester', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/earthing-system',    changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/off-grid-hybrid',    changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/battery-inverter',   changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/amc-service',        changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/solar-water-heater', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ev-charger',         changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/commercial',         changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/projects',           changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/subsidy-guide',      changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/about',              changeFrequency: 'yearly'  as const, priority: 0.6 },
    { path: '/contact',            changeFrequency: 'yearly'  as const, priority: 0.7 },
  ]

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url:            `${base}${path}`,
      lastModified:   new Date(),
      changeFrequency,
      priority,
    })),
    ...AREAS.map((area) => ({
      url:            `${base}/service-areas/${area.slug}`,
      lastModified:   new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.75,
    })),
  ]
}
