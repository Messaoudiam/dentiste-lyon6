'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { getArticleBySlug, getAllArticles, BlogArticle } from '@/lib/blog'
import { Clock, Calendar, ArrowLeft, Tag, Share2, ChevronRight } from 'lucide-react'

interface ArticlePageContentProps {
  slug: string
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
function ArticleJsonLd({ article }: { article: BlogArticle }) {
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

// Composant pour parser et styliser le contenu markdown
function ArticleContent({ content }: { content: string }) {
  const sections = parseMarkdownToSections(content)

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
        >
          {renderSection(section)}
        </motion.div>
      ))}
    </div>
  )
}

interface Section {
  type: 'h2' | 'h3' | 'paragraph' | 'list' | 'numbered-list' | 'hr' | 'empty'
  content: string
  items?: string[]
}

function parseMarkdownToSections(markdown: string): Section[] {
  const lines = markdown.trim().split('\n')
  const sections: Section[] = []
  let currentList: string[] = []
  let currentListType: 'list' | 'numbered-list' | null = null

  const flushList = () => {
    if (currentList.length > 0 && currentListType) {
      sections.push({ type: currentListType, content: '', items: [...currentList] })
      currentList = []
      currentListType = null
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      continue
    }

    // H2
    if (trimmed.startsWith('## ')) {
      flushList()
      sections.push({ type: 'h2', content: trimmed.slice(3) })
      continue
    }

    // H3
    if (trimmed.startsWith('### ')) {
      flushList()
      sections.push({ type: 'h3', content: trimmed.slice(4) })
      continue
    }

    // HR
    if (trimmed === '---') {
      flushList()
      sections.push({ type: 'hr', content: '' })
      continue
    }

    // Bullet list
    if (trimmed.startsWith('- ')) {
      if (currentListType !== 'list') {
        flushList()
        currentListType = 'list'
      }
      currentList.push(trimmed.slice(2))
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (currentListType !== 'numbered-list') {
        flushList()
        currentListType = 'numbered-list'
      }
      currentList.push(trimmed.replace(/^\d+\.\s/, ''))
      continue
    }

    // Paragraph
    flushList()
    sections.push({ type: 'paragraph', content: trimmed })
  }

  flushList()
  return sections
}

function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function renderSection(section: Section): React.ReactNode {
  switch (section.type) {
    case 'h2':
      return (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-14 mb-6 pb-4 border-b border-light-gray/30 dark:border-dark-gray/30">
          {section.content}
        </h2>
      )

    case 'h3':
      return (
        <div className="mt-10 mb-5">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
            <span className="w-1.5 h-7 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
            {section.content}
          </h3>
        </div>
      )

    case 'paragraph':
      return (
        <p className="text-base md:text-lg leading-[1.8] text-gray/90">
          {formatInlineMarkdown(section.content)}
        </p>
      )

    case 'list':
      return (
        <ul className="space-y-3 my-6 pl-1">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 text-base md:text-lg text-gray/90"
            >
              <span className="mt-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary/60 flex-shrink-0" />
              <span className="leading-[1.7]">{formatInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      )

    case 'numbered-list':
      return (
        <ol className="space-y-4 my-6">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-base md:text-lg text-gray/90">
              <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary font-semibold flex items-center justify-center text-sm border border-primary/10">
                {i + 1}
              </span>
              <span className="pt-1.5 leading-[1.7]">{formatInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      )

    case 'hr':
      return (
        <div className="my-14 flex items-center justify-center gap-3">
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent dark:via-dark-gray" />
          <span className="w-2 h-2 rounded-full bg-primary/30" />
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-light-gray to-transparent dark:via-dark-gray" />
        </div>
      )

    default:
      return null
  }
}

export default function ArticlePageContent({ slug }: ArticlePageContentProps) {
  const article = getArticleBySlug(slug)

  if (!article) {
    return null
  }

  const otherArticles = getAllArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 2)

  return (
    <main className="min-h-screen">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ]}
      />

      {/* Hero Section avec Image */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay gradient amélioré */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

        {/* Contenu hero */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-14 md:pb-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-5">
                <Link href="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground/80">{article.category}</span>
              </nav>

              {/* Catégorie */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/90 dark:bg-dark/90 backdrop-blur-sm text-foreground text-sm font-medium px-4 py-2 rounded-full mb-5 shadow-lg"
              >
                <Tag className="w-4 h-4 text-primary" />
                {article.category}
              </motion.span>

              {/* Titre */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-foreground">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-6 max-w-4xl -mt-6 relative z-10">
        {/* Carte méta-infos glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 dark:bg-dark/70 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 border border-white/50 dark:border-dark-gray/30 mb-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-foreground">{article.author}</p>
              <p className="text-sm text-gray">Chirurgien-dentiste à Lyon 6ème</p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <span className="inline-flex items-center gap-2 text-gray bg-light-gray/30 dark:bg-dark-gray/30 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-2 text-gray bg-light-gray/30 dark:bg-dark-gray/30 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                {article.readTime}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Extrait avec style éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-14 pl-6 border-l-4 border-primary/30"
        >
          <p className="text-xl md:text-2xl text-gray leading-relaxed font-light italic">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="prose-custom">
          <ArticleContent content={article.content} />
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-light-gray/30 dark:border-dark-gray/30"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray font-medium mr-2">Tags :</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-light-gray/40 dark:bg-dark-gray/40 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default border border-transparent hover:border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray hover:text-primary transition-all hover:gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour au blog</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray">Partager</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.dr-martin-dentiste.fr/blog/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-light-gray/40 dark:bg-dark-gray/40 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
              aria-label="Partager sur Facebook"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* CTA avec design premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0066FF] rounded-[2rem] p-10 md:p-14 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-white">
            Besoin d&apos;un conseil personnalisé ?
          </h2>
          <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg">
            Je vous accueille dans mon cabinet au 45 Cours Franklin Roosevelt,
            Lyon 6ème, pour répondre à toutes vos questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#0066FF] px-8 py-4 rounded-2xl font-semibold hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-xl group"
          >
            Prendre rendez-vous
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </article>

      {/* Articles recommandés */}
      {otherArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-6xl mt-28 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
              À lire également
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {otherArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${relatedArticle.slug}`}
                    className="group block bg-white/60 dark:bg-dark/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-light-gray/30 dark:border-dark-gray/30 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      <span className="absolute bottom-5 left-5 text-xs bg-primary text-white px-4 py-2 rounded-full font-medium shadow-lg">
                        {relatedArticle.category}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray line-clamp-2 mb-5">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-5 text-sm text-gray">
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          {formatDate(relatedArticle.date)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary/60" />
                          {relatedArticle.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </main>
  )
}
