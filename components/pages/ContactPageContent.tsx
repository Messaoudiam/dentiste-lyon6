'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { cn } from '@/lib/utils'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Contact info data
const contactInfo = [
  {
    icon: 'location',
    title: 'Adresse',
    content: '45 Cours Franklin Roosevelt',
    subcontent: '69006 Lyon',
    href: 'https://www.google.com/maps/search/?api=1&query=45+Cours+Franklin+Roosevelt,+69006+Lyon,+France',
  },
  {
    icon: 'phone',
    title: 'Téléphone',
    content: '04 78 12 34 56',
    subcontent: 'Lun-Ven : 9h-19h',
    href: 'tel:+33478123456',
  },
  {
    icon: 'email',
    title: 'Email',
    content: 'contact@dr-martin-dentiste.fr',
    subcontent: 'Réponse sous 24h',
    href: 'mailto:contact@dr-martin-dentiste.fr',
  },
  {
    icon: 'clock',
    title: 'Horaires',
    content: 'Lun-Ven : 9h00 - 19h00',
    subcontent: 'Sam : 9h00 - 12h00',
    href: null,
  },
]

// Form fields
const formFields = [
  { name: 'firstName', label: 'Prénom', type: 'text', required: true },
  { name: 'lastName', label: 'Nom', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
]

const serviceOptions = [
  'Consultation générale',
  'Soins conservateurs',
  'Implantologie',
  'Esthétique dentaire',
  'Orthodontie',
  'Urgence dentaire',
  'Autre',
]

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: '-100px' })
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Préparer les données pour EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Non renseigné',
        service: formData.service || 'Non précisé',
        message: formData.message || 'Demande de rendez-vous',
      }

      // Envoyer l'email via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setIsSubmitted(true)
    } catch (err) {
      console.error('Erreur EmailJS:', err)
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    })
    setIsSubmitted(false)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="max-w-3xl"
          >
            {/* Breadcrumb style label */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              className="inline-flex items-center gap-2 text-sm text-accent font-medium mb-6"
            >
              <span className="w-8 h-px bg-accent" />
              Contact
            </motion.span>

            <h1 className="text-4xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
              Prenez rendez-vous
            </h1>
            <p className="text-lg lg:text-xl text-gray max-w-2xl">
              Je suis à votre écoute. Contactez-moi par téléphone, email
              ou via le formulaire ci-dessous pour prendre rendez-vous au cabinet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Form + Info Cards */}
      <section ref={formRef} className="pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <SuccessMessage onReset={resetForm} />
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                          Demande de rendez-vous
                        </h2>
                        <p className="text-gray text-sm">
                          Remplissez le formulaire ci-dessous pour demander un rendez-vous.
                          Je vous recontacterai sous 24h pour confirmer le créneau.
                        </p>
                        <p className="text-xs text-gray/70 mt-2 italic">
                          Ce formulaire est exclusivement dédié à la prise de rendez-vous.
                        </p>
                      </div>

                      {/* Name fields - 2 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formFields.slice(0, 2).map((field) => (
                          <FormField
                            key={field.name}
                            {...field}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleInputChange}
                          />
                        ))}
                      </div>

                      {/* Email & Phone - 2 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formFields.slice(2, 4).map((field) => (
                          <FormField
                            key={field.name}
                            {...field}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleInputChange}
                          />
                        ))}
                      </div>

                      {/* Service Select */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Motif de consultation <span className="text-accent">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className={cn(
                            'w-full px-4 py-3 rounded-xl',
                            'bg-gray-light/30 border border-transparent',
                            'text-foreground placeholder:text-gray/50',
                            'focus:outline-none focus:border-accent/30 focus:bg-white',
                            'transition-all duration-200',
                            'appearance-none cursor-pointer'
                          )}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.25rem',
                          }}
                        >
                          <option value="">Sélectionnez le motif du rendez-vous</option>
                          {serviceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Informations complémentaires
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Précisez vos disponibilités préférées ou toute information utile pour votre rendez-vous..."
                          className={cn(
                            'w-full px-4 py-3 rounded-xl resize-none',
                            'bg-gray-light/30 border border-transparent',
                            'text-foreground placeholder:text-gray/50',
                            'focus:outline-none focus:border-accent/30 focus:bg-white',
                            'transition-all duration-200'
                          )}
                        />
                      </div>

                      {/* Error message */}
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm"
                        >
                          {error}
                        </motion.p>
                      )}

                      {/* RGPD Notice */}
                      <p className="text-xs text-gray leading-relaxed">
                        En soumettant ce formulaire, vous acceptez que vos données soient
                        utilisées pour vous recontacter dans le cadre de votre demande de
                        rendez-vous. Conformément au RGPD, vous disposez d&apos;un droit
                        d&apos;accès, de rectification et de suppression de vos données.{' '}
                        <a href="/confidentialite" className="text-accent hover:underline">
                          En savoir plus
                        </a>
                      </p>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          'w-full py-4 rounded-xl font-medium',
                          'bg-accent text-white',
                          'hover:bg-accent/90',
                          'disabled:opacity-60 disabled:cursor-not-allowed',
                          'transition-all duration-200',
                          'flex items-center justify-center gap-2'
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Demander un rendez-vous
                            <ArrowIcon />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Info Cards - Right Side */}
            <div className="lg:col-span-5 space-y-4">
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: easeOutExpo,
                  }}
                >
                  <InfoCard {...info} />
                </motion.div>
              ))}

              {/* Urgence Card - Dark */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: easeOutExpo,
                }}
                className="bg-foreground rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <UrgencyIcon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Urgence dentaire ?</h3>
                    <p className="text-white/60 text-sm mb-3">
                      En cas de douleur aiguë, je vous reçois en priorité.
                    </p>
                    <a
                      href="tel:+33478123456"
                      className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
                    >
                      Appelez immédiatement
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                Localisation du cabinet
              </h2>
              <p className="text-gray">
                Cabinet accessible aux personnes à mobilité réduite
              </p>
            </div>

            {/* Map Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm h-[400px] lg:h-[500px]">
              <iframe
                src="https://maps.google.com/maps?q=45+Cours+Franklin+Roosevelt,+69006+Lyon,+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Cabinet Dentaire Dr. Sophie Martin - 45 Cours Franklin Roosevelt, 69006 Lyon"
                className="absolute inset-0"
              />
            </div>

            {/* Transport Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <TransportCard
                icon="metro"
                title="Métro"
                description="Ligne A - Arrêt Foch ou Masséna"
              />
              <TransportCard
                icon="bus"
                title="Bus"
                description="Lignes C1, C4 - Arrêt Roosevelt"
              />
              <TransportCard
                icon="parking"
                title="Parking"
                description="Parking public à 50m"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

// Form Field Component
function FormField({
  name,
  label,
  type,
  required,
  value,
  onChange,
}: {
  name: string
  label: string
  type: string
  required: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          'w-full px-4 py-3 rounded-xl',
          'bg-gray-light/30 border border-transparent',
          'text-foreground placeholder:text-gray/50',
          'focus:outline-none focus:border-accent/30 focus:bg-white',
          'transition-all duration-200'
        )}
      />
    </div>
  )
}

// Info Card Component
function InfoCard({
  icon,
  title,
  content,
  subcontent,
  href,
}: {
  icon: string
  title: string
  content: string
  subcontent: string
  href: string | null
}) {
  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href ? { href, target: icon === 'location' ? '_blank' : undefined, rel: icon === 'location' ? 'noopener noreferrer' : undefined } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'block bg-white rounded-2xl p-5 shadow-sm',
        href && 'hover:shadow-md transition-shadow duration-200 cursor-pointer group'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <ContactIcon type={icon} className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground mb-0.5">{title}</h3>
          <p className={cn('text-gray text-sm', href && 'group-hover:text-accent transition-colors')}>
            {content}
          </p>
          <p className="text-gray/60 text-xs mt-0.5">{subcontent}</p>
        </div>
        {href && (
          <ArrowIcon className="w-4 h-4 text-gray/30 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        )}
      </div>
    </Wrapper>
  )
}

// Transport Card Component
function TransportCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-light/30 rounded-xl p-4 flex items-center gap-3">
      <TransportIcon type={icon} className="w-5 h-5 text-gray" />
      <div>
        <p className="font-medium text-foreground text-sm">{title}</p>
        <p className="text-gray text-xs">{description}</p>
      </div>
    </div>
  )
}

// Success Message Component
function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
      >
        <CheckIcon className="w-8 h-8 text-green-600" />
      </motion.div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">Demande envoyée !</h3>
      <p className="text-gray mb-2">
        Votre demande de rendez-vous a bien été reçue.
      </p>
      <p className="text-gray text-sm mb-6">
        Je vous recontacterai sous 24h pour confirmer le créneau.
      </p>
      <button
        onClick={onReset}
        className="text-accent font-medium hover:underline"
      >
        Faire une autre demande
      </button>
    </motion.div>
  )
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

// Arrow Icon Component
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-4 h-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

// Check Icon Component
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Urgency Icon Component
function UrgencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

// Contact Icon Component
function ContactIcon({ type, className }: { type: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    location: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    email: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  return <>{icons[type]}</>
}

// Transport Icon Component
function TransportIcon({ type, className }: { type: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    metro: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    bus: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-2.25 0h-2.25m2.25 0v3.75" />
      </svg>
    ),
    parking: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75V7.5a.75.75 0 01.75-.75h4.5a3 3 0 010 6h-4.5a.75.75 0 00-.75.75v4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  return <>{icons[type]}</>
}
