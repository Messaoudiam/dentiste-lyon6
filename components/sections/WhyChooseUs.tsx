'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import { AnimatedGradientLine } from '@/components/ui/AnimatedLine'
import { StretchText } from '@/components/ui/VelocityText'

// Easing curve
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Icons - larger versions without background circles
function TransparencyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  )
}

function ListenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  )
}

function PunctualityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function ComfortIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    </svg>
  )
}

function FollowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  )
}

function EmergencyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  )
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-10 bg-[#F5F5F7]"
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
              03
            </motion.span>
          </div>

          {/* Title & Subtitle */}
          <SectionReveal direction="up" className="col-span-12 lg:col-span-7 pt-16 lg:pt-8">
            <h2 className="heading-display mb-4">
              <StretchText intensity={0.4}>Pourquoi nous choisir</StretchText>
            </h2>
            <p className="text-body-large text-gray max-w-xl">
              Une approche différente de la dentisterie, centrée sur vous
            </p>
            <AnimatedGradientLine
              className="mt-6 max-w-sm"
              delay={0.3}
              gradient="from-transparent via-accent/40 to-transparent"
            />
          </SectionReveal>
        </div>

        {/* Block 1: Large card (2/3) + 2 small cards (1/3) */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
        >
          {/* Large card - Transparence totale */}
          <div
            className={cn(
              'lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12',
              'shadow-sm hover:shadow-md',
              'transition-shadow duration-500'
            )}
          >
            <TransparencyIcon className="w-14 h-14 lg:w-16 lg:h-16 text-accent mb-6" />
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Transparence totale
            </h3>
            <p className="text-lg text-gray leading-relaxed max-w-md">
              Devis détaillés, explications claires, pas de surprise.
              Vous savez exactement ce que vous payez et pourquoi.
            </p>
          </div>

          {/* 2 small cards stacked */}
          <div className="flex flex-col gap-6">
            {/* Small card 1 - Écoute personnalisée */}
            <motion.div
              className={cn(
                'flex-1 bg-white rounded-2xl p-6',
                'hover:bg-[#FAFAFA]',
                'transition-colors duration-300'
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
            >
              <ListenIcon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Écoute personnalisée
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                Chaque patient est unique. Nous prenons le temps de comprendre vos besoins.
              </p>
            </motion.div>

            {/* Small card 2 - Ponctualité garantie */}
            <motion.div
              className={cn(
                'flex-1 bg-white rounded-2xl p-6',
                'hover:bg-[#FAFAFA]',
                'transition-colors duration-300'
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOutExpo }}
            >
              <PunctualityIcon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ponctualité garantie
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                Nous respectons votre temps. Rendez-vous à l'heure, toujours.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Block 2: Full-width card - Confort optimal */}
        <motion.div
          className={cn(
            'bg-white rounded-3xl p-8 lg:p-10 mb-6',
            'shadow-sm hover:shadow-md',
            'transition-shadow duration-500'
          )}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
            <ComfortIcon className="w-12 h-12 lg:w-14 lg:h-14 text-accent flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                Confort optimal
              </h3>
              <p className="text-gray leading-relaxed max-w-2xl">
                Fauteuils ergonomiques, musique relaxante, ambiance apaisante.
                Nous avons pensé chaque détail pour que votre visite soit la plus agréable possible.
              </p>
            </div>
            {/* Decorative element */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-accent/5" />
              <div className="w-10 h-10 rounded-full bg-accent/10" />
              <div className="w-6 h-6 rounded-full bg-accent/15" />
            </div>
          </div>
        </motion.div>

        {/* Block 3: 2 equal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light card - Suivi rigoureux */}
          <motion.div
            className={cn(
              'bg-white rounded-3xl p-8 lg:p-10',
              'shadow-sm hover:shadow-md',
              'transition-shadow duration-500'
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
          >
            <FollowUpIcon className="w-12 h-12 text-accent mb-6" />
            <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
              Suivi rigoureux
            </h3>
            <p className="text-gray leading-relaxed">
              Rappels automatiques, dossier numérique, historique complet.
              Votre santé bucco-dentaire est entre de bonnes mains.
            </p>
          </motion.div>

          {/* Dark card - Urgences 7j/7 */}
          <motion.div
            className={cn(
              'bg-foreground rounded-3xl p-8 lg:p-10',
              'shadow-lg'
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
          >
            <div className="flex items-start justify-between mb-6">
              <EmergencyIcon className="w-12 h-12 text-white/80" />
              <span className="bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                Disponible 7j/7
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">
              Urgences dentaires
            </h3>
            <p className="text-white/70 leading-relaxed">
              Une urgence ? Nous sommes là pour vous, même le week-end.
              Contactez-nous, nous trouverons une solution rapidement.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <SectionReveal direction="up" delay={0.7} className="text-center mt-16 lg:mt-20">
          <p className="text-gray mb-4">Convaincu ?</p>
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-full',
              'bg-accent text-white font-medium',
              'hover:bg-accent/85',
              'transition-colors duration-200'
            )}
          >
            Prendre rendez-vous
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
