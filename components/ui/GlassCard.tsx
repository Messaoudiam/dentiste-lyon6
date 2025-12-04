'use client'

import { useRef, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'subtle' | 'medium' | 'strong'
  glow?: boolean
  noise?: boolean
  hover?: boolean
  animated?: boolean
}

export default function GlassCard({
  children,
  className,
  variant = 'medium',
  glow = false,
  noise = false,
  hover = true,
  animated = true,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glow) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const variants = {
    subtle: {
      backdrop: 'backdrop-blur-xl',
      bg: 'bg-white/60',
      border: 'border-white/40',
    },
    medium: {
      backdrop: 'backdrop-blur-2xl',
      bg: 'bg-white/70',
      border: 'border-white/50',
    },
    strong: {
      backdrop: 'backdrop-blur-3xl',
      bg: 'bg-white/80',
      border: 'border-black/5',
    },
  }

  const currentVariant = variants[variant]
  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative overflow-hidden',
        'rounded-2xl',
        currentVariant.backdrop,
        currentVariant.bg,
        // Gradient border effect
        'before:absolute before:inset-0 before:rounded-2xl before:p-[1px]',
        'before:bg-gradient-to-b before:from-white/20 before:to-white/60',
        'before:-z-10',
        // Shadow
        'shadow-[0_4px_24px_rgb(0_0_0/_0.04),0_1px_2px_rgb(0_0_0/_0.02)]',
        // Hover states
        hover && [
          'transition-all duration-500',
          'hover:shadow-[0_8px_40px_rgb(0_0_0/_0.08),0_2px_4px_rgb(0_0_0/_0.02)]',
          'hover:-translate-y-0.5',
        ],
        // Noise texture
        noise && 'noise',
        className
      )}
      style={{
        // CSS custom properties for glow effect
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
      initial={animated ? { opacity: 0, y: 24 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true, margin: '-80px' } : undefined}
      transition={animated ? { duration: 0.7, ease: easeOutExpo } : undefined}
      {...props}
    >
      {/* Inner border for depth */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl pointer-events-none',
          'border',
          currentVariant.border
        )}
      />

      {/* Glow effect on hover */}
      {glow && (
        <div
          className={cn(
            'absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500',
            hover && 'group-hover:opacity-100'
          )}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(0 102 255 / 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
