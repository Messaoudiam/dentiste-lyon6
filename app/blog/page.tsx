import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { getAllArticles } from '@/lib/blog'
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react'

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

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      <div className="container mx-auto max-w-6xl">
        {/* En-tête */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Blog Santé Dentaire
          </h1>
          <p className="text-xl text-gray max-w-2xl">
            Conseils, actualités et informations pour préserver votre santé
            bucco-dentaire, par le Dr. Sophie Martin, chirurgien-dentiste à Lyon
            6ème.
          </p>
        </header>

        {/* Liste des articles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-light-gray dark:border-dark-gray"
            >
              {/* Image */}
              <Link href={`/blog/${article.slug}`} className="block relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                </div>
              </Link>

              {/* Contenu */}
              <div className="p-6">
                {/* Méta-infos */}
                <div className="flex items-center gap-4 text-sm text-gray mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>

                {/* Extrait */}
                <p className="text-gray text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Lien */}
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Lire l&apos;article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Une question sur votre santé dentaire ?
          </h2>
          <p className="text-gray max-w-xl mx-auto mb-6">
            Je suis à votre disposition pour répondre à vos questions et vous
            conseiller. Prenez rendez-vous au cabinet situé au 45 Cours Franklin
            Roosevelt, Lyon 6ème.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Prendre rendez-vous
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
