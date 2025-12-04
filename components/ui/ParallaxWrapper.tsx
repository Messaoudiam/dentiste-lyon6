'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Define scroll offset type
type ScrollOffsetValue = 'start' | 'end' | 'center' | `${number}px` | `${number}%` | `${number}`
type ScrollOffsetTuple = [ScrollOffsetValue | `${ScrollOffsetValue} ${ScrollOffsetValue}`, ScrollOffsetValue | `${ScrollOffsetValue} ${ScrollOffsetValue}`]

interface ParallaxWrapperProps {
  children: React.ReactNode
  speed?: number // -1 to 1, negative = inverse direction
  className?: string
  offset?: ScrollOffsetTuple
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
  offset = ['start end', 'end start'],
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -100, speed * 100]
  )

  // If user prefers reduced motion, just render without parallax
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="will-change-transform"
        style={{
          y,
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Horizontal parallax variant
export function ParallaxHorizontal({
  children,
  speed = 0.5,
  className,
  offset = ['start end', 'end start'],
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -100, speed * 100]
  )

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="will-change-transform"
        style={{
          x,
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Scale parallax - element scales based on scroll
export function ParallaxScale({
  children,
  scaleRange = [0.8, 1],
  className,
  offset = ['start end', 'end start'],
}: {
  children: React.ReactNode
  scaleRange?: [number, number]
  className?: string
  offset?: ScrollOffsetTuple
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="will-change-transform"
        style={{
          scale,
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Opacity parallax - element fades based on scroll position
export function ParallaxFade({
  children,
  className,
  offset = ['start end', 'center center'],
}: {
  children: React.ReactNode
  className?: string
  offset?: ScrollOffsetTuple
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="will-change-transform"
        style={{
          opacity,
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
