'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  animation?: 'fade' | 'reveal'
  className?: string
  once?: boolean
}

export default function AnimatedText({
  children,
  as: Component = 'p',
  by = 'word',
  delay = 0,
  stagger = 0.03,
  animation = 'fade',
  className,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  // Split text into words or characters
  const elements = by === 'word'
    ? children.split(' ')
    : children.split('')

  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const fadeVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: easeOutExpo,
      },
    },
  }

  const revealVariants: Variants = {
    hidden: {
      clipPath: 'inset(0 100% 0 0)',
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  }

  const itemVariants = animation === 'reveal' ? revealVariants : fadeVariants

  return (
    <Component ref={ref} className={cn('', className)}>
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {elements.map((element, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={itemVariants}
            >
              {element}
              {by === 'word' && index < elements.length - 1 && '\u00A0'}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}

// Variant for split lines animation
interface AnimatedLinesProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  delay?: number
  stagger?: number
  className?: string
  lineClassName?: string
}

export function AnimatedLines({
  children,
  as: Component = 'p',
  delay = 0,
  stagger = 0.1,
  className,
  lineClassName,
}: AnimatedLinesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const lines = children.split('\n')
  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOutExpo,
      },
    },
  }

  return (
    <Component ref={ref} className={className}>
      <motion.span
        className="block"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden">
            <motion.span
              className={cn('block', lineClassName)}
              variants={lineVariants}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}

// Simple fade up animation for any element
interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
