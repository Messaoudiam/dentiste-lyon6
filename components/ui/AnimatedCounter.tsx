'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  delay?: number
  className?: string
  once?: boolean
  decimals?: number
  useGrouping?: boolean
  locale?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  delay = 0,
  className,
  once = true,
  decimals = 0,
  useGrouping = true,
  locale = 'fr-FR',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  // Format number with locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    }).format(num)
  }

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    if (once) hasAnimated.current = true

    // If user prefers reduced motion, just set the value
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    // Delay before starting animation
    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(latest)
        },
      })

      return () => controls.stop()
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, duration, delay, prefersReducedMotion, once])

  // If user prefers reduced motion, show final value immediately
  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {formatNumber(value)}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}

// Variant for stats display
export function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  className,
  valueClassName,
  labelClassName,
}: {
  value: number
  label: string
  suffix?: string
  prefix?: string
  className?: string
  valueClassName?: string
  labelClassName?: string
}) {
  return (
    <div className={cn('text-center', className)}>
      <AnimatedCounter
        value={value}
        suffix={suffix}
        prefix={prefix}
        className={cn('text-4xl lg:text-5xl font-bold text-foreground block', valueClassName)}
      />
      <span className={cn('text-gray text-sm mt-2 block', labelClassName)}>
        {label}
      </span>
    </div>
  )
}

// Animated percentage with circular progress
export function AnimatedPercentage({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  duration = 2,
  delay = 0,
}: {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setProgress(value)
      return
    }

    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setProgress(latest)
        },
      })

      return () => controls.stop()
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, duration, delay, prefersReducedMotion])

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-light"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-accent transition-all duration-300"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-foreground">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}
