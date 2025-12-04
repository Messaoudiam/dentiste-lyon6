'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  once?: boolean
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.02,
  as: Component = 'p',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  // Split text into words
  const words = text.split(' ')

  // Container variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay * 5, // Stagger between words
        delayChildren: delay,
      },
    },
  }

  // Word variants
  const wordVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  // Character variants
  const charVariants: Variants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration,
        ease: easeOutExpo,
      },
    },
  }

  // If user prefers reduced motion, just render text normally
  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>
  }

  return (
    <Component ref={ref} className={cn('flex flex-wrap', className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={wordVariants}
            className="inline-flex overflow-hidden mr-[0.25em]"
          >
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={charVariants}
                className="inline-block will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

// Simpler word-by-word reveal
export function WordReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.1,
  as: Component = 'p',
  once = true,
}: Omit<TextRevealProps, 'duration'>) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
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
        duration: 0.5,
        ease: easeOutExpo,
      },
    },
  }

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>
  }

  return (
    <Component ref={ref} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block will-change-transform mr-[0.25em]"
            style={{ transform: 'translateZ(0)' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

// Line-by-line reveal for multi-line text
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  staggerDelay = 0.15,
  once = true,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
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

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, index) => (
          <div key={index} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={lineVariants}
            className={cn('will-change-transform', lineClassName)}
            style={{ transform: 'translateZ(0)' }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}
