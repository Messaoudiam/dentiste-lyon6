'use client'

import { useRef, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionReveal from '@/components/ui/SectionReveal'
import { AnimatedGradientLine } from '@/components/ui/AnimatedLine'

const contactInfo = [
  {
    icon: 'location',
    title: 'Adresse',
    value: '45 Cours Franklin Roosevelt, 69006 Lyon',
    href: 'https://www.google.com/maps/search/?api=1&query=45+Cours+Franklin+Roosevelt,+69006+Lyon,+France',
  },
  {
    icon: 'phone',
    title: 'Téléphone',
    value: '04 78 12 34 56',
    href: 'tel:+33478123456',
  },
  {
    icon: 'email',
    title: 'Email',
    value: 'contact@dr-martin-dentiste.fr',
    href: 'mailto:contact@dr-martin-dentiste.fr',
  },
]

const hours = [
  { day: 'Lun - Ven', dayFull: 'Lundi - Vendredi', time: '9h - 19h', timeFull: '9h00 - 19h00' },
  { day: 'Sam', dayFull: 'Samedi', time: '9h - 12h', timeFull: '9h00 - 12h00' },
  { day: 'Dim', dayFull: 'Dimanche', time: 'Fermé', timeFull: 'Fermé' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

  // Stagger animation variants for contact cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOutExpo,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-gray-light/50 relative overflow-hidden">
      {/* Decorative section number with blur animation - hidden on mobile */}
      <div className="hidden lg:block absolute top-20 right-10 pointer-events-none select-none">
        <motion.span
          className="text-[12rem] font-bold text-white/60 leading-none block"
          initial={{ opacity: 0, filter: 'blur(10px)', x: 30 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          07
        </motion.span>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <SectionReveal direction="up" className="mb-16 lg:mb-24">
          <h2 className="heading-display">Contact</h2>
          <p className="text-gray mt-2">Prenez rendez-vous</p>
          <AnimatedGradientLine
            className="mt-6 max-w-xs"
            delay={0.3}
            gradient="from-transparent via-accent/40 to-transparent"
          />
        </SectionReveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
            className="lg:col-span-5"
          >
            {/* Intro */}
            <p className="text-body-large mb-10">
              Je suis à votre écoute pour vous accueillir
              dans les meilleurs délais.
            </p>

            {/* Contact Cards with stagger animation */}
            <motion.div
              className="space-y-4 mb-10"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={cardVariants}
                  className={cn(
                    'group flex items-center gap-4 p-4 rounded-xl',
                    'bg-white border border-gray-light',
                    'transition-all duration-300',
                    'hover:-translate-y-0.5 hover:shadow-md hover:border-accent/20'
                  )}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <ContactIcon type={info.icon} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray mb-0.5">{info.title}</p>
                    <p className="text-foreground font-medium text-sm sm:text-base break-words group-hover:text-accent transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>

                  {/* Arrow - hidden on mobile */}
                  <div className="hidden sm:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: easeOutExpo }}
              className="p-6 rounded-xl bg-foreground text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <ClockIcon />
                </div>
                <h4 className="font-semibold">Horaires d'ouverture</h4>
              </div>

              <div className="space-y-2">
                {hours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center gap-2 text-sm">
                    {/* Short version on mobile, full on larger screens */}
                    <span className="text-white/70">
                      <span className="sm:hidden">{item.day}</span>
                      <span className="hidden sm:inline">{item.dayFull}</span>
                    </span>
                    <span className={cn(
                      'font-medium whitespace-nowrap',
                      item.time === 'Fermé' ? 'text-white/50' : 'text-white'
                    )}>
                      <span className="sm:hidden">{item.time}</span>
                      <span className="hidden sm:inline">{item.timeFull}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: easeOutExpo }}
              className="mt-6 relative rounded-xl overflow-hidden h-[250px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=45+Cours+Franklin+Roosevelt,+69006+Lyon,+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Cabinet Dentaire Dr. Sophie Martin"
                className="absolute inset-0"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <SectionReveal direction="right" delay={0.2} className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 shadow-lg border border-gray-light/50">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Demande de rendez-vous
              </h3>
              <p className="text-gray mb-2">
                Je vous recontacterai sous 24h pour confirmer le créneau.
              </p>
              <p className="text-xs text-gray/70 mb-8 italic">
                Ce formulaire est exclusivement dédié à la prise de rendez-vous.
              </p>

              <form className="space-y-6">
                {/* Row: Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Nom complet"
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    required
                    focused={focusedField === 'name'}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jean@email.com"
                    required
                    focused={focusedField === 'email'}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Row: Phone and Subject */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    focused={focusedField === 'phone'}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Motif de consultation <span className="text-accent">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      className={cn(
                        'w-full bg-gray-light/30 border border-transparent rounded-xl px-4 py-3.5',
                        'text-foreground',
                        'focus:outline-none focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/10',
                        'transition-all duration-300',
                        'appearance-none cursor-pointer'
                      )}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                      }}
                    >
                      <option value="">Sélectionnez le motif</option>
                      <option value="consultation">Consultation générale</option>
                      <option value="soins">Soins conservateurs</option>
                      <option value="implant">Implantologie</option>
                      <option value="esthetique">Esthétique dentaire</option>
                      <option value="orthodontie">Orthodontie</option>
                      <option value="urgence">Urgence dentaire</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Informations complémentaires
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Précisez vos disponibilités préférées ou toute information utile pour votre rendez-vous..."
                    className={cn(
                      'w-full bg-gray-light/30 border border-transparent rounded-xl px-4 py-3.5',
                      'text-foreground placeholder:text-gray/50',
                      'focus:outline-none focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/10',
                      'transition-all duration-300 resize-none'
                    )}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* RGPD Notice */}
                <p className="text-xs text-gray leading-relaxed">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées
                  pour vous recontacter dans le cadre de votre demande de rendez-vous.{' '}
                  <a href="/confidentialite" className="text-accent hover:underline">
                    Politique de confidentialité
                  </a>
                </p>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                  <p className="text-sm text-gray">
                    <span className="text-accent">*</span> Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                      'bg-accent text-white font-medium',
                      'hover:bg-accent/85',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2'
                    )}
                  >
                    Demander un rendez-vous
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
  focused,
  onFocus,
  onBlur,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
  focused?: boolean
  onFocus?: () => void
  onBlur?: () => void
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          'w-full bg-gray-light/30 border border-transparent rounded-xl px-4 py-3.5',
          'text-foreground placeholder:text-gray/50',
          'focus:outline-none focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/10',
          'transition-all duration-300'
        )}
      />
    </div>
  )
}

function ContactIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    location: (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  }
  return icons[type] || null
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

