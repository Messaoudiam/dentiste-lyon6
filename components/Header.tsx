'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Accueil', number: '01' },
  { href: '/services', label: 'Services', number: '02' },
  { href: '/a-propos', label: 'À propos', number: '03' },
  { href: '/blog', label: 'Blog', number: '04' },
  { href: '/contact', label: 'Contact', number: '05' },
]

// Easing curve
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  const { scrollY } = useScroll()

  // Transform scroll values
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 50], [0, 20])
  const headerPaddingY = useTransform(scrollY, [0, 50], [20, 12])
  const headerShadowOpacity = useTransform(scrollY, [0, 50], [0, 0.05])

  // Track if scrolled for conditional styling
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHasScrolled(latest > 50)
  })

  // Memoized toggle handler
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: prefersReducedMotion ? (hasScrolled ? 12 : 20) : headerPaddingY,
          paddingBottom: prefersReducedMotion ? (hasScrolled ? 12 : 20) : headerPaddingY,
        }}
      >
        {/* Background with progressive blur and shadow */}
        <motion.div
          className="absolute inset-0 bg-background/80 border-b"
          style={{
            opacity: headerBgOpacity,
            backdropFilter: prefersReducedMotion ? 'blur(20px)' : `blur(${headerBlur}px)`,
            WebkitBackdropFilter: prefersReducedMotion ? 'blur(20px)' : `blur(${headerBlur}px)`,
            borderColor: `rgba(0, 0, 0, ${hasScrolled ? 0.05 : 0})`,
            boxShadow: `0 1px 3px rgba(0, 0, 0, ${hasScrolled ? 0.05 : 0})`,
          }}
        />

        <nav className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
              className="font-display text-xl font-medium text-foreground"
            >
              Dr. Martin
            </motion.span>
            <motion.span
              className="font-display text-xl font-medium text-accent inline-block origin-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              .
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.05,
                  ease: easeOutExpo,
                }}
              >
                <NavLink href={link.href} isActive={pathname === link.href}>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: easeOutExpo }}
            className="hidden lg:block"
          >
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2',
                'bg-accent text-white px-5 py-2.5 rounded-full',
                'text-sm font-medium',
                'hover:bg-accent/85',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2'
              )}
            >
              Prendre RDV
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'lg:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm'
            )}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 5 : 0,
                backgroundColor: isMobileMenuOpen ? 'var(--color-accent)' : 'var(--color-foreground)',
              }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="w-6 h-0.5 block origin-center"
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -5 : 0,
                backgroundColor: isMobileMenuOpen ? 'var(--color-accent)' : 'var(--color-foreground)',
              }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="w-6 h-0.5 block origin-center"
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu - Premium Slide Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-md lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[360px] bg-background shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header - Minimal */}
                <div className="flex items-center justify-end px-6 py-5">
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: easeOutExpo }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-light/50 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links - Premium style */}
                <nav className="flex-1 px-6 py-4 overflow-y-auto">
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.08 + 0.15,
                          duration: 0.5,
                          ease: easeOutExpo,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'flex items-baseline gap-4 py-3 group',
                            pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                          )}
                        >
                          {/* Number */}
                          <span
                            className={cn(
                              'text-xs font-medium tabular-nums transition-colors duration-300',
                              pathname === link.href
                                ? 'text-accent'
                                : 'text-gray/40 group-hover:text-accent/60'
                            )}
                          >
                            {link.number}
                          </span>

                          {/* Label */}
                          <span
                            className={cn(
                              'text-2xl font-semibold tracking-tight',
                              'transition-colors duration-300',
                              pathname === link.href
                                ? 'text-foreground'
                                : 'text-foreground/70 group-hover:text-foreground'
                            )}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer with CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: easeOutExpo }}
                  className="px-6 py-6 border-t border-gray-light/50"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-center gap-2 w-full py-4 rounded-full',
                      'bg-accent text-white font-medium',
                      'active:bg-accent/90 transition-colors'
                    )}
                  >
                    Prendre rendez-vous
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>

                  {/* Contact info */}
                  <div className="mt-6 space-y-1 text-center">
                    <a
                      href="tel:+33478123456"
                      className="block text-sm text-gray hover:text-accent transition-colors"
                    >
                      04 78 12 34 56
                    </a>
                    <p className="text-xs text-gray/60">Lun-Ven : 9h-19h</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// NavLink component with premium animated underline
function NavLink({
  href,
  children,
  isActive,
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={cn(
          'relative z-10 text-sm font-medium block',
          'transition-all duration-200',
          'group-hover:-translate-y-0.5 group-hover:text-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm',
          isActive ? 'text-accent' : 'text-gray'
        )}
      >
        {children}
      </Link>

      {/* Animated gradient underline with glow */}
      <span
        className={cn(
          'absolute -bottom-1.5 left-0 right-0 h-0.5',
          'bg-gradient-to-r from-accent to-accent/70',
          'origin-left transition-transform duration-300',
          'shadow-[0_0_8px_rgba(0,102,255,0.3)]',
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Active pill background (Option A) */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute -inset-x-3 -inset-y-1.5 bg-accent/10 rounded-full -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Arrow icon component
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  )
}
