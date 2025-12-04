'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number // -1 to 1, negative = opposite direction
  scale?: boolean // Scale effect on scroll
  scaleRange?: [number, number] // [start, end] scale values
  className?: string
  containerClassName?: string
  sizes?: string
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  scale = false,
  scaleRange = [1, 1.15],
  className,
  containerClassName,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax Y transform
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Scale transform
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleRange[0], scale ? scaleRange[1] : scaleRange[0], scaleRange[0]]
  )
  const smoothScale = useSpring(imageScale, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className={cn('overflow-hidden', containerClassName)}>
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className={cn('relative w-full h-full', className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  )
}

// Parallax section background
export function ParallaxBackground({
  src,
  alt,
  speed = 0.2,
  overlay = true,
  overlayOpacity = 0.4,
  children,
  className,
}: {
  src: string
  alt: string
  speed?: number
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: smoothY }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {overlay && (
          <div
            className="absolute inset-0 bg-foreground"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Reveal image on scroll
export function RevealImage({
  src,
  alt,
  direction = 'up',
  className,
  containerClassName,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  src: string
  alt: string
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  containerClassName?: string
  sizes?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const clipPath = {
    up: useTransform(scrollYProgress, [0, 1], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']),
    down: useTransform(scrollYProgress, [0, 1], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']),
    left: useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']),
    right: useTransform(scrollYProgress, [0, 1], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']),
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', containerClassName)}>
      <motion.div
        style={{ clipPath: clipPath[direction] }}
        className={cn('relative w-full h-full', className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </motion.div>
    </div>
  )
}
