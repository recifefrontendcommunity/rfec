'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from '@/components/logo-mark-path'

import { markIntroDone } from './intro-store'

const SESSION_KEY = 'rfec-intro-seen'
const DURATION_MS = 1700

/** Full-screen splash with the crab claw, shown once per browser session. */
export function IntroLoader() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // storage blocked — just show the intro
    }
    const skip = seen || reduced

    if (!skip) document.documentElement.style.overflow = 'hidden'
    const timer = setTimeout(
      () => {
        if (!skip) {
          try {
            sessionStorage.setItem(SESSION_KEY, '1')
          } catch {
            // ignore
          }
        }
        document.documentElement.style.overflow = ''
        setVisible(false)
        markIntroDone()
      },
      skip ? 0 : DURATION_MS
    )

    return () => {
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [reduced])

  return (
    <>
      {/* Without JS the splash could never leave: hide it. */}
      <noscript>
        <style>{'.rfec-intro{display:none!important}'}</style>
      </noscript>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="rfec-intro fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-blue-500"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden
          >
            <motion.svg
              viewBox={LOGO_MARK_VIEWBOX}
              className="h-28 w-auto md:h-36"
              initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.path
                d={LOGO_MARK_PATH}
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth={2}
                initial={{ fillOpacity: 0, pathLength: 0 }}
                animate={{ fillOpacity: 1, pathLength: 1 }}
                transition={{
                  pathLength: { duration: 1.1, ease: 'easeInOut' },
                  fillOpacity: { duration: 0.5, delay: 0.9 }
                }}
              />
            </motion.svg>
            <motion.span
              className="text-sm font-semibold tracking-[0.4em] text-white uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Recife Frontend Community
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
