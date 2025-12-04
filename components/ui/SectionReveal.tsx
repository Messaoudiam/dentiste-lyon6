'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  threshold?: number
  once?: boolean
  stagger?: boolean
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Variants for different directions
const getVariants = (direction: Direction): Variants => {
  const variants: Record<Direction, Variants> = {
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  }
  return variants[direction]
}

// Container variants for stagger effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
}

// Child variants for stagger
const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  threshold = 0.2,
  once = true,
  stagger = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, just render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={cn('will-change-transform', className)}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ transform: 'translateZ(0)' }}
      >
        {children}
      </motion.div>
    )
  }

  const variants = getVariants(direction)

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.8,
        ease: easeOutExpo,
        delay,
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  )
}

// Export child wrapper for stagger children
export function SectionRevealChild({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn('will-change-transform', className)}
      variants={childVariants}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  )
}
