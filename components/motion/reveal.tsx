'use client'

import { motion, type Variants } from 'framer-motion'

import { useIntroDone } from './intro-store'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  /** Hold the animation until the intro loader is gone (hero only). */
  waitIntro?: boolean
}

/** Fades + slides content in the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  waitIntro = false
}: RevealProps) {
  const introDone = useIntroDone()
  const ready = !waitIntro || introDone

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={ready ? { opacity: 1, y: 0, x: 0 } : undefined}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE }
  }
}

/** `<ul>` whose `<StaggerItem>` children animate in one after another. */
export function StaggerList({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.ul
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  )
}
