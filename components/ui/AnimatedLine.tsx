'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedLineProps {
  className?: string
  direction?: 'horizontal' | 'vertical'
  delay?: number
  duration?: number
  color?: string
  thickness?: number
  once?: boolean
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function AnimatedLine({
  className,
  direction = 'horizontal',
  delay = 0,
  duration = 0.8,
  color = 'bg-accent',
  thickness = 2,
  once = true,
}: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  const isHorizontal = direction === 'horizontal'

  // If user prefers reduced motion, just show the line
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          color,
          isHorizontal ? `h-[${thickness}px] w-full` : `w-[${thickness}px] h-full`,
          className
        )}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden',
        isHorizontal ? 'w-full' : 'h-full',
        className
      )}
    >
      <motion.div
        className={cn(
          color,
          'will-change-transform',
          isHorizontal ? 'h-full w-full' : 'w-full h-full'
        )}
        style={{
          height: isHorizontal ? thickness : '100%',
          width: isHorizontal ? '100%' : thickness,
          originX: 0,
          originY: 0,
          transform: 'translateZ(0)',
        }}
        initial={{
          scaleX: isHorizontal ? 0 : 1,
          scaleY: isHorizontal ? 1 : 0,
        }}
        animate={
          isInView
            ? {
                scaleX: 1,
                scaleY: 1,
              }
            : {
                scaleX: isHorizontal ? 0 : 1,
                scaleY: isHorizontal ? 1 : 0,
              }
        }
        transition={{
          duration,
          ease: easeOutExpo,
          delay,
        }}
      />
    </div>
  )
}

// Gradient line variant
export function AnimatedGradientLine({
  className,
  delay = 0,
  duration = 1,
  once = true,
  gradient = 'from-transparent via-accent to-transparent',
}: {
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  gradient?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={cn('h-px w-full bg-gradient-to-r', gradient, className)} />
    )
  }

  return (
    <div ref={ref} className={cn('overflow-hidden w-full', className)}>
      <motion.div
        className={cn(
          'h-px w-full bg-gradient-to-r will-change-transform',
          gradient
        )}
        style={{
          originX: 0.5,
          transform: 'translateZ(0)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration,
          ease: easeOutExpo,
          delay,
        }}
      />
    </div>
  )
}

// Decorative bracket line
export function AnimatedBracket({
  className,
  delay = 0,
  side = 'left',
  once = true,
}: {
  className?: string
  delay?: number
  side?: 'left' | 'right'
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'w-px h-full bg-accent',
          side === 'left' ? 'mr-4' : 'ml-4',
          className
        )}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        side === 'left' ? 'mr-4' : 'ml-4',
        className
      )}
    >
      <motion.div
        className="w-px h-full bg-accent will-change-transform"
        style={{
          originY: 0,
          transform: 'translateZ(0)',
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          duration: 0.6,
          ease: easeOutExpo,
          delay,
        }}
      />
    </div>
  )
}
