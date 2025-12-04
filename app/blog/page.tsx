import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import BlogPageContent from './BlogPageContent'

export const metadata: Metadata = {
  title: 'Blog Santé Dentaire | Conseils du Dr. Martin Lyon 6',
  description:
    'Conseils santé bucco-dentaire, actualités et articles du Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème. Prévention, soins, esthétique dentaire.',
  keywords: [
    'blog dentiste lyon',
    'conseils santé dentaire',
    'santé bucco-dentaire lyon',
    'hygiène dentaire conseils',
    'actualités dentisterie lyon 6',
    'prévention caries',
    'dentiste lyon 6 blog',
  ],
  openGraph: {
    title: 'Blog Santé Dentaire | Dr. Sophie Martin Lyon 6',
    description:
      'Conseils et actualités sur la santé dentaire par le Dr. Sophie Martin, chirurgien-dentiste à Lyon 6ème.',
    url: 'https://www.dr-martin-dentiste.fr/blog',
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <BlogPageContent />
    </>
  )
}
