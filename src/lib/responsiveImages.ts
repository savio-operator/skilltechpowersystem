export function mobileResponsiveSrc(src?: string): string | undefined {
  if (!src) return undefined
  if (!src.startsWith('/images/cinematic/') || !src.endsWith('.png')) return undefined
  if (src.includes('-mobile-responsive')) return src
  return src.replace(/\.png$/, '-mobile-responsive.png')
}
