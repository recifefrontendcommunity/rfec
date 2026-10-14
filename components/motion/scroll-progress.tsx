'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin blue bar at the top of the viewport showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-blue-500"
      style={{ scaleX }}
    />
  )
}
