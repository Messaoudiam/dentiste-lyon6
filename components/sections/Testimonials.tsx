'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import { AnimatedGradientLine } from '@/components/ui/AnimatedLine'
import { VelocityBlur } from '@/components/ui/VelocityText'

const testimonials = [
  {
    id: 1,
    name: 'Marie Lefebvre',
    role: 'Patiente depuis 2019',
    text: "Un cabinet moderne et accueillant. Le Dr. Sophie Martin m'a mise en confiance dès la première consultation. Son approche douce et ses explications claires ont transformé ma vision des soins dentaires.",
    rating: 5,
    initials: 'ML',
  },
  {
    id: 2,
    name: 'Thomas Durant',
    role: 'Patient depuis 2021',
    text: "Implant réalisé avec une précision remarquable. Aucune douleur et un résultat parfait. Le Dr. Sophie Martin est très professionnelle et son cabinet est équipé des dernières technologies. Je recommande vivement !",
    rating: 5,
    initials: 'TD',
  },
  {
    id: 3,
    name: 'Claire Dubois',
    role: 'Patiente depuis 2020',
    text: "Enfin une dentiste qui prend le temps d'expliquer ! L'ambiance est apaisante et les soins de qualité. Le Dr. Martin a su traiter mes problèmes de gencives avec expertise et délicatesse.",
    rating: 5,
    initials: 'CD',
  },
  {
    id: 4,
    name: 'Jean-Pierre Roche',
    role: 'Patient depuis 2018',
    text: "Très satisfait du blanchiment dentaire. Résultat naturel et professionnel. Le suivi post-traitement est exemplaire. Merci au Dr. Sophie Martin pour son accueil chaleureux !",
    rating: 5,
    initials: 'JR',
  },
  {
    id: 5,
    name: 'Camille Bernard',
    role: 'Patiente depuis 2022',
    text: "Ma fille avait peur du dentiste, mais le Dr. Sophie Martin a su la rassurer avec patience et douceur. Un vrai cabinet où l'on se sent en confiance !",
    rating: 5,
    initials: 'CB',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  const next = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // Auto-play
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      next()
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, next])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={ref} className="py-32 px-6 lg:px-10 bg-background relative overflow-hidden">
      {/* Decorative section number */}
      <div className="absolute top-20 left-6 lg:left-10 pointer-events-none select-none">
        <span className="text-[8rem] lg:text-[12rem] font-bold text-gray-light/30 leading-none">
          05
        </span>
      </div>

      {/* Decorative quote mark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
        <span className="text-[20rem] font-serif text-gray-light/20 leading-none">
          "
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <SectionReveal direction="up" className="mb-16 lg:mb-24">
          <h2 className="heading-display">Témoignages</h2>
          <p className="text-gray mt-2">La confiance de nos patients</p>
          <AnimatedGradientLine
            className="mt-6 max-w-xs"
            delay={0.3}
            gradient="from-transparent via-accent/40 to-transparent"
          />
        </SectionReveal>

        {/* Main Content */}
        <div
          className="grid lg:grid-cols-12 gap-12 lg:gap-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left: Navigation thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
            className="lg:col-span-3 hidden lg:block"
          >
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => goTo(index)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl transition-all duration-300',
                    'border',
                    index === currentIndex
                      ? 'bg-white border-gray-light shadow-md'
                      : 'bg-transparent border-transparent hover:bg-gray-light/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300',
                        index === currentIndex
                          ? 'bg-accent text-white'
                          : 'bg-gray-light text-gray'
                      )}
                    >
                      {testimonial.initials}
                    </div>
                    {/* Name */}
                    <div>
                      <p
                        className={cn(
                          'text-sm font-medium transition-colors duration-300',
                          index === currentIndex ? 'text-foreground' : 'text-gray'
                        )}
                      >
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            className="lg:col-span-9"
          >
            <div className="relative min-h-[400px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="w-full"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <StarIcon filled={i < currentTestimonial.rating} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote with VelocityBlur */}
                  <VelocityBlur maxBlur={2}>
                    <blockquote className="text-2xl lg:text-4xl font-medium text-foreground leading-relaxed mb-10">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </VelocityBlur>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold text-lg">
                        {currentTestimonial.initials}
                      </span>
                    </div>

                    {/* Info */}
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-sm text-gray">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-light">
              {/* Progress dots - Mobile */}
              <div className="flex items-center gap-2 lg:hidden">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      i === currentIndex
                        ? 'bg-accent w-6'
                        : 'bg-gray-light hover:bg-gray/30'
                    )}
                    aria-label={`Aller au témoignage ${i + 1}`}
                  />
                ))}
              </div>

              {/* Counter - Desktop */}
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray">
                <span className="text-foreground font-medium">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(testimonials.length).padStart(2, '0')}</span>
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={prev}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    'border border-gray-light',
                    'transition-all duration-300',
                    'hover:border-foreground hover:bg-foreground hover:text-white'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeftIcon />
                </motion.button>
                <motion.button
                  onClick={next}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    'bg-foreground text-white',
                    'transition-all duration-300',
                    'hover:bg-foreground/80'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Témoignage suivant"
                >
                  <ChevronRightIcon />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={cn('w-5 h-5', filled ? 'text-accent' : 'text-gray-light')}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
