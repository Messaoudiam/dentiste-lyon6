import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://www.dr-martin-dentiste.fr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cabinet Dentaire Lyon 6 | Dr. Martin - Chirurgien-Dentiste',
    template: '%s | Cabinet Dentaire Dr. Martin Lyon',
  },
  description:
    'Cabinet dentaire à Lyon 6ème. Le Dr. Martin, chirurgien-dentiste, vous propose des soins dentaires de qualité : implants, esthétique, orthodontie, urgences. Prenez rendez-vous.',
  keywords: [
    'dentiste lyon',
    'dentiste lyon 6',
    'cabinet dentaire lyon',
    'cabinet dentaire lyon 6',
    'chirurgien-dentiste lyon',
    'implant dentaire lyon',
    'implantologie lyon',
    'esthétique dentaire lyon',
    'blanchiment dentaire lyon',
    'orthodontie lyon',
    'orthodontiste lyon',
    'gouttières invisibles lyon',
    'urgence dentaire lyon',
    'détartrage lyon',
    'soins dentaires lyon',
    'prothèse dentaire lyon',
    'couronne dentaire lyon',
    'facettes dentaires lyon',
    'parodontologie lyon',
  ],
  authors: [{ name: 'Dr. Martin', url: siteUrl }],
  creator: 'Cabinet Dentaire Dr. Martin',
  publisher: 'Cabinet Dentaire Dr. Martin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Cabinet Dentaire Dr. Martin Lyon',
    title: 'Cabinet Dentaire Lyon 6 | Dr. Martin - Chirurgien-Dentiste',
    description:
      'Votre chirurgien-dentiste à Lyon 6ème. Soins dentaires, implants, esthétique, orthodontie. Cabinet moderne à votre écoute.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cabinet Dentaire Dr. Martin à Lyon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Dentaire Lyon 6 | Dr. Martin',
    description:
      'Chirurgien-dentiste à Lyon 6ème. Implants, esthétique, orthodontie. Prenez rendez-vous.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_CODE',
  },
  category: 'health',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <JsonLd />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
