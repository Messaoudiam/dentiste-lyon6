'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import { setLenisInstance } from '@/hooks/useLenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          lenis.scrollTo(href, { offset: -100, duration: 1.2 })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Handle resize
    const handleResize = () => {
      lenis.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
