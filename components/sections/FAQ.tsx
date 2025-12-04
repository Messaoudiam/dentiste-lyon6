'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import AnimatedLine from '@/components/ui/AnimatedLine'

// FAQ data
const faqs = [
  {
    question: 'Comment prendre rendez-vous ?',
    answer:
      'Vous pouvez prendre rendez-vous en ligne 24h/24 via notre site, par téléphone au 04 78 XX XX XX, ou directement au cabinet. Nous vous confirmons votre créneau par SMS.',
  },
  {
    question: 'Quels modes de paiement acceptez-vous ?',
    answer:
      'Nous acceptons les cartes bancaires, espèces et chèques. Le tiers payant est appliqué pour la part Sécurité sociale. Nous proposons également des facilités de paiement pour les traitements importants.',
  },
  {
    question: 'Prenez-vous en charge les urgences ?',
    answer:
      'Oui, nous réservons des créneaux chaque jour pour les urgences. En cas de douleur aiguë, contactez-nous par téléphone, nous ferons notre maximum pour vous recevoir dans la journée.',
  },
  {
    question: 'Combien coûte une consultation ?',
    answer:
      'La consultation est à 30€, remboursée par la Sécurité sociale. Un devis détaillé vous sera remis avant tout traitement complémentaire.',
  },
  {
    question: 'Le cabinet est-il accessible PMR ?',
    answer:
      'Oui, notre cabinet est entièrement accessible : entrée de plain-pied, ascenseur, et espaces adaptés. N\'hésitez pas à nous signaler tout besoin particulier.',
  },
]

// Accordion Item component
function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  return (
    <div className={cn('border-b border-gray-light', index === faqs.length - 1 && 'border-b-0')}>
      <button
        onClick={onClick}
        className="w-full text-left py-6 flex justify-between items-center gap-4 group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'text-lg font-medium transition-colors duration-300',
            isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
          )}
        >
          {question}
        </span>

        {/* Custom Plus/Minus Icon */}
        <div
          className={cn(
            'relative w-6 h-6 flex-shrink-0 transition-colors duration-300',
            isOpen ? 'text-accent' : 'text-gray'
          )}
        >
          {/* Horizontal line */}
          <span className="absolute w-4 h-0.5 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300" />
          {/* Vertical line */}
          <span
            className={cn(
              'absolute w-4 h-0.5 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300',
              isOpen ? 'rotate-0' : 'rotate-90'
            )}
          />
        </div>
      </button>

      {/* Answer with AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Vertical Line Divider - Desktop only */}
          <div className="hidden lg:block absolute left-[41.666%] top-0 bottom-0 -translate-x-1/2">
            <AnimatedLine
              direction="vertical"
              color="bg-accent/20"
              className="h-full"
              delay={0.4}
            />
          </div>

          {/* Header - Sticky on desktop */}
          <SectionReveal direction="left" className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              {/* Number with blur */}
              <motion.span
                className="text-[6rem] lg:text-[8rem] font-bold text-gray-light/30 leading-none block"
                initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                06
              </motion.span>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mt-4">
                Questions fréquentes
              </h2>

              {/* Subtitle */}
              <p className="text-gray mt-4">
                Tout ce que vous devez savoir avant votre visite
              </p>

              {/* Link */}
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-accent hover:underline mt-6 group"
              >
                Toutes nos FAQ
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </div>
          </SectionReveal>

          {/* Accordion */}
          <SectionReveal direction="right" delay={0.2} className="col-span-12 lg:col-span-7">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                index={index}
              />
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
