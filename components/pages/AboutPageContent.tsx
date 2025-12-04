'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import { AnimatedGradientLine } from '@/components/ui/AnimatedLine'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ParallaxImage, { RevealImage } from '@/components/ui/ParallaxImage'
import VelocityText, { StretchText } from '@/components/ui/VelocityText'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Data
const stats = [
  { value: 15, suffix: '+', label: "années d'expérience" },
  { value: 5000, suffix: '+', label: 'patients accompagnés' },
  { value: 98, suffix: '%', label: 'de satisfaction' },
]

const formations = [
  { year: '2023', title: 'Formation avancée Invisalign', location: 'Paris' },
  { year: '2022', title: 'Certificat implantologie avancée', location: 'Université Lyon 1' },
  { year: '2020', title: 'Esthétique dentaire et facettes', location: 'Genève' },
  { year: '2015', title: 'Parodontologie clinique', location: 'Marseille' },
  { year: '2008', title: 'Doctorat en Chirurgie Dentaire', location: 'Faculté Lyon 1' },
]

const cabinetFeatures = [
  'Cabinet moderne et lumineux',
  'Équipements dernière génération',
  'Accès PMR',
  'Parking à proximité',
  'Stérilisation aux normes',
]

export default function AboutPageContent() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <SectionReveal direction="up">
            <span className="inline-flex items-center gap-2 text-sm text-accent font-medium mb-6">
              <span className="w-8 h-px bg-accent" />
              À propos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6">
              Une approche humaine
              <br />
              <span className="text-gray">de la dentisterie moderne</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray max-w-2xl">
              Depuis plus de 15 ans, j'accompagne mes patients avec excellence
              et bienveillance dans un cadre moderne et apaisant.
            </p>
            <AnimatedGradientLine
              className="mt-8 max-w-sm"
              delay={0.3}
              gradient="from-transparent via-accent/40 to-transparent"
            />
          </SectionReveal>
        </div>
      </section>

      {/* Fondateur Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-gray-light/50">
        <div className="max-w-[1400px] mx-auto">
          {/* Section number */}
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="text-[6rem] lg:text-[8rem] font-bold text-white leading-none mb-8 block"
          >
            01
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image with ParallaxImage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                  alt="Dr. Sophie Martin - Chirurgien-dentiste"
                  speed={0.15}
                  scale
                  scaleRange={[1, 1.06]}
                  containerClassName="aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: easeOutExpo }}
                className="absolute -bottom-6 right-4 lg:right-auto lg:-left-6 bg-white rounded-2xl p-5 shadow-lg"
              >
                <p className="text-sm text-gray mb-1">Diplômée de</p>
                <p className="font-semibold text-foreground">Faculté d'Odontologie</p>
                <p className="text-accent">Lyon 1 - 2008</p>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
            >
              <p className="text-accent font-medium mb-2">Fondatrice</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Dr. Sophie Martin
              </h2>
              <p className="text-lg text-gray mb-6">Chirurgien-dentiste</p>

              <blockquote className="text-xl lg:text-2xl text-foreground font-medium italic mb-8 border-l-4 border-accent pl-6">
                <VelocityText skewIntensity={0.25} maxSkew={4}>
                  "Mon engagement : offrir à chaque patient des soins d'excellence
                  dans un environnement apaisant et bienveillant."
                </VelocityText>
              </blockquote>

              <p className="text-gray leading-relaxed mb-8">
                Diplômée de la Faculté d'Odontologie de Lyon en 2008, le Dr. Martin
                s'est spécialisée en implantologie et esthétique dentaire. Après
                5 années d'exercice dans un cabinet parisien réputé, elle fonde
                son propre cabinet à Lyon en 2013, avec une vision claire :
                allier excellence technique et approche humaine.
              </p>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <p className="text-2xl lg:text-4xl font-bold text-foreground">
                      {statsInView && (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          delay={index * 0.2}
                        />
                      )}
                    </p>
                    <p className="text-xs lg:text-sm text-gray mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-background">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-12 gap-6 mb-16">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="col-span-12 lg:col-span-2 text-[6rem] lg:text-[8rem] font-bold text-gray-light/30 leading-none"
            >
              02
            </motion.span>
            <SectionReveal direction="up" className="col-span-12 lg:col-span-10">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                <StretchText intensity={0.4}>Mes valeurs</StretchText>
              </h2>
              <p className="text-lg text-gray max-w-xl">
                Ce qui me guide au quotidien dans ma pratique
              </p>
              <AnimatedGradientLine className="mt-6 max-w-sm" delay={0.3} />
            </SectionReveal>
          </div>

          {/* Values Grid */}
          <div className="space-y-4 lg:space-y-6">
            {/* Featured value - Full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm"
            >
              <div className="max-w-3xl">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <StarIcon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                  Excellence
                </h3>
                <p className="text-lg text-gray leading-relaxed">
                  J'utilise les technologies les plus avancées et suis les dernières
                  innovations pour vous offrir des soins de la plus haute qualité. Mon
                  engagement envers l'excellence se reflète dans chaque aspect de ma pratique.
                </p>
              </div>
            </motion.div>

            {/* 2 columns row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                className="bg-accent/5 rounded-3xl p-8 lg:p-10"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <HeartIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Bienveillance</h3>
                <p className="text-gray leading-relaxed">
                  Chaque patient est unique. Je prends le temps de vous écouter
                  et de vous accompagner avec empathie et compréhension.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <EyeIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Transparence</h3>
                <p className="text-gray leading-relaxed">
                  Des explications claires sur vos traitements et des devis
                  détaillés sans surprise. Vous êtes toujours informé.
                </p>
              </motion.div>
            </div>

            {/* 2 columns row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <BoltIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-gray leading-relaxed">
                  Équipements de pointe et formation continue pour des soins
                  toujours plus efficaces et confortables.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="bg-foreground rounded-3xl p-8 lg:p-10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <MicIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Écoute</h3>
                <p className="text-white/70 leading-relaxed">
                  Votre confort et vos besoins sont au cœur de mon approche.
                  J'adapte mes soins à chaque situation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cabinet Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-background">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-12 gap-6 mb-16">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="col-span-12 lg:col-span-2 text-[6rem] lg:text-[8rem] font-bold text-gray-light/30 leading-none"
            >
              03
            </motion.span>
            <SectionReveal direction="up" className="col-span-12 lg:col-span-10">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Mon cabinet
              </h2>
              <p className="text-lg text-gray max-w-xl">
                Un espace moderne conçu pour votre confort
              </p>
              <AnimatedGradientLine className="mt-6 max-w-sm" delay={0.3} />
            </SectionReveal>
          </div>

          {/* Main Image with ParallaxImage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="relative rounded-3xl overflow-hidden mb-6 shadow-sm"
          >
            <ParallaxImage
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80"
              alt="Cabinet dentaire moderne"
              speed={0.2}
              scale
              scaleRange={[1, 1.05]}
              containerClassName="aspect-[21/9]"
              sizes="100vw"
            />
          </motion.div>

          {/* Gallery with RevealImage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
            {[
              { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80', alt: 'Salle de soins', direction: 'up' as const },
              { src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80', alt: 'Accueil', direction: 'left' as const },
              { src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80', alt: 'Équipement moderne', direction: 'right' as const },
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: easeOutExpo }}
              >
                <RevealImage
                  src={img.src}
                  alt={img.alt}
                  direction={img.direction}
                  containerClassName="aspect-[4/3] rounded-2xl shadow-sm"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="flex flex-wrap gap-3"
          >
            {cabinetFeatures.map((feature, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm text-foreground shadow-sm"
              >
                {feature}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formations Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-gray-light/50">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 mb-16">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="text-[6rem] lg:text-[8rem] font-bold text-white leading-none"
            >
              04
            </motion.span>
            <SectionReveal direction="up" className="lg:pt-4">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Ma formation
              </h2>
              <p className="text-lg text-gray max-w-xl">
                Une formation continue pour des soins toujours à la pointe
              </p>
              <AnimatedGradientLine className="mt-6 max-w-sm" delay={0.3} />
            </SectionReveal>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            {formations.map((formation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                className={cn(
                  'flex items-center gap-6 lg:gap-10 p-6 lg:p-8',
                  index !== formations.length - 1 && 'border-b border-gray-light'
                )}
              >
                <span className="text-2xl lg:text-3xl font-bold text-accent min-w-[70px] lg:min-w-[80px]">
                  {formation.year}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{formation.title}</p>
                  <p className="text-sm text-gray">{formation.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground">
        <div className="max-w-[1400px] mx-auto text-center">
          <SectionReveal direction="up">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
              Prêt à me rencontrer ?
            </h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">
              Prenez rendez-vous dès maintenant et découvrez mon approche
              personnalisée des soins dentaires.
            </p>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 rounded-full',
                'bg-white text-foreground font-medium',
                'hover:bg-white/90 transition-colors duration-200'
              )}
            >
              Prendre rendez-vous
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}

// Icons
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}
