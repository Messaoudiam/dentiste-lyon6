import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import AboutPageContent from '@/components/pages/AboutPageContent'

export const metadata: Metadata = {
  title: 'À propos | Dr. Sophie Martin - Chirurgien-Dentiste Lyon 6',
  description:
    "Découvrez le Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème. Plus de 15 ans d'expérience, approche humaine et technologies de pointe.",
  keywords: [
    'dentiste lyon 6',
    'dr sophie martin dentiste',
    'cabinet dentaire lyon 6',
    'implantologue lyon',
    'chirurgien dentiste lyon',
  ],
  openGraph: {
    title: 'À propos | Dr. Sophie Martin - Chirurgien-Dentiste Lyon 6',
    description:
      "Découvrez le Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème. Plus de 15 ans d'expérience en dentisterie.",
    url: 'https://www.dr-martin-dentiste.fr/a-propos',
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/a-propos',
  },
}

export default function AProposPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'À propos', url: '/a-propos' },
        ]}
      />
      <AboutPageContent />
    </>
  )
}
