'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TrustBanner() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <section
      ref={ref}
      className="py-5 border-b border-black/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 lg:gap-4 text-[13px] lg:text-sm text-gray flex-wrap"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500">★</span>
            <span>4.9/5 sur Google</span>
          </span>

          <span className="text-black/20">·</span>

          <span>Depuis 2008</span>

          <span className="text-black/20">·</span>

          <span>Invisalign Platinum</span>

          <span className="text-black/20 hidden sm:inline">·</span>

          <span className="hidden sm:inline">Paiement 3x sans frais</span>

          <span className="text-black/20 hidden md:inline">·</span>

          <span className="hidden md:inline">Urgences 7j/7</span>
        </motion.div>
      </div>
    </section>
  )
}
