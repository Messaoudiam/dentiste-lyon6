'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import { AnimatedGradientLine } from '@/components/ui/AnimatedLine'
import ParallaxImage, { RevealImage } from '@/components/ui/ParallaxImage'
import { StretchText } from '@/components/ui/VelocityText'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Icons
function ToothIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9 2 7 4.5 7 8c0 2.5 1.5 4.5 3 6h4c1.5-1.5 3-3.5 3-6 0-3.5-2-6-5-6z" />
      <path d="M10 14h4" />
      <path d="M10 14l-1 8h6l-1-8" />
    </svg>
  )
}

function ImplantIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9 2 7 4.5 7 8c0 2.5 1.5 4.5 3 6h4c1.5-1.5 3-3.5 3-6 0-3.5-2-6-5-6z" />
      <path d="M10 14h4" />
      <path d="M10 14l-1 8h6l-1-8" />
      <path d="M9.5 18h5" />
    </svg>
  )
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5h4.5l-3.5 3 1.5 4.5-4-3-4 3 1.5-4.5-3.5-3h4.5z" />
    </svg>
  )
}

function AlignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
      <circle cx="7" cy="6" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="17" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

function GumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.5 2 6 5 6 9c0 3 1 5 2 7s2 4 2 6h4c0-2 1-4 2-6s2-4 2-7c0-4-2.5-7-6-7z" />
      <path d="M6 9c-1.5 0-3 1-3 3s1.5 3 3 3" />
      <path d="M18 9c1.5 0 3 1 3 3s-1.5 3-3 3" />
    </svg>
  )
}

function UrgencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-10 bg-[#F5F5F7] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          {/* Number */}
          <div className="col-span-12 lg:col-span-5 relative">
            <motion.span
              className="text-[6rem] lg:text-[8rem] font-bold text-white leading-none absolute -top-4 lg:-top-8 -left-2 lg:-left-4 select-none"
              initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              01
            </motion.span>
          </div>

          {/* Title & Subtitle */}
          <SectionReveal direction="up" className="col-span-12 lg:col-span-7 pt-16 lg:pt-8">
            <h2 className="heading-display mb-4">
              <StretchText intensity={0.4}>Mes expertises</StretchText>
            </h2>
            <p className="text-body-large text-gray max-w-xl">
              Excellence et précision au service de votre sourire
            </p>
            <AnimatedGradientLine
              className="mt-6 max-w-sm"
              delay={0.3}
              gradient="from-transparent via-accent/40 to-transparent"
            />
          </SectionReveal>
        </div>

        {/* BLOC 1: Soins conservateurs - Full width avec image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          className="mb-6"
        >
          <Link href="/services#conservateur" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image with Parallax */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                  <ParallaxImage
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                    alt="Soins dentaires conservateurs"
                    speed={0.15}
                    scale
                    scaleRange={[1, 1.05]}
                    containerClassName="absolute inset-0"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <ToothIcon className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                    Soins conservateurs
                  </h3>
                  <p className="text-gray leading-relaxed mb-6 max-w-md">
                    Traitement des caries, détartrage et soins préventifs pour maintenir
                    vos dents en parfaite santé. Notre approche privilégie la conservation
                    de vos dents naturelles.
                  </p>

                  {/* Points clés */}
                  <ul className="space-y-2 mb-8">
                    {['Détartrage professionnel', 'Traitement des caries', 'Dévitalisation'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-300">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* BLOC 2: Implantologie + Esthétique */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Implantologie - Card accent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          >
            <Link href="/services#implant" className="block group h-full">
              <div className={cn(
                'bg-accent/5 rounded-3xl p-8 lg:p-10 h-full',
                'hover:bg-accent/8 transition-colors duration-500'
              )}>
                <ImplantIcon className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Implantologie
                </h3>
                <p className="text-gray leading-relaxed mb-8">
                  Remplacement des dents manquantes par des implants de haute qualité
                  pour retrouver un sourire complet et fonctionnel.
                </p>

                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl lg:text-4xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-gray">de réussite</p>
                  </div>
                  <div>
                    <p className="text-3xl lg:text-4xl font-bold text-foreground">10+</p>
                    <p className="text-sm text-gray">ans de durée de vie</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Esthétique dentaire - Card blanche */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
          >
            <Link href="/services#esthetique" className="block group h-full">
              <div className={cn(
                'bg-white rounded-3xl p-8 lg:p-10 h-full',
                'shadow-sm hover:shadow-md transition-shadow duration-500'
              )}>
                <SparkleIcon className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Esthétique dentaire
                </h3>
                <p className="text-gray leading-relaxed mb-6">
                  Sublimez votre sourire avec nos techniques avancées pour un résultat
                  naturel et harmonieux.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Blanchiment', 'Facettes', 'Composite', 'Couronnes'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm bg-gray-light/50 text-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* BLOC 3: Orthodontie - Horizontal avec image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
          className="mb-6"
        >
          <Link href="/services#orthodontie" className="block group">
            <div className={cn(
              'bg-white rounded-3xl p-8 lg:p-10',
              'shadow-sm hover:shadow-md transition-shadow duration-500'
            )}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="flex-1 order-2 lg:order-1">
                  <AlignIcon className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                    Orthodontie
                  </h3>
                  <p className="text-gray leading-relaxed mb-6">
                    Alignement dentaire discret avec gouttières transparentes.
                    Des solutions modernes pour adultes et enfants, sans compromis sur l'esthétique.
                  </p>

                  {/* Points */}
                  <div className="flex flex-wrap gap-4">
                    {['Invisalign', 'Gouttières transparentes', 'Suivi personnalisé'].map((item, i) => (
                      <span key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image with RevealImage */}
                <RevealImage
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                  alt="Orthodontie et alignement dentaire"
                  direction="right"
                  containerClassName="w-full lg:w-[300px] aspect-[4/3] lg:aspect-square rounded-2xl flex-shrink-0 order-1 lg:order-2"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* BLOC 4: Parodontologie + Urgences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parodontologie - Card blanche */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
          >
            <Link href="/services#parodontologie" className="block group h-full">
              <div className={cn(
                'bg-white rounded-3xl p-8 lg:p-10 h-full',
                'shadow-sm hover:shadow-md transition-shadow duration-500'
              )}>
                <GumIcon className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Parodontologie
                </h3>
                <p className="text-gray leading-relaxed mb-6">
                  Traitement des maladies des gencives pour une base saine et durable.
                  Prévention et soins adaptés à chaque patient.
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {['Diagnostic approfondi', 'Traitement non-chirurgical', 'Maintenance préventive'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Urgences - Card sombre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: easeOutExpo }}
          >
            <div className={cn(
              'bg-foreground rounded-3xl p-8 lg:p-10 h-full',
              'shadow-lg'
            )}>
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <UrgencyIcon className="w-12 h-12 text-white/80" />
                <span className="bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                  Disponible 7j/7
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                Urgences dentaires
              </h3>
              <p className="text-white/70 leading-relaxed mb-8">
                Prise en charge rapide des douleurs et traumatismes dentaires.
                Nous sommes là quand vous en avez besoin.
              </p>

              {/* Phone number */}
              <a
                href="tel:+33478XXXXXX"
                className={cn(
                  'inline-flex items-center gap-3 px-6 py-3 rounded-full',
                  'bg-white text-foreground font-medium',
                  'hover:bg-white/90 transition-colors duration-200'
                )}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                04 78 XX XX XX
              </a>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <SectionReveal direction="up" delay={0.8} className="text-center mt-16 lg:mt-20">
          <p className="text-gray mb-4">Vous avez une question sur mes services ?</p>
          <Link
            href="/services"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-full',
              'bg-accent text-white font-medium',
              'hover:bg-accent/85',
              'transition-colors duration-200'
            )}
          >
            Tous mes services
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}
