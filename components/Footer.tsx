'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const navigationLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const servicesLinks = [
  { href: '/services#conservateur', label: 'Soins conservateurs' },
  { href: '/services#implant', label: 'Implantologie' },
  { href: '/services#esthetique', label: 'Esthétique dentaire' },
  { href: '/services#orthodontie', label: 'Orthodontie' },
  { href: '/services#urgence', label: 'Urgences dentaires' },
]

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: 'facebook' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <footer ref={ref} className="bg-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="relative z-10 border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div>
              <h3 className="text-2xl lg:text-4xl font-semibold text-white mb-2 lg:mb-3">
                Prêt à prendre soin
                <span className="lg:hidden"> de votre sourire ?</span>
                <br className="hidden lg:block" />
                <span className="hidden lg:inline">de votre sourire ?</span>
              </h3>
              <p className="text-white/60 text-sm lg:text-base max-w-md">
                Prenez rendez-vous dès maintenant et découvrez mon approche
                personnalisée des soins dentaires.
              </p>
            </div>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-full',
                'bg-white text-foreground font-medium text-sm lg:text-base',
                'hover:bg-white/90',
                'transition-colors duration-200'
              )}
            >
              Prendre rendez-vous
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-semibold text-white">
                Dr. Martin
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Cabinet dentaire d'excellence à Lyon 6ème. Des soins personnalisés
              dans un environnement moderne et accueillant.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'bg-white/5 text-white/60',
                    'hover:bg-white/10 hover:text-white',
                    'transition-colors duration-200'
                  )}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
            className="hidden lg:block lg:col-span-2"
          >
            <h4 className="text-white font-medium mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
            className="hidden lg:block lg:col-span-3"
          >
            <h4 className="text-white font-medium mb-5">Mes expertises</h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easeOutExpo }}
            className="lg:col-span-3"
          >
            <h4 className="text-white font-medium mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white/50 text-sm leading-relaxed">
                  45 Cours Franklin Roosevelt
                  <br />
                  69006 Lyon
                </p>
              </li>
              <li>
                <a
                  href="tel:+33478123456"
                  className="text-white/50 text-sm hover:text-white transition-colors duration-300 block"
                >
                  04 78 12 34 56
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@dr-martin-dentiste.fr"
                  className="text-white/50 text-sm hover:text-white transition-colors duration-300 block"
                >
                  contact@dr-martin-dentiste.fr
                </a>
              </li>
              <li className="pt-2">
                <div className="text-white/30 text-xs space-y-1">
                  <p>Lun - Ven : 9h00 - 19h00</p>
                  <p>Sam : 9h00 - 12h00</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: easeOutExpo }}
        className="relative z-10 border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 lg:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <p className="text-white/30 text-xs order-2 sm:order-1">
              © {new Date().getFullYear()} Dr. Martin
            </p>

            {/* Legal Links - Simplified on mobile */}
            <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
              <Link
                href="/mentions-legales"
                className="text-white/30 text-xs hover:text-white/60 transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <span className="text-white/10 hidden sm:inline">|</span>
              <Link
                href="/confidentialite"
                className="text-white/30 text-xs hover:text-white/60 transition-colors duration-300"
              >
                Confidentialité
              </Link>
              <span className="text-white/10 hidden lg:inline">|</span>
              <Link
                href="/mentions-legales#accessibilite"
                className="text-white/30 text-xs hover:text-white/60 transition-colors duration-300 hidden lg:inline"
              >
                Accessibilité
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  }
  return icons[type] || null
}
