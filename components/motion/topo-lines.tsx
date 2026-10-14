'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const RINGS = 10

/** Deterministic wobbly closed curve (so server and client markup match). */
function blobPath(cx: number, cy: number, radius: number, seed: number) {
  const steps = 28
  const points = Array.from({ length: steps }, (_, i) => {
    const angle = (i / steps) * Math.PI * 2
    const r =
      radius *
      (1 +
        0.09 * Math.sin(3 * angle + seed) +
        0.05 * Math.sin(5 * angle + seed * 2.3) +
        0.03 * Math.sin(8 * angle + seed * 0.7))
    return [cx + r * Math.cos(angle), cy + r * 0.78 * Math.sin(angle)]
  })
  const fmt = (n: number) => n.toFixed(1)
  const mid = (a: number[], b: number[]) => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2
  ]
  const start = mid(points[0], points[1])
  let d = `M${fmt(start[0])} ${fmt(start[1])}`
  for (let i = 1; i <= steps; i++) {
    const p = points[i % steps]
    const m = mid(p, points[(i + 1) % steps])
    d += `Q${fmt(p[0])} ${fmt(p[1])} ${fmt(m[0])} ${fmt(m[1])}`
  }
  return `${d}Z`
}

const PATHS = Array.from({ length: RINGS }, (_, i) =>
  blobPath(600, 400, 40 + i * 54, i * 0.55)
)

/**
 * Topographic contour lines. They draw themselves once; the endless slow
 * rotation is a CSS animation on the whole <svg>, so it runs on the compositor
 * (no per-frame JS or repaint) and pauses off-screen via `.rfec-anim`.
 */
export function TopoLines({ className }: { className?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        aria-hidden
        viewBox="0 0 1200 800"
        className={cn(
          'rfec-anim size-[150%] max-w-none shrink-0 animate-[spin_280s_linear_infinite] will-change-transform motion-reduce:animate-none',
          className
        )}
        fill="none"
      >
        {PATHS.map((d, index) => (
          <motion.path
            key={index}
            d={d}
            stroke="currentColor"
            strokeWidth={1.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: 0.12 * index,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
    </div>
  )
}
