'use client'

import { useEffect, useRef } from 'react'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue
} from 'framer-motion'

import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from '@/components/logo-mark-path'
import { cn } from '@/lib/utils'

import { TopoLines } from './topo-lines'

type Chip = {
  label: string
  className: string
  depth: number
  delay: number
}

const CHIPS: Chip[] = [
  { label: '</>', className: 'left-[6%] top-[18%]', depth: 40, delay: 0 },
  { label: 'React', className: 'right-[8%] top-[16%]', depth: 60, delay: 0.6 },
  {
    label: 'CSS',
    className: 'left-[4%] bottom-[16%] hidden lg:block',
    depth: 30,
    delay: 1.2
  },
  {
    label: 'TypeScript',
    className: 'right-[5%] bottom-[20%] hidden lg:block',
    depth: 50,
    delay: 0.3
  },
  {
    label: '{ }',
    className: 'left-[44%] top-[6%] hidden md:block',
    depth: 20,
    delay: 0.9
  },
  {
    label: 'Next.js',
    className: 'right-[30%] bottom-[6%] hidden lg:block',
    depth: 35,
    delay: 1.5
  }
]

function FloatingChip({
  chip,
  px,
  py
}: {
  chip: Chip
  px: MotionValue<number>
  py: MotionValue<number>
}) {
  const x = useTransform(px, (v) => v * chip.depth)
  const y = useTransform(py, (v) => v * chip.depth)

  return (
    <motion.div
      className={cn('absolute will-change-transform', chip.className)}
      style={{ x, y }}
    >
      {/* Bobbing is a CSS animation (compositor only), no backdrop blur. */}
      <span
        className="rfec-anim rfec-float block rounded-full border border-white/15 bg-zinc-900/70 px-4 py-1.5 font-mono text-xs text-zinc-300 motion-reduce:animate-none md:text-sm"
        style={{
          animationDuration: `${5 + chip.delay}s`,
          animationDelay: `${chip.delay}s`
        }}
      >
        {chip.label}
      </span>
    </motion.div>
  )
}

/** Decorative hero layer: topo lines, cursor glow, floating chips and claw. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 20 })
  const py = useSpring(my, { stiffness: 60, damping: 20 })
  // Move the glow with transforms only (animating left/top forces layout).
  const glowX = useTransform(px, (v) => v * 360)
  const glowY = useTransform(py, (v) => v * 240)

  // Only track the pointer while the hero is actually on screen.
  useEffect(() => {
    if (!inView) return
    function onMove(event: PointerEvent) {
      mx.set(event.clientX / window.innerWidth - 0.5)
      my.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [inView, mx, my])

  return (
    <div
      ref={ref}
      aria-hidden
      data-active={inView}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <TopoLines className="text-blue-500/25" />

      {/* Radial gradient instead of a huge CSS blur: far cheaper to paint. */}
      <motion.div
        className="absolute top-[45%] left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle, rgba(43,127,255,0.32) 0%, rgba(43,127,255,0) 65%)'
        }}
      />

      <motion.svg
        viewBox={LOGO_MARK_VIEWBOX}
        className="absolute -right-16 bottom-[-4rem] w-[22rem] text-white/[0.04] md:-right-10 md:w-[34rem]"
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: -8, scale: 1 }}
        transition={{ delay: 1.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d={LOGO_MARK_PATH} fill="currentColor" />
      </motion.svg>

      {CHIPS.map((chip) => (
        <FloatingChip key={chip.label} chip={chip} px={px} py={py} />
      ))}
    </div>
  )
}
