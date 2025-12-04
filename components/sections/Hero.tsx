'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeUp } from '@/components/ui/AnimatedText'
import MagneticButton, { ArrowRight, ChevronRight } from '@/components/ui/MagneticButton'
import ParallaxImage from '@/components/ui/ParallaxImage'
import VelocityText from '@/components/ui/VelocityText'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-gray-light/30" />

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 lg:pt-40 pb-20">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-start">
          {/* Left Column - Content */}
          <div className="lg:pt-[5vh]">
            {/* Micro text with line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center mb-8"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                className="w-8 h-px bg-gray origin-left"
              />
              <span className="text-sm text-gray ml-3 tracking-wide">
                Cabinet dentaire — Lyon 6ème
              </span>
            </motion.div>

            {/* Main heading */}
            <h1 className="heading-hero mb-8">
              {/* Line 1: Votre sourire, - with velocity effect */}
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
              >
                <VelocityText skewIntensity={0.3} maxSkew={5} as="span">
                  Votre sourire,
                </VelocityText>
              </motion.span>
              {/* Line 2: mon expertise */}
              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
              >
                mon expertise
              </motion.span>
            </h1>

            {/* Description */}
            <FadeUp delay={1} className="max-w-md">
              <p className="text-body-large">
                Des soins dentaires d&apos;excellence dans un environnement pensé
                pour votre confort et votre sérénité
              </p>
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={1.2}>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <MagneticButton variant="primary" size="lg" href="/contact">
                  Prendre rendez-vous
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton variant="ghost" size="lg" href="/a-propos">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </FadeUp>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:mt-[-5%]">
            {/* Decorative circle - hidden on mobile to prevent overflow */}
            <motion.div
              style={{ y: decorY }}
              className="hidden lg:block absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-accent/15 blur-3xl pointer-events-none"
            />

            {/* Main image with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.5, ease: easeOutExpo }}
              className="relative will-change-transform"
            >
              <div className="relative rounded-3xl overflow-hidden rotate-2 shadow-xl">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80"
                  alt="Cabinet dentaire moderne du Dr. Martin à Lyon"
                  speed={0.15}
                  scale
                  scaleRange={[1, 1.08]}
                  containerClassName="aspect-[4/5] lg:aspect-[3/4] w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                />

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating badge - adjusted position on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4, ease: easeOutExpo }}
                className="absolute bottom-10 left-4 lg:left-0 lg:-translate-x-[30%] z-10"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="glass-strong px-5 py-4 rounded-xl shadow-lg"
                >
                  <p className="text-2xl font-semibold text-foreground">15+</p>
                  <p className="text-sm text-gray">années d&apos;expertise</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Decorative SVG curve */}
            <svg
              className="absolute top-1/2 -left-20 w-40 h-80 opacity-10 pointer-events-none hidden lg:block"
              viewBox="0 0 100 200"
              fill="none"
            >
              <path
                d="M80 0 Q 0 100, 80 200"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer group"
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-gray/30 flex items-center justify-center group-hover:border-foreground/50 transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray group-hover:text-foreground transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
        <span
          className="text-xs text-gray tracking-widest uppercase group-hover:text-foreground transition-colors"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-light/50 to-transparent pointer-events-none" />
    </section>
  )
}
