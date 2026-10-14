'use client'

import { useRef } from 'react'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion'

import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: React.ReactNode
  /** Percent of one copy per second. Negative moves left. */
  speed?: number
  className?: string
}

const COPIES = 3

function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/** Endless ticker that speeds up (and reverses) with the scroll velocity. */
export function Marquee({ children, speed = -4, className }: MarqueeProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { margin: '200px' })
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400
  })
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return
    let move = direction.current * speed * (delta / 1000)
    if (boost.get() < 0) direction.current = -1
    else if (boost.get() > 0) direction.current = 1
    move += direction.current * move * boost.get()
    baseX.set(wrap(-100 / COPIES, 0, baseX.get() + move / COPIES))
  })

  const x = useTransform(baseX, (value) => `${value}%`)

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
    >
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center"
            aria-hidden={index > 0}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
