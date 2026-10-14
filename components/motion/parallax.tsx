'use client'

import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils'

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  /** Max vertical travel, in percent of the element height. */
  amount?: number
}

/**
 * Slowly drifts its content while the parent scrolls past. Meant to wrap a
 * `fill` image inside an `overflow-hidden` container.
 */
export function Parallax({ children, className, amount = 8 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])

  return (
    <div ref={ref} className={cn('absolute inset-0', className)}>
      <motion.div
        className="absolute inset-0 scale-[1.18] will-change-transform"
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  )
}
