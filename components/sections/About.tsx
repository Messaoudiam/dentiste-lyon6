'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import MagneticButton, { ArrowRight } from '@/components/ui/MagneticButton'
import SectionReveal from '@/components/ui/SectionReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import AnimatedLine from '@/components/ui/AnimatedLine'
import ParallaxImage from '@/components/ui/ParallaxImage'
import VelocityText from '@/components/ui/VelocityText'

const stats = [
  { value: 15, suffix: '+', label: 'années d\'expérience' },
  { value: 5000, suffix: '+', label: 'patients satisfaits' },
  { value: 98, suffix: '%', label: 'taux de satisfaction' },
]

const values = [
  {
    title: 'Excellence',
    description: 'Formation continue et équipements de pointe pour des soins d\'exception.',
  },
  {
    title: 'Écoute',
    description: 'Chaque patient est unique, chaque traitement est personnalisé.',
  },
  {
    title: 'Sérénité',
    description: 'Un environnement pensé pour votre confort et votre bien-être.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <section ref={ref} className="py-32 px-6 lg:px-10 bg-gray-light/50 relative overflow-hidden">
      {/* Decorative section number */}
      <div className="absolute top-20 right-6 lg:right-10 pointer-events-none select-none">
        <span className="text-[8rem] lg:text-[12rem] font-bold text-white/60 leading-none">
          02
        </span>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mb-20"
        >
          <h2 className="heading-display">À propos</h2>
          <p className="text-gray mt-2">L'excellence au service de votre sourire</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: easeOutExpo }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Main Image with ParallaxImage */}
              <div className="relative rounded-2xl overflow-hidden">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                  alt="Dr. Sophie Martin, chirurgien-dentiste à Lyon"
                  speed={0.1}
                  containerClassName="aspect-[3/4] w-full"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: easeOutExpo }}
                className="absolute -bottom-6 -right-6 lg:-right-12 z-10"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-strong px-6 py-5 rounded-xl shadow-xl"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">15</span>
                    <span className="text-accent text-xl font-bold">+</span>
                  </div>
                  <p className="text-sm text-gray mt-1">années d'expertise</p>
                </motion.div>
              </motion.div>

              {/* Decorative line */}
              <div className="absolute -left-8 top-12 h-32 hidden lg:block">
                <AnimatedLine
                  direction="vertical"
                  delay={0.5}
                  color="bg-accent"
                  className="h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 lg:pt-12">
            <motion.div style={{ y: textY }}>
              {/* Name and Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
              >
                <h3 className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                  Dr. Sophie Martin
                </h3>
                <p className="text-accent font-medium mb-8">
                  Chirurgien-dentiste — Lyon 6ème
                </p>
              </motion.div>

              {/* Bio Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="space-y-4 mb-12"
              >
                <VelocityText skewIntensity={0.2} maxSkew={3} as="p" className="text-body-large">
                  Diplômée de la Faculté d'Odontologie de Lyon et passionnée par les
                  innovations en dentisterie moderne, j'exerce avec la conviction
                  que chaque sourire mérite une attention particulière.
                </VelocityText>
                <p className="text-gray leading-relaxed">
                  Mon approche allie expertise technique et relation humaine,
                  dans un cabinet équipé des dernières technologies pour vous
                  offrir des soins précis, confortables et durables.
                </p>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
                className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-gray-light"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-2xl lg:text-3xl font-bold text-foreground"
                      delay={0.5 + index * 0.2}
                    />
                    <p className="text-sm text-gray mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
              >
                <MagneticButton variant="secondary" size="lg" href="/a-propos">
                  Découvrir mon parcours
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: easeOutExpo }}
          className="mt-24 lg:mt-32"
        >
          <h4 className="text-sm text-gray uppercase tracking-widest mb-8">
            Mes valeurs
          </h4>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                  ease: easeOutExpo,
                }}
              >
                <ValueCard
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ValueCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  return (
    <div
      className={cn(
        'group p-8 rounded-2xl',
        'bg-white border border-gray-light',
        'transition-all duration-500 ease-out',
        'hover:-translate-y-1 hover:shadow-lg hover:border-gray/20'
      )}
    >
      {/* Number */}
      <span className="text-5xl font-bold text-gray-light/80 group-hover:text-accent/20 transition-colors duration-500">
        0{index + 1}
      </span>

      {/* Content */}
      <h5 className="text-xl font-semibold text-foreground mt-4 mb-3">
        {title}
      </h5>
      <p className="text-gray text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
