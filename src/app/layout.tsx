import type { Metadata, Viewport } from 'next'
import { Sora, Archivo, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import CustomCursor from '@/components/ui/CustomCursor'
import { SITE } from '@/content/site'
import '@/styles/globals.css'

const sora = Sora({
  subsets:  ['latin'],
  weight:   ['700', '800'],
  variable: '--font-sora',
  display:  'swap',
})
const archivo = Archivo({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-archivo',
  display:  'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['400', '500'],
  variable: '--font-jetbrains-mono',
  display:  'swap',
})

export const viewport: Viewport = {
  themeColor:   '#1A1105',
  width:        'device-width',
  initialScale: 1,
  viewportFit:  'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    template: '%s | Skilltech Power System',
    default:  'Skilltech Power System — Solar Energy Kerala',
  },
  description:
    'Complete power-systems company: rooftop solar, lightning protection, earthing, battery backup & AMC across Ernakulam, Kottayam, Idukki — Kerala. Free survey. 30% MNRE subsidy. Est. 2015.',
  keywords: [
    'solar installation Ernakulam',
    'rooftop solar Kerala',
    'KSEB solar subsidy',
    'lightning arrester Kerala',
    'solar power Kochi',
    'solar installation Muvattupuzha',
    'MNRE subsidy Kerala',
    'solar installation Kottayam',
    'solar installation Idukki',
    'earthing system Kerala',
    'solar AMC Kerala',
    'EV charger Kerala',
  ],
  authors:  [{ name: SITE.name }],
  creator:  SITE.name,
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    siteName:    SITE.name,
    title:       'Skilltech Power System — Solar Energy Kerala',
    description: 'Complete power-systems company: solar, lightning protection, earthing, battery backup & AMC. Ernakulam, Kottayam, Idukki. Free survey.',
  },
  twitter: { card: 'summary_large_image' },
  robots:  { index: true, follow: true },
  // TODO: confirm-with-client — paste Google Search Console verification code below
  // verification: { google: 'PASTE_VERIFICATION_CODE_HERE' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4Id      = process.env.NEXT_PUBLIC_GA4_ID
  const vaEnabled  = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true'

  return (
    <html
      lang="en"
      className={`${sora.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Vercel Analytics script — enabled via env var */}
        {vaEnabled && (
          <script defer src="/_vercel/insights/script.js" />
        )}
        {/* Google Analytics 4 — TODO: confirm-with-client */}
        {ga4Id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-navy-deep text-paper antialiased">
        <CustomCursor />
        <LenisProvider>
          <Header />
          {children}
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  )
}
