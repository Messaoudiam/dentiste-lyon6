import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Blog Santé Dentaire | Conseils du Dr. Martin Lyon',
  description:
    'Conseils santé bucco-dentaire, actualités et articles du Dr. Martin, chirurgien-dentiste à Lyon. Prévention, soins, esthétique dentaire.',
  keywords: [
    'blog dentiste lyon',
    'conseils santé dentaire',
    'santé bucco-dentaire',
    'hygiène dentaire conseils',
    'actualités dentisterie',
    'prévention caries',
  ],
  openGraph: {
    title: 'Blog Santé Dentaire | Dr. Martin Lyon',
    description:
      'Conseils et actualités sur la santé dentaire par le Dr. Martin, chirurgien-dentiste à Lyon.',
    url: 'https://www.dr-martin-dentiste.fr/blog',
  },
  alternates: {
    canonical: 'https://www.dr-martin-dentiste.fr/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold tracking-tight mb-8">
          Blog Santé Dentaire
        </h1>
        <p className="text-xl text-gray max-w-2xl">
          Conseils et actualités pour votre santé bucco-dentaire
        </p>
        {/* Page blog - contenu à développer */}
      </div>
    </main>
  )
}
