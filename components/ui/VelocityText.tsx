'use client'

import { useEffect, useState, useRef, ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { getLenisInstance } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'

interface VelocityTextProps {
  children: ReactNode
  className?: string
  skewIntensity?: number // How much skew on velocity
  scaleIntensity?: number // How much scale on velocity
  maxSkew?: number // Max skew degrees
  maxScale?: number // Max scale factor
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div'
}

export default function VelocityText({
  children,
  className,
  skewIntensity = 1,
  scaleIntensity = 0,
  maxSkew = 10,
  maxScale = 0.05,
  as: Component = 'div',
}: VelocityTextProps) {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setVelocity(lenis.velocity)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  // Smooth velocity for fluid animation
  const smoothVelocity = useSpring(velocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Calculate skew based on velocity (clamped)
  const skewY = useTransform(
    smoothVelocity,
    [-10, 0, 10],
    [maxSkew * skewIntensity, 0, -maxSkew * skewIntensity]
  )

  // Calculate scale based on velocity (clamped)
  const scaleY = useTransform(
    smoothVelocity,
    [-10, 0, 10],
    [1 + maxScale * scaleIntensity, 1, 1 - maxScale * scaleIntensity]
  )

  const MotionComponent = motion[Component] as typeof motion.div

  return (
    <MotionComponent
      className={cn(className)}
      style={{
        skewY,
        scaleY: scaleIntensity > 0 ? scaleY : 1,
        transformOrigin: 'center',
      }}
    >
      {children}
    </MotionComponent>
  )
}

// Velocity-based horizontal scroll text (marquee effect)
interface VelocityMarqueeProps {
  children: ReactNode
  baseVelocity?: number
  className?: string
  repeat?: number
}

export function VelocityMarquee({
  children,
  baseVelocity = 50,
  className,
  repeat = 4,
}: VelocityMarqueeProps) {
  // Calculate duration based on velocity (lower = slower)
  const duration = 100 / baseVelocity

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div
        className="flex"
        animate={{ x: ['-50%', 0] }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex-shrink-0 px-4">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Text that stretches based on scroll velocity
interface StretchTextProps {
  children: string
  className?: string
  intensity?: number
}

export function StretchText({
  children,
  className,
  intensity = 1,
}: StretchTextProps) {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setVelocity(lenis.velocity)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  const smoothVelocity = useSpring(velocity, {
    stiffness: 150,
    damping: 25,
  })

  // Letter spacing based on velocity
  const letterSpacing = useTransform(
    smoothVelocity,
    [-5, 0, 5],
    [`${0.2 * intensity}em`, '0em', `${0.2 * intensity}em`]
  )

  return (
    <motion.span
      className={cn(className)}
      style={{ letterSpacing }}
    >
      {children}
    </motion.span>
  )
}

// Blur text on scroll velocity
interface VelocityBlurProps {
  children: ReactNode
  className?: string
  maxBlur?: number
}

export function VelocityBlur({
  children,
  className,
  maxBlur = 4,
}: VelocityBlurProps) {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setVelocity(lenis.velocity)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  const smoothVelocity = useSpring(velocity, {
    stiffness: 200,
    damping: 40,
  })

  const blur = useTransform(
    smoothVelocity,
    [-10, 0, 10],
    [maxBlur, 0, maxBlur]
  )

  return (
    <motion.div
      className={cn(className)}
      style={{
        filter: useTransform(blur, (v) => `blur(${Math.abs(v)}px)`),
      }}
    >
      {children}
    </motion.div>
  )
}

// Split text that animates characters individually based on velocity
interface VelocitySplitTextProps {
  text: string
  className?: string
  charClassName?: string
}

export function VelocitySplitText({
  text,
  className,
  charClassName,
}: VelocitySplitTextProps) {
  const [velocity, setVelocity] = useState(0)
  const characters = text.split('')

  useEffect(() => {
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setVelocity(lenis.velocity)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  const smoothVelocity = useSpring(velocity, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <span className={cn('inline-flex', className)}>
      {characters.map((char, i) => {
        // Calculate offset based on character position
        const offset = (i - characters.length / 2) * 0.5
        const y = useTransform(smoothVelocity, (v) => v * offset)

        return (
          <motion.span
            key={i}
            className={cn('inline-block', charClassName)}
            style={{ y }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </span>
  )
}
