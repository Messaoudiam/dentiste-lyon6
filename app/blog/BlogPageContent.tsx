'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getAllArticles } from '@/lib/blog'
import { Clock, Calendar, ArrowRight, Tag, BookOpen, ChevronRight } from 'lucide-react'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPageContent() {
  const articles = getAllArticles()
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4" />
              Blog Santé Dentaire
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Conseils & Actualités
            </h1>
            <p className="text-xl text-gray max-w-2xl mx-auto leading-relaxed">
              Retrouvez mes conseils pour préserver votre santé bucco-dentaire
              et les dernières actualités du cabinet.
            </p>
          </motion.div>

          {/* Article à la une */}
          {featuredArticle && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative"
            >
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="block relative rounded-[2rem] overflow-hidden bg-white/60 dark:bg-dark/60 backdrop-blur-xl border border-light-gray/30 dark:border-dark-gray/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-72 md:h-[400px] overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/50 md:to-background" />

                    {/* Badge à la une */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 bg-white/90 dark:bg-dark/90 backdrop-blur-sm text-primary text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        À la une
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    {/* Catégorie */}
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 w-fit">
                      <Tag className="w-4 h-4" />
                      {featuredArticle.category}
                    </span>

                    {/* Titre */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>

                    {/* Extrait */}
                    <p className="text-gray text-lg mb-6 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Méta + CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-gray">
                        <span className="inline-flex items-center gap-2 bg-light-gray/30 dark:bg-dark-gray/30 px-3 py-1.5 rounded-full">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          {formatDate(featuredArticle.date)}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-light-gray/30 dark:bg-dark-gray/30 px-3 py-1.5 rounded-full">
                          <Clock className="w-4 h-4 text-primary/60" />
                          {featuredArticle.readTime}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Lire l&apos;article
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}
        </div>
      </section>

      {/* Autres articles */}
      {otherArticles.length > 0 && (
        <section className="px-6 pb-24">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold mb-10"
            >
              Tous les articles
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              {otherArticles.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block h-full bg-white/60 dark:bg-dark/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-light-gray/30 dark:border-dark-gray/30 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                      {/* Catégorie */}
                      <div className="absolute bottom-5 left-5">
                        <span className="inline-flex items-center gap-2 bg-primary text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg shadow-primary/25">
                          <Tag className="w-3.5 h-3.5" />
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-7">
                      {/* Méta-infos */}
                      <div className="flex items-center gap-4 text-sm text-gray mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary/50" />
                          {formatDate(article.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary/50" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Titre */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      {/* Extrait */}
                      <p className="text-gray text-sm mb-5 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Lien */}
                      <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Lire l&apos;article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem]"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />

            {/* Effets lumineux */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Contenu */}
            <div className="relative p-10 md:p-16 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-semibold mb-5">
                Une question sur votre santé dentaire ?
              </h2>
              <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                Je suis à votre disposition pour répondre à vos questions et vous
                conseiller. Prenez rendez-vous au cabinet situé au 45 Cours Franklin
                Roosevelt, Lyon 6ème.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-2xl font-semibold hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/20 group"
              >
                Prendre rendez-vous
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
