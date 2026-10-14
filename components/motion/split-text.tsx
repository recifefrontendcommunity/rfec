'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { useIntroDone } from './intro-store'

export type Word = {
  text: string
  className?: string
  /** Force a line break after this word. */
  br?: boolean
}

type SplitTextProps = {
  words: Word[]
  className?: string
  delay?: number
  waitIntro?: boolean
  as?: 'h1' | 'h2'
}

/** Headline whose words rise out of a mask, one after another. */
export function SplitText({
  words,
  className,
  delay = 0,
  waitIntro = false,
  as = 'h2'
}: SplitTextProps) {
  const introDone = useIntroDone()
  const ready = !waitIntro || introDone
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn('inline-block', word.className)}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: {
                  y: '0%',
                  rotate: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              {word.text}
            </motion.span>
          </span>
          {word.br ? <br /> : ' '}
        </span>
      ))}
    </Tag>
  )
}
