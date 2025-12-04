'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ParallaxImage from '@/components/ui/ParallaxImage'
import { VelocityMarquee } from '@/components/ui/VelocityText'

// Technology features data
const technologies = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    title: 'Scanner 3D intra-oral',
    description: 'Empreintes numériques précises, sans pâte inconfortable',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
    title: 'Radiographie panoramique',
    description: 'Diagnostic complet avec dose minimale de rayons',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: 'Laser dentaire',
    description: 'Traitements sans douleur et cicatrisation accélérée',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Caméra haute définition',
    description: 'Visualisez vos soins en temps réel sur écran',
  },
]

// Stats data
const stats = [
  { value: 100, suffix: '%', label: 'Équipements dernière génération', decimals: 0 },
  { value: 0.1, prefix: '< ', suffix: 'mSv', label: 'Dose radiologique minimale', decimals: 1 },
  { value: 15, suffix: 'min', label: 'Scan 3D complet', decimals: 0 },
]

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <section ref={sectionRef} className="relative">
      {/* Image Section - Fixed height container */}
      <div className="relative h-[85vh] overflow-hidden">
        {/* Background Image with ParallaxImage */}
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80"
            alt="Équipement dentaire moderne à Lyon"
            speed={0.2}
            scale
            scaleRange={[1.05, 1.15]}
            containerClassName="h-full w-full"
            className="h-full"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-end pb-16 lg:pb-20">
          {/* Header - Top */}
          <div className="absolute top-0 left-0 right-0 pt-16 lg:pt-24 px-6 lg:px-10">
            <div className="max-w-[1400px] mx-auto">
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="w-8 h-px bg-white/60" />
                <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                  Innovation
                </span>
              </motion.div>
              <motion.h2
                className="text-3xl lg:text-5xl font-semibold text-white max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
              >
                Technologies de pointe
              </motion.h2>
            </div>
          </div>

          {/* Cards - Bottom */}
          <div className="px-4 lg:px-10">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: easeOutExpo,
                    }}
                  >
                    <GlassCard
                      variant="strong"
                      className="p-4 lg:p-5 h-full"
                      hover={true}
                      animated={false}
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">
                        {tech.icon}
                      </div>
                      <h3 className="text-sm lg:text-base font-semibold text-foreground mb-1">
                        {tech.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray leading-relaxed">
                        {tech.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Marquee - Velocity effect */}
      <div className="bg-foreground/95 py-4 overflow-hidden border-b border-white/10">
        <VelocityMarquee baseVelocity={5} repeat={6} className="text-white/70 text-lg font-medium tracking-wider">
          Scanner 3D • Radiographie numérique • Laser dentaire • Caméra HD • CFAO dentaire • Implantologie guidée •
        </VelocityMarquee>
      </div>

      {/* Stats Bar - Directly after marquee */}
      <div
        ref={statsRef}
        className="bg-foreground py-12 lg:py-16"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:divide-x lg:divide-white/20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center px-8 py-4 lg:py-0"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.15, ease: easeOutExpo }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    delay={0.3 + index * 0.2}
                    className="tabular-nums"
                  />
                </p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
