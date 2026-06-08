import type { Metadata } from 'next'
import Link from 'next/link'
import ProjectGrid from '@/components/ui/ProjectGrid'
import { PROJECTS } from '@/content/projects'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'Installation Portfolio',
  description: `Browse ${PROJECTS.length}+ solar installations by Skilltech Power System across Ernakulam, Kerala.`,
  openGraph: { url: `${SITE.siteUrl}/projects` },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-2 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          Installation Portfolio
        </h1>
        <p className="text-warm-grey mb-12">Real projects across Ernakulam district.</p>
        <ProjectGrid />
      </div>
    </main>
  )
}
