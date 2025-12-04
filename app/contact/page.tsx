import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import ContactPageContent from '@/components/pages/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact & RDV | Cabinet Dentaire Lyon 6ème',
  description:
    'Prenez rendez-vous avec le Dr. Martin, dentiste à Lyon 6ème. Contact par téléphone, email ou formulaire. Horaires : Lun-Ven 9h-19h, Sam 9h-12h.',
  keywords: [
    'rendez-vous dentiste lyon',
    'contact dentiste lyon 6',
    'prendre rdv dentiste lyon',
    'cabinet dentaire lyon horaires',
    'dentiste lyon telephone',
    'urgence dentaire lyon contact',
  ],
  openGraph: {
    title: 'Contact & RDV | Dentiste Lyon 6',
    description:
      'Prenez rendez-vous avec le Dr. Martin à Lyon 6ème. Cabinet accessible, horaires étendus.',
    url: 'https://www.dr-martin-dentiste.fr/contact',
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <ContactPageContent />
    </>
  )
}
