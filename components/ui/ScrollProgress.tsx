'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { getLenisInstance } from '@/hooks/useLenis'

interface ScrollProgressProps {
  color?: string
  height?: number
  zIndex?: number
  showPercentage?: boolean
}

export default function ScrollProgress({
  color = 'var(--color-accent)',
  height = 3,
  zIndex = 100,
  showPercentage = false,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Wait for Lenis to be initialized
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setProgress(lenis.progress)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 origin-left"
        style={{
          scaleX,
          height,
          backgroundColor: color,
          zIndex,
        }}
      />
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 text-xs font-mono bg-foreground text-white px-2 py-1 rounded"
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.01 ? 1 : 0 }}
        >
          {Math.round(progress * 100)}%
        </motion.div>
      )}
    </>
  )
}

// Circular progress variant
export function ScrollProgressCircle({
  size = 48,
  strokeWidth = 3,
  color = 'var(--color-accent)',
}: {
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const checkLenis = setInterval(() => {
      const lenis = getLenisInstance()
      if (lenis) {
        clearInterval(checkLenis)

        const handleScroll = () => {
          setProgress(lenis.progress)
        }

        lenis.on('scroll', handleScroll)
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, 100)

    return () => clearInterval(checkLenis)
  }, [])

  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2)
  const strokeDashoffset = useSpring(circumference * (1 - progress), {
    stiffness: 100,
    damping: 30,
  })

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: progress > 0.01 ? 1 : 0, scale: progress > 0.01 ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-light"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {Math.round(progress * 100)}
      </span>
    </motion.div>
  )
}
