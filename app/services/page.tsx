'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import MagneticButton, { ArrowRight } from '@/components/ui/MagneticButton'
import GlassCard from '@/components/ui/GlassCard'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd'

// Service navigation items
const serviceNav = [
  { id: 'conservateur', label: 'Soins conservateurs' },
  { id: 'implant', label: 'Implantologie' },
  { id: 'esthetique', label: 'Esthétique' },
  { id: 'orthodontie', label: 'Orthodontie' },
  { id: 'parodontologie', label: 'Parodontologie' },
  { id: 'urgence', label: 'Urgences' },
]

const faqs = [
  {
    question: 'Combien coûte un implant dentaire à Lyon ?',
    answer:
      "Le prix d'un implant dentaire varie entre 1500€ et 2500€ selon la complexité du cas. Une consultation préalable permet d'établir un devis personnalisé.",
  },
  {
    question: 'Le blanchiment dentaire est-il douloureux ?',
    answer:
      'Le blanchiment dentaire professionnel est généralement indolore. Une légère sensibilité temporaire peut apparaître mais disparaît rapidement.',
  },
  {
    question: "À partir de quel âge peut-on faire de l'orthodontie ?",
    answer:
      "L'orthodontie est possible à tout âge. Pour les enfants, un premier bilan est recommandé vers 7 ans. Les adultes peuvent bénéficier de traitements discrets.",
  },
  {
    question: 'Prenez-vous les urgences dentaires ?',
    answer:
      "Oui, j'accueille les urgences dentaires du lundi au samedi. En cas de douleur aiguë, contactez-moi pour une prise en charge rapide.",
  },
]

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState('conservateur')
  const [isNavSticky, setIsNavSticky] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Handle sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top
        setIsNavSticky(navTop <= 80)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    serviceNav.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 150
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-10 bg-gradient-to-b from-background to-gray-light/20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <h1 className="heading-display mb-4">Mes expertises</h1>
            <p className="text-body-large text-gray max-w-xl">
              Des soins d'excellence pour chaque besoin, dans un environnement
              moderne et bienveillant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div ref={navRef} className="relative z-40">
        <nav
          className={cn(
            'transition-all duration-300',
            isNavSticky
              ? 'fixed top-20 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-light shadow-sm'
              : 'bg-white border-b border-gray-light'
          )}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              {serviceNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
                    'transition-all duration-300',
                    activeSection === item.id
                      ? 'bg-foreground text-white'
                      : 'bg-gray-light/50 text-gray hover:bg-gray-light hover:text-foreground'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        {/* Spacer when nav is sticky */}
        {isNavSticky && <div className="h-[72px]" />}
      </div>

      {/* Section 1: Soins Conservateurs */}
      <ServiceSectionConservateur />

      {/* Section 2: Implantologie */}
      <ServiceSectionImplant />

      {/* Section 3: Esthétique */}
      <ServiceSectionEsthetique />

      {/* Section 4: Orthodontie */}
      <ServiceSectionOrthodontie />

      {/* Section 5: Parodontologie */}
      <ServiceSectionParodontologie />

      {/* Section 6: Urgences */}
      <ServiceSectionUrgence />

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-10 bg-accent-soft">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Prêt à prendre soin de votre sourire ?
            </h2>
            <p className="text-gray mb-8 max-w-md mx-auto">
              Je vous accueille pour un diagnostic personnalisé et des
              soins adaptés à vos besoins.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="primary" size="lg" href="/contact">
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" href="/contact">
                Nous contacter
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

// Section 1: Soins Conservateurs
function ServiceSectionConservateur() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const prestations = [
    { name: 'Consultation', price: '30€' },
    { name: 'Détartrage', price: '50-80€' },
    { name: 'Traitement carie', price: '60-150€' },
    { name: 'Dévitalisation', price: '150-300€' },
  ]

  return (
    <section
      id="conservateur"
      ref={ref}
      className="min-h-screen py-24 lg:py-32 px-6 lg:px-10 bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80"
                  alt="Soins dentaires conservateurs à Lyon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Number */}
            <span className="text-8xl font-bold text-gray-light/30 leading-none block mb-4">
              01
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Soins conservateurs
            </h2>

            <div className="space-y-4 text-gray mb-8">
              <p>
                La prévention est au cœur de notre approche. Nous privilégions
                les techniques les moins invasives pour préserver au maximum vos
                dents naturelles.
              </p>
              <p>
                Du simple détartrage au traitement des caries, j'utilise
                des équipements de dernière génération pour des soins
                précis et confortables.
              </p>
            </div>

            {/* Prestations */}
            <div className="bg-gray-light/30 rounded-xl p-6 mb-8">
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Tarifs indicatifs
              </h4>
              <ul className="space-y-3">
                {prestations.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-accent font-medium">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MagneticButton variant="primary" href="/contact">
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 2: Implantologie
function ServiceSectionImplant() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'Diagnostic',
      description: 'Bilan complet et planification 3D',
    },
    {
      number: '02',
      title: 'Pose',
      description: "Intervention sous anesthésie locale",
    },
    {
      number: '03',
      title: 'Cicatrisation',
      description: 'Période de 3 à 6 mois',
    },
    {
      number: '04',
      title: 'Couronne',
      description: 'Pose de la prothèse définitive',
    },
  ]

  return (
    <section
      id="implant"
      ref={ref}
      className="min-h-screen py-24 lg:py-32 px-6 lg:px-10 bg-gray-light/30"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            className="lg:col-span-5 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-8xl font-bold text-white/60 leading-none block mb-4">
              02
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Implantologie
            </h2>

            <p className="text-gray mb-8">
              Retrouvez un sourire complet et fonctionnel grâce à nos implants
              de haute qualité. Une solution durable et esthétique pour
              remplacer vos dents manquantes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5">
                <p className="text-3xl font-bold text-accent mb-1">98%</p>
                <p className="text-sm text-gray">Taux de réussite</p>
              </div>
              <div className="bg-white rounded-xl p-5">
                <p className="text-3xl font-bold text-accent mb-1">10+</p>
                <p className="text-sm text-gray">Années de durée</p>
              </div>
            </div>

            <MagneticButton variant="primary" href="/contact">
              Consultation implant
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="lg:col-span-7 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-foreground mb-8">
                Le processus en 4 étapes
              </h3>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-6 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-semibold">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray text-sm">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-6 bg-gray-light" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 3: Esthétique
function ServiceSectionEsthetique() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const services = [
    {
      title: 'Blanchiment',
      description: 'Éclaircissement professionnel pour un sourire lumineux',
      price: 'À partir de 350€',
    },
    {
      title: 'Facettes',
      description: 'Correction esthétique avec facettes céramique',
      price: 'À partir de 800€/dent',
    },
    {
      title: 'Composite',
      description: 'Restauration esthétique naturelle',
      price: 'À partir de 150€',
    },
  ]

  return (
    <section
      id="esthetique"
      ref={ref}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80"
          alt="Esthétique dentaire Lyon"
          fill
          className="object-cover scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-8xl font-bold text-white/20 leading-none block mb-4">
              03
            </span>
            <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
              Esthétique dentaire
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-lg">
              Sublimez votre sourire avec nos solutions esthétiques
              personnalisées. Des techniques modernes pour des résultats
              naturels.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <GlassCard
                  variant="strong"
                  className="p-6 h-full"
                  hover={true}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray text-sm mb-4">{service.description}</p>
                  <p className="text-accent font-medium text-sm">
                    {service.price}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              href="/contact"
              className="bg-white text-foreground hover:bg-white/90"
            >
              Consultation esthétique
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 4: Orthodontie
function ServiceSectionOrthodontie() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="orthodontie"
      ref={ref}
      className="min-h-screen py-24 lg:py-32 px-6 lg:px-10 bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Before/After Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80"
                  alt="Avant traitement orthodontie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                  Avant
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581585095561-c7c2f50f9a5a?w=600&q=80"
                  alt="Après traitement orthodontie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute bottom-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Après
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <motion.div
              className="mt-8 bg-gray-light/30 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-foreground italic mb-4">
                "Les gouttières invisibles ont changé ma vie. Personne ne
                remarquait que je portais un appareil, et le résultat est
                incroyable !"
              </p>
              <p className="text-sm text-gray">— Sophie M., 34 ans</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-8xl font-bold text-gray-light/30 leading-none block mb-4">
              04
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Orthodontie
            </h2>

            <div className="space-y-4 text-gray mb-8">
              <p>
                Alignez vos dents en toute discrétion grâce aux gouttières
                transparentes. Une solution moderne adaptée aux adultes comme
                aux adolescents.
              </p>
              <p>
                Notre approche personnalisée permet de traiter les malpositions
                dentaires avec précision, pour un sourire harmonieux et une
                meilleure santé bucco-dentaire.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Gouttières transparentes et amovibles',
                'Suivi digital de votre traitement',
                'Résultats visibles dès 3 mois',
                'Adapté aux adultes et adolescents',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <MagneticButton variant="primary" href="/contact">
              Bilan orthodontie gratuit
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 5: Parodontologie
function ServiceSectionParodontologie() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const processSteps = [
    {
      title: 'Diagnostic',
      description:
        'Examen approfondi de vos gencives et bilan parodontal complet.',
    },
    {
      title: 'Traitement',
      description:
        'Détartrage profond, surfaçage radiculaire et soins adaptés.',
    },
    {
      title: 'Suivi',
      description:
        'Maintenance régulière pour préserver la santé de vos gencives.',
    },
  ]

  return (
    <section
      id="parodontologie"
      ref={ref}
      className="min-h-screen py-24 lg:py-32 px-6 lg:px-10 bg-gray-light/30"
    >
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-8xl font-bold text-white/60 leading-none block mb-4">
            05
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Parodontologie
          </h2>
          <p className="text-gray max-w-xl mx-auto">
            La santé de vos gencives est essentielle. Nous traitons les maladies
            parodontales pour préserver vos dents et votre santé générale.
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-gray text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Warning Box */}
        <motion.div
          className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex gap-4">
            <div className="text-amber-500 flex-shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-amber-800 font-medium mb-1">
                Signes à surveiller
              </h4>
              <p className="text-amber-700 text-sm">
                Gencives rouges ou gonflées, saignements au brossage, mauvaise
                haleine persistante, dents qui se déchaussent. Consultez sans
                attendre.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton variant="primary" href="/contact">
            Bilan parodontal
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

// Section 6: Urgences
function ServiceSectionUrgence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const urgences = [
    'Douleur dentaire aiguë',
    'Dent cassée ou fêlée',
    'Abcès dentaire',
    'Couronne ou bridge descellé',
    'Traumatisme dentaire',
    'Gonflement du visage',
  ]

  return (
    <section
      id="urgence"
      ref={ref}
      className="min-h-screen py-24 lg:py-32 px-6 lg:px-10 bg-foreground"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-8xl font-bold text-white/10 leading-none block mb-4">
              06
            </span>

            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Disponible 7j/7
            </div>

            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
              Urgences dentaires
            </h2>

            <p className="text-white/70 mb-8">
              Une urgence dentaire ne prévient pas. Je suis disponible
              pour vous prendre en charge rapidement et soulager votre douleur
              dans les meilleurs délais.
            </p>

            {/* Phone number */}
            <a
              href="tel:+33478123456"
              className="inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 mb-8"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white/60 text-sm">Appelez-moi</p>
                <p className="text-white text-2xl font-semibold">
                  04 78 12 34 56
                </p>
              </div>
            </a>

            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 rounded-full',
                'bg-accent text-white font-medium',
                'transition-all duration-300',
                'hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30'
              )}
            >
              Appeler maintenant
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Urgences list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Urgences prises en charge
              </h3>
              <ul className="space-y-4">
                {urgences.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Hours info */}
            <motion.div
              className="mt-6 bg-white/5 backdrop-blur rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h4 className="text-white font-medium mb-3">
                Horaires d'urgence
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Lundi - Vendredi</span>
                  <span className="text-white">8h00 - 20h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Samedi</span>
                  <span className="text-white">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Dimanche</span>
                  <span className="text-white">Sur appel</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
