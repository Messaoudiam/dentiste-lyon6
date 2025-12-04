import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs } from '@/lib/blog'
import ArticlePageContent from './ArticlePageContent'

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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return <ArticlePageContent slug={slug} />
}
