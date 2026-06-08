import type { Metadata, Viewport } from 'next'
import { Sora, Archivo, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { SITE } from '@/content/site'
import '@/styles/globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-sora',
  display: 'swap',
})
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1A2B4A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    template: '%s | Skilltech Power System',
    default: 'Skilltech Power System — Solar Energy Kerala',
  },
  description:
    'Premium rooftop solar installation, lightning protection and KSEB net-metering across Ernakulam district, Kerala. Free survey. 30% MNRE subsidy. Get a quote today.',
  keywords: [
    'solar installation Ernakulam',
    'rooftop solar Kerala',
    'KSEB solar subsidy',
    'lightning arrester Kerala',
    'solar power Kochi',
    'solar installation Muvattupuzha',
    'MNRE subsidy Kerala',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE.name,
    title: 'Skilltech Power System — Solar Energy Kerala',
    description:
      'Premium rooftop solar installation across Ernakulam, Kerala. Free survey, KSEB net-metering, 30% MNRE subsidy.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-navy-deep text-paper antialiased">
        <LenisProvider>
          <Header />
          {children}
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  )
}
