'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

// Global Lenis instance
let lenisInstance: Lenis | null = null

export function setLenisInstance(lenis: Lenis) {
  lenisInstance = lenis
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance
}

// Hook pour accéder à Lenis
export function useLenis(callback?: (lenis: Lenis) => void) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const checkInstance = () => {
      const instance = getLenisInstance()
      if (instance) {
        setLenis(instance)
        if (callbackRef.current) {
          callbackRef.current(instance)
        }
        return true
      }
      return false
    }

    if (!checkInstance()) {
      // Retry after a short delay if instance not ready
      const timeout = setTimeout(checkInstance, 100)
      return () => clearTimeout(timeout)
    }
  }, [])

  return lenis
}

// Hook pour scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const lenis = getLenisInstance()
    if (!lenis) return

    const handleScroll = () => {
      setProgress(lenis.progress)
      setVelocity(lenis.velocity)
      setScroll(lenis.scroll)
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [])

  return { progress, velocity, scroll }
}

// Hook pour détecter la direction du scroll
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScroll = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const lenis = getLenisInstance()
    if (!lenis) return

    const handleScroll = () => {
      const currentScroll = lenis.scroll

      if (currentScroll > lastScroll.current + 5) {
        setDirection('down')
      } else if (currentScroll < lastScroll.current - 5) {
        setDirection('up')
      }

      lastScroll.current = currentScroll
      setIsScrolling(true)

      // Reset scrolling state after scroll stops
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { direction, isScrolling }
}

// Hook pour velocity avec smoothing
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const [smoothVelocity, setSmoothVelocity] = useState(0)

  useEffect(() => {
    const lenis = getLenisInstance()
    if (!lenis) return

    const handleScroll = () => {
      setVelocity(lenis.velocity)
      // Smooth velocity with lerp
      setSmoothVelocity((prev) => prev + (lenis.velocity - prev) * 0.1)
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [])

  return { velocity, smoothVelocity }
}

// Scroll to element or position
export function scrollTo(
  target: string | HTMLElement | number,
  options?: {
    offset?: number
    duration?: number
    immediate?: boolean
    lock?: boolean
    onComplete?: () => void
  }
) {
  const lenis = getLenisInstance()
  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
      lock: options?.lock ?? false,
      onComplete: options?.onComplete,
    })
  }
}

// Stop scroll
export function stopScroll() {
  getLenisInstance()?.stop()
}

// Start scroll
export function startScroll() {
  getLenisInstance()?.start()
}

// Check if scroll is locked
export function isScrollLocked(): boolean {
  return getLenisInstance()?.isStopped ?? false
}

// Scroll to top
export function scrollToTop(duration = 1.2) {
  scrollTo(0, { duration })
}

// Scroll to bottom
export function scrollToBottom(duration = 1.2) {
  const lenis = getLenisInstance()
  if (lenis) {
    scrollTo(lenis.limit, { duration })
  }
}
