'use client'

import { useState } from 'react'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import RFECLogo from './logo'
import { Button } from './ui/button'

const Header = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  // Slide away while reading downwards, come back as soon as the user scrolls up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > previous && latest > 160)
  })

  return (
    <motion.header
      className="bg-background/95 border-border sticky top-0 z-30 w-full border-b"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        <Link href="/" aria-label="Página inicial da RFEC">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <RFECLogo className="h-auto w-[110px] md:w-[140px]" />
          </motion.div>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button asChild variant="link" className="text-foreground">
            <Link href="/eventos">Eventos</Link>
          </Button>
          <Button asChild variant="link" className="group underline">
            <Link href="/#join">
              Faça Parte{' '}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
