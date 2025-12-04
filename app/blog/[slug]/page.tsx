import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/blog'
import { Clock, Calendar, ArrowLeft, User, Tag, Share2 } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Génère les pages statiques pour tous les articles
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Génère les métadonnées SEO pour chaque article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.dr-martin-dentiste.fr/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.image],
    },
    alternates: {
      canonical: `https://www.dr-martin-dentiste.fr/blog/${article.slug}`,
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Composant JSON-LD pour l'article
function ArticleJsonLd({
  article,
}: {
  article: {
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    image: string
    slug: string
  }
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Chirurgien-dentiste',
      worksFor: {
        '@type': 'Dentist',
        name: 'Cabinet Dentaire Dr. Sophie Martin',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '45 Cours Franklin Roosevelt',
          addressLocality: 'Lyon',
          postalCode: '69006',
          addressCountry: 'FR',
        },
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cabinet Dentaire Dr. Sophie Martin',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dr-martin-dentiste.fr/icon.svg',
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.dr-martin-dentiste.fr/blog/${article.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Articles recommandés (exclure l'article actuel)
  const otherArticles = getAllArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 2)

  return (
    <main className="min-h-screen pt-24 pb-16">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ]}
      />

      <article className="container mx-auto px-6 max-w-4xl">
        {/* Retour au blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* En-tête de l'article */}
        <header className="mb-8">
          {/* Catégorie */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
              <Tag className="w-4 h-4" />
              {article.category}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Méta-infos */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime} de lecture
            </span>
          </div>
        </header>

        {/* Image principale */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Contenu de l'article */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-li:text-gray
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
        />

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-light-gray dark:border-dark-gray">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray mr-2">Tags :</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-light-gray dark:bg-dark-gray px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Partage */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-gray">Partager :</span>
          <div className="flex gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.dr-martin-dentiste.fr/blog/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-light-gray dark:bg-dark-gray hover:bg-primary hover:text-white transition-colors"
              aria-label="Partager sur Facebook"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Rendez-vous */}
        <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">
            Besoin d&apos;un conseil personnalisé ?
          </h2>
          <p className="text-gray mb-6 max-w-lg mx-auto">
            Je vous accueille dans mon cabinet au 45 Cours Franklin Roosevelt,
            Lyon 6ème, pour répondre à toutes vos questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </article>

      {/* Articles recommandés */}
      {otherArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-6xl mt-16">
          <h2 className="text-2xl font-semibold mb-8">À lire également</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {otherArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.slug}
                href={`/blog/${relatedArticle.slug}`}
                className="group flex gap-4 bg-white dark:bg-dark rounded-xl p-4 border border-light-gray dark:border-dark-gray hover:shadow-lg transition-all"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-primary font-medium">
                    {relatedArticle.category}
                  </span>
                  <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <span className="text-sm text-gray mt-2 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {relatedArticle.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

// Fonction simple pour convertir le markdown en HTML
function markdownToHtml(markdown: string): string {
  return markdown
    // Titres
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Gras
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italique
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Listes numérotées
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    // Listes à puces
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Liens
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Séparateurs
    .replace(/^---$/gim, '<hr />')
    // Paragraphes
    .replace(/\n\n/g, '</p><p>')
    // Retours à la ligne
    .replace(/\n/g, '<br />')
    // Wrapper
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Nettoyer les paragraphes vides
    .replace(/<p><\/p>/g, '')
    .replace(/<p><br \/><\/p>/g, '')
    // Wrapper les listes
    .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
}
